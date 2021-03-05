import React from "react"

export default function Filter({ state }) {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("")
  const [category, setCategory] = useState("")

  const { categories } = state

  const router = useRouter()

  const handleCategory = (e) => {
    setCategory(e.target.value)
    filterSearch({ router, category: e.target.value })
  }

  const handleSort = (e) => {
    setSort(e.target.value)
    filterSearch({ router, sort: e.target.value })
  }

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : "all" })
  }, [search])

  return <div>filter</div>
}
