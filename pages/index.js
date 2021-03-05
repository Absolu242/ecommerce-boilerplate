import { useState, useContext, useEffect } from "react"
import { DataContext } from "../store/GlobalState"

import { getData } from "../utils/fetchData"
import filterSearch from "../utils/filterSearch"
import { useRouter } from "next/router"
import Filter from "../components/Filter"

export default function Home(props) {
  const [products, setProducts] = useState(props.products)

  const [page, setPage] = useState(1)
  const router = useRouter()

  useEffect(() => {
    setProducts(props.products)
  }, [props.products])

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1)
  }, [router.query])

  const handleLoadmore = () => {
    setPage(page + 1)
    filterSearch({ router, page: page + 1 })
  }

  return <div>Home</div>
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1
  const category = query.category || "all"
  const sort = query.sort || ""
  const search = query.search || "all"

  const res = await getData(
    `product?limit=${
      page * 6
    }&category=${category}&sort=${sort}&title=${search}`
  )
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  }
}
