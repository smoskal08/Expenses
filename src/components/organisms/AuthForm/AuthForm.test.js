import { render, screen, fireEvent } from 'test-utils'
import AuthForm from './AuthForm'

describe('Auth Form', () => {
  it('Renders the component', async () => {
    render(<AuthForm formType="login" />)

    await screen.findByText(/Zaloguj się/i)
  })

  it('Changes values of inputs', async () => {
    render(<AuthForm formType="login" />)
    
    const input = screen.getByLabelText(/Adres email/i)
    
    fireEvent.change(input, { target: { value: 'abc@gmail.com' } })

    await screen.findByDisplayValue(/abc@gmail.com/i)
  })

  it('Validates the login and register form', async () => {
    render(<AuthForm formType="login" />)

    const loginInput = screen.getByLabelText(/Adres email/i)
    const passwordInput = screen.getByLabelText(/Hasło/i)
    const submitButton = screen.getByText(/Zaloguj się/i)
    
    fireEvent.click(submitButton)
    await screen.findByText(/Podaj prawidłowy adres email./i)
    await screen.findByText(/Podaj prawidłowe hasło./i)

    fireEvent.change(loginInput, { target: { value: 'abc' } })
    await screen.findByText(/Podaj prawidłowy adres email./i)

    fireEvent.change(passwordInput, { target: { value: '123' } })
    await screen.findByText(/Podaj prawidłowe hasło./i)
  })
})