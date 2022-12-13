const urlModel = require("../model/urlModel")
let shortId = require("shortid")
const validUrl = require('valid-url')
const urlExists = require("url-exists");
let axios = require("axios")


const creatUrl = async (req, res) => {

    try {
        let data = req.body
        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Please enter URL" }) }

        let longUrl = data.longUrl.trim()
        if (typeof(longUrl) != "string" || !validUrl.isUri(longUrl)) { return res.status(400).send({ status: false, message: "Please enter valid URL" }) }

        let axiosData = await axios.get(longUrl).catch(() => null)
       
        if (!axiosData) { return res.status(404).send({ status: false, message: `Error! Link Not Found ${longUrl}`}) }

        let doxByUrl = await urlModel.findOne({ longUrl: longUrl }).select({ __v: 0, _id: 0 })
        if (doxByUrl) { return res.status(200).send({ data: doxByUrl })}

        let urlCode = shortId.generate()
        urlCode = (urlCode.toLowerCase()).trim()

        let shortUrl = `http://localhost:3000/${urlCode}`

        data.shortUrl = shortUrl
        data.urlCode = urlCode

        await urlModel.create(data)
        res.status(201).send({ data: data })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}



const getUrl = async (req, res) => {
    let urlCode = req.params.urlCode
    if (!shortId.isValid(urlCode)) { return res.status(400).send({ status: false, message: "Please enter valid url Code" }) }

    let result = await urlModel.findOne({ urlCode: urlCode })
    if (!result) { return res.status(404).send({ status: false, message: "URL not found" }) }

    return res.status(302).redirect(result.longUrl)
}



module.exports = { creatUrl, getUrl }