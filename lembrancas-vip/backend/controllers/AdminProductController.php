<?php
require_once 'models/Product.php';

class AdminProductController {
    public function handleRequest($id = null, $action = null) {
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {
            case 'GET':
                if ($id) {
                    $this->getProduct($id);
                } else {
                    $this->getAllProducts();
                }
                break;
            case 'POST':
                if ($action === 'toggle-status') {
                    $this->toggleStatus($id);
                } else {
                    $this->createProduct();
                }
                break;
            case 'PUT':
                $this->updateProduct($id);
                break;
            case 'DELETE':
                $this->deleteProduct($id);
                break;
            default:
                http_response_code(405);
                echo json_encode(["message" => "Method not allowed"]);
                break;
        }
    }

    private function getAllProducts() {
        $product = new Product();
        $stmt = $product->getAll();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($products);
    }

    private function getProduct($id) {
        // Implement if needed
    }

    private function createProduct() {
        $data = json_decode(file_get_contents("php://input"));
        if (!$data || empty($data->name) || !isset($data->price)) {
            http_response_code(400);
            echo json_encode(["message" => "Dados incompletos."]);
            return;
        }

        $product = new Product();
        $product->name = $data->name;
        $product->description = $data->description ?? '';
        $product->price = $data->price;
        $product->image_url = $data->image_url ?? '';
        $product->badge = $data->badge ?? '';
        $product->icon_type = $data->icon_type ?? 'none';
        $product->status = $data->status ?? 'active';
        $product->cost_price = $data->cost_price ?? 0;
        $product->stock_quantity = $data->stock_quantity ?? 0;
        $product->min_stock = $data->min_stock ?? 0;
        $product->supplier_id = !empty($data->supplier_id) ? $data->supplier_id : null;
        $product->internal_notes = $data->internal_notes ?? '';

        if ($product->create()) {
            http_response_code(201);
            echo json_encode(["message" => "Produto criado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Erro ao criar produto."]);
        }
    }

    private function updateProduct($id) {
        $data = json_decode(file_get_contents("php://input"));
        if (!$id || !$data || empty($data->name)) {
            http_response_code(400);
            echo json_encode(["message" => "Dados inválidos."]);
            return;
        }

        $product = new Product();
        $product->id = $id;
        $product->name = $data->name;
        $product->description = $data->description ?? '';
        $product->price = $data->price;
        $product->image_url = $data->image_url ?? '';
        $product->badge = $data->badge ?? '';
        $product->icon_type = $data->icon_type ?? 'none';
        $product->status = $data->status ?? 'active';
        $product->cost_price = $data->cost_price ?? 0;
        $product->stock_quantity = $data->stock_quantity ?? 0;
        $product->min_stock = $data->min_stock ?? 0;
        $product->supplier_id = !empty($data->supplier_id) ? $data->supplier_id : null;
        $product->internal_notes = $data->internal_notes ?? '';

        if ($product->update()) {
            echo json_encode(["message" => "Produto atualizado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Erro ao atualizar produto."]);
        }
    }

    private function deleteProduct($id) {
        if (!$id) {
            http_response_code(400);
            echo json_encode(["message" => "ID não fornecido."]);
            return;
        }

        $product = new Product();
        if ($product->delete($id)) {
            echo json_encode(["message" => "Produto excluído com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Erro ao excluir produto."]);
        }
    }

    private function toggleStatus($id) {
        $data = json_decode(file_get_contents("php://input"));
        if (!$id || !isset($data->status)) {
            http_response_code(400);
            echo json_encode(["message" => "Dados inválidos."]);
            return;
        }

        $product = new Product();
        if ($product->toggleStatus($id, $data->status)) {
            echo json_encode(["message" => "Status alterado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Erro ao alterar status."]);
        }
    }
}
?>
