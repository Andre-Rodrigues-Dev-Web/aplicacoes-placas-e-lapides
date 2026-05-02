<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=lembrancas_vip', 'root', '');
    $stmt = $pdo->query("DESCRIBE products");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo $row['Field'] . PHP_EOL;
    }
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage() . PHP_EOL;
}
?>
