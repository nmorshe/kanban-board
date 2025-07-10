'use client'

import { useGetBoardsQuery, useCreateBoardMutation, useUpdateBoardMutation, useDeleteBoardMutation } from "@/_generated_/graphql";
import { useUserData } from "@nhost/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SignOutButton from "@/components/SignOut";
import EditBoard from "@/components/EditBoard";
import Board from "@/components/Board";

const BoardsList = () => {

    // Setting board name
    const [boardName, setBoardName] = useState('')

    // Fetching board query information
    const {data, loading, error, refetch} = useGetBoardsQuery()
    
    // Creating new board
    const [createBoard, {loading: creating}] = useCreateBoardMutation()
    
    // Updating board function and values (name, id)
    const [updateBoard] = useUpdateBoardMutation()
    const [editingBoardId, setEditingBoardId] = useState<string | null>(null)
    const [editingBoardName, setEditingBoardName] = useState('')

    // Deleting the board
    const [deleteBoard] = useDeleteBoardMutation()

    const user = useUserData()
    const router = useRouter()

    useEffect(() => {

        if (!user) {
            router.push('/auth')
        }
    }, [user, router])

    const handleCreateBoard = async(e: React.FormEvent) => {
        e.preventDefault()

        if (!boardName.trim()) {
            return
        }

        await createBoard ({
            variables: {name: boardName}
        })

        setBoardName('')
        refetch()
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error.message}</div>
    }

    const handleSave = async() => {
        if (!editingBoardName.trim()) {
            return;
        }

        await updateBoard({
            variables: {
                id: editingBoardId,
                name: editingBoardName
            }
        })

        setEditingBoardId(null)
        setEditingBoardName('')
        refetch()
    }

    const handleDelete = async(id: string) => {
        const confirmed = window.confirm('Deleting this board. Are you sure?')

        if (!confirmed) {
            return;
        }

        await deleteBoard({variables: {id}})
        refetch()
    }

    const renderListItem = (board) => {

        const isEditing = editingBoardId === board.id

        return (

            <li key={board.id}>
                <div className="p-4 border rounded shadow hover:bg-gray-100">

                    <div className="flex-grow">
                    
                        {isEditing ? (<EditBoard 
                                        editName={editingBoardName} 
                                        handleSave={handleSave} 
                                        idFunction={setEditingBoardId} 
                                        nameFunction={setEditingBoardName}/>) :
                                    (<Board board={board} 
                                        idFunction={setEditingBoardId} 
                                        nameFunction={setEditingBoardName} />)}

                    </div>

                    <button
                        className="ml-4 text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(board.id)}
                    >
                        Delete
                    </button>
                </div>
            </li>
        )
    }


    return (
        <div className="p-4">

            <SignOutButton />

            <h1 className="text-xl font-semibold">Your Boards</h1>
            
            <form onSubmit={handleCreateBoard} className="mb-6 flex-gap-2">
                <input
                    type="text"
                    className="border rounded px-2 py-1"
                    placeholder="New board name"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    disabled={creating}
                >
                    {creating ? 'Creating...' : 'Create'}
                </button>

            </form>

            <ul className="mt-4 space-y-2">
                {data?.boards.map(board => renderListItem(board))}
            </ul>
        </div>
    )
}

export default BoardsList;