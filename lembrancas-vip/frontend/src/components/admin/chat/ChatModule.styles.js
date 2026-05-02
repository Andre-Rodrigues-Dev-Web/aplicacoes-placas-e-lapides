import styled, { keyframes } from 'styled-components';
import Badge from '../shared/Badge';

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

export const SidebarContainer = styled.div`
  width: ${props => props.$isOpen ? '350px' : '0'};
  height: calc(100vh - 80px);
  background: white;
  border-left: 1px solid #E2E8F0;
  position: fixed;
  right: 0;
  top: 80px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  z-index: 100;
  box-shadow: -4px 0 15px rgba(0,0,0,0.02);
  overflow: hidden;

  @media (max-width: 768px) {
    width: ${props => props.$isOpen ? '100%' : '0'};
    top: 0;
    height: 100vh;
  }
`;

export const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #F7FAFC;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #F7FAFC;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  border: 1px solid #EDF2F7;

  input {
    border: none;
    background: transparent;
    margin-left: 10px;
    width: 100%;
    outline: none;
    font-size: 0.9rem;
    color: #4A5568;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 5px;
  &::-webkit-scrollbar { display: none; }
`;

export const FilterBadge = styled.button`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  background: ${props => props.$active ? '#00AEEF' : '#F7FAFC'};
  color: ${props => props.$active ? 'white' : '#718096'};
  border: 1px solid ${props => props.$active ? '#00AEEF' : '#EDF2F7'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #00AEEF;
    color: ${props => props.$active ? 'white' : '#00AEEF'};
  }
`;

export const CustomerList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

export const CustomerItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.$active ? 'rgba(0, 174, 239, 0.05)' : 'transparent'};
  border: 1px solid ${props => props.$active ? 'rgba(0, 174, 239, 0.2)' : 'transparent'};
  margin-bottom: 0.5rem;

  &:hover {
    background: #F7FAFC;
  }
`;

export const AvatarWrapper = styled.div`
  position: relative;
  margin-right: 12px;
`;

export const StatusIndicator = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: ${props => {
    switch(props.$status) {
      case 'online': return '#48BB78';
      case 'away': return '#ECC94B';
      default: return '#A0AEC0';
    }
  }};
`;

export const CustomerInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CustomerName = styled.div`
  font-weight: 700;
  color: #2D3748;
  font-size: 0.95rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

export const mapChatStatusToType = (status) => {
  switch(status) {
    case 'new': return 'info';
    case 'waiting': return 'danger';
    case 'active': return 'success';
    case 'finished': return 'dark';
    default: return 'default';
  }
};

export const LastMessage = styled.div`
  font-size: 0.8rem;
  color: #718096;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
`;

export const UnreadBadge = styled.span`
  background: #00AEEF;
  color: white;
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: bold;
`;

export const ChatWindowContainer = styled.div`
  position: fixed;
  right: ${props => props.$isSidebarOpen ? '360px' : '20px'};
  bottom: 20px;
  width: 400px;
  height: 550px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 15px 50px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  z-index: 101;
  animation: ${fadeIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
    border-radius: 0;
  }
`;

export const ChatHeader = styled.div`
  padding: 1.2rem;
  background: #00AEEF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  background: #F7FAFC;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MessageBubble = styled.div`
  max-width: 80%;
  padding: 10px 16px;
  border-radius: 18px;
  font-size: 0.9rem;
  line-height: 1.4;
  position: relative;
  
  ${props => props.$isMine ? `
    align-self: flex-end;
    background: #00AEEF;
    color: white;
    border-bottom-right-radius: 4px;
  ` : `
    align-self: flex-start;
    background: white;
    color: #2D3748;
    border-bottom-left-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  `}
`;

export const TimeStamp = styled.div`
  font-size: 0.65rem;
  margin-top: 4px;
  opacity: 0.8;
  text-align: ${props => props.$isMine ? 'right' : 'left'};
`;

export const ChatInputContainer = styled.form`
  padding: 1.2rem;
  background: white;
  border-top: 1px solid #F7FAFC;
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

export const ChatInput = styled.input`
  flex: 1;
  border: 1px solid #E2E8F0;
  padding: 0.8rem 1.2rem;
  border-radius: 15px;
  outline: none;
  font-size: 0.9rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: #00AEEF;
  }
`;

export const SendButton = styled.button`
  background: #00AEEF;
  color: white;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  &:disabled {
    background: #CBD5E0;
    cursor: not-allowed;
  }
`;

export const ToggleButton = styled.button`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: 1px solid #E2E8F0;
  width: 32px;
  height: 60px;
  border-radius: 10px 0 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 101;
  box-shadow: -2px 0 10px rgba(0,0,0,0.05);
  color: #718096;

  &:hover {
    color: #00AEEF;
  }
`;
