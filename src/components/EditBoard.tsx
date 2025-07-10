'use client'

const EditBoard = ({editName, handleSave, idFunction, nameFunction}) => {
    
    const saveData = () => {
        handleSave()
    }

    const changeName = (e) =>{
        nameFunction(e.target.value)
    }

    const resetId = () => {
        idFunction(null)
    }

    return (
        <>
            <input
                type="text"
                value={editName}
                onChange={changeName}
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