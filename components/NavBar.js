import Link from "next/link"
import { useRouter } from "next/router"

export default function NavBar() {
  const router = useRouter()

  const isActive = (r) => {
    if (r == router.pathname) {
      return " active"
    } else {
      return ""
    }
  }
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a className={"link" + isActive("/")}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/cart">
              <a className={"link" + isActive("/cart")}>cart</a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a className={"link" + isActive("/profile")}>profile</a>
            </Link>
          </li>
          <li>
            <Link href="/signin">
              <a className={"link" + isActive("/signin")}>signin</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
