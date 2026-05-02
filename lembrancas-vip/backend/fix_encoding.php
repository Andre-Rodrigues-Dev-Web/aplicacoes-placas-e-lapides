<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=lembrancas_vip;charset=utf8mb4', 'root', '');
    $pdo->exec("UPDATE products SET name = 'Lápide Completa em Granito' WHERE name LIKE 'L%pide%'");
    $pdo->exec("UPDATE products SET name = 'Manutenção e Limpeza de Túmulo' WHERE name LIKE 'Manuten%'");
    echo 'Encoding fixed successfully' . PHP_EOL;
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . PHP_EOL;
}
?>
