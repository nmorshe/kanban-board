'use client'

import { SetStateAction, Dispatch } from "react";

interface columnAttr {
    __typename?: "columns";
    id: string;
    title: string;
    position: number;
    board_id: string;
}

interface propTypes {
    columnVal: {
        __typename?: "columns";
        id: string;
        title: string;
        position: number;
        board_id: string;
    },

    deleteFunction: (column: columnAttr) => Promise<void>,

    editFunction: Dispatch<SetStateAction<boolean>>

}

const ColumnVal = ({columnVal, deleteFunction, editFunction} : propTypes) => {

    const toggleEdit = () => {
        editFunction(true)
    }

    const deleteData = () => {
        deleteFunction(columnVal)
    }

    return (
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium">{columnVal.title}</h2>
            <div className="flex gap-2">
                <button 
                    onClick={toggleEdit}
                    className="text-blue-500 text-sm"
                >
                    Edit
                </button>
                
                <button onClick={deleteData} className="text-red-500 text-sm">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ColumnVal;