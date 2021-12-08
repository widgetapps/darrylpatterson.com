import Link from "next/link";
import Image from "next/image";
import iconLinkedin from "../public/linkedin.svg";
import iconGithub from "../public/github.svg";
import React from "react";
import Head from "next/head";

export default function Contact() {
    return (
        <div>
            <Head>
                <title>Darryl Patterson - Contact</title>
            </Head>
            <div className="bg-head-contact bg-center bg-cover flex-grow h-44 sm:rounded-lg"/>
            <div className="grid grid-cols-5 gap-6 ml-10 mt-10">
                <div className="w-12">
                    <Link href="https://github.com/widgetapps">
                        <Image src={iconGithub}/>
                    </Link>
                    <Link href="https://www.linkedin.com/in/widgetapps/">
                        <Image src={iconLinkedin}/>
                    </Link>
                </div>
                <div className="col-span-4 mr-10">
                    <h1 className="text-2xl mb-5">Wanna make some awesome things together?</h1>
                    <div className="text-lg">Darryl Patterson</div>
                    <div>
                       <Link href="mailto:darryl@pattersonpowered.com">darryl@pattersonpowered.com</Link>
                    </div>
                    <div>
                        <Link href="tel:+14167866116">(416) 786-6116</Link>
                    </div>
                    <div className="mt-4">Sault Ste Marie, ON CANADA</div>
                </div>
            </div>
        </div>
    )
}
