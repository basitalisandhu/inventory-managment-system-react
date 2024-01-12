import React from 'react'
import { FaGoogle } from "react-icons/fa";


const GoogleButton = () => {
  return (
    <div className='flex cursor-pointer justify-center items-center bg-gray-200 px-8 text-xl rounded py-2'><FaGoogle size={20} color='#F99417' className='mr-2'/>Login with Google</div>
  )
}

export default GoogleButton