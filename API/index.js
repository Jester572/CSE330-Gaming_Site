require('dotenv').config();
const API = {}

API.fetchGameById = async function (id) {

    const data = await fetch('https://api.igdb.com/v4/games/', {
        method: 'POST',
        headers: {
            'Client-ID': process.env.Client_ID,
            'Authorization': process.env.Authorization,
            'Content-Type': 'application/json'
        },
        body: `fields name, cover, genres, summary; where id = ${id};`
    });

    return await data.json();
}

API.searchGameByName = async function (game_name, limit) {
    const data = await fetch('https://api.igdb.com/v4/games/', {
        method: 'POST',
        headers: {
            'Client-ID': process.env.Client_ID,
            'Authorization': process.env.Authorization,
            'Content-Type': 'application/json'
        },
        body: `fields name; search "${game_name}"; where version_parent = null; limit ${limit};`
    });
    const json_data = await data.json();

    return json_data;
}

API.fetchCoverById = async function (cover_id) {
    const data = await fetch('https://api.igdb.com/v4/covers', {
        method: 'POST',
        headers: {
            'Client-ID': process.env.Client_ID,
            'Authorization': process.env.Authorization,
            'Content-Type': 'application/json'
        },
        body: ` fields image_id, width; where id = ${cover_id};`
    });

    return await data.json();
}

function get_random(list) {
    let randomIds = [];
    for (let i = 1; i <= 10; i++) {
        let random = list[Math.floor((Math.random() * list.length))];
        while (randomIds.includes(random.id)) {
            random = list[Math.floor((Math.random() * list.length))];
        }
        randomIds.push(random.id)
    }
    return randomIds;
}

API.fetchTenRandom = async function () {
    const data = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
            'Client-ID': process.env.Client_ID,
            'Authorization': process.env.Authorization,
            'Content-Type': 'application/json'
        },
        body: ` fields id;`
    });

    const random = get_random(await data.json());

    return random;
}

API.fetchGenreById = async function (genres_id) {
    const data = await fetch('https://api.igdb.com/v4/genres', {
        method: 'POST',
        headers: {
            'Client-ID': process.env.Client_ID,
            'Authorization': process.env.Authorization,
            'Content-Type': 'application/json'
        },
        body: ` fields slug; where id = ${genres_id};`
    });

    return await data.json();
}

API.query = async function (text, params) {
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
