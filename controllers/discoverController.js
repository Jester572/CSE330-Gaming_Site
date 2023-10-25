const utilities = require("../utilities/index");
const API = require('../API/index');


const discoverCont = {}

discoverCont.buildDiscover = async function (req, res, next) {
    const game_ids = await API.fetchTenRandom();
    console.log(game_ids);
    let page = "<div class='featured_games'>";
    for (const game_id of game_ids) {
        try {
            page += "<div class='game_card'>";
            const game = await API.fetchGameById(game_id);
            if (game[0].cover === undefined) {
                page += "<img class='game_cover' src='../../public/images/logo-png.png' alt='No Cover Image'>";
            } else {
                const coverId = game[0].cover;
                const coverImage = await API.fetchCoverById(coverId);
                page += "<img class='game_cover' src='https://images.igdb.com/igdb/image/upload/t_cover_small_2x/" + coverImage[0].image_id + ".jpg' alt='Cover image for" + game[0].name + "'>";
            }
            page += "<div class='game_info'><h3>Title: </h3><h4 class='game_name'>" + game[0].name + "</h4>";
            page += "<h3>Summary: </h3><p class='game_summary'>" + game[0].summary + "</p>";
            page += "<h3>Genres: </h3><div class='game_genres'>";
            if (game[0].genres === undefined) {
                page += "<p class='genre_card'>No Genres Saved</p>";
            } else {
                for (const genre_id of game[0].genres) {
                    const genres = await API.fetchGenreById(genre_id);
                    page += "<p class='genre_card'>" + genres[0].slug + "</p>";
                }
            }

            page += "</div></div>";
            page += "</div>";

        } catch (error) {
            console.error(`Error fetching game data for ID ${game_id}:`, error);
        }
    }

    page += "</div>";
    res.render("discover/", {
        title: "Discover",
        page,
        errors: null,
    })
}


module.exports = discoverCont;