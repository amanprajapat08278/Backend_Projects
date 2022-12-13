const urlModel = require("../model/urlModel")
let shortId = require("shortid")
const validUrl = require('valid-url')



const createUrl = async (req, res) => {

    try {
        let data = req.body
        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Please enter URL" }) }

        let longUrl = data.longUrl
        if (typeof (longUrl) != "string" || !validUrl.isUri(longUrl)) { return res.status(400).send({ status: false, message: "Please enter valid URL" }) }
        
        // alive or not 


        let options = {
            method: "GET",
            url: longUrl
        }

        let axiosData = await axios(options)
        console.log(axiosData.data)



        let doxByUrl = await urlModel.findOne({ longUrl: longUrl }).select({ __v: 0, _id: 0 })
        if (doxByUrl) { return res.status(200).send({ data: doxByUrl }) }

        let urlCode = shortId.generate()
        urlCode = (urlCode.toLowerCase()).trim()

        let shortUrl = `http://localhost:3000/${urlCode}`

        data.urlCode = urlCode
        data.shortUrl = shortUrl

        let result = await urlModel.create(data)

        res.status(201).send({ data: result })
        
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


const getUrl = async (req, res) => {
    let urlCode = req.params.urlCode
    if (!shortId.isValid(urlCode)) { return res.status(400).send({ status: false, message: "Please enter valid url Code" }) }

    let result = await urlModel.findOne({ urlCode: urlCode })
    if (!result) { return res.status(404).send({ status: false, message: "URL not found" }) }

    return res.redirect(result.longUrl)
}



module.exports = { createUrl, getUrl }