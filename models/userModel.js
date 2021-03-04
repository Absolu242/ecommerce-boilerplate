import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      reauired: true,
    },
    email: {
      type: String,
      reauired: true,
    },
    password: {
      type: String,
      reauired: true,
    },
    role: {
      type: String,
      default: "user",
    },
    root: {
      type: Boolean,
      reauired: false,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timeStanps: true,
  }
)

let DataSet = mongoose.models.user || mongoose.model("user", userSchema)
export default DataSet
