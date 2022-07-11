import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Head from 'next/head';


import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setisSSR] = useState(true);

  useEffect(() => {
    setisSSR(false);
  }, [])

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
      <Head>
        <link rel="shortcut icon" href="/dolmo-icon.png" type="image/x-icon" />
      </Head>

      <div className='xl:w-[1200px] m-auto h-[100vh] overflow-hidden'>
        <Navbar />
        <div className='flex gap-6 md:gap-20'>
          <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
            {/* sidebar */}
            <Sidebar />
          </div>
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
            <Component {...pageProps} />
          </div>
        </div>
      </div>

    </GoogleOAuthProvider>
  )
}

export default MyApp
