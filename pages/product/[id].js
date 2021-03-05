import React from "react"

import { useState, useContext } from "react"
import { getData } from "../../utils/fetchData"
import { DataContext } from "../../store/GlobalState"
import { addToCart } from "../../store/Actions"

export default function SingleProduct() {
  const [product] = useState(props.product)
  const [tab, setTab] = useState(0)

  const { state, dispatch } = useContext(DataContext)
  const { cart } = state

  const isActive = (index) => {
    if (tab === index) return " active"
    return ""
  }

  return (
    <div>
      single product
      <div>
        <img
          src={product.images[tab].url}
          alt={product.images[tab].url}
          style={{ height: "350px" }}
        />

        <div style={{ cursor: "pointer" }}>
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={img.url}
              className={`img-thumbnail rounded ${isActive(index)}`}
              style={{ height: "80px", width: "20%" }}
              onClick={() => setTab(index)}
            />
          ))}
        </div>
      </div>
      <button type="button" onClick={() => dispatch(addToCart(product, cart))}>
        Buy
      </button>
    </div>
  )
}

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`)
  // server side rendering
  return {
    props: { product: res.product }, // will be passed to the page component as props
  }
}
