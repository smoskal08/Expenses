import styled, { css } from 'styled-components'

export const StyledPagination = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  list-style: none;

  ${({ isVisible }) => 
    isVisible ? css`
      display: none;
    ` : null
  }
`

export const StyledPaginationElement = styled.li`
  margin: 0 15px;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.secondary};
  opacity: .8;
  transition: opacity .3s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  ${({ left, right, center }) =>
    right ? css`
      margin-right: 0;
    ` : left ? css`
      margin-left: 0;
    ` : center ? css`
      cursor: default;
    ` : null 
  }
`