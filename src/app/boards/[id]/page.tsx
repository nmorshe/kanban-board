'use client'

import { useParams } from "next/navigation"
import { useGetColumnsBySubscription, useCreateColumnMutation, useUpdateCardPositionMutation } from "@/_generated_/graphql"
import { useState } from "react"
import { DragDropContext, DropResult } from "@hello-pangea/dnd"

import Column from "@/components/Columns"

const BoardPage = () => {
    const {id: boardId} = useParams()
    const {data, loading, error} = useGetColumnsBySubscription({
        variables: {board_id: boardId as string},
    })

    const [columnTitle, setColumnTitle] = useState('')
    const [createColumn] = useCreateColumnMutation()
    const [updateCardPositionMutation] = useUpdateCardPositionMutation()

    const handleCreateColumn = async() => {
        if (!columnTitle.trim()) {
            return
        }

        const lastPos =  data?.columns?.[data.columns.length - 1]?.position ?? 0

        await createColumn({
            variables: {
                title: columnTitle,
                position: lastPos + 1,
                board_id: boardId

            }
        })

        setColumnTitle('')
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error.message}</div>
    }

    

    const handleDragEnd = async (result: DropResult) => {
        const {destination, source, draggableId} = result

        // Dropped outside column
        if (!destination) {
            return
        }

        // Dropped back to original spot

        const sameCol = (destination?.droppableId === source.droppableId)
        const sameInd = (destination.index === source.index)

        if (sameCol && sameInd) {
            return
        }

        const newColId = destination.droppableId
        const newPos = destination.index

        try {
            await updateCardPositionMutation({
                variables: {
                    id: draggableId,
                    set: {
                        position: newPos,
                        column_id: newColId
                    }
                }
            })
        }

        catch (err) {
            console.error('Error updating card position: ', err)
        }

    }
    
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2x1 font-semibold">
                Columns for board: {boardId}
            </h1>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {data?.columns.map((col) => <Column key={col.id} column={col}/>)}
                </div>
            </DragDropContext>

            <div className="mt-6">
                <input 
                    className="border rounded p-2 mr-2"
                    placeholder="New column name"
                    value={columnTitle}
                    onChange={(e) => setColumnTitle(e.target.value)}
                />
                <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={handleCreateColumn}
                >
                    Add Column
                </button>
            </div>
        </div>
    )
}

export default BoardPage;