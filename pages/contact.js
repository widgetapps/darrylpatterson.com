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
                        <Image className="cursor-pointer" src={iconGithub}/>
                    </Link>
                    <Link href="https://www.linkedin.com/in/widgetapps/">
                        <Image className="cursor-pointer" src={iconLinkedin}/>
                    </Link>
                </div>
                <div className="col-span-4 mr-10">
                    <h1 className="text-2xl mb-5">Wanna make some awesome things together?</h1>

                    <div className="mr-10 mb-2 sm:mb-6 mt-5 sm:mt-10 text-sm sm:text-lg">
                        Here are some of the things I do to help you and your team succeed.
                    </div>

                    <div className="mb-4 sm:mb-8">
                        <h2 className="text-base sm:text-lg font-bold">UX Design</h2>
                        <ul className="list-disc text-sm sm:text-base ml-10">
                            <li>Wireframing: Figma (my pref), Adobe XD, Axure, Visio</li>
                            <li>Flows: Miro, LucidChart, OmniGraffle, Visio</li>
                            <li>Research: User testing, heuristics, interviews, card sorts</li>
                        </ul>
                    </div>

                    <div className="mb-4 sm:mb-8">
                        <h2 className="text-base sm:text-lg font-bold">Engineering</h2>
                        <ul className="list-disc text-sm sm:text-base ml-10">
                            <li>Backend coding: NodeJS/ExpressJS, PHP Frameworks, Spring. API design, documentation & implementation</li>
                            <li>Frontend coding (including prototyping): ReactJS/NextJS, Angular, TailwindCSS, jQuery, BackboneJS</li>
                            <li>Systems Admin: Cloud Services (GCP & AWS), queuing servers (AMPQ & MQTT), databases (MongoDB & MySQL and others)</li>
                        </ul>
                    </div>

                    <div className="mb-4 sm:mb-8">
                        <h2 className="text-base sm:text-lg font-bold">Tech Leadership</h2>
                        <ul className="list-disc text-sm sm:text-base ml-10">
                            <li>Managing tech teams: building trust, mentorship, training, team building, open communication</li>
                            <li>Streamlining engineering processes: source code management, tooling, CI/CD (delivery & deployment)</li>
                        </ul>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold">Get in touch</h2>
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
