import React from "react";
import {
    AcademicCapIcon,
    ChipIcon,
    FilmIcon,
    CurrencyDollarIcon,
    LibraryIcon,
    OfficeBuildingIcon,
    ColorSwatchIcon,
    GlobeIcon,
    CubeIcon
} from "@heroicons/react/solid";

const icons = {
    'agency': OfficeBuildingIcon,
    'brand': ColorSwatchIcon,
    'other': CubeIcon,
    'nfp': GlobeIcon,
    'edu': AcademicCapIcon,
    'finance': CurrencyDollarIcon,
    'ent': FilmIcon,
    'tech': ChipIcon,
    'gov': LibraryIcon
}

class ListItem extends React.Component {
    render() {
        const listItem = this.props.listItem;
        return (
            <li key={listItem.id} className="col-span-1 flex shadow-sm rounded-md">
                <div className="bg-logo flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md">
                    {
                        React.createElement(icons[listItem.type], {className: 'h-5 w-5 text-blue-500'})
                    }
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                    <div className="flex-1 px-4 py-2 text-sm truncate">
                        <p className="text-gray-900 font-medium hover:text-gray-600">{listItem.company}</p>
                        <p className="text-gray-500">{listItem.role}</p>
                    </div>
                </div>
            </li>
        )
    }
}

export default ListItem;