import Head from "next/head"
import { useState, useContext, useEffect } from "react"
import { DataContext } from "../../store/GlobalState"
import { imageUpload } from "../../utils/imageUpload"
import { postData, getData, putData } from "../../utils/fetchData"
import { useRouter } from "next/router"

const ProductsManager = () => {
  const initialState = {
    title: "",
    price: 0,
    inStock: 0,
    description: "",
    content: "",
    category: "",
  }
  const [product, setProduct] = useState(initialState)
  const { title, price, inStock, description, content, category } = product

  const [images, setImages] = useState([])

  const { state, dispatch } = useContext(DataContext)
  const { categories, auth } = state

  const router = useRouter()
  const { id } = router.query
  const [onEdit, setOnEdit] = useState(false)

  useEffect(() => {
    if (id) {
      setOnEdit(true)
      getData(`product/${id}`).then((res) => {
        setProduct(res.product)
        setImages(res.product.images)
      })
    } else {
      setOnEdit(false)
      setProduct(initialState)
      setImages([])
    }
  }, [id])

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
    dispatch({ type: "NOTIFY", payload: {} })
  }

  const handleUploadInput = (e) => {
    dispatch({ type: "NOTIFY", payload: {} })
    let newImages = []
    let num = 0
    let err = ""
    const files = [...e.target.files]

    if (files.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Files does not exist." },
      })

    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (err = "The largest image size is 1mb")

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "Image format is incorrect.")

      num += 1
      if (num <= 5) newImages.push(file)
      return newImages
    })

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } })

    const imgCount = images.length
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Select up to 5 images." },
      })
    setImages([...images, ...newImages])
  }

  const deleteImage = (index) => {
    const newArr = [...images]
    newArr.splice(index, 1)
    setImages(newArr)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not valid." },
      })

    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === "all" ||
      images.length === 0
    )
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add all the fields." },
      })

    dispatch({ type: "NOTIFY", payload: { loading: true } })
    let media = []
    const imgNewURL = images.filter((img) => !img.url)
    const imgOldURL = images.filter((img) => img.url)

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL)

    let res
    if (onEdit) {
      res = await putData(
        `product/${id}`,
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      )
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } })
    } else {
      res = await postData(
        "product",
        { ...product, images: [...imgOldURL, ...media] },
        auth.token
      )
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } })
    }

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } })
  }
  return <div></div>
}

export default ProductsManager
