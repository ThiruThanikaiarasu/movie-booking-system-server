const createMovie = async (request, response) => {
    console.log(request.body)
    console.log(request.file)
    console.log(request.user)
}

module.exports = {
    createMovie
}