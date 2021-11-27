import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeCategoryPriorityDeleteModal, deleteCategory, deletePriority, getCategory, getPriority } from 'slices/expensesSlice'
import Button from 'components/atoms/Button/Button'
import Heading from 'components/atoms/Heading/Heading'
import { StyledWrapper, StyledButtonsBox } from '../ModalStyles/Modal.styles'
import { theme } from 'assets/styles/theme'

const CategoryPriorityDeleteModal = () => {
  const isCategoryPriorityDeleteModalOpen = useSelector(state => state.expenses.isCategoryPriorityDeleteModalOpen)
  const categoryPriorityDeleteModalType = useSelector(state => state.expenses.categoryPriorityDeleteModalType)
  const { id, name } = useSelector(state => state.expenses.actualCategoryPriority)
  const accessToken = useSelector(state => state.auth.accessToken)
  const csrfToken = document.cookie.split('=')[1]
  const dispatch = useDispatch()
  const rootElement = document.getElementById('root')

  const handleDeleteClick = async () => {
    if (categoryPriorityDeleteModalType === 'category') {
      await dispatch(deleteCategory({ id, accessToken, csrfToken }))
      dispatch(getCategory({ accessToken, csrfToken }))
    } else {
      await dispatch(deletePriority({ id, accessToken, csrfToken }))
      dispatch(getPriority({ accessToken, csrfToken }))
    }
    dispatch(closeCategoryPriorityDeleteModal())
  }

  return (
    <StyledWrapper appElement={rootElement} isOpen={isCategoryPriorityDeleteModalOpen} onRequestClose={() => dispatch(closeCategoryPriorityDeleteModal())}>
      <Heading>Czy na pewno chcesz usunąć { categoryPriorityDeleteModalType === 'category' ? 'kategorię' : ' priorytet' } <strong>{ name }</strong>?</Heading>
      <StyledButtonsBox>
        <Button
          background={theme.colors.secondary}
          onClick={() => dispatch(closeCategoryPriorityDeleteModal())}
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

export default CategoryPriorityDeleteModal
