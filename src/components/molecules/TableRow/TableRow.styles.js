import styled, { css } from 'styled-components'
import Button from 'components/atoms/Button/Button'

export const StyledCell = styled.td`
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 6px;
  text-align: center;

  ${({ noPadding }) =>
    noPadding && css`
      padding: 0;
    `
  }
`

export const StyledButton = styled(Button)`
  display: block;
  width: 100%;
`