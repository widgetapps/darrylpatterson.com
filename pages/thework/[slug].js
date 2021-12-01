import { useRouter } from 'next/router'

let works = require('../../data/work.json');

// Called by server side build to setup dynamic routes.
export async function getStaticPaths() {
    const paths = works.map((work) => ({
        params: { slug: work.slug }
    }))

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