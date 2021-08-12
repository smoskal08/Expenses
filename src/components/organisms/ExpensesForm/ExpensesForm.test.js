import { render, screen, fireEvent, act } from 'test-utils'
import ExpensesForm from './ExpensesForm'

describe('Expenses Form', () => {
  it('Renders the component', async () => {
    render(<ExpensesForm formType="add" />)

    await screen.findByLabelText('Cena')
  })

  it('Changes values of inputs', async () => {
    render(<ExpensesForm formType="add" />)
    
    const input = screen.getByLabelText('Cena')
    
    act(() => {
      fireEvent.change(input, { target: { value: '20' } })
    })

    await screen.findByDisplayValue('20')
  })

  it('Shows an error message when the fields are empty', async () => {
    render(<ExpensesForm formType="add" />)

    const submitButton = screen.getByTestId('submitButton')
    
    fireEvent.click(submitButton)

    await screen.findByText('Pola nie mogą być puste.')
  })
})