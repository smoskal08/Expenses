import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal, getExpenses, deleteExpense } from 'slices/expensesSlice'
import Button from 'components/atoms/Button/Button'
import Heading from 'components/atoms/Heading/Heading'
import { StyledWrapper, StyledButtonsBox, StyledInfoBox, StyledInfoParagraph, StyledBoldText } from './Modal.styles'
import { theme } from 'assets/styles/theme'

const Modal = () => {
  const { id, day, price, place, category, priority } = useSelector(state => state.expenses.actualExpense)
  const isModalOpen = useSelector(state => state.expenses.isModalOpen)
  const accessToken = useSelector(state => state.auth.accessToken)
  const csrfToken = document.cookie.split('=')[1]
  const dispatch = useDispatch()
  const rootElement = document.getElementById('root')
  
  const handleDeleteClick = async () => {
    await dispatch(deleteExpense({ id, accessToken, csrfToken }))
    dispatch(closeModal())
    dispatch(getExpenses({ accessToken, csrfToken }))
  }

  return (
    <StyledWrapper appElement={rootElement} isOpen={isModalOpen} onRequestClose={() => dispatch(closeModal())}>
      <Heading>Czy na pewno chcesz usunąć wydatek z dnia {day}?</Heading>
      <StyledInfoBox>
        <StyledInfoParagraph><StyledBoldText>Cena:</StyledBoldText> {price}</StyledInfoParagraph>
        <StyledInfoParagraph><StyledBoldText>Miejsce:</StyledBoldText> {place}</StyledInfoParagraph>
        <StyledInfoParagraph><StyledBoldText>Kategoria:</StyledBoldText> {category}</StyledInfoParagraph>
        <StyledInfoParagraph><StyledBoldText>Priorytet:</StyledBoldText> {priority}</StyledInfoParagraph>
      </StyledInfoBox>
      <StyledButtonsBox>
        <Button
          background={theme.colors.secondary}
          onClick={() => dispatch(closeModal())}
        >
          Nie
        </Button>
        <Button
          background={theme.colors.tertiary}
          onClick={handleDeleteClick}
        >
          Tak
        </Button>
      </StyledButtonsBox>
    </StyledWrapper>
  )
}

export default Modal
