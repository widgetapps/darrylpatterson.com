import ListItem from '../components/listitem';
import {
    AcademicCapIcon,
    ChipIcon,
    FilmIcon,
    CurrencyDollarIcon,
    LibraryIcon,
    OfficeBuildingIcon,
    ColorSwatchIcon,
    GlobeIcon,
    CubeIcon,
    ViewGridIcon
} from "@heroicons/react/solid";
import React, { useState } from "react";

const listItems = require('../data/list.json');

const filters = [
    {
        'type': 'all',
        'position': 'first',
        'display': 'All',
        'icon': ViewGridIcon
    },
    {
        'type': 'agency',
        'position': 'middle',
        'display': 'Agency',
        'icon': OfficeBuildingIcon
    },
    {
        'type': 'brand',
        'position': 'middle',
        'display': 'Brand',
        'icon': ColorSwatchIcon
    },
    {
        'type': 'finance',
        'position': 'middle',
        'display': 'Finance',
        'icon': CurrencyDollarIcon
    },
    {
        'type': 'ent',
        'position': 'middle',
        'display': 'Entertainment',
        'icon': FilmIcon
    },
    {
        'type': 'tech',
        'position': 'middle',
        'display': 'Technology',
        'icon': ChipIcon
    },
    {
        'type': 'edu',
        'position': 'middle',
        'display': 'Education',
        'icon': AcademicCapIcon
    },
    {
        'type': 'gov',
        'position': 'middle',
        'display': 'Government',
        'icon': LibraryIcon
    },
    {
        'type': 'nfp',
        'position': 'middle',
        'display': 'NFP',
        'icon': GlobeIcon
    },
    {
        'type': 'other',
        'position': 'last',
        'display': 'Other',
        'icon': CubeIcon
    }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function List() {

    const [filteredItems, setFilteredItems] = useState(listItems);

    function applyFilter(type, e) {
        console.log(type);
        switch (type) {
            case 'all':
                setFilteredItems(listItems);
                break;
            default:
                setFilteredItems(listItems.filter(item => item.type === type));
        }
    }

    return (
        <div>
            <div className="flex">
                <span className="relative z-0 inline-flex shadow-sm rounded-md">
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
                                '-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
                            )}>
                            {React.createElement(filter.icon, {className: '-ml-0.5 mr-0 lg:mr-1.5 h-5 w-5 text-indigo-400'})}
                            <span className="hidden lg:block">{filter.display}</span>
                        </button>
                    )}
                </span>
            </div>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map(listItem =>
                    <ListItem listItem={listItem}/>
                )}
            </ul>
        </div>
    )
}
