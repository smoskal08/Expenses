import styled from 'styled-components'
import ReactPaginate from 'react-paginate'

export const StyledReactPaginate = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  list-style: none;

  li {
    padding: 10px 15px;
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 1.8rem;
    border-radius: 8px;
    opacity: .6;
    transition: opacity .3s;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
`