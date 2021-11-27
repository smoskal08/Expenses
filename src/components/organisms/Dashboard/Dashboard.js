import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ExpensesTableRow from 'components/molecules/ExpensesTableRow/ExpensesTableRow'
import { getExpenses, getCategory, getPriority } from 'slices/expensesSlice'
import { HeadCell } from 'components/atoms/HeadCell/HeadCell'
import { StyledReactPaginate } from './Dashboard.styles'

const itemsPerPage = 5

const Dashboard = () => {
  const accessToken = useSelector(state => state.auth.accessToken)
  const expensesList = useSelector(state => state.expenses.expensesList)
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemIndex, setItemIndex] = useState(0)
  const csrfToken = document.cookie.split('=')[1]
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getExpenses({ accessToken, csrfToken }))
    dispatch(getCategory({ accessToken, csrfToken }))
    dispatch(getPriority({ accessToken, csrfToken }))
  }, [dispatch, accessToken, csrfToken])

  useEffect(() => {
    const endIndex = itemIndex + itemsPerPage
    setCurrentItems(expensesList.slice(itemIndex, endIndex))
    setPageCount(Math.ceil(expensesList.length / itemsPerPage))
  }, [expensesList, itemIndex])

  const handlePageClick = e => {
    const newIndex = (e.selected * itemsPerPage) % expensesList.length
    setItemIndex(newIndex)
  }

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
            currentItems ? currentItems.map(({ id, day, price, place, category, priority }) => (
              <ExpensesTableRow key={id} day={day} id={id} price={price} place={place} categoryId={category} priorityId={priority} />
            )) : (
              <tr>
                <HeadCell colSpan="7">Brak wydatków</HeadCell>
              </tr>
            )
          }
        </tbody>
      </table>

      <StyledReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default Dashboard;
