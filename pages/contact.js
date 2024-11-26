import Link from "next/link";
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
                <aside className="w-12 space-y-3">
                    <Link href="https://github.com/widgetapps">
                        <svg className="cursor-pointer" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)"/>
                        </svg>
                    </Link>
                    <Link href="https://www.linkedin.com/in/widgetapps/">
                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M417.2 64H96.8C79.3 64 64 76.6 64 93.9V415c0 17.4 15.3 32.9 32.8 32.9h320.3c17.6 0 30.8-15.6 30.8-32.9V93.9C448 76.6 434.7 64 417.2 64zM183 384h-55V213h55v171zm-25.6-197h-.4c-17.6 0-29-13.1-29-29.5 0-16.7 11.7-29.5 29.7-29.5s29 12.7 29.4 29.5c0 16.4-11.4 29.5-29.7 29.5zM384 384h-55v-93.5c0-22.4-8-37.7-27.9-37.7-15.2 0-24.2 10.3-28.2 20.3-1.5 3.6-1.9 8.5-1.9 13.5V384h-55V213h55v23.8c8-11.4 20.5-27.8 49.6-27.8 36.1 0 63.4 23.8 63.4 75.1V384z"/>
                        </svg>
                    </Link>
                </aside>
                <div className="col-span-4 mr-10">
                    <h1 className="text-2xl mb-5">Wanna make some awesome things together?</h1>

                    <div className="mr-10 mb-2 sm:mb-6 mt-5 sm:mt-10 text-sm sm:text-lg">
                        Here are some of the things I do to help you and your team succeed.
                    </div>

                    <div className="mb-4 sm:mb-8">
                        <h2 className="text-base sm:text-lg font-bold">UX Design</h2>
                        <ul className="list-disc text-sm sm:text-base ml-10">
                            <li>Wireframing: Figma (my pref), Adobe XD, Axure, Visio</li>
                            <li>Flows: FigJam, Miro, LucidChart, OmniGraffle, Visio</li>
                            <li>Research: User testing, heuristics, interviews, card sorts, competitive analysis</li>
                            <li>Design Systems: Atomic Design (atoms, molecules, organisms, templates), styles (colours. typography, shadows, spacing, motion, iconography) and states</li>
                        </ul>
                    </div>

                    <div className="mb-4 sm:mb-8">
                        <h2 className="text-base sm:text-lg font-bold">Engineering</h2>
                        <ul className="list-disc text-sm sm:text-base ml-10">
                            <li>Engineering Design: API design &amp; documentation, database schemas (SQL &amp; NoSQL), technical requirements as well as structure, behaviour &apm; interaction diagrams with the UML</li>
                            <li>Data Visualization: Data consilation &amp; normalization, charts, graphs, Business Intelligence Tools (Looker, Tableau, DOMO, ThoughtSpot)</li>
                            <li>Backend coding: NodeJS/ExpressJS, Python, PHP Frameworks, Spring, API implementation</li>
                            <li>Frontend coding (including prototyping): ReactJS/NextJS, TailwindCSS, jQuery, BackboneJS</li>
                            <li>Systems Admin: Cloud Services (GCP &amp; AWS), queuing servers (AMPQ &amp; MQTT), databases (MongoDB &amp; MySQL and others)</li>
                        </ul>
                    </div>

                    <div className="mb-4 sm:mb-8">
                        <h2 className="text-base sm:text-lg font-bold">Leadership</h2>
                        <ul className="list-disc text-sm sm:text-base ml-10">
                            <li>Team management: building trust, mentorship, training, team building, open communication</li>
                            <li>Streamlining processes: Design ops, source code management, tooling, CI/CD (delivery &amp; deployment)</li>
                        </ul>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold">Get in touch</h2>
                    <div className="text-lg">Darryl Patterson</div>
                    <div>
                       <Link href="mailto:darryl@pattersonpowered.com">darryl@pattersonpowered.com</Link>
                    </div>
                    <div>
                        <Link href="tel:+17059102649">(705) 910-2649</Link>
                    </div>
                    <div className="mt-4">Sault Ste Marie, ON CANADA</div>
                </div>
            </div>
        </div>
    )
}
