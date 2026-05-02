<?php
class Memorial {
    private $conn;
    private $table_name = "memorials";

    public $id;
    public $user_id;
    public $full_name;
    public $slug;
    public $birth_date;
    public $death_date;
    public $main_photo;
    public $short_description;
    public $biography;
    public $city;
    public $state;
    public $cemetery;
    public $generation;
    public $visibility;
    public $theme;
    public $status;
    public $production_status;
    public $tracking_code;
    public $shipping_date;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function readAll() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE status = 'active' AND visibility = 'public' ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readByUser($user_id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE user_id = ? AND status != 'inactive' ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$user_id]);
        return $stmt;
    }

    public function readAllAdmin() {
        $query = "SELECT m.*, u.name as owner_name, u.email as owner_email 
                  FROM " . $this->table_name . " m 
                  LEFT JOIN users u ON m.user_id = u.id 
                  WHERE m.status != 'inactive' 
                  ORDER BY m.created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE slug = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->slug);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET user_id=:user_id, full_name=:full_name, slug=:slug, birth_date=:birth_date, 
                  death_date=:death_date, main_photo=:main_photo, short_description=:short_description, biography=:biography, 
                  city=:city, state=:state, cemetery=:cemetery, generation=:generation, visibility=:visibility, status=:status";
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":full_name", $this->full_name);
        $stmt->bindParam(":slug", $this->slug);
        $stmt->bindParam(":birth_date", $this->birth_date);
        $stmt->bindParam(":death_date", $this->death_date);
        $stmt->bindParam(":main_photo", $this->main_photo);
        $stmt->bindParam(":short_description", $this->short_description);
        $stmt->bindParam(":biography", $this->biography);
        $stmt->bindParam(":city", $this->city);
        $stmt->bindParam(":state", $this->state);
        $stmt->bindParam(":cemetery", $this->cemetery);
        $stmt->bindParam(":generation", $this->generation);
        $stmt->bindParam(":visibility", $this->visibility);
        $stmt->bindParam(":status", $this->status);

        if($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " SET 
                    full_name=:full_name, birth_date=:birth_date, death_date=:death_date, 
                    main_photo=:main_photo, short_description=:short_description, biography=:biography, 
                    city=:city, state=:state, cemetery=:cemetery, generation=:generation, 
                    visibility=:visibility, status=:status 
                  WHERE id=:id";
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":full_name", $this->full_name);
        $stmt->bindParam(":birth_date", $this->birth_date);
        $stmt->bindParam(":death_date", $this->death_date);
        $stmt->bindParam(":main_photo", $this->main_photo);
        $stmt->bindParam(":short_description", $this->short_description);
        $stmt->bindParam(":biography", $this->biography);
        $stmt->bindParam(":city", $this->city);
        $stmt->bindParam(":state", $this->state);
        $stmt->bindParam(":cemetery", $this->cemetery);
        $stmt->bindParam(":generation", $this->generation);
        $stmt->bindParam(":visibility", $this->visibility);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }

    public function updateLogistics() {
        $query = "UPDATE " . $this->table_name . " SET 
                    production_status=:production_status, 
                    tracking_code=:tracking_code, 
                    shipping_date=:shipping_date 
                  WHERE id=:id";
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":production_status", $this->production_status);
        $stmt->bindParam(":tracking_code", $this->tracking_code);
        $stmt->bindParam(":shipping_date", $this->shipping_date);
        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }

    public function delete($id) {
        $query = "UPDATE " . $this->table_name . " SET status = 'inactive' WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
?>
