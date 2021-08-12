import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { openModal } from 'slices/expensesSlice'
import { routes } from 'routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { StyledCell, StyledButton } from './TableRow.styles'
import { theme } from 'assets/styles/theme'

const TableRow = ({ id, day, price, place, category, priority }) => {
  const [isRedirectToEdit, setIsRedirectToEdit] = useState(false)
  const dispatch = useDispatch()

  const handleRedirectToEdit = () => setIsRedirectToEdit(true)

  if (isRedirectToEdit) {
    sessionStorage.setItem('prevExpense', JSON.stringify({
      id,
      price,
      place,
      category,
      priority
    }))
    return <Redirect to={routes.edit} />
  }

  return (
    <tr>
      <StyledCell>{ day }</StyledCell>
      <StyledCell>{ price }</StyledCell>
      <StyledCell>{ place }</StyledCell>
      <StyledCell>{ category }</StyledCell>
      <StyledCell>{ priority }</StyledCell>
      <StyledCell noPadding>
        <StyledButton background={theme.colors.secondary} onClick={handleRedirectToEdit}><FontAwesomeIcon icon={faEdit} /></StyledButton>
      </StyledCell>
      <StyledCell noPadding>
        <StyledButton background={theme.colors.tertiary} onClick={() => dispatch(openModal({ id, day, price, place, category, priority }))} data-testid="deleteButton"><FontAwesomeIcon icon={faTimes} /></StyledButton>
      </StyledCell>
    </tr>
  )
}

export default TableRow;
