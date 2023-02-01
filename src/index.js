const express = require("express")
const mongoose = require("mongoose")
const route = require("./route/route")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors({ origin: "*" }))

app.use("/", route)

mongoose.set({ "strictQuery": false })

mongoose.connect("mongodb+srv://amanprajapat82780:Lucky82780@newproject.3qdy8y3.mongodb.net/url_shortner?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log("Mongoose Connected"))
    .catch((err) => console.log(err))

app.listen((process.env.PORT || 3001), () => {
    console.log("server running on ", (process.env.PORT || 3001))
})