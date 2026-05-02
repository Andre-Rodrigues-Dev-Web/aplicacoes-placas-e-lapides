<?php

class AdminModerationController {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function handleRequest($id = null, $action = null) {
        $method = $_SERVER['REQUEST_METHOD'];

        if ($method === 'GET') {
            $this->getPendingItems();
        } elseif ($method === 'POST' && $id && $action) {
            $this->updateStatus($id, $action);
        } else {
            http_response_code(405);
            echo json_encode(["message" => "Method not allowed"]);
        }
    }

    private function getPendingItems() {
        // Busca mensagens de condolências pendentes
        $msgQuery = "
            SELECT 
                c.id, 
                'message' as type,
                c.visitor_name, 
                c.message as content, 
                c.created_at,
                m.full_name as memorial_name
            FROM condolences c
            JOIN memorials m ON c.memorial_id = m.id
            WHERE c.status = 'pending'
            ORDER BY c.created_at ASC
        ";
        
        // Busca tributos (velas) pendentes
        $tribQuery = "
            SELECT 
                t.id, 
                'tribute' as type,
                t.visitor_name, 
                t.short_message as content, 
                t.created_at,
                m.full_name as memorial_name
            FROM tributes t
            JOIN memorials m ON t.memorial_id = m.id
            WHERE t.status = 'pending'
            ORDER BY t.created_at ASC
        ";

        try {
            $stmtMsg = $this->db->prepare($msgQuery);
            $stmtMsg->execute();
            $messages = $stmtMsg->fetchAll(PDO::FETCH_ASSOC);

            $stmtTrib = $this->db->prepare($tribQuery);
            $stmtTrib->execute();
            $tributes = $stmtTrib->fetchAll(PDO::FETCH_ASSOC);

            $result = array_merge($messages, $tributes);
            
            // Ordenar por data
            usort($result, function($a, $b) {
                return strtotime($a['created_at']) - strtotime($b['created_at']);
            });

            http_response_code(200);
            echo json_encode($result);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erro ao buscar itens pendentes: " . $e->getMessage()]);
        }
    }

    private function updateStatus($id, $action) {
        $data = json_decode(file_get_contents("php://input"));
        $type = isset($data->type) ? $data->type : 'message';
        $status = ($action === 'approve') ? 'approved' : 'rejected';
        
        $table = ($type === 'message') ? 'condolences' : 'tributes';
        
        $query = "UPDATE $table SET status = :status WHERE id = :id";
        
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["message" => "Item " . ($action === 'approve' ? 'aprovado' : 'reprovado') . " com sucesso."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Não foi possível atualizar o status."]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Erro no banco de dados: " . $e->getMessage()]);
        }
    }
}
