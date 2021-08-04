import store from 'store'
import { logout, refreshToken, activateAccountErrorChange } from 'slices/authSlice'

const checkErrors = (err, csrfToken, args, asyncAction=false) => {
  switch (err) {
    case 'Authentication credentials were not provided.':
    case 'Expired refresh token, please login again.':
    case 'CSRF Failed: CSRF cookie not set.':
    case 'CSRF Failed: CSRF token missing or incorrect.':
      store.dispatch(logout())
      break
    case 'Token prefix missing':
    case 'access_token expired':
      store.dispatch(refreshToken({ csrfToken, asyncAction, args }))
      break
    case 'No account to activate':
      store.dispatch(activateAccountErrorChange())
      break
    default:
      return err
  }
}

export default checkErrors;
