<?php
require_once 'config/database.php';

class AdminChatController {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function handleRequest($id = null, $action = null) {
        $method = $_SERVER['REQUEST_METHOD'];

        // Se o roteamento passou a ação no primeiro parâmetro (ex: /admin/chat/conversations)
        if ($id && !$action && !is_numeric($id)) {
            $action = $id;
            $id = null;
        }

        switch ($method) {
            case 'GET':
                if ($action === 'conversations') {
                    $this->getConversations();
                } elseif ($action === 'messages' && $id) {
                    $this->getMessages($id);
                } elseif ($id === 'messages' && isset($_GET['conversation_id'])) {
                    // Fallback para quando o ID é passado via query param se necessário
                    $this->getMessages($_GET['conversation_id']);
                } elseif ($action === 'customers') {
                    $this->getCustomersPresence();
                } elseif ($action === 'predefined-options') {
                    $this->getPredefinedOptions();
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Action not found", "action" => $action, "id" => $id]);
                }
                break;
            case 'POST':
                if ($action === 'messages' && $id) {
                    $this->sendMessage($id);
                } elseif ($action === 'presence') {
                    $this->updatePresence();
                } elseif ($action === 'conversations') {
                    $this->createConversation();
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Action not found", "action" => $action]);
                }
                break;
            case 'PUT':
                if ($action === 'status' && $id) {
                    $this->updateConversationStatus($id);
                } elseif ($action === 'read' && $id) {
                    $this->markAsRead($id);
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Action not found"]);
                }
                break;
            default:
                http_response_code(405);
                echo json_encode(["message" => "Method not allowed"]);
                break;
        }
    }

    private function getConversations() {
        $query = "
            SELECT 
                u.id as customer_id,
                u.name as customer_name, 
                c.id as id,
                c.status as status,
                c.last_message as last_message,
                c.last_message_at as last_message_at,
                c.unread_count_admin as unread_count_admin,
                p.status as customer_status
            FROM users u
            LEFT JOIN chat_conversations c ON u.id = c.customer_id AND c.status != 'finished'
            LEFT JOIN user_presence p ON u.id = p.user_id
            WHERE u.role = 'user' AND u.deleted_at IS NULL
            ORDER BY 
                CASE WHEN c.id IS NOT NULL THEN 0 ELSE 1 END,
                c.last_message_at DESC,
                u.name ASC
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($results);
    }

    private function getMessages($conversation_id) {
        $query = "
            SELECT * FROM chat_messages 
            WHERE conversation_id = ? AND sender_type != 'system'
            ORDER BY created_at ASC
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$conversation_id]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($results);
    }

    private function sendMessage($conversation_id) {
        $data = json_decode(file_get_contents("php://input"));
        if (!isset($data->message) || empty($data->message)) {
            http_response_code(400);
            echo json_encode(["message" => "Message is required"]);
            return;
        }

        $sender_id = $data->sender_id;
        $sender_type = $data->sender_type; // 'admin' ou 'customer'
        $message = $data->message;

        try {
            $this->conn->beginTransaction();

            // Inserir mensagem
            $query = "INSERT INTO chat_messages (conversation_id, sender_id, sender_type, message) VALUES (?, ?, ?, ?)";
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$conversation_id, $sender_id, $sender_type, $message]);

            // Atualizar conversa
            $query = "
                UPDATE chat_conversations 
                SET last_message = ?, 
                    last_message_at = CURRENT_TIMESTAMP,
                    status = IF(status = 'new', 'waiting', status)
                WHERE id = ?
            ";
            
            // Se for admin enviando, incrementa unread do customer e vice-versa
            if ($sender_type === 'admin') {
                $query = "
                    UPDATE chat_conversations 
                    SET last_message = ?, 
                        last_message_at = CURRENT_TIMESTAMP,
                        unread_count_customer = unread_count_customer + 1,
                        status = 'active'
                    WHERE id = ?
                ";
            } else {
                $query = "
                    UPDATE chat_conversations 
                    SET last_message = ?, 
                        last_message_at = CURRENT_TIMESTAMP,
                        unread_count_admin = unread_count_admin + 1
                    WHERE id = ?
                ";
            }

            $stmt = $this->conn->prepare($query);
            $stmt->execute([$message, $conversation_id]);

            $this->conn->commit();
            echo json_encode(["message" => "Message sent successfully"]);
        } catch (Exception $e) {
            $this->conn->rollBack();
            http_response_code(500);
            echo json_encode(["message" => "Error sending message", "error" => $e->getMessage()]);
        }
    }

    private function updatePresence() {
        $data = json_decode(file_get_contents("php://input"));
        if (!isset($data->user_id) || !isset($data->status)) {
            http_response_code(400);
            echo json_encode(["message" => "User ID and status are required"]);
            return;
        }

        $query = "
            INSERT INTO user_presence (user_id, status, last_activity_at) 
            VALUES (?, ?, CURRENT_TIMESTAMP) 
            ON DUPLICATE KEY UPDATE status = ?, last_activity_at = CURRENT_TIMESTAMP
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$data->user_id, $data->status, $data->status]);
        echo json_encode(["message" => "Presence updated"]);
    }

    private function getCustomersPresence() {
        $query = "
            SELECT u.id, u.name, u.profile_image, p.status, p.last_activity_at
            FROM users u
            LEFT JOIN user_presence p ON u.id = p.user_id
            WHERE u.role = 'customer'
            ORDER BY p.last_activity_at DESC
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($results);
    }

    private function createConversation() {
        $data = json_decode(file_get_contents("php://input"));
        if (!isset($data->customer_id)) {
            http_response_code(400);
            echo json_encode(["message" => "Customer ID is required"]);
            return;
        }

        // Verifica se já existe conversa aberta
        $query = "SELECT id FROM chat_conversations WHERE customer_id = ? AND status != 'finished'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$data->customer_id]);
        $existing = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($existing) {
            echo json_encode(["message" => "Conversation already exists", "id" => $existing['id']]);
            return;
        }

        try {
            $this->conn->beginTransaction();

            $query = "INSERT INTO chat_conversations (customer_id, status) VALUES (?, 'new')";
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$data->customer_id]);
            $conversation_id = $this->conn->lastInsertId();

            // Mensagem Automática Inicial
            $welcome_msg = "Olá! Seja bem-vindo ao atendimento do LembrançasVIP. Para te ajudar melhor, escolha uma das opções abaixo:";
            $query = "INSERT INTO chat_messages (conversation_id, sender_id, sender_type, message, message_type) VALUES (?, 0, 'system', ?, 'text')";
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$conversation_id, $welcome_msg]);

            // Buscar opções pré-definidas para simular bot (opcional, aqui apenas registramos a intenção)
            // Na prática, o frontend do cliente exibirá as opções.

            $this->conn->commit();
            echo json_encode(["message" => "Conversation created", "id" => $conversation_id]);
        } catch (Exception $e) {
            $this->conn->rollBack();
            http_response_code(500);
            echo json_encode(["message" => "Error creating conversation", "error" => $e->getMessage()]);
        }
    }

    private function updateConversationStatus($id) {
        $data = json_decode(file_get_contents("php://input"));
        if (!isset($data->status)) {
            http_response_code(400);
            echo json_encode(["message" => "Status is required"]);
            return;
        }

        $query = "UPDATE chat_conversations SET status = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$data->status, $id]);
        echo json_encode(["message" => "Status updated"]);
    }

    private function markAsRead($id) {
        $data = json_decode(file_get_contents("php://input"));
        $user_type = $data->user_type; // 'admin' ou 'customer'

        if ($user_type === 'admin') {
            $query = "UPDATE chat_conversations SET unread_count_admin = 0 WHERE id = ?";
        } else {
            $query = "UPDATE chat_conversations SET unread_count_customer = 0 WHERE id = ?";
        }
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);

        // Marcar mensagens individuais como lidas
        $query = "UPDATE chat_messages SET is_read = 1, read_at = CURRENT_TIMESTAMP WHERE conversation_id = ? AND sender_type != ? AND is_read = 0";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id, $user_type]);

        echo json_encode(["message" => "Messages marked as read"]);
    }

    private function getPredefinedOptions() {
        $query = "SELECT * FROM predefined_chat_options WHERE status = 1 ORDER BY sort_order ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($results);
    }
}
?>
