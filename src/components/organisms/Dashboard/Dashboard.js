import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ExpensesTableRow from 'components/molecules/ExpensesTableRow/ExpensesTableRow'
import { getExpenses, getCategory, getPriority } from 'slices/expensesSlice'
import { HeadCell } from 'components/atoms/HeadCell/HeadCell'
import { StyledPagination, StyledPaginationElement, StyledPaginationBox } from './Dashboard.styles'
import { server } from 'server'
import { endpoints } from 'endpoints'

const Dashboard = () => {
  const accessToken = useSelector(state => state.auth.accessToken)
  const expensesList = useSelector(state => state.expenses.expensesList)
  const count = useSelector(state => state.expenses.count)
  const nextExpensesLink = useSelector(state => state.expenses.nextExpensesLink)
  const previousExpensesLink = useSelector(state => state.expenses.previousExpensesLink)
  const actualPage = useSelector(state => state.expenses.actualPage)
  const lastPage = useSelector(state => state.expenses.lastPage)
  const csrfToken = document.cookie.split('=')[1]
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getExpenses({ accessToken, csrfToken }))
    dispatch(getCategory({ accessToken, csrfToken }))
    dispatch(getPriority({ accessToken, csrfToken }))
  }, [dispatch, accessToken, csrfToken])

  const handleFirstExpensesClick = () => dispatch(getExpenses({ accessToken, csrfToken, link: `${server}${endpoints.expenses.page}1` }))
  const handleNextExpensesClick = () => dispatch(getExpenses({ accessToken, csrfToken, link: nextExpensesLink }))
  const handlePreviousExpensesClick = () => dispatch(getExpenses({ accessToken, csrfToken, link: previousExpensesLink }))
  const handleLastExpensesClick = () => dispatch(getExpenses({ accessToken, csrfToken, link: `${server}${endpoints.expenses.page}${lastPage}` }))

  return (
    <>
      <table cellSpacing="0">
        <thead>
          <tr>
            <HeadCell>Dzień</HeadCell>
            <HeadCell>Cena</HeadCell>
            <HeadCell>Miejsce</HeadCell>
            <HeadCell>Kategoria</HeadCell>
            <HeadCell>Priorytet</HeadCell>
            <HeadCell>Edytuj</HeadCell>
            <HeadCell>Usuń</HeadCell>
          </tr>
        </thead>
        <tbody>
          {
            expensesList.length > 0 ? expensesList.map(({ id, day, price, place, category, priority }) => (
              <ExpensesTableRow key={id} day={day} id={id} price={price} place={place} categoryId={category} priorityId={priority} />
            )) : (
              <tr>
                <HeadCell colSpan="7">Brak wydatków</HeadCell>
              </tr>
            )
          }
        </tbody>
      </table>

      <StyledPagination isVisible={count <= 5}>
        <StyledPaginationElement right onClick={handleFirstExpensesClick}>{ "<<" }</StyledPaginationElement>
        <StyledPaginationElement left onClick={handlePreviousExpensesClick}>{ "<" }</StyledPaginationElement>
        <StyledPaginationElement center>{ actualPage }</StyledPaginationElement>
        <StyledPaginationElement right onClick={handleNextExpensesClick}>{">"}</StyledPaginationElement>
        <StyledPaginationElement left onClick={handleLastExpensesClick}>{">>"}</StyledPaginationElement>
      </StyledPagination>
    </>
  )
}

export default Dashboard;
