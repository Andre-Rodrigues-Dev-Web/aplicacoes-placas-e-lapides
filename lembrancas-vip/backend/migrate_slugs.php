<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=lembrancas_vip', 'root', '');
    
    // Adicionar coluna slug se não existir
    $pdo->exec("ALTER TABLE products ADD COLUMN slug VARCHAR(255) UNIQUE AFTER name");
    echo "Column slug added." . PHP_EOL;

    // Função para gerar slug
    function createSlug($text) {
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
        $text = preg_replace('~[^-\w]+~', '', $text);
        $text = trim($text, '-');
        $text = preg_replace('~-+~', '-', $text);
        $text = strtolower($text);
        if (empty($text)) return 'n-a';
        return $text;
    }

    // Popular slugs existentes
    $stmt = $pdo->query("SELECT id, name FROM products");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $slug = createSlug($row['name']);
        // Verificar se já existe para evitar duplicatas (adicionar ID se necessário)
        $pdo->prepare("UPDATE products SET slug = ? WHERE id = ?")->execute([$slug . '-' . $row['id'], $row['id']]);
    }
    echo "Slugs populated." . PHP_EOL;

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . PHP_EOL;
}
?>
