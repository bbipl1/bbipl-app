import React from 'react';

const ImageShow = ({url,setIsURL}) => {

    const paymentNotDone=()=>{
        setIsURL(null)
    }
    const paymentDone=()=>{
        setIsURL(null)
    }
    return (
        <div className='bg-slate-100 fixed left-1/3 top-28 w-1/2 h-3/4 p-4 border border-spacing-16 border-blue-300 rounded-lg'>
            <div className='flex justify-center items-center p-4'>
            <img className='w-96 h-96' src={`${url}`} alt={`${url}`} />
            </div>
            <div className='flex flex-row justify-evenly mt-8'>
                <button onClick={()=>{paymentNotDone()}} className='bg-red-500 p-2 rounded-lg w-48 text-white'>Payment Not Done</button>
                <button onClick={()=>{paymentDone()}} className='bg-green-500 p-2 rounded-lg w-48 text-white' >Payment Done</button>
            </div>
        </div>
    );
};

export default ImageShow;