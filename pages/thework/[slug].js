import { useRouter } from 'next/router'

let works = require('../../data/work.json');

const Work = () => {
    const router = useRouter();
    const {slug} = router.query;
    const work = works.find(item => item.slug.toString() === slug);

    return <p>Post: {work.title}</p>
}

export default Work