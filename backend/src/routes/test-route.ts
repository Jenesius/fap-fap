import express from "express";
import gameService from "../services/game-service";

const TestRoute = express.Router();

TestRoute.get('/free-user', async (req, res, next) => {
    res.json(await gameService.findFree(String(req.query.userId)))
})

TestRoute.get('/add-user', async (req, res) => {
    res.json(await gameService.addUser(String(Math.ceil(Math.random() * 100))));
})
TestRoute.get('/new-match', async (req, res) => {
    const userId = String(req.query.userId);

    await gameService.closeMatch(userId);

    const freeUser = await gameService.findFree(userId);
    if (!freeUser) {
        return res.json({
            msg: "Not available users"
        })
    }

    res.json(await gameService.matchUsers(freeUser.userId, userId));
})

TestRoute.get('/matches', async (req, res, next) => {
    res.json(await gameService.getCurrentMatch(String(req.query.userId)))
})

export default TestRoute;