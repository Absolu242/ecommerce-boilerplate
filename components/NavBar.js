import React, { useContext } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { DataContext } from "../store/GlobalState"
import Cookie from "js-cookie"

export default function NavBar() {
  const router = useRouter()
  const { state, dispatch } = useContext(DataContext)
  //const { auth, cart } = state

  const auth = {
    user: {
      avatar: "",
      role: "",
    },
  }

  const isActive = (r) => {
    if (r == router.pathname) {
      return " active"
    } else {
      return ""
    }
  }

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" })
    localStorage.removeItem("firstLogin")
    dispatch({ type: "AUTH", payload: {} })
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } })
    return router.push("/")
  }

  const adminRouter = () => {
    return (
      <>
        <Link href="/users">
          <a className="dropdown-item">Users</a>
        </Link>
        <Link href="/create">
          <a className="dropdown-item">Products</a>
        </Link>
        <Link href="/categories">
          <a className="dropdown-item">Categories</a>
        </Link>
      </>
    )
  }

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            src={auth.user.avatar}
            alt={auth.user.avatar}
            style={{
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              transform: "translateY(-3px)",
              marginRight: "3px",
            }}
          />{" "}
          {auth.user.name}
        </a>

        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link href="/profile">
            <a className="dropdown-item">Profile</a>
          </Link>
          {auth.user.role === "admin" && adminRouter()}
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </li>
    )
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
            {auth.user.role === "admin" && adminRouter()}
          </li>
          {Object.keys(auth).length === 0 ? (
            <li>
              <Link href="/signin">
                <a className={"link" + isActive("/signin")}>signin</a>
              </Link>
            </li>
          ) : (
            loggedRouter()
          )}
        </ul>
      </nav>
    </>
  )
}
