import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { addExpense, editExpense } from 'slices/expensesSlice';
import Form from 'components/atoms/Form/Form';
import Field from 'components/atoms/Field/Field';
import Message from 'components/atoms/Message/Message';
import Label from 'components/atoms/Label/Label';
import Button from 'components/atoms/Button/Button';
import { routes } from 'routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlus } from '@fortawesome/free-solid-svg-icons'
import { theme } from 'assets/styles/theme'

const addInitialValues = {
  price: '',
  place: '',
  category: '',
  priority: ''
}

let prevExpense = JSON.parse(sessionStorage.getItem('prevExpense'))

const ExpensesForm = ({ formType }) => {
  const [messages, setMessages] = useState([])
  const [redirectToHome, setRedirectToHome] = useState(false)
  const [initialValues, setInitialValues] = useState(addInitialValues)
  const accessToken = useSelector(state => state.auth.accessToken)
  const dispatch = useDispatch()

  useEffect(() => {
    if (formType === 'edit') {
      prevExpense = JSON.parse(sessionStorage.getItem('prevExpense'))
      if (!!prevExpense) {
        setInitialValues(prevExpense)
        sessionStorage.removeItem('prevExpense')
      } else {
        return <Redirect to={routes.home} />
      }
    } else {
      setInitialValues(addInitialValues)
    }
  }, [formType])

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async values => {
        setMessages([])

        let isValidate = true

        for (let value in values) {
          if (values[value] === '') {
            isValidate = false
            break
          }
        }

        if (isValidate) {
          const csrfToken = document.cookie.split('=')[1]
          if (formType === 'add') {
            await dispatch(addExpense({
              ...values,
              accessToken,
              csrfToken
            }))
          } else {
            await dispatch(editExpense({
              id: prevExpense.id,
              ...values,
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
          { redirectToHome && <Redirect to={routes.home} /> }
          <Form noValidate>
            <Label htmlFor="price">Cena</Label>
            <Field type="number" name="price" id="price" />
            <Label htmlFor="place">Miejsce</Label>
            <Field type="text" name="place" id="place" />
            <Label htmlFor="category">Kategoria</Label>
            <Field type="number" name="category" id="category" />
            <Label htmlFor="priority">Priorytet</Label>
            <Field type="number" name="priority" id="priority" />
            <Button
              background={theme.colors.secondary}
              type="submit"
              data-testid="submitButton"
              aria-label="Submit"
            >
              { formType === 'add' ? <FontAwesomeIcon icon={faPlus} /> : <FontAwesomeIcon icon={faSave} /> }
            </Button>
            {
              messages.map(message => (
                <Message key={message}>{ message }</Message>
              ))
            }
          </Form>
        </>
      )}
    </Formik>
  )
}

export default ExpensesForm
