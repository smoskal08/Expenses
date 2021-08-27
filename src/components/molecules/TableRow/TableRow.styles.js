import styled, { css } from 'styled-components'
import Button from 'components/atoms/Button/Button'

export const StyledCell = styled.td`
  padding: ${({ noPadding }) => noPadding ? 0 : '2px 4px'};
  border: 1px solid black;
  border-radius: 6px;
  text-align: center;
  font-size: 1rem;

  @media (min-width: 768px) {
    padding: ${({ noPadding }) => noPadding ? 0 : '5px 10px'};
    font-size: 1.6rem;
  }
`

export const StyledButton = styled(Button)`
  display: block;
  width: 100%;
`