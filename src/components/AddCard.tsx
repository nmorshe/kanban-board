'use client'
import { useState } from "react"
import { useCreateCardMutation } from "@/_generated_/graphql"

type AddCardProps = {
    columnId: string
}

const AddCard = ({columnId}: AddCardProps) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [createCard, {loading}] = useCreateCardMutation()

    const handleAddCard = async() => {
        if (!title.trim()) {
            return
        }

        try {
            await createCard({
                variables: {
                    title,
                    description,
                    column_id: columnId,
                    position: 0
                }
            })

            setTitle("")
            setDescription("")
        }

        catch (error) {
            console.error('Failed to add card: ', error)
        }
    }

    return (
        <div className="flex flex-col gap-2 mt-2">
            <input
                type="text"
                placeholder="Card Title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
            />

            <input
                type="text"
                placeholder="Description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
            />

            <button
                onClick={handleAddCard}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1 text-sm"
            >
                {loading ? 'Adding...' : 'Add Card'}
            </button>
        </div>
    )
}

export default AddCard;