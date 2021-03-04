export default function Toast({ msg, handleShow, bgColor }) {
  return (
    <div style={{ backgroundColor: bgColor }}>
      <div>
        <button onClick={handleShow}>x</button>
        <span style={{ color: "blue" }}>{msg.title}</span>
        <p style={{ color: "blue" }}>{msg.msg}</p>
      </div>
    </div>
  )
}
