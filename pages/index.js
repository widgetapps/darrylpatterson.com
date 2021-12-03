
import Image from 'next/image';
import Link from 'next/link';

import meHoliday from '../public/me/darryl_holiday.jpg';
import meGeeq from '../public/me/darryl_geeq.jpg';
import meSailor from '../public/me/darryl_sailor.jpg';
import meSuspicious from '../public/me/darryl_suspicious.jpg';
import meViking from '../public/me/darryl_viking.jpg';

import iconLinkedin from '../public/linkedin.svg';
import iconGithub from '../public/github.svg';

import React from "react";

import homeContent from '../data/home.json';

const mePhotos = [
    {
        "id": "holiday",
        "caption": "caption",
        "src": meHoliday,
        "position": "top"
    },
    {
        "id": "geeq",
        "caption": "caption",
        "src": meGeeq,
        "position": "middle"
    },
    {
        "id": "sailor",
        "caption": "caption",
        "src": meSailor,
        "position": "middle"
    },
    {
        "id": "suspicious",
        "caption": "caption",
        "src": meSuspicious,
        "position": "middle"
    },
    {
        "id": "viking",
        "caption": "caption",
        "src": meViking,
        "position": "bottom"
    }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 sm:gap-10">
      <div>
          <div className="-space-y-1.5 gap-0">
          {mePhotos.map(photo =>
              <div className="">
                <Image className={classNames(
                    photo.position === 'top'
                        ? 'rounded-t-xl'
                        : photo.position === 'bottom'
                            ? ' rounded-b-xl'
                            : '',
                    'border-solid border-l-2 border-r-2 border-logo'
                )} src={photo.src} alt={photo.caption}/>
              </div>
          )}
          </div>
      </div>
      <div className="col-span-3">
          <div className="text-xl sm:text-3xl italic mt-2 sm:mt-5 mb-8 sm:mb-14 mr-4 sm:mr-1">"Equal parts expert, educator and leader, my childhood fascination with the creative potential of
              technology has fueled a lifetime of learning, exploration and achievement."</div>

          {homeContent.map(item =>
              <div className="mb-4 sm:mb-8">
                  <h2 className="text-base sm:text-lg font-bold">{item.header}</h2>
                  <p className="text-sm sm:text-base">{item.content}</p>
              </div>
          )}
      </div>
    </div>
  )
}
