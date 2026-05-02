<?php
require_once 'models/User.php';

class AuthController {
    private $db;
    private $user;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->user = new User($this->db);
    }

    public function handleRequest($action) {
        $method = $_SERVER['REQUEST_METHOD'];
        
        if ($method === 'POST') {
            $data = json_decode(file_get_contents("php://input"));
            
            if ($action === 'login') {
                $this->login($data);
            } elseif ($action === 'register') {
                $this->register($data);
            } elseif ($action === 'update_profile') {
                $this->updateProfile($data);
            } elseif ($action === 'update_password') {
                $this->updatePassword($data);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Auth action not found"]);
            }
        } else {
            http_response_code(405);
            echo json_encode(["message" => "Method not allowed"]);
        }
    }

    private function login($data) {
        if (!empty($data->email) && !empty($data->password)) {
            $this->user->email = $data->email;
            $stmt = $this->user->findByEmail();
            $userRow = $stmt->fetch();

            if ($userRow && password_verify($data->password, $userRow['password_hash'])) {
                // Gerar Token JWT
                $tokenData = [
                    "id" => $userRow['id'],
                    "name" => $userRow['name'],
                    "email" => $userRow['email'],
                    "role" => $userRow['role']
                ];
                $token = Security::generateToken($tokenData);

                http_response_code(200);
                echo json_encode([
                    "message" => "Login successful",
                    "token" => $token,
                    "user" => $tokenData
                ]);
            } else {
                http_response_code(401);
                echo json_encode(["message" => "Invalid credentials."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Incomplete data."]);
        }
    }

    private function register($data) {
        if (!empty($data->name) && !empty($data->email) && !empty($data->password)) {
            $this->user->name = htmlspecialchars(strip_tags($data->name));
            $this->user->email = htmlspecialchars(strip_tags($data->email));
            $this->user->password_hash = password_hash($data->password, PASSWORD_BCRYPT);
            $this->user->phone = isset($data->phone) ? htmlspecialchars(strip_tags($data->phone)) : null;

            if ($this->user->create()) {
                http_response_code(201);
                echo json_encode(["message" => "User created successfully."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Unable to create user. Email may exist."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Incomplete data."]);
        }
    }

    private function updateProfile($data) {
        if (!empty($data->id) && !empty($data->name) && !empty($data->email)) {
            $this->user->id = $data->id;
            $this->user->name = htmlspecialchars(strip_tags($data->name));
            $this->user->email = htmlspecialchars(strip_tags($data->email));
            
            if ($this->user->updateProfile()) {
                http_response_code(200);
                echo json_encode([
                    "message" => "Profile updated successfully.",
                    "user" => [
                        "id" => $this->user->id,
                        "name" => $this->user->name,
                        "email" => $this->user->email
                    ]
                ]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Unable to update profile. Email might be in use."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Incomplete data."]);
        }
    }

    private function updatePassword($data) {
        if (!empty($data->id) && !empty($data->current_password) && !empty($data->new_password)) {
            $this->user->id = $data->id;
            $stmt = $this->user->findById();
            $userRow = $stmt->fetch();

            if ($userRow && password_verify($data->current_password, $userRow['password_hash'])) {
                $this->user->password_hash = password_hash($data->new_password, PASSWORD_BCRYPT);
                if ($this->user->updatePassword()) {
                    http_response_code(200);
                    echo json_encode(["message" => "Password updated successfully."]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "Unable to update password."]);
                }
            } else {
                http_response_code(401);
                echo json_encode(["message" => "Current password is incorrect."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Incomplete data."]);
        }
    }
}
?>
