import React, { useContext, useState } from "react"
import PageHead from "../components/PageHead"
import Link from "next/link"
import valid from "../utils/valid"
import { DataContext } from "../store/GlobalState"
import { postData } from "../store/fetchData"
import { useRouter } from "next/router"

export default function register() {
  const initialState = { name: "", email: "", password: "", cf_password: "" }
  const [userData, setUserData] = useState(initialState)
  const { name, email, password, cf_password } = userData
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
    const errMsg = valid(name, email, password, cf_password)
    if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } })

    dispatch({ type: "NOTIFY", payload: { loading: true } })

    const res = await postData("auth/register", userData)

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } })

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } })
  }

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/")
  }, [auth])

  return (
    <div>
      <PageHead title="register page" />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChangeInput}
          />
        </div>
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
        <div>
          <label htmlFor="cf_password">confirm password </label>
          <input
            type="password"
            name="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
          />
        </div>
        <button type="submit">submit</button>
        <p>
          have account ? <Link href="/signin">signin</Link>
        </p>
      </form>
    </div>
  )
}
