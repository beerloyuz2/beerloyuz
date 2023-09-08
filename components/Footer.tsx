import { Separator } from "./ui/separator"


const Footer = () => {
    return (
        <div className=" w-full mt-4 flex flex-col justify-between ">
            <Separator />
            <div className=" h-[50px] flex justify-between items-center px-4">
                <p>
                    Copyrights ©
                </p>
                <p>
                    beerloyuz.com
                </p>
            </div>
        </div>
    )
}

export default Footer