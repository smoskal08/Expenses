import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getCategory, getPriority, openCategoryPriorityModal } from 'slices/expensesSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import CategoryPriorityTableRow from 'components/molecules/CategoryPriorityTableRow/CategoryPriorityTableRow'
import { HeadCell } from 'components/atoms/HeadCell/HeadCell'
import { StyledButton } from './CategoryPriorityTable.styles'
import { theme } from 'assets/styles/theme'
import { routes } from 'routes'

const CategoryPriorityTable = ({ tableType }) => {
  const [isRedirectToHome, setIsRedirectToHome] = useState(false)
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

  const handleOpenCategoryPriorityModal = () => {
    if (tableType === 'category') dispatch(openCategoryPriorityModal('category'))
    else dispatch(openCategoryPriorityModal('priority'))
    setIsRedirectToHome(true)
  }

  if (isRedirectToHome) return <Redirect to={routes.home} />

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
        <tr>
          <td colSpan="3">
            <StyledButton aria-label="Add" background={theme.colors.primary} onClick={handleOpenCategoryPriorityModal} data-testid="addButton"><FontAwesomeIcon icon={faPlus} /></StyledButton>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default CategoryPriorityTable