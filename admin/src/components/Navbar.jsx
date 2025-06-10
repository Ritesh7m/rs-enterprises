import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between bg-[#23066d] text-white shadow-md'>
      <img
        className='w-[max(1%,60px)] h-[60px] rounded-full object-cover'
        src={assets.logo}
        alt="Logo"
      />
      <button onClick={()=> setToken('')} className='bg-white text-[#23066d] px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm font-medium'>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
