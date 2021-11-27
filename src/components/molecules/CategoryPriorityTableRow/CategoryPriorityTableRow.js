import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Cell } from 'components/atoms/Cell/Cell'
import { openCategoryPriorityDeleteModal } from 'slices/expensesSlice'
import { StyledButton } from './CategoryPriorityTableRow.styles'
import { theme } from 'assets/styles/theme'
import { routes } from 'routes'

const CategoryPriorityTableRow = ({ tableType, id, name }) => {
  const [isRedirectToEdit, setIsRedirectToEdit] = useState(false)
  const dispatch = useDispatch()

  const handleRedirectToEdit = () => setIsRedirectToEdit(true)

  if (isRedirectToEdit) {
    sessionStorage.setItem('prevCategoryPriority', JSON.stringify({
      id,
      name
    }))
    return <Redirect to={tableType === 'category' ? routes.editCategory : routes.editPriority} />
  }

  return (
    <tr>
      <Cell>{name}</Cell>
      <Cell noPadding>
        <StyledButton aria-label="Edit" background={theme.colors.secondary} onClick={handleRedirectToEdit} data-testid="editButton"><FontAwesomeIcon icon={faEdit} /></StyledButton>
      </Cell>
      <Cell noPadding>
        <StyledButton aria-label="Delete" background={theme.colors.tertiary} onClick={() => dispatch(openCategoryPriorityDeleteModal({ tableType, id, name }))} data-testid="deleteButton"><FontAwesomeIcon icon={faTimes} /></StyledButton>
      </Cell>
    </tr>
  )
}

export default CategoryPriorityTableRow;
