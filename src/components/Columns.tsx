'use client'

import { useGetCardsBySubscription, useUpdateColumnMutation, useDeleteColumnMutation } from "@/_generated_/graphql"
import { Droppable, Draggable } from "@hello-pangea/dnd"

import AddCard from "./AddCard"
import { useState } from "react"
import EditColumn from "./EditColumn"
import ColumnVal from "./ColumnVal"
import CardItem from "./CardItem"

interface columnAttr {
    __typename?: "columns";
    id: string;
    title: string;
    position: number;
    board_id: string;
}

interface cardAttr {
    __typename?: "cards";
    id: string;
    title: string;
    description?: string | null | undefined;
    position: number;
    column_id: string;
}

interface col {
    column: columnAttr
}



const Column = ({column}: col) => {

    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(column.title)

    const [updateColumn] = useUpdateColumnMutation()
    const [deleteColumn] = useDeleteColumnMutation()
    
    const handleSave = async(column: columnAttr) => {
        await updateColumn({
            variables: {
                id: column.id,
                title
            },

            refetchQueries: ['GetColumns']
        })

        setIsEditing(false)
        
    }

    const handleDelete = async(column: columnAttr) => {
        const confirmed = window.confirm('Deleting this column. Are you sure?')

        if (!confirmed) {
            return;
        }

        await deleteColumn({
            variables: {id: column.id},
            refetchQueries: ['GetColumns']
        })
    }

    const renderListItem = (elem: cardAttr, index: number) => {

        return (

            <Draggable key={elem.id} draggableId={elem.id} index={index}>
                {(provided) => (
                    <CardItem key={elem.id} card={elem} provided={provided} />
                )}
            </Draggable>
            
        )
    }
    
    const {data, loading, error} = useGetCardsBySubscription({
        variables: {column_id: column.id}
    })

    if (loading) {
        return <div>Loading cards, please wait...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 min-w-[200px]">

            {
                isEditing ? (<EditColumn columnVal={column} 
                                         mainTitle={title}
                                         updateTitle={setTitle}
                                         saveFunction={handleSave}
                                         editFunction={setIsEditing}  />) : 

                            (<ColumnVal columnVal={column}
                                        deleteFunction={handleDelete}
                                        editFunction={setIsEditing} />)
            }

            <Droppable droppableId={column.id} isDropDisabled={false}>
                {(provided) => (
                    <ul 
                        {...provided.droppableProps}
                        ref={provided.innerRef} 
                        className="space-y-2 min-h-[100px] border border-dashed border-gray-300" 
                    >
                        {data?.cards.map((card, index) => renderListItem(card, index))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
            

            <AddCard columnId={column.id} />
        </div>
    )
}

export default Column;