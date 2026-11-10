import { configureStore, createSlice } from "@reduxjs/toolkit";

let userSlice = createSlice({
    name: "users",

    initialState: {
        users: [
            { id: 1, name: "Muhammadali", age: 19 },
            { id: 2, name: "Ibrohim", age: 20 }
        ]
    },

    reducers: {
        getUsers: (state) => {
            return state;
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user.id != action.payload)
        },

        addUser: (state, action) => {
            state.users.push({
                id: Date.now(),
                name: action.payload.name,
                age: Number(action.payload.age)
            })
        },

        editUser: (state, action) => {
            let user = state.users.find((user) => user.id === action.payload.id)

            if (user) {
                user.name = action.payload.name;
                user.age = Number(action.payload.age);
            }
        }
    }
});

export let { getUsers, deleteUser, addUser,editUser } = userSlice.actions;

export let store = configureStore({
    reducer: {
        users: userSlice.reducer
    }
});