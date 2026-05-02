<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// --- Segurança Pentest: Headers de Proteção ---
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");
header("X-XSS-Protection: 1; mode=block");
header("Strict-Transport-Security: max-age=31536000; includeSubDomains");
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:;");

// Função para validar autenticação via JWT
function requireAuth($role = null) {
    $headers = apache_request_headers();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : (isset($headers['authorization']) ? $headers['authorization'] : null);

    if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode(["message" => "Acesso não autorizado. Token ausente."]);
        exit();
    }

    $token = $matches[1];
    $userData = Security::validateToken($token);

    if (!$userData) {
        http_response_code(401);
        echo json_encode(["message" => "Token inválido ou expirado."]);
        exit();
    }

    // Se um role específico for exigido (ex: admin)
    if ($role && $userData['role'] !== $role) {
        http_response_code(403);
        echo json_encode(["message" => "Permissão insuficiente para este recurso."]);
        exit();
    }

    // Disponibiliza o usuário para o restante da aplicação
    $GLOBALS['currentUser'] = $userData;
    return $userData;
}

// Resposta para preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- Estratégia de Roteamento Universal ---
// Funciona com ou sem .htaccess, com ou sem index.php na URL.

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', trim($uri, '/'));

// Procura a raiz do backend na URL
$baseIndex = array_search('backend', $segments);

if ($baseIndex === false) {
    http_response_code(404);
    echo json_encode(["message" => "Route base not found"]);
    exit();
}

// Extrai tudo que vem depois de 'backend'
$apiSegments = array_slice($segments, $baseIndex + 1);

// Se a requisição contiver 'index.php', nós o ignoramos
if (!empty($apiSegments) && $apiSegments[0] === 'index.php') {
    array_shift($apiSegments);
}

// O primeiro segmento após backend (ou index.php) é o recurso
$resource = isset($apiSegments[0]) ? $apiSegments[0] : '';
// O segundo segmento é o ID ou ação (ex: register ou slug do memorial)
$id       = isset($apiSegments[1]) ? $apiSegments[1] : null;
// Terceiro segmento é a sub-ação
$action   = isset($apiSegments[2]) ? $apiSegments[2] : null;

require_once 'config/database.php';
require_once 'config/security.php';

// Ativa proteção de headers global
Security::setSecurityHeaders();

switch ($resource) {
    case 'auth':
        require_once 'controllers/AuthController.php';
        $controller = new AuthController();
        $controller->handleRequest($id);
        break;
    case 'memorials':
        require_once 'controllers/MemorialController.php';
        $controller = new MemorialController();
        $controller->handleRequest($id, $action);
        break;
    case 'messages':
        require_once 'controllers/MessageController.php';
        $controller = new MessageController();
        $controller->handleRequest($id, $action);
        break;
    case 'products':
        require_once 'controllers/ProductController.php';
        $controller = new ProductController();
        $controller->handleRequest($id, $action);
        break;
    case 'testimonials':
        require_once 'controllers/TestimonialController.php';
        $controller = new TestimonialController();
        $controller->handleRequest($id, $action);
        break;
    case 'admin':
        requireAuth('admin');
        // Rotas do admin - /admin/dashboard/summary, /admin/customers, etc
        $adminResource = isset($apiSegments[1]) ? $apiSegments[1] : null; // dashboard | customers
        $adminAction   = isset($apiSegments[2]) ? $apiSegments[2] : null; // summary | block | etc
        
        if ($adminResource === 'dashboard') {
            require_once 'controllers/AdminDashboardController.php';
            $controller = new AdminDashboardController();
            $controller->handleRequest(null, $adminAction);
        } elseif ($adminResource === 'customers') {
            require_once 'controllers/AdminCustomerController.php';
            $controller = new AdminCustomerController();
            $customerId     = isset($apiSegments[2]) ? $apiSegments[2] : null;
            $customerAction = isset($apiSegments[3]) ? $apiSegments[3] : null; // block | unblock
            $controller->handleRequest($customerId, $customerAction);
        } elseif ($adminResource === 'products') {
            require_once 'controllers/AdminProductController.php';
            $controller = new AdminProductController();
            $productId     = isset($apiSegments[2]) ? $apiSegments[2] : null;
            $productAction = isset($apiSegments[3]) ? $apiSegments[3] : null; 
            $controller->handleRequest($productId, $productAction);
        } elseif ($adminResource === 'memorials') {
            require_once 'controllers/AdminMemorialController.php';
            $controller = new AdminMemorialController();
            $memorialId     = isset($apiSegments[2]) ? $apiSegments[2] : null;
            $memorialAction = isset($apiSegments[3]) ? $apiSegments[3] : null; 
            $controller->handleRequest($memorialId, $memorialAction);
        } elseif ($adminResource === 'suppliers') {
            require_once 'controllers/AdminSupplierController.php';
            $controller = new AdminSupplierController();
            $supplierId     = isset($apiSegments[2]) ? $apiSegments[2] : null;
            $supplierAction = isset($apiSegments[3]) ? $apiSegments[3] : null; 
            $controller->handleRequest($supplierId, $supplierAction);
        } elseif ($adminResource === 'reports') {
            require_once 'controllers/AdminReportsController.php';
            $controller = new AdminReportsController();
            $reportAction = isset($apiSegments[2]) ? $apiSegments[2] : null; 
            $controller->handleRequest(null, $reportAction);
        } elseif ($adminResource === 'chat') {
            require_once 'controllers/AdminChatController.php';
            $controller = new AdminChatController();
            $chatId     = isset($apiSegments[2]) ? $apiSegments[2] : null;
            $chatAction = isset($apiSegments[3]) ? $apiSegments[3] : null; 
            $controller->handleRequest($chatId, $chatAction);
        } elseif ($adminResource === 'moderation') {
            require_once 'controllers/AdminModerationController.php';
            $controller = new AdminModerationController();
            $itemId     = isset($apiSegments[2]) ? $apiSegments[2] : null;
            $itemAction = isset($apiSegments[3]) ? $apiSegments[3] : null; 
            $controller->handleRequest($itemId, $itemAction);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Admin resource not found", "resource" => $adminResource]);
        }
        break;
    default:
        http_response_code(404);
        echo json_encode([
            "message"  => "Endpoint not found",
            "resource" => $resource,
            "path_info" => $pathInfo,
            "uri"       => $_SERVER['REQUEST_URI']
        ]);
        break;
}
?>
