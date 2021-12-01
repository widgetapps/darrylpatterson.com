let listItems = require('../data/list.json');

export default function List() {
    return (
        <div>
            {listItems.map(listItem =>
                <div>{listItem.title}</div>
            )}
        </div>
    )
}
