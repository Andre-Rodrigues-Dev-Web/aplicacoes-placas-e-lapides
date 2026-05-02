# LembrançasVIP — Memorial Online

Um sistema completo, respeitoso e premium para a criação e gestão de memoriais digitais.

## Requisitos
- XAMPP (PHP 8+, MySQL)
- Node.js (v16+ recomendado)
- Composer (opcional para futuras expansões)

## 🗄️ Backend (PHP + MySQL)

1. Inicie o Apache e o MySQL pelo painel do XAMPP.
2. Abra o phpMyAdmin (`http://localhost/phpmyadmin`).
3. Importe o arquivo `database.sql` (localizado na raiz do projeto) para criar o banco de dados `lembrancas_vip` e todas as suas tabelas. O script já insere um usuário Admin (`admin@lembrancasvip.com.br` / `password`).
4. Verifique as configurações de conexão no arquivo `backend/config/database.php` (usuário padrão: `root` e sem senha).

## 🎨 Frontend (React + Vite)

1. Abra o terminal e navegue até a pasta `frontend`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse o front-end pela URL que aparecerá no terminal (geralmente `http://localhost:5173`).

## ⚠️ Configurações de API (CORS e URL Base)

Caso o XAMPP não esteja rodando na porta 80 ou a pasta do projeto seja diferente, lembre-se de atualizar a `baseURL` do axios no arquivo `frontend/src/api/axios.js`:

```javascript
baseURL: 'http://localhost/aplicacoes-placas-e-lapides/lembrancas-vip/backend'
```

*Nota:* Foi configurado um header dinâmico no `index.php` para evitar problemas de CORS no ambiente de desenvolvimento local.
