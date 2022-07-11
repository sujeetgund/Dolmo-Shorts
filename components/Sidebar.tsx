import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import GoogleLogin from 'react-google-login';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';

import useAuthStore from '../store/authStore';

const Sidebar = () => {
  const [showSidebar, setshowSidebar] = useState(true);

  const { fetchAllUsers, allUsers } = useAuthStore();

  const normalLink = 'flex items-center gap-3  text-gray-700 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded-lg';

  return (
    <div>
      <div onClick={() => setshowSidebar((prev) => !prev)} className='block xl:hidden m-2 ml-4 mt-3 text-xl'>
        {showSidebar ? <ImCancelCircle className='font-bold' /> : <AiOutlineMenu />}
      </div>

      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 scrollbar-hide'>

          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href="/">
              <div className={normalLink}>
                <p className='text-2xl'><AiFillHome /></p>
                <span className='hidden xl:block text-xl'>For You</span>
              </div>
            </Link>
          </div>

          {/* discover, suggested accounts, footer */}
          <Discover />
          <SuggestedAccounts
            fetchAllUsers={fetchAllUsers}
            allUsers={allUsers}
          />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar