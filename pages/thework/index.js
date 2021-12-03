import Link from 'next/link';
import React from "react";
let works = require('../../data/work.json');

export default function Work() {
    return (
        <div>
            <div className="bg-head-work bg-center bg-cover flex-grow h-44 sm:rounded-lg"/>
            {works.map(work =>
                <Link href={`/thework/${work.slug}`}>{work.title}</Link>
            )}
        </div>
    )
}


/*
MBNA Mobile Credit Card Application
TODAY Show Experience Builder
Aga Khan Museum Website Launch
Home Hardware Launch
Karma Co-op
ManuLife PRPP Application
TVO Gamified Learning
Aviva Broker Microsite
Cogeco Everyday Heroes
OneHome Launch
HP ePrint Hub
TD Report Missing Card
DWS IoT Stack
Rotary Convention HOC Tech
Rotary Auction System
Centennial College Web Cert Programs
Merisel Sellutions
Dapagee Branding

 */