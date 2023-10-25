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
            const coverId = game[0].cover;
            console.log(coverId);
            const coverImage = await API.fetchCoverById(coverId);
            console.log(coverImage);
            features += "<div class='game_info'><h3>Title: </h3><h4 class='game_name'>" + game[0].name + "</h4>";
            features += "<h3>Summary: </h3><p class='game_summary'>" + game[0].summary + "</p>";
            features += "<h3>Genres: </h3><div class='game_genres'>";
            for (const genre_id of game[0].genres) {
                const genres = await API.fetchGenreById(genre_id);
                features += "<p class='genre_card'>" + genres[0].slug + "</p>";
            }
            features += "</div></div><img class='game_cover' src='https://images.igdb.com/igdb/image/upload/t_cover_small_2x/" + coverImage[0].image_id + ".jpg' alt='Cover image for" + game[0].name + "'></img>";
            game_data.push(game[0]);
            features += "</div>";

        } catch (error) {
            console.error(`Error fetching game data for ID ${game_id}:`, error);
        }
    } 

    features += "</div>"
    

    res.render("index", { title: 'Home', features })



}


module.exports = mainCont