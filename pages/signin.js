import React, { useContext, useState } from "react"
import PageHead from "../components/PageHead"
import Link from "next/link"
import valid from "../utils/valid"
import { DataContext } from "../store/GlobalState"
import { postData } from "../store/fetchData"

export default function signin() {
  const initialState = { email: "", password: "" }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData

  const [state, dispatch] = useContext(DataContext)

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    dispatch({ type: "NOTIFY", payload: {} })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errMsg = valid(email, password)
    if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } })

    dispatch({ type: "NOTIFY", payload: { loading: true } })

    const res = await postData("auth/register", userData)

    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } })

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } })
  }

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
