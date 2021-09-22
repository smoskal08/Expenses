import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { openDeleteModal } from 'slices/expensesSlice'
import { routes } from 'routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { StyledCell, StyledButton } from './TableRow.styles'
import { theme } from 'assets/styles/theme'

const TableRow = ({ id, day, price, place, categoryId, priorityId }) => {
  const [isRedirectToEdit, setIsRedirectToEdit] = useState(false)
  const categories = useSelector(state => state.expenses.categories)
  const priorities = useSelector(state => state.expenses.priorities)
  const [categoryName, setCategoryName] = useState('')
  const [priorityName, setPriorityName] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    categories.forEach(category => {
      if (category.id === categoryId) setCategoryName(category.name)
    })
    priorities.forEach(priority => {
      if (priority.id === priorityId) setPriorityName(priority.name)
    })
  }, [categories, priorities, categoryId, priorityId])

  const handleRedirectToEdit = () => setIsRedirectToEdit(true)

  if (isRedirectToEdit) {
    sessionStorage.setItem('prevExpense', JSON.stringify({
      id,
      price,
      place,
      category: categoryId,
      priority: priorityId
    }))
    return <Redirect to={routes.edit} />
  }

  return (
    <tr>
      <StyledCell>{ day }</StyledCell>
      <StyledCell>{ price }</StyledCell>
      <StyledCell>{ place }</StyledCell>
      <StyledCell>{ categoryName }</StyledCell>
      <StyledCell>{ priorityName }</StyledCell>
      <StyledCell noPadding>
        <StyledButton aria-label="Edit" background={theme.colors.secondary} onClick={handleRedirectToEdit} data-testid="editButton"><FontAwesomeIcon icon={faEdit} /></StyledButton>
      </StyledCell>
      <StyledCell noPadding>
        <StyledButton aria-label="Delete" background={theme.colors.tertiary} onClick={() => dispatch(openDeleteModal({ id, day, price, place, categoryName, priorityName }))} data-testid="deleteButton"><FontAwesomeIcon icon={faTimes} /></StyledButton>
      </StyledCell>
    </tr>
  )
}

export default TableRow;
