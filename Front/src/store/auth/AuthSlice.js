import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status:'not-authenticated',//checking, not-authenticated, authenticated
  email:null,
  displayName:null,
  errorMessage:null
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin:(state,action)=>{
      state.status = 'logged'
      state.email = action.email,
      state.displayName = action.displayName
    },

    noLogin:(state,action)=>{
      state.status = 'not-Logged'
      state.errorMessage = 'Credenciales erroneas'
    },

    setLogOut:(state,action)=>{
      state.status = 'not-Logged'
      state.errorMessage = ''
    },

    checkingCredentials:(state)=>{
        state.status = 'checking';
    }
      
    },
  },
)
export const { setLogin,noLogin,checkingCredentials,setLogOut} = AuthSlice.actions