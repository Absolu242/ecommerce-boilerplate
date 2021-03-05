import Head from "next/head"
import { useState, useContext, useEffect } from "react"
import { DataContext } from "../store/GlobalState"
import Link from "next/link"

import valid from "../utils/valid"
import { patchData } from "../utils/fetchData"

import { imageUpload } from "../utils/imageUpload"

export default function profile() {
  const initialSate = {
    avatar: "",
    name: "",
    password: "",
    cf_password: "",
  }
  const [data, setData] = useState(initialSate)
  const { avatar, name, password, cf_password } = data

  const { state, dispatch } = useContext(DataContext)
  const { auth, notify, orders } = state

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name })
  }, [auth.user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    dispatch({ type: "NOTIFY", payload: {} })
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    if (password) {
      const errMsg = valid(name, auth.user.email, password, cf_password)
      if (errMsg)
        return dispatch({ type: "NOTIFY", payload: { error: errMsg } })
      updatePassword()
    }

    if (name !== auth.user.name || avatar) updateInfor()
  }

  const updatePassword = () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } })
    patchData("user/resetPassword", { password }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } })
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } })
    })
  }

  const changeAvatar = (e) => {
    const file = e.target.files[0]
    if (!file)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "File does not exist." },
      })

    if (file.size > 1024 * 1024)
      //1mb
      return dispatch({
        type: "NOTIFY",
        payload: { error: "The largest image size is 1mb." },
      })

    if (file.type !== "image/jpeg" && file.type !== "image/png")
      //1mb
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Image format is incorrect." },
      })

    setData({ ...data, avatar: file })
  }

  const updateInfor = async () => {
    let media
    dispatch({ type: "NOTIFY", payload: { loading: true } })

    if (avatar) media = await imageUpload([avatar])

    patchData(
      "user",
      {
        name,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } })

      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      })
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } })
    })
  }

  if (!auth.user) return null
  return <div>profile</div>
}
