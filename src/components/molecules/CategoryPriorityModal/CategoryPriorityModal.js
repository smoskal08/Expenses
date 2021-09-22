import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { theme } from 'assets/styles/theme'
import Form from 'components/atoms/Form/Form';
import Button from 'components/atoms/Button/Button'
import Message from 'components/atoms/Message/Message'
import Field from 'components/atoms/Field/Field'
import Label from 'components/atoms/Label/Label'
import { closeCategoryPriorityModal, addCategory, addPriority } from 'slices/expensesSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { StyledWrapper } from '../ModalStyles/Modal.styles'

const initialValues = {
  name: ''
}

const CategoryPriorityModal = () => {
  const [messages, setMessages] = useState([])
  const isCategoryPriorityModalOpen = useSelector(state => state.expenses.isCategoryPriorityModalOpen)
  const categoryPriorityModalType = useSelector(state => state.expenses.categoryPriorityModalType)
  const accessToken = useSelector(state => state.auth.accessToken)
  const csrfToken = document.cookie.split('=')[1]
  const dispatch = useDispatch()
  const rootElement = document.getElementById('root')

  return (
    <StyledWrapper appElement={rootElement} isOpen={isCategoryPriorityModalOpen} onRequestClose={() => dispatch(closeCategoryPriorityModal())}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async ({ name }, { resetForm }) => {
          setMessages([])

          if (name !== '') {
            if (categoryPriorityModalType === 'category') await dispatch(addCategory({ name, accessToken, csrfToken }))
            else await dispatch(addPriority({ name, accessToken, csrfToken }))
            resetForm({})
            dispatch(closeCategoryPriorityModal())
          } else {
            setMessages(prevMessages => [...prevMessages, 'Nazwa nie może być pusta.'])
          }
        }}
      >
        {() => (
          <>
            <Form noValidate>
              <Label htmlFor="name">Nazwa</Label>
              <Field name="name" id="name" />
              <Button
                background={theme.colors.secondary}
                type="submit"
              ><FontAwesomeIcon icon={faPlus} /></Button>
              {
                messages.map(message => (
                  <Message key={message}>{message}</Message>
                ))
              }
            </Form>
          </>
        )}
      </Formik>
    </StyledWrapper>
  )
}

export default CategoryPriorityModal
