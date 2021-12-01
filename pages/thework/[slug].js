import { useRouter } from 'next/router'

let works = require('../../data/work.json');

export async function getStaticPaths() {

    const paths = works.map((work) => ({
        params: { slug: work.slug }
    }))

    // fallback: false means pages that don’t have the
    // correct id will 404.
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            work: works.find(item => item.slug.toString() === params.slug)
        }
    }
}

const WorkItem= () => {
    const router = useRouter();
    const {slug} = router.query;
    const work = works.find(item => item.slug.toString() === slug);

    return <p>Post title: {work.title}</p>
}

export default WorkItem