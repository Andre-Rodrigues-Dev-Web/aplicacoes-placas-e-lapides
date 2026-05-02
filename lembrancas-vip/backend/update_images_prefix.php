<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=lembrancas_vip', 'root', '');
    $pdo->exec("UPDATE products SET image_url = 'uploads/porcelain_plaque.png' WHERE name LIKE '%Porcelana%'");
    $pdo->exec("UPDATE products SET image_url = 'uploads/stainless_steel.png' WHERE name LIKE '%Aço%'");
    $pdo->exec("UPDATE products SET image_url = 'uploads/bronze_plaque.png' WHERE name LIKE '%Bronze%'");
    echo 'Updated successfully' . PHP_EOL;
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . PHP_EOL;
}
?>
