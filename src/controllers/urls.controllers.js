import { nanoid } from "nanoid/non-secure";
import { insertUrl, selectUrlById } from "../repositories/urls.repositories.js";

export async function urlShorten(req, res) {
    const shortUrl = nanoid();
    const { userId } = res.locals;
    const {url} = req.body;
    await insertUrl(
        userId, url, shortUrl);

    res.status(201).send({
        "id": userId,
        "shortUrl": shortUrl
    })
    
}

export async function getUrlById(req, res) {
    const { id } = req.params;

    const { rows: url } = await
        selectUrlById(id);
    if (!url[0])
        return res.sendStatus(404);
    res.status(200).send(url[0]);
}