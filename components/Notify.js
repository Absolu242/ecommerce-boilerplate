import { useContext } from "react"
import { DataContext } from "../store/GlobalState"
import Loading from "./Loading"
import Toast from "./Toast"

export default function Notify() {
  const [state, dispatch] = useContext(DataContext)
  const { notify } = state

  return (
    <>
      {notify.loading && <Loading />}
      {notify.error && (
        <Toast
          msg={{ msg: notify.error, title: "Error" }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="red"
        />
      )}
      {notify.success && (
        <Toast
          msg={{ msg: notify.succes, title: "Success" }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="green"
        />
      )}
    </>
  )
}
