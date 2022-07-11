import React from 'react';
import { NextPage } from 'next';
import { footerList1, footerList2, footerList3 } from '../utils/constants';
import Link from 'next/link';

const List = ({ items, mt }: { items: string[], mt: Boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {items.map((item: string) => (
      <p key={item} className='text-gray-400 text-sm  hover:underline cursor-pointer' >
        {item}
      </p>
    ))}
  </div>
);

const Footer: NextPage = () => (
  <div className='mt-3 mb-0 pb-0 hidden xl:block'>
    {/* <List items={footerList1} mt={false} /> */}
    {/* <List items={footerList2} mt />
    <List items={footerList3} mt /> */}
    <p className='text-gray-600 text-sm'>&copy; {new Date().getFullYear()} Dolmo Shorts</p>
    <p className='text-gray-600 text-sm mt-2 italic'>Made with 🖤 by <a href='https://linktr.ee/sujeetgund' target='_blank' rel='noopener noreferrer'>
      <span  className='underline underline-offset-2 hover:text-pink-500 cursor-pointer'>Sujeet Gund</span>
    </a></p>
  </div>
);

export default Footer;