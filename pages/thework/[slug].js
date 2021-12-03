import { useRouter } from 'next/router'
import Image from "next/image";
import Link from 'next/link';
import {ArrowSmLeftIcon} from "@heroicons/react/solid";

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

    return (
        <div>
            <div className="mb-3">
                <a className="relative text-sm text-gray-700 font-medium hover:text-gray-500" href="/thework">
                    <ArrowSmLeftIcon className="inline w-5 h-5 mb-1" aria-hidden="true" />
                    <span className="">The Work</span>
                </a>
            </div>
            <div className="grid grid-cols-4 gap-4 sm:gap-10">
                <div>
                    <div className="">
                        <div>
                            <img className="rounded-lg" src={work.thumbnail.src} alt={work.thumbnail.caption}/>
                        </div>
                        <div className="mt-10">
                            {work.images.map(image =>
                                <div className="">
                                    <img className="w-32 h-32" className="" src={image.src} alt={image.caption}/>
                                    <div className="text-xs">{image.caption}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <table className="mb-10">
                        <tbody>
                            <tr>
                                <td className="w-24">The Work:</td>
                                <td>{work.title}</td>
                            </tr>
                            <tr>
                                <td>The Client:</td>
                                <td>{work.client}</td>
                            </tr>
                            <tr>
                                <td>The Role:</td>
                                <td>{work.role}</td>
                            </tr>
                            <tr>
                                <td>The When:</td>
                                <td>{work.when}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mb-10">
                        <h2 className="text-xl font-bold">The Overview</h2>
                        <div>{work.overview}</div>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-xl font-bold">The Links</h2>

                        <table className="mb-10">
                            <tbody>
                                {work.links.map(link =>
                                    <tr>
                                        <td className="w-24">{link.type}:</td>
                                        <td><Link href={link.url}>{link.link}</Link></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-8">TL;DR</h2>
                        {work.tldr.map(tldr =>
                            <div className="mb-6">
                                <h3 className="font-bold">{tldr.header}</h3>
                                <div>{tldr.content}</div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default WorkItem