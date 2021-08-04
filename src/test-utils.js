import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from 'store'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from 'assets/styles/theme'

const AllTheProviders = ({ children }) => (
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </Router>
  </Provider>
)

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
