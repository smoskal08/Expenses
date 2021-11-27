import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCategory, getPriority } from 'slices/expensesSlice'
import CategoryPriorityTableRow from 'components/molecules/CategoryPriorityTableRow/CategoryPriorityTableRow'
import { HeadCell } from 'components/atoms/HeadCell/HeadCell'

const CategoryPriorityTable = ({ tableType }) => {
  const categories = useSelector(state => state.expenses.categories)
  const priorities = useSelector(state => state.expenses.priorities)
  const accessToken = useSelector(state => state.auth.accessToken)
  const csrfToken = document.cookie.split('=')[1]
  const dispatch = useDispatch()

  useEffect(() => {
    if (tableType === 'category') {
      dispatch(getCategory({ accessToken, csrfToken }))
    } else {
      dispatch(getPriority({ accessToken, csrfToken }))
    }
  }, [dispatch, accessToken, csrfToken, tableType])

  return (
    <table cellSpacing="0">
      <thead>
        <tr>
          <HeadCell>{ tableType === 'category' ? 'Kategoria' : 'Priorytet' }</HeadCell>
          <HeadCell>Edytuj</HeadCell>
          <HeadCell>Usuń</HeadCell>
        </tr>
      </thead>
      <tbody>
        {
          tableType === 'category' ?
            categories.length > 0 ? categories.map(category => (
              <CategoryPriorityTableRow key={category.id} tableType={tableType} {...category} />
            )) : (
              <tr>
                <HeadCell colSpan="3">Brak { tableType === "category" ? 'kategorii' : 'priorytetów' }</HeadCell>
              </tr>
            ) : priorities.length > 0 ? priorities.map(priority => (
              <CategoryPriorityTableRow key={priority.id} tableType={tableType} {...priority} />
            )) : (
              <tr>
                <HeadCell colSpan="3">Brak {tableType === "category" ? 'kategorii' : 'priorytetów'}</HeadCell>
              </tr>
            )
        }
      </tbody>
    </table>
  )
}

export default CategoryPriorityTable