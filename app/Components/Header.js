import Link from 'next/link'
export default function Header(){
    return <div className="bg-gray-800 backdrop-blur-lg text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold">HR Dashboard</h1>
        <nav className="space-x-6">
          <Link href="/" className="hover:text-yellow-300 transition duration-200">Dashboard</Link>
          <Link href="/Analytics" className="hover:text-yellow-300 transition duration-200">Analytics</Link>
          <Link href="/Bookmarks" className="hover:text-yellow-300 transition duration-200">Bookmarks</Link>
        </nav>
      </div>
    </div>
}