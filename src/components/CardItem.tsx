'use client'

import { useState, Dispatch, SetStateAction } from "react"
import { useUpdateCardMutation, useDeleteCardMutation } from "@/_generated_/graphql"
import { DraggableProvided } from "@hello-pangea/dnd"

interface cardAttr {
    __typename?: "cards";
    id: string;
    title: string;
    description?: string | null | undefined;
    position: number;
    column_id: string;
}

interface EditCardProps {
    card: cardAttr,
    titleVal: string,
    descVal?: string | null | undefined,
    saveFunc: (card: cardAttr) => Promise<void>,
    descFunc: Dispatch<SetStateAction<string>>,
    titleFunc: Dispatch<SetStateAction<string>>,
    editFunc: Dispatch<SetStateAction<boolean>>
}

interface CardItemProps {
    card: cardAttr,
    provided: DraggableProvided
}

interface CardDataProps {
    card: cardAttr,
    editFunc: Dispatch<SetStateAction<boolean>>,
    deleteFunc: (card: cardAttr) => Promise<void>
}

const EditCard = ({card, titleVal, descVal, saveFunc, titleFunc, descFunc, editFunc}: EditCardProps) => {

    const saveData = () => {
        saveFunc(card)
    }

    const editTitle = (newTitle: string) => {
        titleFunc(newTitle)
    }

    const editDesc = (newDesc: string) => {
        descFunc(newDesc)
    }

    const toggleEdit = () => {
        editFunc(false)
    }

    return (
        <>
            <input 
                className="mb-1 border px-2 py-1 w-full"
                value={titleVal}
                onChange={(e) => editTitle(e.target.value)}
            />
            <textarea 
                className="mb-2 border px-2 py-1 w-full"
                value={descVal ?? ""}
                onChange={(e) => editDesc(e.target.value)}
            />

            <div className="flex gap-2">
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={saveData}
                >
                    Save
                </button>
                <button
                    className="bg-gray-300 px-2 py-1 rounded"
                    onClick={toggleEdit}
                >
                    Cancel
                </button>
            </div>
        </>
    )

}

const CardData = ({card, editFunc, deleteFunc} : CardDataProps) => {

    const toggleEdit = () => {
        editFunc(true)
    }

    const deleteData = () => {
        deleteFunc(card)
    }

    return (
        <>
            <h3 className="font-semibold">{card.title}</h3>
            <p className="text-sm">{card.description}</p>
            <div className="mt-2 flex gap-2">
                <button 
                    className="text-blue-500 text-sm"
                    onClick={toggleEdit}
                >
                    Edit
                </button>
                <button 
                    className="text-red-500 text-sm"
                    onClick={deleteData}
                >
                    Delete
                </button>
            </div>
        </>
    )
}

const CardItem = ({card, provided}: CardItemProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(card.title)
    const [description, setDescription] = useState(card.description ?? "")

    const [updateCard] = useUpdateCardMutation()
    const [deleteCard] = useDeleteCardMutation()

    const handleSave = async(card: cardAttr) => {
        await updateCard({
            variables: {
                id: card.id,
                title,
                description,
                position: card.position,
                column_id: card.column_id
            },

            refetchQueries: ['GetCards']
        })

        setIsEditing(false)
    }

    const handleDelete = async(card: cardAttr) => {
        
        const confirmDelete = window.confirm("Delete this card?")
        
        if (!confirmDelete) {
            return
        }

        await deleteCard({
            variables: {
                id: card.id
            },

            refetchQueries: ['GetCards']
        })
    }

    return (
        <li 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            key={card.id}
            className="bg-white rounded-lg shadow-md p-4 min-w-[200px]"
        >
            {isEditing ? (<EditCard card={card} 
                                    titleVal={title} 
                                    descVal={description}
                                    saveFunc={handleSave}
                                    descFunc={setDescription}
                                    titleFunc={setTitle}
                                    editFunc={setIsEditing} />) :
                                    
                           <CardData card={card}
                                 editFunc={setIsEditing}
                                 deleteFunc={handleDelete}/>}
        </li>
    )
}

export default CardItem