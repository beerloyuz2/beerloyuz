"use client"

import { NewModal } from "@/components/Modals/NewModal"
import { Button } from "@/components/ui/button"
import Heading from "@/components/Heading"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void
}

const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {

    const router = useRouter()

    return (
        <NewModal
            title=""
            isOpen={isOpen}
            onClose={onClose}
        >

            <div className="flex flex-col gap-8">
                <Heading
                    title="Çıkış yapılıyor..."
                    subtitle="Hesabınızdan çıkmak istediğinize emin misiniz?"
                    center
                />
                <div className=" w-full flex justify-between">
                    <Button className=" w-[40%]" onClick={onClose}>
                        Geri dön
                    </Button>
                    <Button variant="destructive" className=" w-[40%]" onClick={() => {
                        signOut()
                        router.push("/")
                        }}>
                        Çıkış yap
                    </Button>
                </div>
            </div>

        </NewModal>
    )
}

export default LogoutModal