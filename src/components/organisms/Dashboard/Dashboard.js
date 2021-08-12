import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TableRow from 'components/molecules/TableRow/TableRow'
import { getExpenses } from 'slices/expensesSlice'
import { StyledHeadCell } from './Dashboard.styles'

const Dashboard = () => {
  const accessToken = useSelector(state => state.auth.accessToken)
  const expensesList = useSelector(state => state.expenses.expensesList)
  const csrfToken = document.cookie.split('=')[1]
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getExpenses({ accessToken, csrfToken }))
  }, [dispatch, accessToken, csrfToken])

  return (
    <>
      <table cellSpacing="0">
        <thead>
          <tr>
            <StyledHeadCell>Dzień</StyledHeadCell>
            <StyledHeadCell>Cena</StyledHeadCell>
            <StyledHeadCell>Miejsce</StyledHeadCell>
            <StyledHeadCell>Kategoria</StyledHeadCell>
            <StyledHeadCell>Priorytet</StyledHeadCell>
            <StyledHeadCell>Edytuj</StyledHeadCell>
            <StyledHeadCell>Usuń</StyledHeadCell>
          </tr>
        </thead>
        <tbody>
          {
            expensesList.length > 0 ? expensesList.map(expense => (
              <TableRow key={expense.id} {...expense} />
            )) : (
              <tr>
                <StyledHeadCell colSpan="7">Brak wydatków</StyledHeadCell>
              </tr>
            )
          }
        </tbody>
      </table>
    </>
  )
}

export default Dashboard;
