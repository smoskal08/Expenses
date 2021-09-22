import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { addExpense, editExpense, openCategoryPriorityModal, getCategory, getPriority } from 'slices/expensesSlice'
import Form from 'components/atoms/Form/Form'
import Field from 'components/atoms/Field/Field'
import Message from 'components/atoms/Message/Message'
import Label from 'components/atoms/Label/Label'
import Button from 'components/atoms/Button/Button'
import { routes } from 'routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlus } from '@fortawesome/free-solid-svg-icons'
import { theme } from 'assets/styles/theme'
import { Select } from './ExpensesForm.styles'

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
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('')
  const [initialValues, setInitialValues] = useState(addInitialValues)
  const categories = useSelector(state => state.expenses.categories)
  const priorities = useSelector(state => state.expenses.priorities)
  const addCategoryOrPriority = useSelector(state => state.expenses.addCategoryOrPriority)
  const accessToken = useSelector(state => state.auth.accessToken)
  const csrfToken = document.cookie.split('=')[1]
  const dispatch = useDispatch()

  const handleSelectValueChange = e => {
    switch (e.target.name) {
      case 'category':
        setCategory(e.target.value)
        break
      case 'priority':
        setPriority(e.target.value)
        break
      default:
        return
    }
  }

  useEffect(() => {
    dispatch(getCategory({ accessToken, csrfToken }))
    dispatch(getPriority({ accessToken, csrfToken }))

    if (category === "Dodaj kategorię") {
      dispatch(openCategoryPriorityModal('category'))
      setCategory('- wybierz kategorię -')
    }

    if (priority === "Dodaj priorytet") {
      dispatch(openCategoryPriorityModal('priority'))
      setPriority('- wybierz priorytet -')
    }
  }, [category, priority, addCategoryOrPriority, accessToken, csrfToken, dispatch])

  useEffect(() => {
    if (formType === 'edit') {
      prevExpense = JSON.parse(sessionStorage.getItem('prevExpense'))
      if (!!prevExpense) {
        setInitialValues(prevExpense)
        setCategory(prevExpense.category)
        setPriority(prevExpense.priority)
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

        values.category = category
        values.priority = priority

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
            <Select as="select" name="category" id="category" value={category} onChange={handleSelectValueChange}>
              <option value="">- wybierz kategorię -</option>
              {
                categories !== undefined ? categories.map(({ id, name }) => <option key={id} value={id}>{ name }</option>) : null
              }
              <option>Dodaj kategorię</option>
            </Select>
            <Label htmlFor="priority">Priorytet</Label>
            <Select as="select" name="priority" id="priority" value={priority} onChange={handleSelectValueChange}>
              <option value="">- wybierz priorytet -</option>
              {
                priorities !== undefined ? priorities.map(({ id, name }) => <option key={id} value={id}>{ name }</option>) : null
              }
              <option>Dodaj priorytet</option>
            </Select>
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
