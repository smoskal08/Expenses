import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-size: 2rem;
  background-color: ${({ background }) => background ? background : 'transparent'};
  color: ${({ theme, color }) => color ? color : theme.colors.white};
  cursor: pointer;
  opacity: .9;

  &:hover {
    opacity: 1;
  }
`

export default Button;
