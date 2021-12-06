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
                        <h2 className="text-xl font-bold mb-2">The Overview</h2>
                        <div>{work.overview}</div>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-xl font-bold mb-2">The Links</h2>

                        <table className="mb-10">
                            <tbody>
                                {work.links.map(link =>
                                    <tr>
                                        <td className="w-10">
                                            <div className="w-6 h-6 mb-2">
                                                {(() => {
                                                    if (link.type === 'git') {
                                                        return (
                                                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                                                        )
                                                    } else if (link.type === 'pdf') {
                                                        return (
                                                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Adobe Acrobat Reader</title><path d="M23.63 15.3c-.71-.745-2.166-1.17-4.224-1.17-1.1 0-2.377.106-3.761.354a19.443 19.443 0 0 1-2.307-2.661c-.532-.71-.994-1.49-1.42-2.236.817-2.484 1.207-4.507 1.207-5.962 0-1.632-.603-3.336-2.342-3.336-.532 0-1.065.32-1.349.781-.78 1.384-.425 4.4.923 7.381a60.277 60.277 0 0 1-1.703 4.507c-.568 1.349-1.207 2.733-1.917 4.01C2.834 18.53.314 20.34.03 21.758c-.106.533.071 1.03.462 1.42.142.107.639.533 1.49.533 2.59 0 5.323-4.188 6.707-6.707 1.065-.355 2.13-.71 3.194-.994a34.963 34.963 0 0 1 3.407-.745c2.732 2.448 5.145 2.839 6.352 2.839 1.49 0 2.023-.604 2.2-1.1.32-.64.106-1.349-.213-1.704zm-1.42 1.03c-.107.532-.64.887-1.384.887-.213 0-.39-.036-.604-.071-1.348-.32-2.626-.994-3.903-2.059a17.717 17.717 0 0 1 2.98-.248c.746 0 1.385.035 1.81.142.497.106 1.278.426 1.1 1.348zm-7.524-1.668a38.01 38.01 0 0 0-2.945.674 39.68 39.68 0 0 0-2.52.745 40.05 40.05 0 0 0 1.207-2.555c.426-.994.78-2.023 1.136-2.981.354.603.745 1.207 1.135 1.739a50.127 50.127 0 0 0 1.987 2.378zM10.038 1.46a.768.768 0 0 1 .674-.425c.745 0 .887.851.887 1.526 0 1.135-.355 2.874-.958 4.861-1.03-2.768-1.1-5.074-.603-5.962zM6.134 17.997c-1.81 2.981-3.549 4.826-4.613 4.826a.872.872 0 0 1-.532-.177c-.213-.213-.32-.461-.249-.745.213-1.065 2.271-2.555 5.394-3.904Z"/></svg>
                                                        )
                                                    } else {
                                                        return (
                                                            <svg className="svg-icon" viewBox="0 0 20 20"><path d="M16.469,8.924l-2.414,2.413c-0.156,0.156-0.408,0.156-0.564,0c-0.156-0.155-0.156-0.408,0-0.563l2.414-2.414c1.175-1.175,1.175-3.087,0-4.262c-0.57-0.569-1.326-0.883-2.132-0.883s-1.562,0.313-2.132,0.883L9.227,6.511c-1.175,1.175-1.175,3.087,0,4.263c0.288,0.288,0.624,0.511,0.997,0.662c0.204,0.083,0.303,0.315,0.22,0.52c-0.171,0.422-0.643,0.17-0.52,0.22c-0.473-0.191-0.898-0.474-1.262-0.838c-1.487-1.485-1.487-3.904,0-5.391l2.414-2.413c0.72-0.72,1.678-1.117,2.696-1.117s1.976,0.396,2.696,1.117C17.955,5.02,17.955,7.438,16.469,8.924 M10.076,7.825c-0.205-0.083-0.437,0.016-0.52,0.22c-0.083,0.205,0.016,0.437,0.22,0.52c0.374,0.151,0.709,0.374,0.997,0.662c1.176,1.176,1.176,3.088,0,4.263l-2.414,2.413c-0.569,0.569-1.326,0.883-2.131,0.883s-1.562-0.313-2.132-0.883c-1.175-1.175-1.175-3.087,0-4.262L6.51,9.227c0.156-0.155,0.156-0.408,0-0.564c-0.156-0.156-0.408-0.156-0.564,0l-2.414,2.414c-1.487,1.485-1.487,3.904,0,5.391c0.72,0.72,1.678,1.116,2.696,1.116s1.976-0.396,2.696-1.116l2.414-2.413c1.487-1.486,1.487-3.905,0-5.392C10.974,8.298,10.55,8.017,10.076,7.825"/></svg>
                                                        )
                                                    }
                                                })()}

                                            </div>
                                        </td>
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