const gameModel = require('../models/games_model');
const API = require('../API/index');

const mainCont = {}

mainCont.buildFeaturedGames = async function (req, res, next) {
    const game_ids = [119388,119171,204350];
    
    try {
        
        const gamePromises = game_ids.map(async (game_id) => {
            return await API.fetchGameById(game_id);
        });
        
        const games = await Promise.all(gamePromises);
        res.status(200).json(games);
        
    } catch (error) {
        // Handle any errors that might occur during the async operations.
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

module.exports = mainCont