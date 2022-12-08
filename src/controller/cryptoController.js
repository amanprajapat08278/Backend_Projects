const express = require("express")
const router = express.Router()
const axios = require("axios")
const cryptoModel = require("../model/cryptoModel")



router.get("/assets", async function (req, res) {

    try{
        let docx = {
            method: "GET",
            url: "https://api.coincap.io/v2/assets",
            headers: {
                Authorization: `Bearer ccfe0638-c51d-4418-b112-828a92e00012`,
            }
        
        }
        let result = await axios(docx)
        let arr = result.data.data
        let sortArr = arr.sort((a, b) => a.changePercent24Hr - b.changePercent24Hr)

        await cryptoModel.deleteMany()
        
        let output = await cryptoModel.insertMany(sortArr)

        return res.status(201).send({ data: output })

    } catch (err) {
        return res.status(500).send(err.message)
    }
})

module.exports = router
