let listItems = require('../data/list.json');

export default function List() {
    return (
        <div>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {listItems.map(listItem =>
                    <li key={listItem.id} className="col-span-1 flex shadow-sm rounded-md">
                        {listItem.company}
                    </li>
                )}
            </ul>
        </div>
    )
}
