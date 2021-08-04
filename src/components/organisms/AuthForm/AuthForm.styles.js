import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const StyledLoader = styled.div`
  margin: 10px 0;
  width: 50px;
  height: 50px;
  border: 5px solid ${({ theme }) => theme.colors.gray};
  border-top: 5px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;
`