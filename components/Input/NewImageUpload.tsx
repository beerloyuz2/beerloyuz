"use client"

import { useEffect, useState } from "react";

import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const NewImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, value, onRemove }) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    if (!isMounted) {
        return null;
    }

    const actionLabel = () => {
        if (value.length === 0) return "Resim ekle"
        if (value.length === 1) return "Resimi değiştir"
        if (value.length > 1) return "Resim ekle / değiştir"
    }

    return (
        <div >
            <div className="mb-4 flex items-center gap-2 flex-wrap">
                {value.map((url) => (
                    <div key={url} className=" relative w-[100px] h-[100px] rounded-md overflow-hidden">
                        <div className=" z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                                <Trash className=" h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className=" object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <div className="flex flex-col">
                <CldUploadWidget onUpload={onUpload} uploadPreset="bzozeyuo">
                    {({ open }) => {
                        const onClick = () => {
                            open()
                        }

                        return (
                            <Button
                                disabled={disabled}
                                type="button"
                                variant="secondary"
                                onClick={onClick}
                            >
                                <ImagePlus className=" h-4 w-4 mr-2" />
                                {actionLabel()}
                            </Button>
                        )
                    }}
                </CldUploadWidget>
            </div>
        </div>
    )
}

export default NewImageUpload