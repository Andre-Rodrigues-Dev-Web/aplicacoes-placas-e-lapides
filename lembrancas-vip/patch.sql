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
