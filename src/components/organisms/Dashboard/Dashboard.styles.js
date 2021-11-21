import styled from 'styled-components'
import ReactPaginate from 'react-paginate'

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