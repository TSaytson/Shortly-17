import { usersRepository } from "../repositories/users.repository.js";

export async function usersData(req, res) {
    const { userId } = res.locals;
    try {
        const { rows: user } =
            await usersRepository.selectUserById(userId);
        const { rows: views } =
            await usersRepository.sumViewsUrls(userId);
        const { rows: shortenedUrls } =
            await usersRepository.selectUrlByUserId(userId);
        
        return res.status(200).send({
            id: userId,
            name: user[0].name,
            visitCount: views[0].sum,
            shortenedUrls
        });

    } catch (error) {
        console.log(error);
        return res.status(500).
            send(error.message);
    }
    
}

export async function ranking(req, res) {
    try {
        const { rows } =
            await usersRepository.
                selectUsersJoinUrlsRanking();
        
        return res.status(200).send(rows);
    } catch (error) {
        console.log(error);
        return res.status(500).
            send(error.message);
    }
}