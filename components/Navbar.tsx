import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoogleLogin, googleLogout } from '@react-oauth/google';


import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import Logo from '../utils/dolmo-icon.png'


import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';


const Navbar = () => {

    const { userProfile, addUser, removeUser }: any = useAuthStore();
    const [searchValue, setsearchValue] = useState('');
    const router = useRouter();

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (searchValue) {
            router.push(`/search/${searchValue}`);
        }
    }
    return (
        <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
            <Link href="/">
                <div className='w-[30px] md:w-[40px]'>
                    <Image src={Logo} className='cursor-pointer' layout='responsive' alt='Dolmo Shorts' />
                </div>
            </Link>

            <div className='relative hidden md:block'>
                <form action=""
                    onSubmit={handleSearch}
                    className='absolute md:static top-10 -left-10 bg-white'
                >
                    <input type="text"
                        placeholder='Search Accounts and Videos'
                        value={searchValue}
                        onChange={(e) => setsearchValue(e.target.value)}
                        className='bg-primary p-3 text-md font-medium border-2 border-gray-100 focus:outline-none  w-[300px] md:w-[350px] md:top-0 rounded-full'
                    />
                    <button onClick={handleSearch} className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'>
                        <BiSearch className='h-6 w-6' />
                    </button>
                </form>
            </div>

            <div>
                {userProfile ? (
                    <div className='flex gap-5 md:gap-10'>
                        <Link href='/upload'>
                            <button className='border-2 px-2 py-1 md:px-4 text-md font-semibold flex items-center gap-2 hover:bg-gray-200'>
                                <IoMdAdd className='text-xl' /> {` `}
                                <span className='hidden md:block'>Upload</span>
                            </button>
                        </Link>
                        {userProfile?.image && (
                            <Link href={`/profile/${userProfile?._id}`}>
                                <>
                                    <Image
                                        width={40}
                                        height={40}
                                        className=' rounded-full cursor-pointer'
                                        src={userProfile?.image}
                                        alt='user-profile'
                                    />
                                </>
                            </Link>
                        )}
                        <button type='button' className='px-2' onClick={() => {
                            googleLogout();
                            removeUser();
                        }}>
                            <AiOutlineLogout className='text-xl text-red-500' />
                        </button>
                    </div>
                ) : (
                    <GoogleLogin
                        onSuccess={(response => createOrGetUser(response, addUser))}
                        onError={() => console.log("Error!")}
                    />
                )}
            </div>
        </div>
    )
}

export default Navbar