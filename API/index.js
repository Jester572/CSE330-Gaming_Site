require('dotenv').config();
const API = {}

API.fetchGameById = async function(id) {

    const data = await fetch('https://api.igdb.com/v4/games/', {
        method: 'POST',
        headers:{
            'Client-ID': process.env.Client_ID,
            'Authorization': process.env.Authorization,
            'Content-Type': 'application/json'
        },
        body: `fields name, cover, genres, summary; where id = ${id};`
    });

    return await data.json();
}

API.searchGameByName = async function(game_name) {

    const data = await fetch('https://api.igdb.com/v4/games/', {
        method: 'POST',
        headers:{
            'Client-ID': process.env.Client_ID,
            'Authorization': process.env.Authorization,
            'Content-Type': 'application/json'
        },
        body: `search ${game_name}; fields name, release_date.human; limit=10;`
    });
    
    return await data.json();
}

API.fetchCoverById = async function(cover_id) {
    const data = await fetch('https://api.igdb.com/v4/covers', {
        method: 'POST',
        headers:{
            'Client-ID': process.env.Client_ID,
            'Authorization': process.env.Authorization,
            'Content-Type': 'application/json'
        },
        body: ` fields url, width; where id = ${cover_id};`
    });
    
    return await data.json();
}

API.fetchGenreById = async function(genres_id) {
    const data = await fetch('https://api.igdb.com/v4/genres', {
        method: 'POST',
        headers:{
            'Client-ID': process.env.Client_ID,
            'Authorization': process.env.Authorization,
            'Content-Type': 'application/json'
        },
        body: ` fields slug; where id = ${genres_id};`
    });
    
    return await data.json();
}

API.query = async function(text, params) {
    try {
        const res = await API.query(text, params)
        console.log("executed query", { text });
        return res
    } catch (error) {
        console.error("error in query", { text })
        throw error
    }
}

module.exports = API
