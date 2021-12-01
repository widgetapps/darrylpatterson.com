import Link from 'next/link';
let works = require('../../data/work.json');

export default function Work() {
    return (
        <div>
            {works.map(work =>
                <Link href={`/thework/${work.slug}`}><a>{work.title}</a></Link>
            )}
        </div>
    )
}
