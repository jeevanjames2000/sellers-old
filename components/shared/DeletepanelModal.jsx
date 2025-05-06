import React from 'react'

function DeletepanelModal({ message, onDelete, onCancel }) {
    return (
        <div className="p-6 md:p-8 text-center bg-white rounded-lg shadow-lg">
            <svg
                className="mx-auto mb-4 text-red-500 w-12 h-12"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
            </svg>
            <h3 className="text-xl font-bold text-gray-800">Are you sure?</h3>
            <p className="mb-6 text-lg text-gray-600">
                {message || "Do you really want to delete this item? This action cannot be undone."}
            </p>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={onDelete}
                    className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
                >
                    Delete
                </button>
                <button
                    onClick={onCancel}
                    className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition duration-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default DeletepanelModal
