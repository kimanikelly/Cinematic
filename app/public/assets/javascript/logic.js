
// Detects the state of the state of the DOM before JavaScript code is executed
$(document).ready(function () {

    // The undefined apiKey variable will store the value of the apiKey
    var apiKey;

    // AJAX Post request to the token route retrieving the api key from the backend
    $.post('/token', (res) => {

        // Stores the api key as a key/value pair in sessionStorage
        // Stores the api key for one session and is deleted after the browser tab is closed
        sessionStorage.setItem('token', res);

    });

    // Assigning the apiKey variable the key token which stores the api key value
    apiKey = sessionStorage.getItem('token');

    // Jquery on click method used to perform the movie search from TMDB API
    $('#movie-submit').click(() => {

        // The queryTitle is given the value of the movie name input
        var queryTitle = $('#query-title').val();

        // The movieTitle will store the value of the movie title returned from the API search
        var movieTitle;

        // The releaseDate will store the value of the release_date returned from the API search
        var releaseDate;

        // The overview will store the value of the overview returned from the API search
        var overview;

        // AJAX Get request to search for a movie that was input
        // The apiKey and queryTitle variables are used to complete the query string
        $.get('https://api.themoviedb.org/3/search/movie?api_key=' +
            apiKey + '&language=en-US&query=' + queryTitle + '&page=1&include_adult=false', (res) => {

                // Sets the value of the movieTitle
                movieTitle = res.results[0].title

                // Sets the value of the releaseDate
                releaseDate = res.results[0].release_date;

                // Sets the value of the overview
                overview = res.results[0].overview;

                console.log(res.results[0])

                $('#movie-title').html(movieTitle);
                $('#release-date').html(releaseDate);
                $('#overview').html(overview);

                // Clears the movie input on click
                $('#query-title').val("");

            });
    });

});