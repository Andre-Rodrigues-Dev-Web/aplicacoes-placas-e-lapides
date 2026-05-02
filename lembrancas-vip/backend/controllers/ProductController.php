<?php
require_once 'models/Product.php';

class ProductController {
    public function handleRequest($id = null, $action = null) {
        $method = $_SERVER['REQUEST_METHOD'];

        if ($method === 'GET') {
            if ($id) {
                $this->getProductById($id);
            } else {
                $this->getAllProducts();
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "Method not allowed"]);
        }
    }

    private function getProductById($id) {
        $product = new Product();
        
        // Se for numérico, busca por ID, caso contrário por slug
        if (is_numeric($id)) {
            $result = $product->getOne($id);
        } else {
            $result = $product->getBySlug($id);
        }

        if($result) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Product not found"]);
        }
    }

    private function getAllProducts() {
        $product = new Product();
        $stmt = $product->getAllActive();
        $num = $stmt->rowCount();

        $products_arr = array();

        if($num > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $product_item = array(
                    "id" => $row['id'],
                    "name" => $row['name'],
                    "description" => $row['description'],
                    "price" => $row['price'],
                    "image_url" => $row['image_url'],
                    "badge" => $row['badge'],
                    "slug" => $row['slug'],
                    "icon_type" => $row['icon_type']
                );
                array_push($products_arr, $product_item);
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($products_arr);
        } else {
            http_response_code(200);
            echo json_encode([]);
        }
    }
}
?>
