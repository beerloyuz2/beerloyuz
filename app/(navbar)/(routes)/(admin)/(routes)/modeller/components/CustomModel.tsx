"use client"

import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Pencil } from 'lucide-react'
import NewModelsModal from './NewModelsModal'
import { Card, CardHeader } from '@/components/ui/card'
import { Model } from '@prisma/client'

interface CustomModelProps {
    model: Model
}

const CustomModel: React.FC<CustomModelProps> = ({ model }) => {

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)

    return (
        <>
            <NewModelsModal
                model={model}
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                Delete
            />
            <NewModelsModal
                model={model}
                isOpen={isUpdateOpen}
                onClose={() => setIsUpdateOpen(false)}
                Update
            />
            <Card className=' relative m-3'>
                <CardHeader className=' p-10'>
                    <p className=' text-center font-bold'>
                        {model.name}
                    </p>
                </CardHeader>
                <AiOutlineClose className=' absolute top-1 right-1 cursor-pointer' size={18} onClick={() => setIsDeleteOpen(true)} />
                <Pencil className=' absolute top-1 right-7 cursor-pointer' size={18} onClick={() => setIsUpdateOpen(true)} />
            </Card>
        </>
    )
}

export default CustomModel