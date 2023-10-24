const gameModel = require('../models/games_model');
const API = require('../API/index');

const mainCont = {}

mainCont.buildFeaturedGames = async function (req, res, next) {
    const game_ids = [119388, 119171, 204350];

    let game_data = [];
    let features = "<div id='featured_games'>";
    for (const game_id of game_ids) {
        try {
            features += "<div class='game_card'>";
            const game = await API.fetchGameById(game_id);
            const cover = await API.fetchCoverById(game[0].cover);
            features += "<h3 class='game_name'>" + game[0].name + "</h3>";
            features += "<p class='game_summary'>" + game[0].summary + "</p>";
            for (const genre_id of game[0].genres) {
                const genres = await API.fetchGenreById(genre_id);
                features += "<p class='game_genre'>" + genres[0].slug + "</p>";
            }
            features += "<img class='game_cover' src='" + cover[0].url + "' alt='Cover image for" + game[0].name + "'></img>";
            game_data.push(game[0]);
            features += "</div>";

        } catch (error) {
            console.error(`Error fetching game data for ID ${game_id}:`, error);
        }
    } 

    features += "</div>"
    console.log(features);

    res.render("index", { title: 'Home', features })



}


module.exports = mainCont