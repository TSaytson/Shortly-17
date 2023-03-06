import { nanoid } from "nanoid/non-secure";
import { urlRepository } from "../repositories/urls.repository.js";

export async function urlShorten(req, res) {
    const shortUrl = nanoid(8);
    const { userId } = res.locals;
    const { url } = req.body;
    try {
        const { rowCount: registeredUrl } =
            await urlRepository.findUrl(url);
        
        if (registeredUrl)
            return res.status(409).
                send('Url já cadastrada');

        await urlRepository.insertUrl(
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
            urlRepository.selectFieldsUrlById(id);
        if (!url[0])
            return res.sendStatus(404);

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
            await urlRepository.selectByshortUrl(shortUrl);
        if (!urlData[0])
            return res.sendStatus(404);
        await urlRepository.updateUrlViews(urlData[0].id);
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
            await urlRepository.selectUrlById(id);
        
        if (!url[0])
            return res.sendStatus(404);

        if (url[0].userId !== userId)
            return res.sendStatus(401);

        await urlRepository.deleteUrl(id);
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).
            send(error.message);
    }
}