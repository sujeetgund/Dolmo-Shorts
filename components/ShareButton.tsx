import { FacebookShareButton, FacebookIcon, RedditShareButton, RedditIcon, TelegramShareButton, TelegramIcon, TwitterShareButton, TwitterIcon } from 'next-share'
import { useRouter } from 'next/router';
import React from 'react'



function ShareButton() {
    const router = useRouter();
    const shareUrl = `${process.env.NEXT_PUBLIC_HOST + router.asPath}`;
  return (
    <div className='flex items-center space-x-3'>
              <FacebookShareButton
                url={shareUrl}
                quote={'🔥 Dolmo Shorts is a new Indian social network for short-video lovers 💖!'}
                hashtag={'#dolmoshorts'}
              >
                <FacebookIcon size={42} round />
              </FacebookShareButton>


              <RedditShareButton
                url={shareUrl}
                title={'🔥 Dolmo Shorts is a new Indian social network for short-video lovers 💖!'}
              >
                <RedditIcon size={42} round />
              </RedditShareButton>


              <TelegramShareButton
                url={shareUrl}
                title={'🔥 Dolmo Shorts is a new Indian social network for short-video lovers 💖!'}
              >
                <TelegramIcon size={42} round />
              </TelegramShareButton>


              <TwitterShareButton
                url={shareUrl}
                title={'🔥 Dolmo Shorts is a new Indian social network for short-video lovers 💖!'}
                hashtags={['dolmoshorts', 'dolmo', 'shortvideos', 'shorts']}
              >
                <TwitterIcon size={42} round />
              </TwitterShareButton>
            </div>
  )
}

export default ShareButton