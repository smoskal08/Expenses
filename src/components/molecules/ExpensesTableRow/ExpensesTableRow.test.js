import { render, screen, fireEvent } from 'test-utils'
import { Switch } from 'react-router-dom'
import TableRow from './ExpensesTableRow'
import AuthRoute from 'components/molecules/AuthRoute/AuthRoute'
import MainTemplate from 'components/templates/MainTemplate'
import ExpensesForm from 'components/organisms/ExpensesForm/ExpensesForm'
import { routes } from 'routes'

describe('Table Row', () => {
  it('Renders the component', async () => {
    render(
      <table>
        <tbody>
          <TableRow id={1} day="2021-12-08" price="25" place="Tesco" category={2} priority={3} />
        </tbody>
      </table>
    )

    await screen.findByText(/Tesco/i)
  })

  it('Shows the edit screen', async () => {
    render(
      <Switch>
        <AuthRoute path={routes.edit} type="guest">
          <ExpensesForm formType="edit" />
        </AuthRoute>
        <AuthRoute path={routes.home} type="guest">
          <MainTemplate>
            <table>
              <tbody>
                <TableRow id={1} day="2021-12-08" price="25" place="Tesco" category={2} priority={3} />
              </tbody>
            </table>
          </MainTemplate>
        </AuthRoute>
      </Switch>
    )
    
    const editButton = screen.getByTestId('editButton')
    fireEvent.click(editButton)

    await screen.findByLabelText(/Cena/i)
  })

  it('Opens the modal', async () => {
    render(
      <>
        <MainTemplate>
          <table>
            <tbody>
              <TableRow id={1} day="2021-12-08" price="25" place="Tesco" category={2} priority={3} />
            </tbody>
          </table>
        </MainTemplate>
      </>
    )

    const deleteButton = screen.getByTestId('deleteButton')
    fireEvent.click(deleteButton)

    await screen.findByText(/Czy na pewno/i)
  })
})