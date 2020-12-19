
export const getMovie = async (output) => {

    //Ensure that user enters a search query for API
    if (!output){
        console.log("Empty Query")
        return "Silly human, you cannot search for nothing!"
    }

    //Query movies to retrieve first movie ID
    const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + process.env.VUE_APP_API_KEY + "&query=" + output)
    const myJson = await response.json() //extract JSON from the http response

    //Extract results section to get first movie, later
    const result = myJson["results"]

    //Unsuccessful response
    if (myJson["success"] === false){
        console.log(myJson["status_code"])
        console.log(myJson["status_message"])
        return "Issue with either your connection or the Movie Database API \n Please call me personally and scream as loud humanly possible"
    }
    //Successful response, but no results for query
    else if (result.length === 0){
        console.log("No results returned")
        return "No results found for this query..."
    }
    //Successful response, results for query
    else{
        console.log("GET request successful")
        //console.table(result[0])
        const id = result[0]["id"]

        //Now that we have the movie ID, get its more specific information
        const responseMovie = await fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + process.env.VUE_APP_API_KEY + "&language=en-US")
        const jsonMovie = await responseMovie.json() //extract JSON from the http response
        //Convert runtime in minutes to hours & minutes
        let runtimeMin = jsonMovie["runtime"]
        let runtimeHour = (jsonMovie["runtime"] ? parseInt(runtimeMin / 60) + " hours and " + runtimeMin % 60 + " minutes" : "Runtime Unknown")

        //Format string to place on site later, accounting for missing information
        let movieResult = (jsonMovie["original_title"] ? jsonMovie["original_title"] : "Title Unknown")
            + "\n\n" + (jsonMovie["overview"] ? jsonMovie["overview"] : "Overview Unknown")
            + "\n\nRelease Date: " + (jsonMovie["release_date"] ? jsonMovie["release_date"] : "Release Date Unknown")
            + "\n\nRuntime: " + (runtimeHour ? runtimeHour : runtimeMin)

        //Get cast list for chosen movie to post top 10 actors and their characters
        const responseCast = await fetch("https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + process.env.VUE_APP_API_KEY + "&language=en-US")
        const jsonCast = await responseCast.json() //extract JSON from the http response

        //Loop to add cast to string in desired format, account for missing info
        let cast = jsonCast["cast"]
        movieResult += "\n\nTop 10 Actors and their Characters (or however many available): "
        if (!cast){
            return movieResult
        }
        for (let i = 0; i <= 9; i++){
            if (cast[i]){
                let temp = cast[i]
                movieResult += ("\n" + "Actor: " + temp["name"] + "  Character: " + temp["character"])
            }
            else{
                break;
            }

        }

        return movieResult
    }
}
