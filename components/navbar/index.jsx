import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div id="navbarNav" className="collapse navbar-collapse">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link href="/json"><a className="nav-link">JSON</a></Link>
          </li>
          <li className="nav-item active">
          <Link href="/csv"><a className="nav-link">CSV Uploads</a></Link>
          </li>
          <li className="nav-item active">
          <Link href="/clientContent"><a className="nav-link">ClientContent (In Progress)</a></Link>
          </li>
        </ul>
    </div>
  </nav>
  )
}