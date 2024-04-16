import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state: { user: {} }, action) => {
            state.user = {
                ...action.payload,
            }
        },
        logout: (state: { user: {} | null }, action) => {
            state.user = null
        },
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer