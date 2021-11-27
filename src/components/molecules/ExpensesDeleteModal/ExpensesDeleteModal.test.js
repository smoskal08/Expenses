import { render, screen, fireEvent } from 'test-utils'
import TableRow from 'components/molecules/ExpensesTableRow/ExpensesTableRow'
import MainTemplate from 'components/templates/MainTemplate'

describe('Modal', () => {  
  it('Shows values of the expense', async () => {
    render(
      <MainTemplate>
        <table>
          <tbody>
            <TableRow id={1} day="2021-12-08" price="25" place="Tesco" category={2} priority={3} />
          </tbody>
        </table>
      </MainTemplate>
    )

    const deleteButton = screen.getByTestId(/deleteButton/i)
    fireEvent.click(deleteButton)

    await screen.findByText(/dnia 2021-12-08/i)
  })

  it('Closes the modal when the "No" button is clicked', async () => {
    render(
      <MainTemplate>
        <table>
          <tbody>
            <TableRow id={1} day="2021-12-08" price="25" place="Tesco" category={2} priority={3} />
          </tbody>
        </table>
      </MainTemplate>
    )

    const deleteButton = screen.getByTestId(/deleteButton/i)
    fireEvent.click(deleteButton)

    const closeButton = screen.getByText(/Nie/i)
    fireEvent.click(closeButton)

    await expect(screen.queryByText(/Czy/i)).toBeNull()
  })
})