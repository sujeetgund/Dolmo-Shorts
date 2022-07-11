import React, { useEffect, useState } from 'react';
import { SanityAssetDocument } from '@sanity/client';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import Head from 'next/head';


import useAuthStore from '../store/authStore';
import { client } from '../utils/client';
import { topics } from '../utils/constants';

const Upload = () => {
    const [isLoading, setisLoading] = useState(false);
    const [videoAsset, setvideoAsset] = useState<SanityAssetDocument | undefined>();
    const [caption, setcaption] = useState('');
    const [category, setcategory] = useState(topics[0].name);
    const [wrongFileType, setwrongFileType] = useState(false);
    const [savingPost, setsavingPost] = useState(false);

    const { userProfile }: { userProfile: any } = useAuthStore();
    const router = useRouter();

    const uploadVideo = (e: any) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

        if (fileTypes.includes(selectedFile.type)) {
            setisLoading(true);
            client.assets.upload("file", selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name
            })
                .then(data => {
                    setvideoAsset(data);
                    setisLoading(false);
                });

        } else {
            setisLoading(false);
            setwrongFileType(true);
        }
    }

    const handlePost = async () => {
        if (caption && videoAsset?._id && category) {
            setsavingPost(true);

            const document = {
                _type: 'post',
                caption,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset?._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id
                },
                topic: category

            }

            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/post`, document);
            router.push('/');
        }
    }

    return (
        <div className='flex h-full w-full  mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
            <Head>
                <title>Upload Video - Dolmo Shorts</title>
            </Head>
            <div className='bg-white rounded-lg p-6  flex gap-6 flex-wrap justify-center items-center'>
                <div>
                    <div>
                        <p className='text-2xl font-bold'>Upload Video</p>
                        <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
                    </div>

                    <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
                        {isLoading ? (
                            <p>Uploading...</p>
                        ) : (
                            <div>
                                {videoAsset ? (
                                    <div>
                                        <video src={videoAsset?.url} loop controls className='rounded-xl h-auto object-contain w-[200px] mt-16 bg-black'></video>
                                    </div>
                                ) : (
                                    <label className='cursor-pointer'>
                                        <div className='flex flex-col items-center h-full'>

                                            <div className='flex flex-col items-center'>
                                                <p className='font-bold text-xl'>
                                                    <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                                                </p>
                                                <p className='text-xl font-semibold'>
                                                    Upload Video
                                                </p>
                                            </div>
                                            <p className='text-sm text-gray-400 text-center mt-10'>
                                                MP4 or WebM or ogg <br />
                                                720x1280 or higher <br />
                                                Upto 10 minutes <br />
                                                Less than 2GB
                                            </p>
                                            <p className='bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 outline-none w-52'>Select File</p>
                                        </div>
                                        <input type="file" name="upload-video" onChange={uploadVideo} className='w-0 h-0' id="" required />
                                    </label>
                                )}
                            </div>
                        )}

                        {wrongFileType && (
                            <p className='text-red-500 text-center'>Please select a video file!</p>
                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-3 pb-10'>
                    <label htmlFor="caption" className='text-md font-medium select-none'>Caption</label>
                    <input type="text" name="" value={caption} onChange={(e) => setcaption(e.target.value)} className='rounded outline-none text-md border-2 border-gray-200 p-1 focus:border-[#F51997] select-none' id="" />

                    <label htmlFor="topic" className='text-md font-medium select-none'>Choose Topic</label>
                    <select name="" className='rounded outline-none text-md border-2 border-gray-200 p-1 focus:border-[#F51997] select-none capitalize' value={category} onChange={(e) => setcategory(e.target.value)} id="">
                        {topics.map(topic => (
                            <option value={topic.name} key={topic.name}>{topic.name}</option>
                        ))}
                    </select>

                    <div className='flex gap-6 mt-10'>
                        <button type='button' onClick={() => { }} className='border-gray-300 border-2 text-md font-medium p-2 rounded px-10 py-2 outline-none'>Discard</button>

                        <button type='button' onClick={handlePost} className='text-white bg-[#F51997] text-md font-medium p-2 rounded px-10 py-2 outline-none'>Post</button>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Upload