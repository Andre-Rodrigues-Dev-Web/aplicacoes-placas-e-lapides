<?php
require_once 'config/database.php';

class Testimonial {
    private $db;

    public function __construct() {
        $this->db = (new Database())->getConnection();
        $this->createTableIfNotExists();
    }

    private function createTableIfNotExists() {
        $sql = "CREATE TABLE IF NOT EXISTS testimonials (
            id INT AUTO_INCREMENT PRIMARY KEY,
            initials VARCHAR(10) NOT NULL,
            name VARCHAR(255) NOT NULL,
            text TEXT NOT NULL,
            rating INT DEFAULT 5,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
        
        $this->db->exec($sql);
        
        // Inserir alguns dados iniciais se estiver vazia
        $check = $this->db->query("SELECT COUNT(*) FROM testimonials")->fetchColumn();
        if ($check == 0) {
            $this->seed();
        }
    }

    private function seed() {
        $data = [
            ['MS', 'Maria Silva', 'Excelente qualidade da porcelana e o sistema do memorial digital é emocionante. Toda a família adorou poder ver as fotos na hora.', 5],
            ['JR', 'João Ricardo', 'A placa de aço inox ficou perfeita no túmulo do meu pai. O QR Code funciona super bem e é muito fácil de configurar.', 5],
            ['AP', 'Ana Paula', 'O atendimento foi muito atencioso. Me ajudaram a escolher a melhor foto e a montagem do memorial ficou linda.', 5],
            ['RC', 'Ricardo Costa', 'Inovação necessária. Poder contar a história de quem amamos através de vídeos e fotos é um presente para as próximas gerações.', 5],
            ['FL', 'Fernanda Lima', 'Comprei o kit completo e superou as expectativas. A durabilidade é real, já passou por chuva e sol e continua impecável.', 5]
        ];

        $stmt = $this->db->prepare("INSERT INTO testimonials (initials, name, text, rating) VALUES (?, ?, ?, ?)");
        foreach ($data as $row) {
            $stmt->execute($row);
        }
    }

    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM testimonials ORDER BY created_at DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
