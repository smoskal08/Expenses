import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import store from 'store'
import AuthRoute from 'components/molecules/AuthRoute/AuthRoute'
import GlobalStyle from 'assets/styles/GlobalStyle'
import MainTemplate from 'components/templates/MainTemplate'
import Dashboard from 'components/organisms/Dashboard/Dashboard'
import ExpensesForm from 'components/organisms/ExpensesForm/ExpensesForm'
import CategoryPriorityTable from 'components/organisms/CategoryPriorityTable/CategoryPriorityTable'
import CategoryPriorityEditForm from 'components/molecules/CategoryPriorityEditForm/CategoryPriorityEditForm'
import AuthForm from 'components/organisms/AuthForm/AuthForm'
import Activate from 'components/organisms/Activate/Activate'
import Heading from 'components/atoms/Heading/Heading'
import { routes } from 'routes'
import { theme } from 'assets/styles/theme'

const Root = () => (
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Switch>
          <AuthRoute exact path={routes.home} type="private">
            <MainTemplate isColumn>
              <Dashboard />
            </MainTemplate>
          </AuthRoute>
          <AuthRoute path={routes.register}>
            <MainTemplate isColumn>
              <>
                <Heading>Po zarejestrowaniu się na Twój adres email zostanie wysłany link aktywacyjny, po kliknięciu w niego będzie możliwe zalogowanie się.</Heading>
                <AuthForm formType="register" />
              </>
            </MainTemplate>
          </AuthRoute>
          <AuthRoute>
            <MainTemplate>
              <Switch>
                <AuthRoute path={routes.add} type="private">
                  <ExpensesForm formType="add" />
                </AuthRoute>
                <AuthRoute path={routes.edit} type="private">
                  <ExpensesForm formType="edit" />
                </AuthRoute>
                <AuthRoute path={routes.editProfile} type="private">
                  <>
                    <AuthForm />
                    <CategoryPriorityTable tableType="category" />
                    <CategoryPriorityTable tableType="priority" />
                  </>
                </AuthRoute>
                <AuthRoute path={routes.editCategory} type="private">
                  <CategoryPriorityEditForm formType="category" />
                </AuthRoute>
                <AuthRoute path={routes.editPriority} type="private">
                  <CategoryPriorityEditForm formType="priority" />
                </AuthRoute>
                <AuthRoute path={routes.login} type="guest">
                  <AuthForm formType="login" />
                </AuthRoute>
                <AuthRoute path={routes.activate} type="guest">
                  <Activate />
                </AuthRoute>
              </Switch>
            </MainTemplate>
          </AuthRoute>
        </Switch>
      </ThemeProvider>
    </Router>
  </Provider>
)

export default Root;
