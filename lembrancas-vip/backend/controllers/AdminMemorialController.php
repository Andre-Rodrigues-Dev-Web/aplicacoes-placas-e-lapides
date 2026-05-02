<?php
require_once 'models/Memorial.php';

class AdminMemorialController {
    private $db;
    private $memorial;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->memorial = new Memorial($this->db);
    }

    public function handleRequest($id = null, $action = null) {
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {
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
            case 'PUT':
                if ($action === 'logistics') {
                    $this->updateLogistics($id);
                } else {
                    $this->update($id);
                }
                break;
            case 'DELETE':
                $this->delete($id);
                break;
            default:
                http_response_code(405);
                echo json_encode(["message" => "Method not allowed"]);
                break;
        }
    }

    private function getAll() {
        $stmt = $this->memorial->readAllAdmin();
        $memorials = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($memorials);
    }

    private function getOne($id) {
        // Implement if needed for edit
    }

    private function create() {
        $data = json_decode(file_get_contents("php://input"));
        if (!$data || empty($data->full_name) || empty($data->user_id)) {
            http_response_code(400);
            echo json_encode(["message" => "Dados incompletos. Nome e Cliente são obrigatórios."]);
            return;
        }

        $this->memorial->user_id = $data->user_id;
        $this->memorial->full_name = $data->full_name;
        $this->memorial->slug = $data->slug ?? $this->createSlug($data->full_name);
        $this->memorial->birth_date = $data->birth_date ?? null;
        $this->memorial->death_date = $data->death_date ?? null;
        $this->memorial->main_photo = $data->main_photo ?? null;
        $this->memorial->short_description = $data->short_description ?? '';
        $this->memorial->biography = $data->biography ?? '';
        $this->memorial->city = $data->city ?? '';
        $this->memorial->state = $data->state ?? '';
        $this->memorial->cemetery = $data->cemetery ?? '';
        $this->memorial->generation = $data->generation ?? 'outros';
        $this->memorial->visibility = $data->visibility ?? 'public';
        $this->memorial->status = $data->status ?? 'active';

        $memorialId = $this->memorial->create();
        if ($memorialId) {
            http_response_code(201);
            echo json_encode(["message" => "Memorial criado com sucesso.", "id" => $memorialId]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Erro ao criar memorial."]);
        }
    }

    private function update($id) {
        $data = json_decode(file_get_contents("php://input"));
        if (!$id || !$data || empty($data->full_name)) {
            http_response_code(400);
            echo json_encode(["message" => "Dados inválidos."]);
            return;
        }

        $this->memorial->id = $id;
        $this->memorial->full_name = $data->full_name;
        $this->memorial->birth_date = $data->birth_date ?? null;
        $this->memorial->death_date = $data->death_date ?? null;
        $this->memorial->main_photo = $data->main_photo ?? null;
        $this->memorial->short_description = $data->short_description ?? '';
        $this->memorial->biography = $data->biography ?? '';
        $this->memorial->city = $data->city ?? '';
        $this->memorial->state = $data->state ?? '';
        $this->memorial->cemetery = $data->cemetery ?? '';
        $this->memorial->generation = $data->generation ?? 'outros';
        $this->memorial->visibility = $data->visibility ?? 'public';
        $this->memorial->status = $data->status ?? 'active';

        if ($this->memorial->update()) {
            echo json_encode(["message" => "Memorial atualizado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Erro ao atualizar memorial."]);
        }
    }

    private function delete($id) {
        if (!$id) {
            http_response_code(400);
            echo json_encode(["message" => "ID não fornecido."]);
            return;
        }

        if ($this->memorial->delete($id)) {
            echo json_encode(["message" => "Memorial excluído com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Erro ao excluir memorial."]);
        }
    }

    private function updateLogistics($id) {
        $data = json_decode(file_get_contents("php://input"));
        if (!$id || !$data) {
            http_response_code(400);
            echo json_encode(["message" => "Dados inválidos para logística."]);
            return;
        }

        $this->memorial->id = $id;
        $this->memorial->production_status = $data->production_status ?? 'pending';
        $this->memorial->tracking_code = $data->tracking_code ?? null;
        $this->memorial->shipping_date = $data->shipping_date ?? null;

        if ($this->memorial->updateLogistics()) {
            echo json_encode(["message" => "Informações logísticas atualizadas com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Erro ao atualizar informações logísticas."]);
        }
    }

    private function createSlug($text) {
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
        $text = preg_replace('~[^-\w]+~', '', $text);
        $text = trim($text, '-');
        $text = preg_replace('~-+~', '-', $text);
        $text = strtolower($text);
        return $text . '-' . rand(1000, 9999);
    }
}
?>
