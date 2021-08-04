import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Heading from 'components/atoms/Heading/Heading';
import { routes } from 'routes';

const Activate = () => {
  const [isRedirect, setIsRedirect] = useState(false)

  const redirectTimeout = setTimeout(() => setIsRedirect(true), 15000)

  useEffect(() => {
    return () => {
      window.location.reload()
      clearTimeout(redirectTimeout)
    }
  })

  return (
    <>
      { isRedirect && <Redirect to={routes.login} /> }
      <Heading>Link aktywacyjny został wysłany na Twój adres email.</Heading>
    </>
  )
}

export default Activate;
