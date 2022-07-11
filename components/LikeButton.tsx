import React, { useEffect, useState } from 'react'
import { MdFavorite } from 'react-icons/md'
import useAuthStore from '../store/authStore';

interface Iprops {
    handleLike: () => void;
    handleDislike: () => void;
    likes: any[];
}

function LikeButton({ handleLike, handleDislike, likes }: Iprops) {
    const [alreadyLiked, setalreadyLiked] = useState(false);
    const { userProfile }: any = useAuthStore();

    // check if current user already liked the post
    const filterLikes = likes?.filter(item => item._ref === userProfile?._id);

    useEffect(() => {
        if (filterLikes?.length > 0) {
            setalreadyLiked(true);
        } else {
            setalreadyLiked(false);
        }
    }, [likes, filterLikes]);


    return (
        <div className='flex gap-6'>
            <div className=' flex space-x-2 justify-center items-center cursor-pointer'>
                {alreadyLiked ? (
                    <div onClick={handleDislike} className='bg-primary p-2 rounded-full md:p-3 '>
                        <MdFavorite className='text-red-500 text-2xl' />
                    </div>
                ) : (
                    <div onClick={handleLike} className='bg-primary p-2 rounded-full md:p-3 '>
                        <MdFavorite className='text-gray-500 text-2xl' />
                    </div>
                )}
                <p className='font-semibold text-lg select-none'>{likes?.length | 0}</p>
            </div>
        </div>
    )
}

export default LikeButton