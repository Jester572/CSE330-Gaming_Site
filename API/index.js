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
        body: `fields name; where id = ${id};`
    });
    
    return data.rows;
}

API.searchGameByName = async function(game_name) {

    const res = await fetch('https://api.igdb.com/v4/games/', {
        method: 'POST',
        headers:{
            'Client-ID': process.env.Client_ID,
            'Authorization': process.env.Authorization,
            'Content-Type': 'application/json'
        },
        body: `search ${game_name}; fields name, release_date.human; limit=10`
    });
    const data = await res.json();
    return data;
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
