import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { routes } from 'routes';

const AuthRoute = props => {
  const { type } = props
  const isAuthUser = useSelector(state => state.auth.isAuthUser);

  if (type === 'guest' && isAuthUser) return <Redirect to={routes.home} />
  else if (type === 'private' && !isAuthUser) return <Redirect to={routes.login} />

  return <Route {...props} />
}

export default AuthRoute;
