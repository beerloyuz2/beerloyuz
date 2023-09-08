import { Separator } from "@/components/ui/separator";
import { cn } from "@/libs";
import { Quote } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import randomColor from "randomcolor";

interface TestimonialProps {
    testimonial: string;
    name: string;
    occupation: string;
}



const Testimonial = ({ testimonial, name, occupation }: TestimonialProps) => {

    const { theme } = useTheme()

    let color = randomColor({
        luminosity: theme === "light" ? "dark" : "light",
        format: 'rgba',
        alpha: 0.1

    })

    return (
        <div className={cn(" w-[250px] h-[300px] md:w-[300px] md:h-[350px] m-10 flex flex-col justify-between p-6 select-none", theme === "light" ? " shadow-sm shadow-black": "shadow-sm shadow-white")} style={{backgroundColor: color}}>
            <div className="flex">
            <Quote  width={50} />
            (Örnek)
            </div>
            <p className=" text-xs md:text-sm">
                {testimonial}
            </p>
            <div className="flex gap-2 px-5 items-center">
                <div className=" h-8 w-8 md:w-10 md:h-10 rounded-full relative">
                    <Image
                        alt="placeholder"
                        src="/placeholder.jpg"
                        fill
                        className="rounded-full"
                    />
                </div>
                <div className=" flex flex-col">
                    <Separator />
                    <p className=" text-lg md:text-xl">{name} </p>
                    <p className=" text-muted-foreground font-light text-xs md:text-sm">{occupation} </p>
                </div>

            </div>
        </div>
    )
}
""
export default Testimonial