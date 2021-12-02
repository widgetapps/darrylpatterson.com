
import Image from 'next/image';

import meHoliday from '../public/me/darryl_holiday.jpg';
import meGeeq from '../public/me/darryl_geeq.jpg';
import meSailor from '../public/me/darryl_sailor.jpg';
import meSuspicious from '../public/me/darryl_suspicious.jpg';
import meViking from '../public/me/darryl_viking.jpg';
import ListItem from "../components/listitem";
import React from "react";

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
    <div className="grid grid-cols-4 gap-4">
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
      <div className="col-span-3">
        Content
      </div>
    </div>
  )
}
