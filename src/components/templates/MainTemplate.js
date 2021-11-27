import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Navigation from 'components/organisms/Navigation/Navigation'
import ExpensesDeleteModal from 'components/molecules/ExpensesDeleteModal/ExpensesDeleteModal'
import CategoryPriorityModal from 'components/molecules/CategoryPriorityModal/CategoryPriorityModal'
import CategoryPriorityDeleteModal from 'components/molecules/CategoryPriorityDeleteModal/CategoryPriorityDeleteModal'
import { routes } from 'routes'
import { StyledWrapper, Main } from './MainTemplate.styles'

const MainTemplate = ({ children, ...props }) => {
  const isExpensesDeleteModalOpen = useSelector(state => state.expenses.isExpensesDeleteModalOpen)
  const isCategoryPriorityModalOpen = useSelector(state => state.expenses.isCategoryPriorityModalOpen)
  const isCategoryPriorityDeleteModalOpen = useSelector(state => state.expenses.isCategoryPriorityDeleteModalOpen)

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
          path={routes.editCategory}
          component={() => <Navigation route="edit-category" />}
        />
        <Route
          path={routes.editPriority}
          component={() => <Navigation route="edit-priority" />}
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
      <Main {...props}>
        { isExpensesDeleteModalOpen && <ExpensesDeleteModal /> }
        { isCategoryPriorityModalOpen && <CategoryPriorityModal /> }
        { isCategoryPriorityDeleteModalOpen && <CategoryPriorityDeleteModal /> }
        { children }
      </Main>
    </StyledWrapper>
  )
}

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
}

export default MainTemplate;
