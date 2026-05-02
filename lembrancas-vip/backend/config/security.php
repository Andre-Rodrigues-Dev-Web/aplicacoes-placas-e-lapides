<?php

class Security {
    private static $secret = 'LVIP_MASTER_KEY_2026_@#!SECURITY'; // Em produção, usar variável de ambiente

    /**
     * Gera um token JWT
     */
    public static function generateToken($data) {
        $header = json_encode(['alg' => 'HS256', 'typ' => 'JWT']);
        
        // Payload com tempo de expiração (24 horas)
        $payload = json_encode(array_merge($data, [
            'iat' => time(),
            'exp' => time() + (24 * 60 * 60)
        ]));

        $base64UrlHeader = self::base64UrlEncode($header);
        $base64UrlPayload = self::base64UrlEncode($payload);

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, self::$secret, true);
        $base64UrlSignature = self::base64UrlEncode($signature);

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    /**
     * Valida um token JWT
     */
    public static function validateToken($token) {
        $parts = explode('.', $token);
        if (count($parts) !== 3) return false;

        list($header, $payload, $signature) = $parts;

        $validSignature = hash_hmac('sha256', $header . "." . $payload, self::$secret, true);
        $validSignature = self::base64UrlEncode($validSignature);

        if ($signature !== $validSignature) return false;

        $payloadData = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $payload)), true);
        
        // Verificar expiração
        if (isset($payloadData['exp']) && $payloadData['exp'] < time()) {
            return false;
        }

        return $payloadData;
    }

    private static function base64UrlEncode($data) {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
    }

    /**
     * Higieniza dados para prevenir XSS
     */
    public static function validateOwner($requested_id, $auth_user_id) {
        if ($requested_id != $auth_user_id) {
            http_response_code(403);
            echo json_encode([
                "error" => "Access Denied",
                "message" => "Você não tem permissão para acessar este recurso (IDOR Protection)."
            ]);
            exit();
        }
    }

    /**
     * Higieniza dados para prevenir XSS
     */
    public static function sanitize($data) {
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                $data[$key] = self::sanitize($value);
            }
        } else {
            $data = htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
        }
        return $data;
    }

    /**
     * Gera headers de segurança globais
     */
    public static function setSecurityHeaders() {
        header("X-Content-Type-Options: nosniff");
        header("X-Frame-Options: DENY");
        header("X-XSS-Protection: 1; mode=block");
        header("Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';");
    }
}
