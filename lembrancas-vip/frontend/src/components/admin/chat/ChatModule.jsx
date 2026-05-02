import { useAuth } from '../../../contexts/AuthContext';
import React, { useState, useEffect, useRef } from 'react';
import api from '../../../api/axios';
import { 
  FaChevronRight, 
  FaCommentAlt, 
  FaSearch, 
  FaUserCircle, 
  FaTimes, 
  FaPaperPlane 
} from 'react-icons/fa';


import {
  fadeIn,
  SidebarContainer,
  SidebarHeader,
  SearchBox,
  FilterContainer,
  FilterBadge,
  CustomerList,
  CustomerItem,
  AvatarWrapper,
  StatusIndicator,
  CustomerInfo,
  CustomerName,
  mapChatStatusToType,
  LastMessage,
  UnreadBadge,
  ChatWindowContainer,
  ChatHeader,
  MessageList,
  MessageBubble,
  TimeStamp,
  ChatInputContainer,
  ChatInput,
  SendButton,
  ToggleButton
} from './ChatModule.styles';
import Badge from '../shared/Badge';

const ChatModule = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  const pollingRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!user) return;

    fetchConversations();
    // Iniciar presença
    updatePresence('online');

    // Polling a cada 5 segundos
    pollingRef.current = setInterval(() => {
      if (!user) return;
      fetchConversations();
      if (activeConversation) {
        fetchMessages(activeConversation.id);
      }
    }, 5000);

    return () => {
      clearInterval(pollingRef.current);
      if (user) updatePresence('offline');
    };
  }, [activeConversation, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversations = async () => {
    if (!user) return;
    try {
      const response = await api.get('/admin/chat/conversations');
      if (Array.isArray(response.data)) {
        setConversations(response.data);
      } else {
        console.warn("API de chat não retornou um array:", response.data);
        setConversations([]);
      }
    } catch (err) {
      console.error("Erro ao buscar conversas", err);
      setConversations([]);
    }
  };

  const fetchMessages = async (convId) => {
    try {
      const response = await api.get(`/admin/chat/${convId}/messages`);
      if (Array.isArray(response.data)) {
        setMessages(response.data);
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.error("Erro ao buscar mensagens", err);
      setMessages([]);
    }
  };

  const updatePresence = async (status) => {
    if (!user) return;
    try {
      await api.post('/admin/chat/presence', { user_id: user.id, status });
    } catch (err) {
      console.error("Erro ao atualizar presença", err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;

    const messageData = {
      sender_id: user.id,
      sender_type: 'admin',
      message: inputText.trim()
    };

    try {
      await api.post(`/admin/chat/conversations/${activeConversation.id}/messages`, messageData);
      setInputText('');
      fetchMessages(activeConversation.id);
      fetchConversations();
    } catch (err) {
      console.error("Erro ao enviar mensagem", err);
    }
  };

  const prevUnreadRef = useRef(0);

  useEffect(() => {
    const totalUnread = conversations.reduce((acc, curr) => acc + (curr.unread_count_admin || 0), 0);

    if (totalUnread > prevUnreadRef.current) {
        // Tocar som de notificação
        try {
            const audio = new Audio('/assets/sounds/notification.mp3');
            audio.play();
        } catch(e) {}
    }
    prevUnreadRef.current = totalUnread;
  }, [conversations]);

  const selectConversation = async (conv) => {
    let convId = conv.id;
    
    // Se não existir conversa, cria uma nova
    if (!convId) {
      try {
        const response = await api.post('/admin/chat/conversations', { customer_id: conv.customer_id });
        convId = response.data.id;
        // Atualizar lista para obter o novo ID
        await fetchConversations();
      } catch (err) {
        console.error("Erro ao iniciar conversa", err);
        return;
      }
    }

    const updatedConv = { ...conv, id: convId };
    setActiveConversation(updatedConv);
    fetchMessages(convId);
    markAsRead(convId);
  };

  const markAsRead = async (convId) => {
    try {
      await api.put(`/admin/chat/${convId}/read`, { user_type: 'admin' });
      fetchConversations();
    } catch (err) {
      console.error("Erro ao marcar como lida", err);
    }
  };

  const handleCloseConversation = async () => {
    if (!activeConversation) return;
    try {
      await api.put(`/admin/chat/${activeConversation.id}/status`, { status: 'finished' });
      setActiveConversation(null);
      fetchConversations();
    } catch (err) {
      console.error("Erro ao fechar conversa", err);
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'new': return 'Nova';
      case 'waiting': return 'Aguardando';
      case 'active': return 'Em Atendimento';
      case 'finished': return 'Finalizada';
      default: return status;
    }
  };

  const filteredConversations = Array.isArray(conversations) ? conversations.filter(conv => {
    const matchesSearch = conv.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    if (filter === 'all') return matchesSearch;
    if (filter === 'unread') return matchesSearch && conv.unread_count_admin > 0;
    if (filter === 'online') return matchesSearch && conv.customer_status === 'online';
    return matchesSearch && conv.status === filter;
  }) : [];

  return (
    <>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaChevronRight size={14} /> : <FaCommentAlt size={16} />}
      </ToggleButton>

      <SidebarContainer $isOpen={isOpen}>
        <SidebarHeader>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1A365D' }}>Atendimento</h3>
          <SearchBox>
            <FaSearch color="#A0AEC0" size={14} />
            <input 
              placeholder="Buscar cliente..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>
          <FilterContainer>
            <FilterBadge $active={filter === 'all'} onClick={() => setFilter('all')}>Todos</FilterBadge>
            <FilterBadge $active={filter === 'unread'} onClick={() => setFilter('unread')}>Não lidas</FilterBadge>
            <FilterBadge $active={filter === 'online'} onClick={() => setFilter('online')}>Online</FilterBadge>
            <FilterBadge $active={filter === 'waiting'} onClick={() => setFilter('waiting')}>Aguardando</FilterBadge>
          </FilterContainer>
        </SidebarHeader>

        <CustomerList>
          {filteredConversations.length > 0 ? (
            filteredConversations.map(conv => (
              <CustomerItem 
                key={conv.customer_id} 
                $active={activeConversation?.customer_id === conv.customer_id}
                onClick={() => selectConversation(conv)}
              >
                <AvatarWrapper>
                  {conv.customer_avatar ? (
                    <img src={conv.customer_avatar} alt="" style={{ width: '45px', height: '45px', borderRadius: '15px', objectFit: 'cover' }} />
                  ) : (
                    <FaUserCircle size={45} color="#E2E8F0" />
                  )}
                  <StatusIndicator $status={conv.customer_status || 'offline'} />
                </AvatarWrapper>
                <CustomerInfo>
                  <CustomerName>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.customer_name}</span>
                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        {conv.status && <Badge type={mapChatStatusToType(conv.status)}>{getStatusLabel(conv.status)}</Badge>}
                        {conv.unread_count_admin > 0 && <UnreadBadge>{conv.unread_count_admin}</UnreadBadge>}
                    </div>
                  </CustomerName>
                  <LastMessage>{conv.last_message || 'Inicie uma conversa...'}</LastMessage>
                </CustomerInfo>
              </CustomerItem>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#A0AEC0' }}>
              <FaCommentAlt size={40} style={{ marginBottom: '1rem', opacity: 0.2 }} />
              <p>Nenhuma conversa encontrada.</p>
            </div>
          )}
        </CustomerList>
      </SidebarContainer>

      {activeConversation && (
        <ChatWindowContainer $isSidebarOpen={isOpen}>
          <ChatHeader>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <AvatarWrapper>
                {activeConversation.customer_avatar ? (
                  <img src={activeConversation.customer_avatar} alt="" style={{ width: '35px', height: '35px', borderRadius: '10px' }} />
                ) : (
                  <FaUserCircle size={35} />
                )}
              </AvatarWrapper>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {activeConversation.customer_name}
                    <Badge type={mapChatStatusToType(activeConversation.status)} style={{ opacity: 0.9 }}>
                        {getStatusLabel(activeConversation.status)}
                    </Badge>
                </div>
                <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>{activeConversation.customer_status === 'online' ? 'Online agora' : 'Desconectado'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <button 
                    onClick={handleCloseConversation}
                    style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    Finalizar
                </button>
                <FaTimes style={{ cursor: 'pointer' }} onClick={() => setActiveConversation(null)} />
            </div>
          </ChatHeader>

          <MessageList>
            {messages.map(msg => (
              <MessageBubble key={msg.id} $isMine={msg.sender_type === 'admin'}>
                {msg.message}
                <TimeStamp $isMine={msg.sender_type === 'admin'}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </TimeStamp>
              </MessageBubble>
            ))}
            <div ref={messagesEndRef} />
          </MessageList>

          <ChatInputContainer onSubmit={handleSendMessage}>
            <ChatInput 
              placeholder="Digite sua resposta..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <SendButton type="submit" disabled={!inputText.trim()}>
              <FaPaperPlane />
            </SendButton>
          </ChatInputContainer>
        </ChatWindowContainer>
      )}
    </>
  );
};

export default ChatModule;
