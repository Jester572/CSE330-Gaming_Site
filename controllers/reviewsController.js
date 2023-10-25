
const reviewsCont = {}

reviewsCont.buildReviews = async function (req, res, next) {
    res.render('reviews/', {
        title: "Reviews",
        page: null
    })
}

module.exports = reviewsCont