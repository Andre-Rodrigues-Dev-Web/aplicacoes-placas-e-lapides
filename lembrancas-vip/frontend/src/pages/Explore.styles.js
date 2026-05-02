import styled from 'styled-components';

export const SearchBar = styled.div`
  max-width: 600px;
  margin: 0 auto 4rem;
  padding: 0 2rem;
  display: flex;
  gap: 10px;

  input {
    flex: 1;
    padding: 1rem 1.5rem;
    border: 1px solid #E2E8F0;
    border-radius: 50px;
    outline: none;
    font-size: 1rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);

    &:focus {
      border-color: #00AEEF;
    }
  }

  button {
    background: #00AEEF;
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #0087B7;
    }
  }
`;
