// components/layout.js
import Link from 'next/link'

export default function Layout({ children }) {
    return (
        <>
            <div>
                <Link href="/">Home</Link> |
                <Link href="/thework">The Work</Link> |
                <Link href="/thelist">The List</Link> |
                <Link href="/contact">Contact</Link></div>
            <main>{children}</main>
            <div>Footer</div>
        </>
    )
}