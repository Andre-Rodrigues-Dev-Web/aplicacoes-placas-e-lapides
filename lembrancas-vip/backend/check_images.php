<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=lembrancas_vip', 'root', '');
    $stmt = $pdo->query('SELECT name, image_url FROM products LIMIT 5');
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo $row['name'] . ': ' . $row['image_url'] . PHP_EOL;
    }
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
?>
