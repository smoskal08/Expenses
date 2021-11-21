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

export const addCategory = createAsyncThunk(
  'expenses/addCategory',
  async ({ name, accessToken, csrfToken }, thunkAPI) => {
    try {
      await fetch(`${server}${endpoints.expenses.category}`, {
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
          name
        })
      })
        .then(res => {
          if (!res.ok) throw res
        })
        .catch(err => {
          err.json().then(errData => checkErrors(errData.detail, csrfToken, {
            name,
            accessToken,
            csrfToken
          }, addCategory))
        })
    } catch (err) {
      console.error('Error', err.response.data)
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const getCategory = createAsyncThunk(
  'expenses/getCategory',
  async ({ accessToken, csrfToken }, thunkAPI) => {
    try {
      const res = await fetch(`${server}${endpoints.expenses.category}`, {
        method: 'GET',
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
          return res.json()
        })
        .catch(err => {
          err.json().then(errData => checkErrors(errData.detail, csrfToken, {
            accessToken,
            csrfToken
          }, getCategory))
        })
      
      return res
    } catch (err) {
      console.error('Error', err.response.data)
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const addPriority = createAsyncThunk(
  'expenses/addPriority',
  async ({ name, accessToken, csrfToken }, thunkAPI) => {
    try {
      await fetch(`${server}${endpoints.expenses.priority}`, {
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
          name
        })
      })
        .then(res => {
          if (!res.ok) throw res
        })
        .catch(err => {
          err.json().then(errData => checkErrors(errData.detail, csrfToken, {
            name,
            accessToken,
            csrfToken
          }, addPriority))
        })
    } catch (err) {
      console.error('Error', err.response.data)
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const getPriority = createAsyncThunk(
  'expenses/getPriority',
  async ({ accessToken, csrfToken }, thunkAPI) => {
    try {
      const res = await fetch(`${server}${endpoints.expenses.priority}`, {
        method: 'GET',
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
          return res.json()
        })
        .catch(err => {
          err.json().then(errData => checkErrors(errData.detail, csrfToken, {
            accessToken,
            csrfToken
          }, getPriority))
        })

      return res
    } catch (err) {
      console.error('Error', err.response.data)
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

const initialState = {
  expensesList: [],
  isDeleteModalOpen: false,
  actualExpense: {},
  isCategoryPriorityModalOpen: false,
  categoryPriorityModalType: '',
  categories: [],
  priorities: [],
  addCategoryOrPriority: false
}

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    openDeleteModal: (state, { payload }) => {
      console.log(payload)
      state.isDeleteModalOpen = true
      state.actualExpense = {
        id: payload.id,
        day: payload.day,
        price: payload.price,
        place: payload.place,
        category: payload.categoryName,
        priority: payload.priorityName,
      }
    },
    closeDeleteModal: (state, action) => {
      state.isDeleteModalOpen = false
    },
    openCategoryPriorityModal: (state, { payload }) => {
      state.isCategoryPriorityModalOpen = true
      state.categoryPriorityModalType = payload
    },
    closeCategoryPriorityModal: (state, action) => {
      state.isCategoryPriorityModalOpen = false
    },
  },
  extraReducers: {
    [getExpenses.fulfilled]: (state, { payload }) => {
      state.expensesList = payload ? payload.reverse() : []
    },
    [getCategory.fulfilled]: (state, { payload }) => {
      state.categories = payload ? payload : []
    },
    [getPriority.fulfilled]: (state, { payload }) => {
      state.priorities = payload ? payload : []
    },
    [addCategory.fulfilled]: (state, action) => {
      state.addCategoryOrPriority = !state.addCategoryOrPriority
    },
    [addPriority.fulfilled]: (state, action) => {
      state.addCategoryOrPriority = !state.addCategoryOrPriority
    },
  }
})

export const { openDeleteModal, closeDeleteModal, openCategoryPriorityModal, closeCategoryPriorityModal } = expensesSlice.actions

export default expensesSlice.reducer;
