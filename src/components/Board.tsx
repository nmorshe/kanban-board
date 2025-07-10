'use client'

import Link from "next/link"

const Board = ({board, idFunction, nameFunction}) => {
    return (
        <Link key={board.id} href={`/boards/${board.id}`}>
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{board.name}</h2>
            </div>

            <button
                onClick={(e) => {
                    e.preventDefault()
                    idFunction(board.id)
                    nameFunction(board.name)
                }}
                className="text-sm text-blue-600 underline ml-4"
            >
                Edit
            </button>
        </Link>
    )
}

export default Board