let listItems = require('../data/list.json');

export default function List() {
    return (
        <div>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {listItems.map(listItem =>
                    <li key={listItem.id} className="col-span-1 flex shadow-sm rounded-md">
                        <div className="flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md">
                            ICO
                        </div>
                        <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                            <div className="flex-1 px-4 py-2 text-sm truncate">
                                <p className="text-gray-900 font-medium hover:text-gray-600">{listItem.company}</p>
                                <p className="text-gray-500">{listItem.role}</p>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}
