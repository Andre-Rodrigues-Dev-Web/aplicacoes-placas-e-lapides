-- Tabelas para o Módulo de Atendimento Comercial LembrançasVIP

CREATE TABLE IF NOT EXISTS `chat_conversations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `customer_id` INT NOT NULL,
  `admin_id` INT DEFAULT NULL,
  `status` ENUM('new', 'waiting', 'active', 'finished', 'reopened') DEFAULT 'new',
  `subject` VARCHAR(255) DEFAULT NULL,
  `last_message` TEXT DEFAULT NULL,
  `last_message_at` DATETIME DEFAULT NULL,
  `unread_count_admin` INT DEFAULT 0,
  `unread_count_customer` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `closed_at` DATETIME DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `chat_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `conversation_id` INT NOT NULL,
  `sender_id` INT NOT NULL,
  `sender_type` ENUM('customer', 'admin', 'system') NOT NULL,
  `message` TEXT NOT NULL,
  `message_type` ENUM('text', 'image', 'option', 'system') DEFAULT 'text',
  `is_read` BOOLEAN DEFAULT FALSE,
  `read_at` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`conversation_id`) REFERENCES `chat_conversations`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `user_presence` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `status` ENUM('online', 'offline', 'away') DEFAULT 'offline',
  `last_activity_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `predefined_chat_options` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `response_message` TEXT,
  `status` BOOLEAN DEFAULT TRUE,
  `sort_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserindo opções pré-definidas padrão
INSERT INTO `predefined_chat_options` (`title`, `response_message`, `sort_order`) VALUES 
('Quero criar um memorial', 'Ótima escolha! Para criar um memorial, você precisará dos dados da pessoa homenageada e uma foto. Qual o nome completo dela?', 1),
('Quero saber sobre planos e valores', 'Temos planos que se adaptam à sua necessidade, desde homenagens simples até memoriais completos com galeria de fotos e vídeos. Qual plano mais te interessa?', 2),
('Preciso de ajuda com meu QR Code', 'Sem problemas! Se o seu QR Code não está lendo, verifique se há sujeira na placa ou se a iluminação está adequada. Se persistir, nossa equipe vai te ajudar agora mesmo.', 3),
('Quero falar com o comercial', 'Um de nossos consultores comerciais já foi notificado e entrará em contato em instantes.', 4),
('Tenho dúvidas sobre mensagens e homenagens', 'As mensagens de carinho podem ser moderadas por você. Você gostaria de saber como aprovar as mensagens recebidas?', 5),
('Outro assunto', 'Por favor, descreva brevemente sua dúvida para que possamos direcionar ao especialista correto.', 6);
