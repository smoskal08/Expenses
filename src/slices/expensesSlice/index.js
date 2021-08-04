import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { server } from 'server'
import { endpoints } from 'endpoints'
import checkErrors from 'helpers/checkErrors'

export const getExpenses = createAsyncThunk(
  'expenses/getExpenses',
  async ({ accessToken, csrfToken }, thunkAPI) => {
    try {
      const res = await fetch(`${server}${endpoints.expenses.main}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          throw res
        })
        .then(data => data ? data : [])
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

export const addExpense = createAsyncThunk(
  'expenses/addExpense',
  async ({ price, place, category, priority, accessToken, csrfToken }, thunkAPI) => {
    try {
      console.log('add');
      await fetch(`${server}${endpoints.expenses.main}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-CSRFTOKEN': csrfToken
        },
        body: JSON.stringify({
          price,
          place,
          category,
          priority
        })
      })
        .then(res => {
          if (!res.ok) throw res
        })
        .catch(err => {
          err.json().then(errData => checkErrors(errData.detail, csrfToken, {
            price,
            place,
            category,
            priority,
            accessToken,
            csrfToken
          }, addExpense))
        })
    } catch (err) {
      console.error('Error', err.response.data)
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const editExpense = createAsyncThunk(
  'expenses/editExpense',
  async ({ id, price, place, category, priority, accessToken, csrfToken }) => {
    await fetch(`${server}${endpoints.expenses.detail}${id}`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-CSRFTOKEN': csrfToken
      },
      body: JSON.stringify({
        price,
        place,
        category,
        priority
      })
    })
      .then(res => {
        if (!res.ok) throw res
      })
      .catch(err => {
        err.json().then(errData => checkErrors(errData.detail, csrfToken, {
          id,
          price,
          place,
          category,
          priority,
          accessToken,
          csrfToken
        }, editExpense))
      })
  }
)

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async ({ id, accessToken, csrfToken }, thunkAPI) => {
    try {
      await fetch(`${server}${endpoints.expenses.detail}${id}`, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-CSRFTOKEN': csrfToken
        }
      })
        .then(res => {
          if (!res.ok) throw res
        })
        .catch(err => {
          err.json().then(errData => checkErrors(errData.detail, csrfToken, {
            id,
            accessToken,
            csrfToken
          }, deleteExpense))
        })
    } catch (err) {
      console.error('Error', err.response.data)
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

const initialState = {
  expensesList: [],
  isModalOpen: false,
  actualExpense: {}
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isModalOpen = true
      state.actualExpense = {
        id: payload.id,
        day: payload.day,
        price: payload.price,
        place: payload.place,
        category: payload.category,
        priority: payload.priority,
      }
    },
    closeModal: (state, action) => {
      state.isModalOpen = false
    }
  },
  extraReducers: {
    [getExpenses.fulfilled]: (state, { payload }) => {
      state.expensesList = payload
    }
  }
})

export const { openModal, closeModal } = expensesSlice.actions

export default expensesSlice.reducer;
