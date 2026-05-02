<?php
require_once 'config/database.php';

class AdminCustomerController {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function handleRequest($id = null, $action = null) {
        $method = $_SERVER['REQUEST_METHOD'];

        if ($method === 'GET') {
            if ($id) {
                $this->getCustomer($id);
            } else {
                $this->getAllCustomers();
            }
        } elseif ($method === 'POST') {
            if ($id && $action === 'block') {
                $this->toggleBlockCustomer($id, true);
            } elseif ($id && $action === 'unblock') {
                $this->toggleBlockCustomer($id, false);
            } else {
                $this->createCustomer();
            }
        } elseif ($method === 'PUT') {
            $this->updateCustomer($id);
        } elseif ($method === 'DELETE') {
            $this->deleteCustomer($id);
        } else {
            http_response_code(405);
            echo json_encode(["message" => "Method not allowed"]);
        }
    }

    private function getAllCustomers() {
        // Fetch all customers where role is user
        $query = "
            SELECT 
                u.id, u.name, u.email, u.phone, u.cpf_cnpj, u.payment_status, u.is_active, u.created_at,
                (SELECT COUNT(*) FROM memorials m WHERE m.user_id = u.id) as total_memorials
            FROM users u
            WHERE u.role = 'user' AND u.deleted_at IS NULL
            ORDER BY u.created_at DESC
        ";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $customers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($customers);
    }

    private function getCustomer($id) {
        $query = "SELECT id, name, email, phone, cpf_cnpj, address, city, state, payment_status, payment_date, due_date, plan_id, internal_notes, is_active FROM users WHERE id = :id AND role = 'user' AND deleted_at IS NULL";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        $customer = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($customer) {
            echo json_encode($customer);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Customer not found."]);
        }
    }

    private function createCustomer() {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!empty($data->name) && !empty($data->email) && !empty($data->password)) {
            $query = "INSERT INTO users (name, email, password_hash, phone, cpf_cnpj, role) VALUES (:name, :email, :password, :phone, :cpf_cnpj, 'user')";
            $stmt = $this->conn->prepare($query);
            
            $password_hash = password_hash($data->password, PASSWORD_BCRYPT);
            
            $stmt->bindParam(":name", $data->name);
            $stmt->bindParam(":email", $data->email);
            $stmt->bindParam(":password", $password_hash);
            $stmt->bindParam(":phone", $data->phone);
            $stmt->bindParam(":cpf_cnpj", $data->cpf_cnpj);
            
            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Customer created successfully."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Unable to create customer."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Incomplete data."]);
        }
    }

    private function updateCustomer($id) {
        $data = json_decode(file_get_contents("php://input"));
        
        $query = "UPDATE users SET name = :name, email = :email, phone = :phone, payment_status = :payment_status WHERE id = :id AND role = 'user'";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":email", $data->email);
        $stmt->bindParam(":phone", $data->phone);
        $stmt->bindParam(":payment_status", $data->payment_status);
        $stmt->bindParam(":id", $id);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Customer updated."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to update customer."]);
        }
    }

    private function deleteCustomer($id) {
        // Soft delete
        $query = "UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = :id AND role = 'user'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Customer deleted."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to delete customer."]);
        }
    }

    private function toggleBlockCustomer($id, $block) {
        $isActive = $block ? 0 : 1;
        $query = "UPDATE users SET is_active = :is_active WHERE id = :id AND role = 'user'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":is_active", $isActive, PDO::PARAM_INT);
        $stmt->bindParam(":id", $id);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Customer status updated."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to update customer status."]);
        }
    }
}
?>
