import styled, { css } from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 25px;

  @media (min-width: 992px) {
    flex-direction: row;
    height: 100%;
    margin-top: 0;

    ${({ isColumn }) =>
      isColumn ? css`
        flex-direction: column;
        justify-content: center;
      ` : null
    }
  }
`