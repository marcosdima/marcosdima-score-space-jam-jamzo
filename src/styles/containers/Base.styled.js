import styled from 'styled-components';

const Base = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: clamp(1rem, 3vw, 2rem);
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.bg};
`;

export default Base;
