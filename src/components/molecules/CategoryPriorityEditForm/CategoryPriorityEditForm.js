import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Formik } from 'formik'
import { editCategory, editPriority } from 'slices/expensesSlice'
import Form from 'components/atoms/Form/Form'
import Field from 'components/atoms/Field/Field'
import Message from 'components/atoms/Message/Message'
import Label from 'components/atoms/Label/Label'
import Button from 'components/atoms/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { theme } from 'assets/styles/theme'
import { routes } from 'routes';

const initialValues = {
  newValue: ''
}

let prevCategoryPriority

const CategoryPriorityEditForm = ({ formType }) => {
  const [messages, setMessages] = useState([])
  const [redirectToHome, setRedirectToHome] = useState(false)
  const accessToken = useSelector(state => state.auth.accessToken)
  const csrfToken = document.cookie.split('=')[1]
  const dispatch = useDispatch()

  useEffect(() => {
    prevCategoryPriority = JSON.parse(sessionStorage.getItem('prevCategoryPriority'))
    sessionStorage.removeItem('prevCategoryPriority')
  }, [])

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values, { resetForm }) => {
        setMessages([])
        resetForm({})

        if (values.newValue !== '') {
          if (formType === 'category') {
            await dispatch(editCategory({
              id: prevCategoryPriority.id,
              name: values.newValue,
              accessToken,
              csrfToken
            }))
          } else {
            await dispatch(editPriority({
              id: prevCategoryPriority.id,
              name: values.newValue,
              accessToken,
              csrfToken
            }))
          }
          setRedirectToHome(true)
        } else {
          setMessages(prevMessages => ([...prevMessages, 'Pola nie mogą być puste.']))
        }
      }}
    >
      {() => (
        <>
          {
            redirectToHome ? <Redirect to={routes.home} /> : null
          }
          <Form noValidate>
            <Label htmlFor="newValue">{ formType === 'category' ? 'Nowa kategoria' : 'Nowy priorytet' }</Label>
            <Field name="newValue" id="newValue" />
            <Button
              background={theme.colors.primary}
              type="submit"
            ><FontAwesomeIcon icon={faSave} /></Button>
            {
              messages.map(message => (
                <Message key={message}>{message}</Message>
              ))
            }
          </Form>
        </>
      )}
    </Formik>
  )
}

CategoryPriorityEditForm.propTypes = {
  formType: PropTypes.string
}

CategoryPriorityEditForm.defaultProps = {
  formType: ''
}

export default CategoryPriorityEditForm