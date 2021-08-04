import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { server } from 'server'
import { endpoints } from 'endpoints'
import checkErrors from 'helpers/checkErrors'

export const authDataSend = createAsyncThunk(
  'auth/authDataSend',
  async ({ email, password, type }, thunkAPI) => {
    try {
      const res = await fetch(`${server}${endpoints.auth.[type]}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const data = await res.json()

      if (res.ok) {
        if (type === 'login') {
          localStorage.setItem('user', JSON.stringify({
            dateJoined: data.user.date_joined,
            email: data.user.email,
            firstName: data.user.first_name,
            lastName: data.user.last_name,
            id: data.user.id
          }))
        }

        return {
          data,
          type
        }
      } else {
        return thunkAPI.rejectWithValue({
          data,
          type
        })
      }
    } catch (err) {
      console.error('Error', err.response.data)
      return thunkAPI.rejectWithValue({
        ...err.response.data,
        type: 'error'
      })
    }
  }
)

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async ({ csrfToken, asyncAction, args }, thunkAPI) => {
    try {
      const res = await fetch(`${server}${endpoints.auth.refreshToken}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-type': 'charset=utf-8',
          'X-CSRFTOKEN': csrfToken
        },
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          throw res
        })
        .then(({ access_token: accessToken }) => {
          if (asyncAction) {
            thunkAPI.dispatch(asyncAction({
              ...args,
              accessToken
            }))
          }
          return accessToken
        })
        .catch(err => {
          err.json().then(errData => checkErrors(errData.detail, csrfToken))
        })
        
      return res
    } catch (err) {
      console.error('Error', err.response.data)
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const editProfile = createAsyncThunk(
  'auth/editProfile',
  async ({ firstName, lastName, csrfToken, accessToken }, thunkAPI) => {
    try {
      await fetch(`${server}${endpoints.auth.profileUpdate}`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-CSRFTOKEN': csrfToken
        },
        body: JSON.stringify({
          'first_name': firstName,
          'last_name': lastName
        })
      })
        .then(res => {
          if (!res.ok) throw res
          localStorage.setItem('user', JSON.stringify({
            ...JSON.parse(localStorage.getItem('user')),
            firstName,
            lastName
          }))
        })
        .catch(err => {
          err.json().then(errData => checkErrors(errData.detail, csrfToken, {
            firstName,
            lastName,
            accessToken,
            csrfToken
          }, editProfile))
        })
    } catch (err) {
      console.error('Error', err.response.data)
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const activateAccount = createAsyncThunk(
  'auth/activateAccount',
  async (token, thunkAPI) => {
    try {
      await fetch(`${server}${endpoints.auth.activate}${token}`)
        .then(res => res.json())
        .then(data => {
          checkErrors(data.detail)
        })
    } catch (err) {
      console.error('Error', err.response.data)
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  isAuthUser: !!localStorage.getItem('user'),
  redirectToHome: false,
  messages: [],
  accessToken: '',
  activateAccountError: false,
  isLoading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem('user')
      state.isAuthUser = !!localStorage.getItem('user')
    },
    resetMessages: (state, action) => {
      state.messages = []
    },
    activateAccountErrorChange: (state, action) => {
      state.activateAccountError = true
    }
  },
  extraReducers: {
    [authDataSend.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      if (!!payload.type) {
        if (payload.type === 'register') {
          state.messages = []
          state.activateLinkMessage = true
        } else {
          state.accessToken = payload.data.access_token
          state.isAuthUser = !!localStorage.getItem('user')
          state.user = JSON.parse(localStorage.getItem('user'))
        }
      }
    },
    [authDataSend.rejected]: (state, { payload }) => {
      state.isLoading = false
      if (!!payload.type) {
        if (payload.type === 'register') {
          for (const messageType in payload.data) {
            payload.data[messageType].forEach(message => {
              if (!state.messages.includes(message)) {
                state.messages.push(message)
              }
            })
          }
        } else {
          if (!state.messages.includes(payload.data.detail)) {
            state.messages.push(payload.data.detail)
          }
        }
      }
    },
    [authDataSend.pending]: (state, action) => {
      state.isLoading = true
    },
    [editProfile.fulfilled]: (state, { payload }) => {
      state.redirectToHome = true
      state.user = JSON.parse(localStorage.getItem('user'))
    },
    [refreshToken.fulfilled]: (state, { payload }) => {
      state.accessToken = payload
    }
  }
})

export const { logout, resetMessages, activateAccountErrorChange } = authSlice.actions

export default authSlice.reducer;
