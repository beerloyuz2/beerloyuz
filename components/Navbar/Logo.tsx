import Link from "next/link"

const Logo = () => {



    return (
        <Link href="/" className=" group relative font-extralight  md:text-xl ml-2 cursor-pointer p-1 tracking-wider" >
            <p className=" z-10 relative">
                beerloyuz<span className=" font-bold hidden sm:inline ">.com</span>
            </p>
            <div className=" absolute bg-gradient-to-r from-rose-500 via-red-400 to-red-500 h-full w-0 opacity-0 group-hover:w-full group-hover:opacity-90 group-hover:rounded-r-lg top-0 transition-all ease-in-out duration-500" />
        </Link>
    )
}

export default Logo