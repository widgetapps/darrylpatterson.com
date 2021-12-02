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
        'type': 'edu',
        'position': 'middle',
        'display': 'Education',
        'icon': AcademicCapIcon,
        'color': 'blue-800'
    },
    {
        'type': 'gov',
        'position': 'middle',
        'display': 'Government',
        'icon': LibraryIcon,
        'color': 'violet-800'
    },
    {
        'type': 'nfp',
        'position': 'middle',
        'display': 'NFP',
        'icon': GlobeIcon,
        'color': 'fuchsia-800'
    },
    {
        'type': 'other',
        'position': 'last',
        'display': 'Other',
        'icon': CubeIcon,
        'color': 'rose-800'
    }
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function List() {

    const [filteredItems, setFilteredItems] = useState(listItems);

    function applyFilter(type, e) {
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
                                `-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-${filter.color} hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`
                            )}>
                            {React.createElement(filter.icon, {className: `-ml-0.5 mr-0 lg:mr-1.5 h-5 w-5`})}
                            <span className="hidden lg:block text-gray-700">{filter.display}</span>
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
