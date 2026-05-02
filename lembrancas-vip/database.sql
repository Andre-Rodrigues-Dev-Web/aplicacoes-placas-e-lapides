CREATE DATABASE IF NOT EXISTS lembrancas_vip CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE lembrancas_vip;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('admin', 'user') DEFAULT 'user',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS memorials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    birth_date DATE,
    death_date DATE,
    main_photo VARCHAR(255),
    short_description VARCHAR(500),
    biography TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    cemetery VARCHAR(255),
    generation VARCHAR(50) DEFAULT 'outros',
    visibility ENUM('public', 'private') DEFAULT 'public',
    theme VARCHAR(50) DEFAULT 'default',
    status ENUM('active', 'inactive', 'draft') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS timeline_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    memorial_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE,
    media_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (memorial_id) REFERENCES memorials(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS memorial_media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    memorial_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_type ENUM('image', 'video', 'document') DEFAULT 'image',
    caption VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (memorial_id) REFERENCES memorials(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS condolences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    memorial_id INT NOT NULL,
    visitor_name VARCHAR(255) NOT NULL,
    visitor_email VARCHAR(255),
    message TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'approved',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (memorial_id) REFERENCES memorials(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS tributes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    memorial_id INT NOT NULL,
    tribute_type ENUM('candle', 'flower', 'heart') NOT NULL,
    visitor_name VARCHAR(255),
    short_message VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (memorial_id) REFERENCES memorials(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    limits TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO plans (name, price, description, limits) VALUES 
('Gratuito', 0.00, 'Memorial básico, 1 foto, sem timeline', '{"photos":1,"timeline":false}'),
('Premium', 49.90, 'Memorial completo, galeria, timeline, homenagens', '{"photos":50,"timeline":true}');

INSERT INTO users (name, email, password_hash, role) VALUES 
('Admin LembrançasVIP', 'admin@lembrancasvip.com.br', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'); -- senha: password

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    badge VARCHAR(100),
    icon_type VARCHAR(50),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Insert default products
INSERT INTO products (name, description, price, image_url, badge, icon_type) VALUES
('Placa em Porcelana Premium + QR Code', 'Placa resistente ao tempo feita em porcelana italiana. Acompanha QR Code gravado a laser para acesso eterno ao memorial digital.', 299.00, 'https://images.unsplash.com/photo-1596701509377-17b5f5ec2b55?q=80&w=600&auto=format&fit=crop', 'Mais Vendido', 'FaMedal'),
('Lápide Completa em Granito', 'Projeto completo de lápide esculpida em granito escuro, com letreiro em bronze e moldura integrada para placa QR Code.', 1450.00, 'https://images.unsplash.com/photo-1598284534789-53eeb4a82158?q=80&w=600&auto=format&fit=crop', 'Serviço Premium', 'none'),
('Coroa de Flores - Saudade Eterna', 'Coroa elaborada com rosas brancas, lírios e folhagens nobres. Entrega em até 2h em qualquer cemitério parceiro. Acompanha faixa de homenagem.', 350.00, 'https://images.unsplash.com/photo-1563241527-3004b7be2234?q=80&w=600&auto=format&fit=crop', 'Entrega Rápida', 'FaLeaf'),
('Manutenção e Limpeza de Túmulo', 'Serviço trimestral de limpeza profissional da lápide, polimento dos bronzes e substituição de flores artificiais.', 120.00, 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop', 'Assinatura', 'FaMapMarkerAlt');

-- MASTER ADMIN ERP EXTENSION --

ALTER TABLE users 
ADD COLUMN cpf_cnpj VARCHAR(20) NULL AFTER email,
ADD COLUMN address TEXT NULL AFTER phone,
ADD COLUMN city VARCHAR(100) NULL AFTER address,
ADD COLUMN state VARCHAR(50) NULL AFTER city,
ADD COLUMN payment_status ENUM('paid', 'pending', 'overdue') DEFAULT 'paid',
ADD COLUMN payment_date DATE NULL,
ADD COLUMN due_date DATE NULL,
ADD COLUMN plan_id INT NULL,
ADD COLUMN internal_notes TEXT NULL,
ADD COLUMN deleted_at TIMESTAMP NULL,
ADD COLUMN is_active BOOLEAN DEFAULT TRUE;

CREATE TABLE IF NOT EXISTS memorial_visits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    memorial_id INT NOT NULL,
    visitor_ip VARCHAR(45) NULL,
    origin ENUM('qr_code', 'direct_link', 'social_media', 'organic') DEFAULT 'qr_code',
    accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (memorial_id) REFERENCES memorials(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    trade_name VARCHAR(255) NULL,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    state_registration VARCHAR(50) NULL,
    email VARCHAR(255) NULL,
    phone VARCHAR(20) NULL,
    whatsapp VARCHAR(20) NULL,
    contact_person VARCHAR(255) NULL,
    product_service_type VARCHAR(255) NULL,
    address VARCHAR(255) NULL,
    address_number VARCHAR(20) NULL,
    neighborhood VARCHAR(100) NULL,
    city VARCHAR(100) NULL,
    state VARCHAR(50) NULL,
    cep VARCHAR(20) NULL,
    status ENUM('active', 'inactive', 'under_review', 'blocked') DEFAULT 'active',
    internal_notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
) ENGINE=InnoDB;

ALTER TABLE products
ADD COLUMN category_id INT NULL,
ADD COLUMN cost_price DECIMAL(10, 2) NULL,
ADD COLUMN stock_quantity INT DEFAULT 0,
ADD COLUMN min_stock INT DEFAULT 0,
ADD COLUMN supplier_id INT NULL,
ADD COLUMN internal_notes TEXT NULL,
ADD COLUMN deleted_at TIMESTAMP NULL,
ADD FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS product_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'delivered', 'canceled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NULL,
    customer_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) NULL,
    status ENUM('pending', 'approved', 'rejected', 'refunded') DEFAULT 'pending',
    paid_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS stock_movements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    movement_type ENUM('in', 'out', 'adjustment') NOT NULL,
    quantity INT NOT NULL,
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    action VARCHAR(255) NOT NULL,
    table_name VARCHAR(100) NULL,
    record_id INT NULL,
    old_values JSON NULL,
    new_values JSON NULL,
    ip_address VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;
