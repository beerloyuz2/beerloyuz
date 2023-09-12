"use client"

import { User } from "@prisma/client"
import { Upload } from "lucide-react"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback, useState } from "react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { useTheme } from "next-themes"
import { cn } from "@/libs"
import LogoutModal from "../Modals/LogoutModal"
import { Button } from "../ui/button"


declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    currentUser: User | null
    onChange: (value: string) => void;
    value: string | undefined;
    fake?: boolean
}

const ImageUpload = ({ onChange, value, currentUser, fake }: ImageUploadProps) => {

    const [isLogoutOpen, setIsLogoutOpen] = useState(false)

    const { theme } = useTheme()

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url)
    }, [onChange])

    return (
        <>
            <LogoutModal
                isOpen={isLogoutOpen}
                onClose={() => setIsLogoutOpen(false)}
            />
            <CldUploadWidget
                onUpload={handleUpload}
                uploadPreset="edpxvfde"
                options={{
                    maxFiles: 1
                }}
            >
                {({ open }) => {
                    return (
                        <div className="relative w-full min-h-[150px] flex items-center justify-center bg-secondary mb-16">
                            <div className="absolute w-32 h-32 -bottom-16 ">
                                <Button type="button" onClick={()=> setIsLogoutOpen(true)} variant="destructive" className="absolute -right-[86px] -bottom-2 w-18 h-8 text-xs">
                                    Çıkış yap
                                </Button>
                            </div>
                            {value ? (
                                <div onClick={() => {
                                    if (fake) return
                                    open?.()
                                }} className={cn("group absolute -bottom-16 flex items-center justify-center rounded-full w-32 h-32  hover:opacity-80", currentUser?.admin && "border-[4px] border-red-500")}>

                                    <Image
                                        alt="Upload"
                                        fill
                                        style={{ objectFit: "cover", cursor: "pointer", borderRadius: "50%", }}
                                        src={value}
                                    />
                                    {!fake && (
                                        <Upload className="relative opacity-0 group-hover:opacity-100 text-white transition-opacity z-10" size={20} />
                                    )}
                                </div>
                            ) : (
                                <Avatar onClick={() => {
                                    if (fake) return
                                    open?.()
                                }} className=" group absolute -bottom-16 flex items-center justify-center w-32 h-32 hover:opacity-80">
                                    <AvatarFallback className="dark:bg-white dark:text-secondary bg-primary text-secondary">
                                        {currentUser?.firstName[0].toUpperCase()}

                                    </AvatarFallback>
                                    {!fake && (
                                        <Upload className={cn("absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity z-10", theme === "dark" && "bg-white text-secondary", theme === "light" && "bg-primary text-secondary")} size={20} />

                                    )}
                                </Avatar>
                            )}
                            {currentUser?.admin && (
                                <span className='absolute text-xl font-bold text-red-500'>
                                    (ADMİN)
                                </span>
                            )}
                        </div>
                    )
                }}
            </CldUploadWidget>
        </>
    )
}

export default ImageUpload