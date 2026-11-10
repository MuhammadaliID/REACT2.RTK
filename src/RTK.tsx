import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, deleteUser, editUser, getUsers } from './Store/RTK'
import { useForm } from 'react-hook-form'

function RTK() {
    let dispatch = useDispatch()
    let [open, setOpen] = useState(false)
    // EDIT
    let [editingId, setEditingId] = useState(null)

    let { register, handleSubmit, reset } = useForm()

    // EDIT
    let edit = (user) => {
        setEditingId(user.id);
        reset({
            name: user.name,
            age: user.age
        })
        setOpen(true)
    }

    let save = (data) => {
        if (editingId) {
            dispatch(editUser({
                id: editingId,
                name: data.name,
                age: data.age
            }))
        }
        else {
            dispatch(addUser(data))
            
        }
        reset()
        setEditingId(null)
        setOpen(false)
    }




    let { users } = useSelector((state) => state.users)
    return (
        <div>
            <button onClick={() => setOpen(true)}>ADD+</button>
            {users.map((user) => (
                <div key={user.id}>
                    <h2>{user.name}</h2>
                    <p>{user.age}</p>
                    <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
                    <button onClick={() => edit(user)}>EDIT</button>
                </div>
            ))}

            {open && (
                <form onSubmit={handleSubmit(save)}>
                    <input {...register("name")} type="text" />
                    <input {...register("age")} type="text" />
                    <button type="submit">SAVE</button>
                    <button onClick={() => { setOpen(false); reset() }}>Cancel</button>
                </form>
            )}

        </div>
    )
}

export default RTK