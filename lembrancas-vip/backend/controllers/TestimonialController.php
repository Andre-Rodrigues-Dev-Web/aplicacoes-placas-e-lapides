<?php
require_once 'models/Testimonial.php';

class TestimonialController {
    public function handleRequest($id = null, $action = null) {
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {
            case 'GET':
                $this->getTestimonials();
                break;
            default:
                http_response_code(405);
                echo json_encode(["message" => "Método não permitido"]);
                break;
        }
    }

    private function getTestimonials() {
        $model = new Testimonial();
        $data = $model->getAll();
        echo json_encode($data);
    }
}
?>
