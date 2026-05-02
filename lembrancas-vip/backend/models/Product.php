<?php
require_once 'config/database.php';

class Product {
    private $conn;
    private $table_name = "products";

    public $id;
    public $name;
    public $description;
    public $price;
    public $image_url;
    public $badge;
    public $icon_type;
    public $slug;
    public $status;
    public $category_id;
    public $cost_price;
    public $stock_quantity;
    public $min_stock;
    public $supplier_id;
    public $internal_notes;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function getAllActive() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE status = 'active' AND deleted_at IS NULL ORDER BY id ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getAll() {
        $query = "SELECT p.*, s.company_name as supplier_name 
                  FROM " . $this->table_name . " p 
                  LEFT JOIN suppliers s ON p.supplier_id = s.id 
                  WHERE p.deleted_at IS NULL 
                  ORDER BY p.id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                (name, description, price, image_url, badge, icon_type, status, cost_price, stock_quantity, min_stock, supplier_id, internal_notes) 
                VALUES 
                (:name, :description, :price, :image_url, :badge, :icon_type, :status, :cost_price, :stock_quantity, :min_stock, :supplier_id, :internal_notes)";
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':image_url', $this->image_url);
        $stmt->bindParam(':badge', $this->badge);
        $stmt->bindParam(':icon_type', $this->icon_type);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':cost_price', $this->cost_price);
        $stmt->bindParam(':stock_quantity', $this->stock_quantity);
        $stmt->bindParam(':min_stock', $this->min_stock);
        $stmt->bindParam(':supplier_id', $this->supplier_id);
        $stmt->bindParam(':internal_notes', $this->internal_notes);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " SET 
                    name = :name,
                    description = :description,
                    price = :price,
                    image_url = :image_url,
                    badge = :badge,
                    icon_type = :icon_type,
                    status = :status,
                    cost_price = :cost_price,
                    stock_quantity = :stock_quantity,
                    min_stock = :min_stock,
                    supplier_id = :supplier_id,
                    internal_notes = :internal_notes
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':image_url', $this->image_url);
        $stmt->bindParam(':badge', $this->badge);
        $stmt->bindParam(':icon_type', $this->icon_type);
        $stmt->bindParam(':status', $this->status);
        $stmt->bindParam(':cost_price', $this->cost_price);
        $stmt->bindParam(':stock_quantity', $this->stock_quantity);
        $stmt->bindParam(':min_stock', $this->min_stock);
        $stmt->bindParam(':supplier_id', $this->supplier_id);
        $stmt->bindParam(':internal_notes', $this->internal_notes);
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete($id) {
        $query = "UPDATE " . $this->table_name . " SET deleted_at = NOW() WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    public function toggleStatus($id, $status) {
        $query = "UPDATE " . $this->table_name . " SET status = :status WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':status', $status);
        return $stmt->execute();
    }

    public function getOne($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = :id AND deleted_at IS NULL LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getBySlug($slug) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE slug = :slug AND deleted_at IS NULL LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':slug', $slug);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
