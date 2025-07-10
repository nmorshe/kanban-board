'use client'

const EditColumn = ({columnVal, mainTitle, updateTitle, saveFunction, editFunction}) => {

    const saveData = () => {
        saveFunction(columnVal)
    }

    const changeTitle = (newTitle) => {
        updateTitle(newTitle)
    }

    const cancelEdit = () => {
        editFunction(false)
    }

    return (
        <div className="mb-2">
            <input 
                value={mainTitle}
                onChange={(e) => {changeTitle(e.target.value)}}
                className="border rounded px-2 py-1 w-full"
            />

            <div className="flex gap-2 mt-2">
                <button 
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={saveData}
                >
                    Save
                </button>

                <button 
                    className="bg-gray-300 px-2 py-1 rounded"
                    onClick={cancelEdit}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default EditColumn;