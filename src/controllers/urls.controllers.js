import { nanoid } from "nanoid/non-secure";
import { insertUrl } from "../repositories/urls.repositories.js";

export async function urlShorten(req, res) {
    const shortUrl = nanoid();
    const { userId } = res.locals;

    await insertUrl(userId, shortUrl);

    res.status(201).send({
        "id": userId,
        "shortUrl": shortUrl
    })
    
}