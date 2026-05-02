import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Messages from '../pages/Messages';
import Settings from '../pages/Settings';
import CreateMemorial from '../pages/CreateMemorial';
import MemorialsList from '../pages/MemorialsList';
import MemorialPage from '../pages/MemorialPage';
import Shop from '../pages/Shop';
import CustomerList from '../pages/admin/CustomerList';
import SupplierList from '../pages/admin/SupplierList';
import Reports from '../pages/admin/Reports';
import Moderation from '../pages/admin/Moderation';
import Logistics from '../pages/admin/Logistics';
import Explore from '../pages/Explore';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import Cookies from '../pages/Cookies';
import Rights from '../pages/Rights';
import Contact from '../pages/Contact';
import ProductDetails from '../pages/ProductDetails';
import HelpCenter from '../pages/HelpCenter';
import HowItWorks from '../pages/HowItWorks';
import FAQ from '../pages/FAQ';
import { useAuth } from '../contexts/AuthContext';
import AdminLayout from '../components/AdminLayout';
import PublicLayout from '../components/PublicLayout';

// Rota protegida: redireciona para /entrar se não autenticado
const PrivateRoute = ({ children }) => {
    const { signed, loading } = useAuth();
    if (loading) return <div>Carregando...</div>;
    return signed ? children : <Navigate to="/entrar" />;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Rotas Públicas com Footer e LGPD */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/entrar" element={<Login />} />
                <Route path="/cadastrar" element={<Register />} />
                <Route path="/loja" element={<Shop />} />
                <Route path="/loja/item/:slug" element={<ProductDetails />} />
                <Route path="/explorar" element={<Explore />} />
                <Route path="/termos" element={<Terms />} />
                <Route path="/privacidade" element={<Privacy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/direitos" element={<Rights />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="/central-de-ajuda" element={<HelpCenter />} />
                <Route path="/como-funciona" element={<HowItWorks />} />
                <Route path="/faq" element={<FAQ />} />
            </Route>

            {/* Dashboard usando AdminLayout com Sidebar */}
            <Route element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
                <Route path="/painel" element={<Dashboard />} />
                <Route path="/painel/meus-memoriais" element={<MemorialsList />} />
                <Route path="/painel/mensagens" element={<Messages />} />
                <Route path="/painel/loja" element={<Shop />} />
                <Route path="/painel/clientes" element={<CustomerList />} />
                <Route path="/painel/fornecedores" element={<SupplierList />} />
                <Route path="/painel/relatorios" element={<Reports />} />
                <Route path="/painel/moderacao" element={<Moderation />} />
                <Route path="/painel/logistica" element={<Logistics />} />
                <Route path="/painel/configuracoes" element={<Settings />} />
            </Route>

            {/* Rotas de Memorial (fora do layout sidebar) */}
            <Route path="/memorial/criar" element={<PrivateRoute><CreateMemorial /></PrivateRoute>} />
            <Route path="/memorial/:slug" element={<MemorialPage />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
