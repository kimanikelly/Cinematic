
// Detects the state of the state of the DOM before JavaScript code is executed
$(document).ready(() => {

    // The undefined apiKey variable will store the value of the api key
    var apiKey;

    // The undefined movieId variable will store the value of the movie id
    var movieId;

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
        var queryTitle = $('#movie-query-title').val();

        // The movieTitle will store the value of the movie title returned from the API search
        var movieTitle;

        // The releaseDate will store the value of the release_date returned from the API search
        var releaseDate;

        // The overview will store the value of the overview returned from the API search
        var overview;

        // The author will store the value of the movies review author
        var author;

        // The movieReview will store the value of the movies review
        var movieReview;

        // The posterPath will store the first half if movie image path
        // The poster path returned from the Get AJAX Get route will concat to this path
        var posterPath = 'https://image.tmdb.org/t/p/w500';

        // AJAX Get request to search for a movie that was input field
        // The apiKey and queryTitle variables are used to complete the query string
        $.get('https://api.themoviedb.org/3/search/movie?api_key=' +
            apiKey + '&language=en-US&query=' + queryTitle + '&page=1&include_adult=false', (res) => {

                // Sets the value of the movieTitle
                movieTitle = res.results[0].title;

                // Sets the value of the releaseDate
                releaseDate = res.results[0].release_date;

                // Sets the value of the overview
                overview = res.results[0].overview;

                // Sets the movie title in the browser page
                $('#movie-title-span').html(movieTitle);

                // Sets the release date in the browser page
                $('#movie-release-span').html(releaseDate);

                // Sets the movie image in the browser page
                $('img').attr('src', posterPath + res.results[0].poster_path);

                // Sets the border of the image
                $('img').css('border', '2px solid black');

                // Sets the movie overview in the browser page
                $('#overview').html(overview);

                // Clears the movie input field on click
                $('#movie-query-title').val("");

                // Stores the movie id as a key/value pair in sessionStorage
                sessionStorage.setItem('movieId', res.results[0].id);

            });

        // Assigning the movieId variable the key movieId which stores the movie id value
        movieId = sessionStorage.getItem('movieId');

        $.get('https://api.themoviedb.org/3/movie/' + movieId + '/reviews?api_key=' +
            apiKey + '&language=en-US&page=1'
            , (data, status) => {




            })

    });

    $('#show-submit').click(() => {

        // The showTitle will store the value of the show title returned from the API search
        var showTitle;
        var airDate;
        var showImagePath = 'https://image.tmdb.org/t/p/w500';
        var showOverView;

        $.get('https://api.themoviedb.org/3/search/tv?api_key=' +
            apiKey + '&language=en-US&page=1&query=Silicon%20Valley&include_adult=false', (res) => {

                console.log(res.results[0]);

                showTitle = res.results[0].name;

                $('#show-title-span').append(showTitle);
            });
    })



});