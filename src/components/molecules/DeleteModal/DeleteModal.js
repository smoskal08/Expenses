import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, getExpenses, deleteExpense } from 'slices/expensesSlice';
import Button from 'components/atoms/Button/Button';
import Heading from 'components/atoms/Heading/Heading';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 15px;
  border-radius: 14px;
  box-shadow: 0 0 40px #000;
  z-index: 1;
  background-color: #fff;
`

const StyledBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 25px;
`

const DeleteModal = () => {
  const id = useSelector(state => state.expenses.id)
  const accessToken = useSelector(state => state.auth.accessToken)
  const csrfToken = document.cookie.split('=')[1]
  const dispatch = useDispatch()

  const handleDeleteClick = async () => {
    await dispatch(deleteExpense({ id, accessToken, csrfToken }))
    dispatch(closeModal())
    dispatch(getExpenses({ accessToken, csrfToken }))
  }

  return (
    <StyledWrapper>
      <Heading>Czy na pewno chcesz usunąć wydatek?</Heading>
      <StyledBox>
        <Button
          theme="#0275d8"
          onClick={() => dispatch(closeModal())}
        >
          Nie
        </Button>
        <Button
          theme="#d9534f"
          onClick={handleDeleteClick}
        >
          Tak
        </Button>
      </StyledBox>
    </StyledWrapper>
  )
}

export default DeleteModal;
