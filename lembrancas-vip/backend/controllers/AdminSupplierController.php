<?php
require_once 'models/Supplier.php';

class AdminSupplierController {
    public function handleRequest($id = null, $action = null) {
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {
            case 'GET':
                $this->getAllSuppliers();
                break;
            case 'POST':
                $this->createSupplier();
                break;
            case 'PUT':
                $this->updateSupplier($id);
                break;
            case 'DELETE':
                $this->deleteSupplier($id);
                break;
            default:
                http_response_code(405);
                echo json_encode(["message" => "Method not allowed"]);
                break;
        }
    }

    private function getAllSuppliers() {
        $supplier = new Supplier();
        $stmt = $supplier->getAll();
        $suppliers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($suppliers);
    }

    private function createSupplier() {
        $data = json_decode(file_get_contents("php://input"));
        if (!$data || empty($data->company_name) || empty($data->cnpj)) {
            http_response_code(400);
            echo json_encode(["message" => "Dados incompletos."]);
            return;
        }

        $supplier = new Supplier();
        $supplier->company_name = $data->company_name;
        $supplier->trade_name = $data->trade_name ?? '';
        $supplier->cnpj = $data->cnpj;
        $supplier->email = $data->email ?? '';
        $supplier->phone = $data->phone ?? '';
        $supplier->whatsapp = $data->whatsapp ?? '';
        $supplier->contact_person = $data->contact_person ?? '';
        $supplier->product_service_type = $data->product_service_type ?? '';
        $supplier->address = $data->address ?? '';
        $supplier->city = $data->city ?? '';
        $supplier->state = $data->state ?? '';
        $supplier->status = $data->status ?? 'active';
        $supplier->internal_notes = $data->internal_notes ?? '';

        if ($supplier->create()) {
            http_response_code(201);
            echo json_encode(["message" => "Fornecedor criado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Erro ao criar fornecedor."]);
        }
    }

    private function updateSupplier($id) {
        $data = json_decode(file_get_contents("php://input"));
        if (!$id || !$data || empty($data->company_name)) {
            http_response_code(400);
            echo json_encode(["message" => "Dados inválidos."]);
            return;
        }

        $supplier = new Supplier();
        $supplier->id = $id;
        $supplier->company_name = $data->company_name;
        $supplier->trade_name = $data->trade_name ?? '';
        $supplier->cnpj = $data->cnpj;
        $supplier->email = $data->email ?? '';
        $supplier->phone = $data->phone ?? '';
        $supplier->whatsapp = $data->whatsapp ?? '';
        $supplier->contact_person = $data->contact_person ?? '';
        $supplier->product_service_type = $data->product_service_type ?? '';
        $supplier->address = $data->address ?? '';
        $supplier->city = $data->city ?? '';
        $supplier->state = $data->state ?? '';
        $supplier->status = $data->status ?? 'active';
        $supplier->internal_notes = $data->internal_notes ?? '';

        if ($supplier->update()) {
            echo json_encode(["message" => "Fornecedor atualizado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Erro ao atualizar fornecedor."]);
        }
    }

    private function deleteSupplier($id) {
        if (!$id) {
            http_response_code(400);
            echo json_encode(["message" => "ID não fornecido."]);
            return;
        }

        $supplier = new Supplier();
        if ($supplier->delete($id)) {
            echo json_encode(["message" => "Fornecedor removido com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Erro ao remover fornecedor."]);
        }
    }
}
?>
