import { configureStore, createSlice } from "@reduxjs/toolkit";
import { editUser } from "./RTK";



let dataSlice = createSlice({
    name: "data",

    initialState: {
        data: [
            { id: 1, name: "Muhammadali", age: 19 },
            { id: 2, name: "Ibrohim", age: 20 }
        ]
    },
    reducers: {
        getUser: (state) => {
            return state
        },

        deleteUser: (state, action) => {
            state.data = state.data.filter((elem) => elem.id != action.payload)
        },

        addUser: (state, action) => {
            state.data.push({
                id: Date.now(),
                name: action.payload.name,
                age: Number(action.payload.age)
            })
        },

        editUsers: (state, action) => {
            let user = state.data.find((elem) => elem.id === action.payload.id)

            if (user) {
                user.name = action.payload.name,
                    user.age = Number(action.payload.age);
            }
        }
    }
})

export let { getUser, deleteUser, addUser, editUsers } = dataSlice.actions

export let store = configureStore({
    reducer: {
        data: dataSlice.reducer
    }
});