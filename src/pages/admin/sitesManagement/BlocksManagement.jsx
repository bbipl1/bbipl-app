import React, { useState, useEffect } from 'react';

const BlocksManagement = () => {
    const [blocks, setBlocks] = useState([]); // Holds the list of blocks
    const [newBlock, setNewBlock] = useState(''); // State for new block input
    const [editIndex, setEditIndex] = useState(null); // Index of the block being edited
    const [editValue, setEditValue] = useState(''); // Value for the block being edited

    const API_URL = 'https://your-api-url.com/api/blocks'; // Replace with your actual API endpoint

    // Fetch blocks from the API on component mount
    useEffect(() => {
        fetchBlocks();
    }, []);

    // Fetch blocks function
    const fetchBlocks = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setBlocks(data);
        } catch (error) {
            console.error("Error fetching blocks:", error);
        }
    };

    // Function to add a new block
    const addBlock = async () => {
        if (newBlock.trim()) {
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: newBlock.trim() }),
                });

                if (response.ok) {
                    setNewBlock('');
                    fetchBlocks(); // Refresh the list of blocks after adding
                }
            } catch (error) {
                console.error("Error adding block:", error);
            }
        }
    };

    // Function to update an existing block
    const updateBlock = async () => {
        if (editValue.trim()) {
            try {
                const blockId = blocks[editIndex].id; // Assuming each block has an `id` field
                const response = await fetch(`${API_URL}/${blockId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: editValue.trim() }),
                });

                if (response.ok) {
                    setEditIndex(null);
                    setEditValue('');
                    fetchBlocks(); // Refresh the list of blocks after updating
                }
            } catch (error) {
                console.error("Error updating block:", error);
            }
        }
    };

    // Function to delete a block
    const deleteBlock = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchBlocks(); // Refresh the list of blocks after deleting
            }
        } catch (error) {
            console.error("Error deleting block:", error);
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-gray-700 mb-6">Blocks Management</h1>
            <div className="mb-4 flex gap-4">
                <input
                    type="text"
                    value={editIndex !== null ? editValue : newBlock}
                    onChange={(e) =>
                        editIndex !== null ? setEditValue(e.target.value) : setNewBlock(e.target.value)
                    }
                    placeholder="Enter block name"
                    className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={editIndex !== null ? updateBlock : addBlock}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                    {editIndex !== null ? 'Update Block' : 'Add Block'}
                </button>
            </div>

            <ul className="space-y-4">
                {blocks.map((block, index) => (
                    <li key={block.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm">
                        <span className="text-gray-700">{block.name}</span>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => {
                                    setEditIndex(index);
                                    setEditValue(block.name);
                                }}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteBlock(block.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlocksManagement;
