import { useRouter } from 'next/router'

const Work = () => {
    const router = useRouter()
    const { slug } = router.query

    return <p>Post: {slug}</p>
}

export default Work