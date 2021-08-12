import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { resetMessages, authDataSend, editProfile } from 'slices/authSlice';
import Form from 'components/atoms/Form/Form';
import Field from 'components/atoms/Field/Field';
import Message from 'components/atoms/Message/Message';
import Label from 'components/atoms/Label/Label';
import Button from 'components/atoms/Button/Button';
import { routes } from 'routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { StyledLoader } from './AuthForm.styles'
import { theme } from 'assets/styles/theme'

const AuthForm = ({ formType }) => {
  const user = useSelector(state => state.auth.user)
  const accessToken = useSelector(state => state.auth.accessToken)
  const csrfToken = document.cookie.split('=')[1]
  const isLoading = useSelector(state => state.auth.isLoading)
  const apiMessages = useSelector(state => state.auth.messages)
  const [messages, setMessages] = useState([])
  const allMessages = messages.concat(apiMessages)
  const redirectToActivate = useSelector(state => state.auth.redirectToActivate)
  const [redirectToHome, setRedirectToHome] = useState(false)
  const dispatch = useDispatch()
  const initialValues = formType !== '' ? {
    email: '',
    password: ''
  } : {
    firstName: user.firstName,
    lastName: user.lastName,
  }

  useEffect(() => {
    dispatch(resetMessages())
  }, [dispatch, formType])

  const submitText = () => {
    if (formType === 'register') return 'Zarejestruj się'
    else if (formType === 'login') return 'Zaloguj się'
    else return <FontAwesomeIcon icon={faSave} />
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        setMessages([])
        resetForm({})

        if (formType !== '') {
          const { email, password } = values

          const emailRegex = /.+@.+\..+/i
          const passwordRegex = /.{8,}/i

          if (emailRegex.test(email) && passwordRegex.test(password)) {
            dispatch(authDataSend({ email, password, type: formType }))
          }

          if (!emailRegex.test(email)) {
            setMessages(prevMessages => ([...prevMessages, 'Podaj prawidłowy adres email.']))
          }

          if (!passwordRegex.test(password)) {
            setMessages(prevMessages => ([...prevMessages, 'Podaj prawidłowe hasło.']))
          }
        } else {
          const { firstName, lastName } = values

          const nameRegex = /^[a-z]+$/i

          if (nameRegex.test(firstName) && nameRegex.test(lastName)) {
            dispatch(editProfile({ firstName, lastName, csrfToken, accessToken }))
            setRedirectToHome(true)
          }

          if (!nameRegex.test(firstName)) {
            setMessages(prevMessages => ([...prevMessages, 'Podaj prawidłowe imię.']))
          }

          if (!nameRegex.test(lastName)) {
            setMessages(prevMessages => ([...prevMessages, 'Podaj prawidłowe nazwisko.']))
          }
        }
      }}
    >
      {() => (
        <Form noValidate>
          { redirectToActivate && <Redirect to={routes.activateLink} /> }
          { redirectToHome && <Redirect to={routes.home} /> }
          {
            formType !== '' ? (
              <>
                <Label htmlFor="email">Adres email</Label>
                <Field type="email" name="email" id="email" />
                <Label htmlFor="password">Hasło</Label>
                <Field type="password" name="password" id="password" />
              </>
            ) : (
              <>
                <Label htmlFor="firstName">Imię</Label>
                <Field type="text" name="firstName" id="firstName" />
                <Label htmlFor="lastName">Nazwisko</Label>
                <Field type="text" name="lastName" id="lastName" />
              </>
            )
          }
          {
            isLoading ? <StyledLoader /> : null
          }
          <Button
            background={theme.colors.primary}
            type="submit"
          >
            { submitText() }
          </Button>
          { allMessages.map(message => <Message key={message}>{message}</Message>) }
        </Form>
      )}
    </Formik>
  )
}

AuthForm.propTypes = {
  formType: PropTypes.string,
}

AuthForm.defaultProps = {
  formType: ''
}

export default AuthForm
