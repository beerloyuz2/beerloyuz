import { Resend } from "resend";
import WelcomeEmail from "@/components/Emails/Welcome"
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
    await resend.sendEmail({
        from: 'you@example.com',
        to: 'beerloyuz@gmail.com',
        subject: 'hello world',
        react: WelcomeEmail(),
    });

    return NextResponse.json({
        status: "Ok"
    })
}