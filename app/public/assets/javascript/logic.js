
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

        // Checks if the movie input field is blank
        if (queryTitle === "") {
            alert('Movie Input field can not be blank.');
        }

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

                // This block of code is tested whether the movie input is registered in the API database
                try {

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
                    $('#movie-overview').html(overview);

                    // Clears the movie input field on click
                    $('#movie-query-title').val("");

                    // Stores the movie id as a key/value pair in sessionStorage
                    sessionStorage.setItem('movieId', res.results[0].id);

                    // Assigning the movieId variable the key movieId which stores the movie id value
                    movieId = sessionStorage.getItem('movieId');

                    console.log(res.results[0])
                    // Handles the error if the movie entered is not in the API database

                } catch (err) {

                    alert('Sorry your input was not valid with The Movie Database.');

                    $('#movie-query-title').val('');

                }

                // AJAX Get request to search for a movie review
                // The apiKey and movieId variables are used to complete the query string
                $.get('https://api.themoviedb.org/3/movie/' + movieId + '/reviews?api_key=' +

                    apiKey + '&language=en-US&page=1'
                    , (data, status) => {

                        // This block of code is tested whether the movie returned has review content or not
                        try {

                            // Stores the value of the movie review content
                            // Will throw an error code if there arent any reviews
                            movieReview = data.results[0].content;

                            // Sets the movie review in the browser page
                            $('#movie-review').html(movieReview);

                            // This block of code is executed and handled if there isnt review content
                            // Handles the error
                        } catch (error) {

                            // Sets the text in the movie review section if there isnt review content
                            $('#movie-review').html('Sorry a review is not available for this movie.');

                            // Aligns the review text
                            $('#movie-review').css('text-align', 'center');
                        }

                    });

                $.get('https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=' +

                    apiKey, (res) => {

                        console.log(res.cast[0])

                        for (var i = 0; i < 10; i++) {

                            $('#first-actor').html(res.cast[0].name);
                            $('#second-actor').html(res.cast[1].name);
                            $('#third-actor').html(res.cast[2].name);
                            $('#fourth-actor').html(res.cast[3].name);
                            $('#fifth-actor').html(res.cast[4].name);
                            $('#sixth-actor').html(res.cast[5].name);
                            $('#seventh-actor').html(res.cast[6].name);
                            $('#eighth-actor').html(res.cast[7].name);
                            $('#ninth-actor').html(res.cast[8].name);
                            $('#tenth-actor').html(res.cast[9].name);


                            $('#first-role').html(res.cast[0].character);
                            $('#second-role').html(res.cast[1].character);
                            $('#third-role').html(res.cast[2].character);
                            $('#fourth-role').html(res.cast[3].character);
                            $('#fifth-role').html(res.cast[4].character);
                            $('#sixth-role').html(res.cast[5].character);
                            $('#seventh-role').html(res.cast[6].character);
                            $('#eighth-role').html(res.cast[7].character);
                            $('#ninth-role').html(res.cast[8].character);
                            $('#tenth-role').html(res.cast[9].character);

                        }
                    })
            });

    });

    // Jquery on click method used to perform the tv show search from TMDB API
    $('#show-submit').click(() => {

        // The showQueryTitle is given the value of the show name input
        var showQueryTitle = $('#show-query-title').val();

        // The showTitle will store the value of the show title returned from the API search
        var showTitle;

        // The airDate will store the value of the first_air_date returned from the API search
        var airDate;

        // The showImagePath will store the first half if the show image path
        // The poster_path returned from the AJAX Get request will concat to this path
        var showImagePath = 'https://image.tmdb.org/t/p/w500';

        // The showImage will store the full poster_path of the show searched
        var showImage;

        // The showOverview will store thr value of the shows overview
        var showOverview;

        var showId;

        // AJAX Get request to search for the show submitted from the input field
        // The apiKey and showQueryTitle variables are used to complete the query string
        $.get('https://api.themoviedb.org/3/search/tv?api_key=' +
            apiKey + '&language=en-US&page=1&query=' + showQueryTitle + '&include_adult=false', (res) => {

                showTitle = res.results[0].name;
                airDate = res.results[0].first_air_date;
                showImage = showImagePath + res.results[0].poster_path;
                showOverview = res.results[0].overview;
                showId = res.results[0].id;


                $('#show-title-span').html(showTitle);
                $('#show-air-span').html(airDate);
                $('#show-image').attr('src', showImage);
                $('#show-image').css('border', 'solid 2px black');
                $('#show-overview').html(showOverview);


                $('#show-query-title').val('');

                $.get('https://api.themoviedb.org/3/tv/' + showId + '/reviews?api_key=' +
                    apiKey + '&language=en-US&page=1', (res) => {
                        console.log(res);


                    })
            });
    })



});