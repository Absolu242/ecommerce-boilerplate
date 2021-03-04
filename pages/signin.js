import React, { useContext, useState } from "react"
import PageHead from "../components/PageHead"
import Link from "next/link"
import valid from "../utils/valid"
import { DataContext } from "../store/GlobalState"
import { postData } from "../store/fetchData"
import Cookie from "js-cookie"
import { useRouter } from "next/router"

export default function signin() {
  const initialState = { email: "", password: "" }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData
  const router = useRouter()
  const [state, dispatch] = useContext(DataContext)
  const { auth } = state

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    dispatch({ type: "NOTIFY", payload: {} })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "NOTIFY", payload: { loading: true } })
    const res = await postData("auth/login", userData)

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } })
    dispatch({ type: "NOTIFY", payload: { success: res.msg } })

    dispatch({
      type: "AUTH",
      payload: {
        token: res.access_token,
        user: res.user,
      },
    })

    Cookie.set("refreshtoken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    })

    localStorage.setItem("firstLogin", true)

    // e.preventDefault()
    // const errMsg = valid(email, password)
    // if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } })

    // dispatch({ type: "NOTIFY", payload: { loading: true } })

    // const res = await postData("auth/login", userData)

    // if (res.err)
    //   return dispatch({ type: "NOTIFY", payload: { error: res.err } })

    // dispatch({ type: "NOTIFY", payload: { success: res.msg } })
    // dispatch({
    //   type: "AUTH",
    //   payload: {
    //     token: res.access_token,
    //     user: res.user,
    //   },
    // })

    // Cookie.set("refreshtoken", res.refresh_token, {
    //   path: "api/auth/accessToken",
    //   expires: 7,
    // })
    // localStorage.setItem("firstLogin", true)
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

  return (
    <div>
      <PageHead title="Signin page" />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <label htmlFor="password">password </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>
        <button type="submit">submit</button>
        <p>
          don't have account ? <Link href="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}
