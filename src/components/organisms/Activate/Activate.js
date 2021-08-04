import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { activateAccount } from 'slices/authSlice'
import Heading from 'components/atoms/Heading/Heading'

const Activate = () => {
  const { token } = useParams()
  const activateAccountError = useSelector(state => state.auth.activateAccountError)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(activateAccount(token))
  }, [dispatch, token])

  return (
    <Heading>{ activateAccountError ? 'Nie udało się aktywować Twojego konta.' : 'Twoje konto zostało aktywowane.' }</Heading>
  )
}

export default Activate
