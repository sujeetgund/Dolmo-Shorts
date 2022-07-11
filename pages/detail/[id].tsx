import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

import { MdOutlineCancel } from 'react-icons/md'
import { GoVerified } from 'react-icons/go'
import { BsPlayFill } from 'react-icons/bs'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi'

import useAuthStore from '../../store/authStore'

import LikeButton from '../../components/LikeButton'
import Comments from '../../components/Comments'
import ShareButton from '../../components/ShareButton'



import { Video } from '../../types'
interface Iprops {
  postDetails: Video
}

function PostDetail({ postDetails }: Iprops) {
  const [post, setPost] = useState(postDetails);
  const [isPlaying, setisPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();
  // console.log(post)

  const { userProfile }: any = useAuthStore();

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setisPlaying(false);
    } else {
      videoRef?.current?.play();
      setisPlaying(true);
    }
  }

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted, post]);

  if (!post) return;


  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      });

      setPost({ ...post, likes: data.likes });
    }

  }

  // add a comment 
  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        const res = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        });

        setPost({ ...post, comments: res.data.comments });
        setComment('');
        setIsPostingComment(false);
      }
    }
  };
 


  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      <Head>
        <title>{post.caption}</title>
      </Head>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black'>

        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer' onClick={() => router.back()}>
            <MdOutlineCancel className='text-white text-[35px]' />
          </p>
        </div>

        <div className='relative'>
          <div className='h-[60vh] lg:h-[100vh]'>
            <video
              src={post.video.asset.url}
              className='h-full'
              ref={videoRef}
              loop
              onClick={onVideoClick}
            >
            </video>
          </div>

          <div className='absolute top-[45%] left-[45%]'>
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsPlayFill className='text-white text-6xl lg:text-8xl cursor-pointer' />
              </button>
            )}
          </div>
        </div>

        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
            </button>
          )}
        </div>

      </div>

      {/* right side */}
      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='lg:mt-14 mt-10 '>

          {/* posted by  */}
          <div className='flex gap-3 p-2 rounded '>
            <div className='ml-4 md:w-14 md:h-14 w-16 h-16'>
              <Link href='/'>
                <>
                  <Image
                    width={30}
                    height={30}
                    className=' rounded-full'
                    src={post?.postedBy?.image}
                    alt='user-profile'
                    layout='responsive'
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href={`/`}>
                <div className='flex flex-col gap-1'>
                  <p className='flex gap-2 items-center md:text-md lg:text-lg font-bold text-primary'>
                    {post?.postedBy.userName}{' '}
                    <GoVerified className='text-blue-400 text-md' />
                  </p>
                  <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                    {post?.postedBy.userName}
                  </p>
                </div>
              </Link>

              {/* caption */}
              <p className='mt-5 font-normal text-xl '>{post?.caption}</p>
            </div>
          </div>

          {/* like button */}
          <div className='mt-10 px-10 flex justify-between items-center'>
            {userProfile && (
              <>
                <LikeButton
                  handleLike={() => handleLike(true)}
                  handleDislike={() => handleLike(false)}
                  likes={post?.likes}
                />
              </>
            )}
            <ShareButton />
          </div>

          {/* comment section */}
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />

        </div>
      </div>

    </div>
  )
}


export const getServerSideProps = async ({ params: { id } }: {
  params: { id: string }
}) => {

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/post/${id}`)
  return {
    props: {
      postDetails: data
    },
  }
}

export default PostDetail