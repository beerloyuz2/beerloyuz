"use client"

import { NewModal } from "@/components/Modals/NewModal"
import { Button } from "@/components/ui/button"
import Heading from "@/components/Heading"
import { useRouter } from "next/navigation"

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void
}

const HomeModal = ({ isOpen, onClose }: LogoutModalProps) => {


    const router = useRouter()


    return (
        <NewModal
            title="🎉 Büyük İndirim Fırsatı! 🎉"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex flex-col gap-8 p-3">
                <Heading
                    title="Büyük İndirim Fırsatı! %50 İndirim ile Mobilyaları Kaçırma!"
                    subtitle="Evinizi Yenileyin, Mutfaklarınıza Yeni Bir Soluk Katın. Kaliteli Mobilyalar, Uygun Fiyatlarla Sizleri Bekliyor."
                    center
                />
                <Button variant="premium" onClick={() => router.push("/urunlerimiz")}>
                    🔥 Hemen İnceleyin! 🔥
                </Button>
            </div>

        </NewModal>
    )
}

export default HomeModal