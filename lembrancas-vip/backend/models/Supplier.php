<?php
require_once 'config/database.php';

class Supplier {
    private $conn;
    private $table_name = "suppliers";

    public $id;
    public $company_name;
    public $trade_name;
    public $cnpj;
    public $email;
    public $phone;
    public $whatsapp;
    public $contact_person;
    public $product_service_type;
    public $address;
    public $city;
    public $state;
    public $status;
    public $internal_notes;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function getAll() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE deleted_at IS NULL ORDER BY company_name ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  (company_name, trade_name, cnpj, email, phone, whatsapp, contact_person, product_service_type, address, city, state, status, internal_notes) 
                  VALUES 
                  (:company_name, :trade_name, :cnpj, :email, :phone, :whatsapp, :contact_person, :product_service_type, :address, :city, :state, :status, :internal_notes)";
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':company_name', $this->company_name);
        $stmt->bindParam(':trade_name', $this->trade_name);
        $stmt->bindParam(':cnpj', $this->cnpj);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':phone', $this->phone);
        $stmt->bindParam(':whatsapp', $this->whatsapp);
        $stmt->bindParam(':contact_person', $this->contact_person);
        $stmt->bindParam(':product_service_type', $this->product_service_type);
        $stmt->bindParam(':address', $this->address);
        $stmt->bindParam(':city', $this->city);
        $stmt->bindParam(':state', $this->state);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':internal_notes', $this->internal_notes);

        return $stmt->execute();
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " SET 
                    company_name = :company_name,
                    trade_name = :trade_name,
                    cnpj = :cnpj,
                    email = :email,
                    phone = :phone,
                    whatsapp = :whatsapp,
                    contact_person = :contact_person,
                    product_service_type = :product_service_type,
                    address = :address,
                    city = :city,
                    state = :state,
                    status = :status,
                    internal_notes = :internal_notes
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':company_name', $this->company_name);
        $stmt->bindParam(':trade_name', $this->trade_name);
        $stmt->bindParam(':cnpj', $this->cnpj);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':phone', $this->phone);
        $stmt->bindParam(':whatsapp', $this->whatsapp);
        $stmt->bindParam(':contact_person', $this->contact_person);
        $stmt->bindParam(':product_service_type', $this->product_service_type);
        $stmt->bindParam(':address', $this->address);
        $stmt->bindParam(':city', $this->city);
        $stmt->bindParam(':state', $this->state);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':internal_notes', $this->internal_notes);
        $stmt->bindParam(':id', $this->id);

        return $stmt->execute();
    }

    public function delete($id) {
        $query = "UPDATE " . $this->table_name . " SET deleted_at = NOW() WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
?>
