import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import logoMark from '../public/ppl_mark.svg';
import {act} from "react-dom/test-utils";

let activeNav = '';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'The Work', href: '/thework' },
    { name: 'The List', href: '/thelist' },
    { name: 'Contact', href: '/contact' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Layout({ children }) {
    const router = useRouter()

    if (router.pathname.startsWith('/thework')) {
        activeNav = '/thework';
    } else if (router.pathname.startsWith('/thelist')) {
        activeNav = '/thelist';
    } else if (router.pathname.startsWith('/contact')) {
        activeNav = '/contact';
    } else if (router.pathname === '/') {
        activeNav = '/';
    } else {
        activeNav = '';
    }

    return (
        <>
            <Head>
                <title>Darryl Patterson</title>
                <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@600&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-full">
                <Disclosure as="nav" className="bg-white shadow-sm">
                    {({ open }) => (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between h-16 relative">
                                    <div className="flex">
                                        <div className="flex-shrink-0 flex items-center">
                                            <Image className="left-0" src={logoMark} width="50" height="50" />
                                            <span className="font-logo uppercase text-xl m-1 tracking-wide">Darryl Patterson</span>
                                        </div>
                                    </div>
                                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.href === activeNav
                                                        ? 'border-logo text-gray-900'
                                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>

                                    <div className="-mr-2 flex items-center sm:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-logo">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="sm:hidden">
                                <div className="pt-2 pb-3 space-y-1">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.href === activeNav
                                                    ? 'bg-indigo-50 border-logo text-indigo-700'
                                                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                                                'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <div className="py-10">
                    <main>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </main>
                </div>

                <div className="py-10">
                    <footer className='space-y-3'>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-center text-sm">
                            &copy; {(new Date().getFullYear())} Patterson Powered Ltd.
                        </div>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-center text-xs">
                            <Link href='https://github.com/widgetapps/darrylpatterson.com'>The code</Link> licensed under an <Link href='/license'>MIT License</Link>
                        </div>
                    </footer>
                </div>

            </div>

        </>
    )
}