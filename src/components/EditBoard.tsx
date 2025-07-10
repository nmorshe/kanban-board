'use client'

interface propTypes {
    editName: string,
    handleSave: () => Promise<void>,
    idFunction: React.Dispatch<React.SetStateAction<string | null>>,
    nameFunction: React.Dispatch<React.SetStateAction<string>>
}

const EditBoard = ({editName, handleSave, idFunction, nameFunction}: propTypes) => {
    
    const saveData = () => {
        handleSave()
    }

    const changeName = (val: string) =>{
        nameFunction(val)
    }

    const resetId = () => {
        idFunction(null)
    }

    return (
        <>
            <input
                type="text"
                value={editName}
                onChange={(e) => changeName(e.target.value)}
                className="border px-2 py-1 rounded mr-2"
            />

            <button
                onClick={saveData}
                className="bg-green-600 text-white px-2 py-1 rounded mr-2"
            >
                Save
            </button>

            <button
                onClick={() => resetId()}
            >
                Cancel
            </button>
        </>
    )
}

export default EditBoard;