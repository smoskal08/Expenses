import styled from 'styled-components'

export const StyledHeadCell = styled.th`
  padding: 2px 4px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 6px;
  font-size: 1rem;

  @media (min-width: 768px) {
    padding: 5px 10px;
    font-size: 1.6rem;
  }
`