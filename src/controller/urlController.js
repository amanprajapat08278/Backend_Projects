const urlModel = require("../model/urlModel")
let shortId = require("shortid")
const validUrl = require('valid-url')
let axios = require("axios")
const redis = require("redis");
const { promisify } = require("util")




//-----------------Create Short URL API--------------------//

const creatUrl = async (req, res) => {

    try {
        let data = req.body
        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Please enter URL" }) }

        let longUrl = data.longUrl.trim()
        if (typeof (longUrl) != "string" || !validUrl.isUri(longUrl)) { return res.status(400).send({ status: false, message: "Please enter valid URL" }) }

        let axiosData = await axios.get(longUrl).catch(() => null)

        if (!axiosData) { return res.status(404).send({ status: false, message: `Error! Link Not Found ${longUrl}` }) }

        let doxByUrl = await urlModel.findOne({ longUrl: longUrl }).select({ __v: 0, _id: 0 })
        if (doxByUrl) { return res.status(200).send({ data: doxByUrl }) }

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



//----------------- Radis functions --------------------//

const redisClient = redis.createClient(13190, "redis-13190.c301.ap-south-1-1.ec2.cloud.redislabs.com", { no_ready_check: true });

redisClient.auth("gkiOIPkytPI3ADi14jHMSWkZEo2J5TDG", (err) => {
    if (err) throw err;
});

redisClient.on("connect", async () => {
    console.log("redis connnected")
})


const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);



//----------------- Get Short URL API --------------------//

const getUrl = async (req, res) => {
    let urlCode = req.params.urlCode
    if (!shortId.isValid(urlCode)) { return res.status(400).send({ status: false, message: "Please enter valid url Code" }) }

    let dataByRadis = await GET_ASYNC(`${urlCode}`)

    if (dataByRadis) {
        dataByRadis = JSON.parse(dataByRadis)
        return res.status(302).redirect(dataByRadis.longUrl)
    }
    else {
        let result = await urlModel.findOne({ urlCode: urlCode })
        if (!result) { return res.status(404).send({ status: false, message: "URL not found" }) }
        await SET_ASYNC(`${urlCode}`, JSON.stringify(result))
        return res.status(302).redirect(result.longUrl)
    }
}



module.exports = { creatUrl, getUrl }