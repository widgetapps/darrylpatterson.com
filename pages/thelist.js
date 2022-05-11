import ListItem from '../components/listitem';
import {
    ChipIcon,
    FilmIcon,
    CurrencyDollarIcon,
    LibraryIcon,
    OfficeBuildingIcon,
    ColorSwatchIcon,
    CubeIcon,
    ViewGridIcon
} from "@heroicons/react/solid";
import React, { useState } from "react";

import * as ga from '../lib/ga';
import Head from "next/head";

let listItems = require('../data/list.json');

const filters = [
    {
        'type': 'all',
        'position': 'first',
        'display': 'All',
        'icon': ViewGridIcon,
        'color': 'gray-800'
    },
    {
        'type': 'agency',
        'position': 'middle',
        'display': 'Agency',
        'icon': OfficeBuildingIcon,
        'color': 'red-800'
    },
    {
        'type': 'brand',
        'position': 'middle',
        'display': 'Brand',
        'icon': ColorSwatchIcon,
        'color': 'amber-800'
    },
    {
        'type': 'finance',
        'position': 'middle',
        'display': 'Finance',
        'icon': CurrencyDollarIcon,
        'color': 'lime-800'
    },
    {
        'type': 'ent',
        'position': 'middle',
        'display': 'Entertainment',
        'icon': FilmIcon,
        'color': 'emerald-800'
    },
    {
        'type': 'tech',
        'position': 'middle',
        'display': 'Technology',
        'icon': ChipIcon,
        'color': 'cyan-800'
    },
    {
        'type': 'gov',
        'position': 'middle',
        'display': 'Government & Education',
        'icon': LibraryIcon,
        'color': 'violet-800'
    },
    {
        'type': 'other',
        'position': 'last',
        'display': 'And More',
        'icon': CubeIcon,
        'color': 'rose-800'
    }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function List() {

    listItems = listItems.sort((a,b) => (a.company.toUpperCase() > b.company.toUpperCase()) ? 1 : ((b.company.toUpperCase() > a.company.toUpperCase()) ? -1 : 0));

    const [filteredItems, setFilteredItems] = useState(listItems);
    const [activeFilter, setActiveFilter] = useState(filters.find(filter => filter.type.toString() === 'all'));

    function applyFilter(type, e) {
        ga.event({
            action: "filter",
            params : {
                filter: type
            }
        })

        switch (type) {
            case 'all':
                setFilteredItems(listItems);
                break;
            default:
                setFilteredItems(listItems.filter(item => item.type === type));
        }
        setActiveFilter(filters.find(filter => filter.type.toString() === type));
    }

    return (
        <div>
            <Head>
                <title>Darryl Patterson - The List</title>
            </Head>
            <div className="bg-head-list bg-center bg-cover flex-grow h-44 sm:rounded-lg"/>
            <div className="ml-10 mr-10 mb-8 sm:mb-14 mt-5 sm:mt-10 text-sm sm:text-lg">
                I've done a lot work over the past 30+ years for a lot of companies and brands. Some of the work was as
                simple as banner ads and some of the work has been as grand as full online large scale retail launches.
                Some where when I was a department head and some as an individual contributor. I often get asked how
                many "sites" I've worked on over my career so I made a list. And here it is, the big list.
            </div>
            <span className="relative z-0 inline-flex shadow-sm rounded-md justify-center">
                {filters.map(filter =>
                    <button
                        type="button"
                        onClick={(e) => applyFilter(filter.type, e)}
                        className={classNames(
                            filter.position === 'first'
                                ? 'rounded-l-md'
                                : filter.position === 'last'
                            ? ' rounded-r-md'
                            : '',
                            `-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`
                        )}>
                        {React.createElement(filter.icon, {className: `-ml-1 -mr-0.5 lg:mr-1.5 h-5 w-5`})}
                        <span className="hidden lg:block text-gray-700">{filter.display}</span>
                    </button>
                )}
            </span>

            <div className="mt-4 mb-5 font-bold text-sm sm:text-base">Viewing: {activeFilter.display}</div>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map(listItem =>
                    <ListItem listItem={listItem}/>
                )}
            </ul>
        </div>
    )
}
