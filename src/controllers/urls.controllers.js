import { nanoid } from "nanoid/non-secure";
import { updateUrlViews, deleteUrl, insertUrl, selectUrlById, selectUrlByshortUrl } from "../repositories/urls.repositories.js";

export async function urlShorten(req, res) {
    const shortUrl = nanoid(8);
    const { userId } = res.locals;
    const { url } = req.body;
    try {
        await insertUrl(
            userId, url, shortUrl
        );

        return res.status(201).send({
            'id': userId, shortUrl
        })
    } catch (error) {
        console.log(error);
        return res.sendStatus(422);
    }


}

export async function getUrlById(req, res) {
    const { id } = req.params;
    try {
        const { rows: url } = await
            selectUrlById(id);
        if (!url[0])
            return res.sendStatus(404);
        delete url[0].views;
        delete url[0].userId;
        delete url[0].createdAt;
        return res.status(200).
            send(url[0]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(422);
    }

}

export async function openUrl(req, res) {
    const { shortUrl } = req.params;
    try {
        const {rows: urlData} =
            await selectUrlByshortUrl(shortUrl);
        if (!urlData[0])
            return res.sendStatus(404);
        await updateUrlViews(urlData[0].id);
        return res.redirect(urlData[0].url);
    } catch (error) {
        console.log(error);
        return res.status(500).
            send(error.message);
    }
}


export async function removeUrl(req, res) {
    const { userId } = res.locals;
    const { id } = req.params;
    try {
        const { rows: url } =
            await selectUrlById(id);

        if (!url[0])
            return res.sendStatus(404);

        if (url[0].userId !== userId)
            return res.sendStatus(401);

        await deleteUrl(id);
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).
            send(error.message);
    }
}