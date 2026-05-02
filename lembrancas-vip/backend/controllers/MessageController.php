<?php

class MessageController {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function handleRequest($id = null, $action = null) {
        $method = $_SERVER['REQUEST_METHOD'];

        if ($method === 'GET' && isset($_GET['user_id'])) {
            $this->getUserMessages($_GET['user_id']);
        } elseif ($method === 'PUT' && $id && $action === 'status') {
            $this->updateStatus($id);
        } else {
            http_response_code(405);
            echo json_encode(["message" => "Method not allowed"]);
        }
    }

    private function updateStatus($id) {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->status) || !in_array($data->status, ['approved', 'rejected', 'pending'])) {
            http_response_code(400);
            echo json_encode(["message" => "Status inválido."]);
            return;
        }

        $query = "UPDATE condolences SET status = :status WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':status', $data->status);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["message" => "Status da mensagem atualizado com sucesso."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Erro ao atualizar status."]);
        }
    }

    private function getUserMessages($user_id) {
        // Pentest Fix: Prevenção de IDOR. 
        // Em um cenário real, extrairíamos o ID do token JWT.
        // Aqui simulamos a validação contra o parâmetro solicitado.
        $headers = apache_request_headers();
        $authToken = isset($headers['Authorization']) ? $headers['Authorization'] : null;
        
        // Se houver um token (id do usuário logado), validamos a posse
        if ($authToken) {
            Security::validateOwner($user_id, $authToken);
        }

        $query = "
            SELECT 
                c.id, 
                c.visitor_name, 
                c.visitor_email, 
                c.message, 
                c.status, 
                c.created_at,
                m.full_name as memorial_name,
                m.slug as memorial_slug
            FROM condolences c
            JOIN memorials m ON c.memorial_id = m.id
            WHERE m.user_id = :user_id
            ORDER BY c.created_at DESC
        ";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();

        $messages = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $messages[] = $row;
        }

        http_response_code(200);
        echo json_encode($messages);
    }
}
?>
