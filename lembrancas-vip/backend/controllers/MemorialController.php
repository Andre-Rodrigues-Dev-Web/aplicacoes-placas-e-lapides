<?php
require_once 'models/Memorial.php';

class MemorialController {
    private $db;
    private $memorial;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->memorial = new Memorial($this->db);
    }

    public function handleRequest($id = null, $action = null) {
        $method = $_SERVER['REQUEST_METHOD'];

        if ($id && $method === 'POST') {
            if ($action === 'messages') {
                $this->createMessage($id);
                return;
            }
            if ($action === 'tributes') {
                $this->createTribute($id);
                return;
            }
        }

        switch($method) {
            case 'GET':
                if ($id) {
                    $this->getOne($id);
                } else {
                    $this->getAll();
                }
                break;
            case 'POST':
                $this->create();
                break;
            default:
                http_response_code(405);
                echo json_encode(["message" => "Method not allowed"]);
                break;
        }
    }

    private function getAll() {
        // Se houver usuário autenticado, retorna apenas os DELE
        $headers = apache_request_headers();
        $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : (isset($headers['authorization']) ? $headers['authorization'] : null);
        
        $stmt = null;
        if ($authHeader && preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $userData = Security::validateToken($matches[1]);
            if ($userData) {
                $stmt = $this->memorial->readByUser($userData['id']);
            }
        }

        if (!$stmt) {
            $stmt = $this->memorial->readAll();
        }

        $num = $stmt->rowCount();
        if ($num > 0) {
            $memorials_arr = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($memorials_arr, $row);
            }
            http_response_code(200);
            echo json_encode($memorials_arr);
        } else {
            http_response_code(200);
            echo json_encode([]);
        }
    }

    private function getOne($slug) {
        $this->memorial->slug = $slug;
        $stmt = $this->memorial->readOne();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            // Busca mensagens aprovadas para este memorial
            $msgQuery = "SELECT visitor_name, message, created_at FROM condolences WHERE memorial_id = ? AND status = 'approved' ORDER BY created_at DESC";
            $msgStmt = $this->db->prepare($msgQuery);
            $msgStmt->execute([$row['id']]);
            $row['messages'] = $msgStmt->fetchAll(PDO::FETCH_ASSOC);

            // Busca galeria (se houver)
            $galQuery = "SELECT file_path, caption FROM memorial_media WHERE memorial_id = ? ORDER BY created_at DESC";
            $galStmt = $this->db->prepare($galQuery);
            $galStmt->execute([$row['id']]);
            $row['gallery'] = $galStmt->fetchAll(PDO::FETCH_ASSOC);

            // Conta velas aprovadas
            $candleQuery = "SELECT COUNT(*) as candle_count FROM tributes WHERE memorial_id = ? AND tribute_type = 'candle' AND status = 'approved'";
            $candleStmt = $this->db->prepare($candleQuery);
            $candleStmt->execute([$row['id']]);
            $candleRow = $candleStmt->fetch(PDO::FETCH_ASSOC);
            $row['candle_count'] = $candleRow ? (int)$candleRow['candle_count'] : 0;

            // Busca eventos da linha do tempo
            $timelineQuery = "SELECT title, description, event_date, media_url FROM timeline_events WHERE memorial_id = ? ORDER BY event_date ASC";
            $timelineStmt = $this->db->prepare($timelineQuery);
            $timelineStmt->execute([$row['id']]);
            $row['timeline'] = $timelineStmt->fetchAll(PDO::FETCH_ASSOC);

            http_response_code(200);
            echo json_encode($row);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Memorial not found."]);
        }
    }

    private function create() {
        // EXIGE AUTENTICAÇÃO
        $userData = requireAuth();

        if (!empty($_POST)) {
            $data = (object) $_POST;
        } else {
            $data = json_decode(file_get_contents("php://input"));
        }
        
        if (!empty($data->full_name)) {
            // SEGURANÇA: Usa o ID do TOKEN, não o do corpo da requisição
            $this->memorial->user_id = $userData['id'];
            $this->memorial->full_name = Security::sanitize($data->full_name);
            $this->memorial->slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $this->memorial->full_name))) . '-' . time();
            $this->memorial->birth_date = isset($data->birth_date) ? Security::sanitize($data->birth_date) : null;
            $this->memorial->death_date = isset($data->death_date) ? Security::sanitize($data->death_date) : null;
            $this->memorial->short_description = isset($data->short_description) ? Security::sanitize($data->short_description) : null;
            $this->memorial->biography = isset($data->biography) ? Security::sanitize($data->biography) : null;
            $this->memorial->city = isset($data->city) ? Security::sanitize($data->city) : null;
            $this->memorial->state = isset($data->state) ? Security::sanitize($data->state) : null;
            $this->memorial->cemetery = isset($data->cemetery) ? Security::sanitize($data->cemetery) : null;
            $this->memorial->generation = isset($data->generation) ? Security::sanitize($data->generation) : 'outros';

            // Validação de Extensões Permitidas
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
            $uploadDir = __DIR__ . '/../uploads/';
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

            // Upload de imagem principal
            $mainPhotoPath = null;
            if (isset($_FILES['main_photo']) && $_FILES['main_photo']['error'] === UPLOAD_ERR_OK) {
                $ext = strtolower(pathinfo($_FILES['main_photo']['name'], PATHINFO_EXTENSION));
                if (in_array($ext, $allowedExtensions)) {
                    $fileName = bin2hex(random_bytes(10)) . '_' . time() . '.' . $ext;
                    if (move_uploaded_file($_FILES['main_photo']['tmp_name'], $uploadDir . $fileName)) {
                        $mainPhotoPath = 'uploads/' . $fileName;
                    }
                }
            }
            $this->memorial->main_photo = $mainPhotoPath;

            $last_id = $this->memorial->create();

            if ($last_id) {
                // Tratar galeria
                if (isset($_FILES['gallery'])) {
                    foreach ($_FILES['gallery']['tmp_name'] as $i => $tmpName) {
                        if ($_FILES['gallery']['error'][$i] === UPLOAD_ERR_OK) {
                            $ext = strtolower(pathinfo($_FILES['gallery']['name'][$i], PATHINFO_EXTENSION));
                            if (in_array($ext, $allowedExtensions)) {
                                $gFileName = bin2hex(random_bytes(10)) . '_gal_' . time() . '.' . $ext;
                                if (move_uploaded_file($tmpName, $uploadDir . $gFileName)) {
                                    $gPath = 'uploads/' . $gFileName;
                                    $gStmt = $this->db->prepare("INSERT INTO memorial_media (memorial_id, file_path) VALUES (?, ?)");
                                    $gStmt->execute([$last_id, $gPath]);
                                }
                            }
                        }
                    }
                }

                http_response_code(201);
                echo json_encode(["message" => "Memorial created successfully.", "slug" => $this->memorial->slug]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Unable to create memorial."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Incomplete data."]);
        }
    }

    private function createMessage($slug) {
        $data = json_decode(file_get_contents("php://input"));
        
        if (empty($data->visitor_name) || empty($data->message)) {
            http_response_code(400);
            echo json_encode(["message" => "Nome e mensagem são obrigatórios."]);
            return;
        }

        // Buscar o memorial pelo slug para pegar o ID
        $this->memorial->slug = $slug;
        $stmt = $this->memorial->readOne();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            http_response_code(404);
            echo json_encode(["message" => "Memorial não encontrado."]);
            return;
        }

        // SEGURANÇA: Sanitização rigorosa para prevenir XSS persistente
        $visitorName = Security::sanitize($data->visitor_name);
        $message = Security::sanitize($data->message);
        $email = isset($data->visitor_email) ? Security::sanitize($data->visitor_email) : null;

        $query = "INSERT INTO condolences SET memorial_id=:memorial_id, visitor_name=:visitor_name, visitor_email=:visitor_email, message=:message, status='pending'";
        $stmt = $this->db->prepare($query);
        
        $stmt->bindParam(":memorial_id", $row['id']);
        $stmt->bindParam(":visitor_name", $visitorName);
        $stmt->bindParam(":visitor_email", $email);
        $stmt->bindParam(":message", $message);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Mensagem enviada com sucesso! Ela aparecerá assim que a família aprovar."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Erro ao enviar mensagem."]);
        }
    }

    private function createTribute($slug) {
        $data = json_decode(file_get_contents("php://input"));
        
        if (empty($data->visitor_name) || empty($data->tribute_type)) {
            http_response_code(400);
            echo json_encode(["message" => "Nome e tipo de tributo são obrigatórios."]);
            return;
        }

        $this->memorial->slug = $slug;
        $stmt = $this->memorial->readOne();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            http_response_code(404);
            echo json_encode(["message" => "Memorial não encontrado."]);
            return;
        }

        // SEGURANÇA: Sanitização
        $visitorName = Security::sanitize($data->visitor_name);
        $tributeType = Security::sanitize($data->tribute_type);
        $shortMessage = isset($data->message) ? Security::sanitize($data->message) : null;

        $query = "INSERT INTO tributes SET memorial_id=:memorial_id, visitor_name=:visitor_name, tribute_type=:tribute_type, short_message=:short_message, status='pending'";
        $stmt = $this->db->prepare($query);
        
        $stmt->bindParam(":memorial_id", $row['id']);
        $stmt->bindParam(":visitor_name", $visitorName);
        $stmt->bindParam(":tribute_type", $tributeType);
        $stmt->bindParam(":short_message", $shortMessage);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Tributo adicionado com sucesso! Aguardando aprovação."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Erro ao enviar tributo."]);
        }
    }
}
?>
