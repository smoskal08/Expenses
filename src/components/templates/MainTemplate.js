import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Navigation from 'components/organisms/Navigation/Navigation'
import Modal from 'components/molecules/Modal/Modal'
import { routes } from 'routes'
import { StyledWrapper, Main } from './MainTemplate.styles'

const MainTemplate = ({ children }) => {
  const isModalOpen = useSelector(state => state.expenses.isModalOpen)

  return (
    <StyledWrapper>
      <Switch>
        <Route
          path={routes.register}
          component={() => <Navigation route="register" />}
        />
        <Route
          path={routes.login}
          component={() => <Navigation route="login" />}
        />
        <Route
          exact path={routes.home}
          component={() => <Navigation route="home" />}
        />
        <Route
          exact path={routes.add}
          component={() => <Navigation route="add" />}
        />
        <Route
          exact path={routes.edit}
          component={() => <Navigation route="edit" />}
        />
        <Route
          path={routes.editProfile}
          component={() => <Navigation route="edit-profile" />}
        />
        <Route
          path={routes.activate}
          component={() => <Navigation route="activate" />}
        />
        <Route
          component={Navigation}
        />
      </Switch>
      <Main>
        { isModalOpen && <Modal /> }
        { children }
      </Main>
    </StyledWrapper>
  )
}

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
}

export default MainTemplate;
