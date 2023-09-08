"use client"


import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";


interface ModalProps {
    title: string | null | undefined
    description?: string
    isOpen: boolean
    onClose: () => void;
    children?: React.ReactNode
}

export const NewModal: React.FC<ModalProps> = ({ title, description, isOpen, onClose, children }) => {



    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                {children}

            </DialogContent>
        </Dialog>
    )
}