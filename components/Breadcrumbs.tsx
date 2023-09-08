

import Image from 'next/image';
import Link from 'next/link'

import React from 'react'

interface BreadcrumbsProps {
    name: string;
    href: string;
}

const Breadcrumbs = ({ name, href }: BreadcrumbsProps) => {


    return (
        <div className=' relative h-[200px] w-full flex justify-center '>
            <div className='max-w-[1250px] w-full h-full flex flex-col items-start justify-center'>
                <div className=' z-10 pl-4'>
                    <p className='text-3xl'>
                        {name}
                    </p>
                    <Link href="/" className='hover:underline'>
                        Anasayfa
                    </Link>
                    <span className='  text-sm'>{" > "}</span>
                    <Link href={href} className='hover:underline' >
                        {name}
                    </Link>
                </div>
                <Image
                    alt='crumb'
                    src="/crumb.jpg"
                    fill
                    className="object-cover opacity-70 right-0"
                />
            </div>
        </div>
    )
}

export default Breadcrumbs