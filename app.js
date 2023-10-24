/* ***********************
 * Require Statements
 *************************/
require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const API = require('./API/index');
const static = require("./routes/static")
const bodyParser = require('body-parser');
const discoverRouter = require('./routes/discover');
const reviewsRouter = require('./routes/reviews');
const searchRouter = require('./routes/search');
const mainController = require('./controllers/mainController');


/* ***********************
 * Middleware
 * ************************/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

/* ***********************
 * View Engine and Templates
 *************************/
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views')
app.set("layout", "./layouts/layout")
app.use(expressLayouts)
app.use(express.static('public'))

/* ***********************
 * Routes
 *************************/
app.use(static)
app.use('/discover', discoverRouter)
app.use('/reviews', reviewsRouter)
app.use('/reviews', searchRouter)

app.get('/', async (req, res) => {
    const featuredGames = mainController.buildFeaturedGames;
    
    res.render('index', {
        title: "Home",
        games: featuredGames
    })
    

    
})

app.get('/api/games/getPage', async (req, res) => {
    try {
        
        const count = req.query.count || 10;
        const games = await API.fetchGames(count);
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
    
});
    
app.use(async (req, res, next) => {
    next({ status: 404, message: 'Sorry, we appear to have lost that page.' })
  })


  /* ***********************
 * Log statement to confirm server operation
 *************************/
const host = process.env.HOST

app.listen(port, () => {
    console.log(`app listening on ${host}:${port}`)
  })