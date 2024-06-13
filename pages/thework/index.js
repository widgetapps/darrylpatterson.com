import React from "react";
import {TemplateIcon} from "@heroicons/react/outline";
import Head from "next/head";
let works = require('../../data/work.json');

export default function Work() {
    works = works.sort((a,b) => a.id - b.id);

    return (
        <div>
            <Head>
                <title>Darryl Patterson - The Work</title>
            </Head>
            <div className="bg-head-work bg-center bg-cover flex-grow h-44 sm:rounded-lg"/>
            <div className="ml-10 mr-10 mb-8 sm:mb-14 mt-5 sm:mt-10 text-sm sm:text-lg">
                I've been lucky to work on some really great projects and with some really great people. The roles are quite
                fluid from one to the other - engineering, UX design, leadership, strategy, prototyping, branding, research.
                Here are some of my favourites.
            </div>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {works.filter(work => work.active === true).map((work) => (
                    <li
                        key={work.id}
                        className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                    >
                        <div className="flex-1 flex flex-col p-8">
                            <img className="rounded-lg mx-auto" src={work.thumbnail.src} alt={work.thumbnail.caption} />
                            <h3 className="mt-6 text-gray-900 text-sm font-medium">{work.title}</h3>
                            <dl className="mt-1 flex-grow flex flex-col justify-between">
                                <dt className="sr-only">Title</dt>
                                <dd className="text-gray-500 text-sm">
                                    {work.client}<br/>
                                </dd>
                            </dl>
                            <dl className="mt-1 flex-grow flex flex-col justify-between">
                                <dt className="sr-only">Title</dt>
                                <dd className="text-gray-500 text-sm">
                                    <div className="font-bold">Role:</div>
                                    {work.role}
                                </dd>
                            </dl>
                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="w-0 flex-1 flex">
                                    <a
                                        href={`/thework/${work.slug}`}
                                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                    >
                                        <TemplateIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                        <span className="ml-3">View Details</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="ml-10 mr-10 mb-8 sm:mb-14 mt-5 sm:mt-10 text-sm sm:text-lg text-center">
                Kindly note that my work is subject to strict NDAs and as a result, I cannot post a portfolio or
                provide one in a format that I can send out. If you feel I'm a good fit, I'm more than happy to show you
                my work during an interview.
            </div>
        </div>
    )
}

/* Work to add:
TODAY Show Experience Builder
Karma Co-op
TVO Gamified Learning
Aviva Broker Microsite
Cogeco Everyday Heroes
HP ePrint Hub
Rotary Auction System
Centennial College Web Cert Programs
Merisel Sellutions
 */