import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, deleteUser, editUsers } from './Store/RTK2'
import { useForm } from 'react-hook-form'

function RTK2() {
    let dispatch = useDispatch()
    let [open, setOpen] = useState(false)

    // EDIT
    let [editingId, setEditingId] = useState(null)

    // form
    let { register, handleSubmit, reset } = useForm()

    let data = useSelector((state) => state.data.data)


    // EDIT
    let edit = (user) => {
        setEditingId(user.id)
        reset({
            name: user.name,
            age: user.age
        })
        setOpen(true)
    }

    let save = (data) => {

        if (editingId) {
            dispatch(editUsers({
                id: editingId,
                name: data.name,
                age: data.age
            }));
        } else {
            dispatch(addUser(data));
        }

        reset();
        setEditingId(null);
        setOpen(false);
    };


    return (
        <>
            <div>
                <button onClick={() => {
                    setEditingId(null);
                    reset();
                    setOpen(true);
                }}>
                    ADD USER
                </button>
                {data.map((elem) => (
                    <div key={elem.id}>
                        <h1>{elem.name}</h1>
                        <h2>{elem.age}</h2>
                        <button onClick={() => dispatch(deleteUser(elem.id))}>Delete</button>
                        <button onClick={() => edit(user)}>EDIT</button>
                    </div>
                ))}

            </div>

            {open && (
                <form onSubmit={handleSubmit(save)}>
                    <input {...register("name")} type="text" />
                    <input {...register("age")} type="text" />
                    <button type="submit">SAVE</button>
                    <button onClick={() => { setOpen(false); setEditingId(null); reset() }}>Cancel</button>
                </form>
            )}

        </>
    )
}

export default RTK2