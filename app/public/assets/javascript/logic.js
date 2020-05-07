
// Detects the state of the state of the DOM before JavaScript code is executed
$(document).ready(() => {

    // Hides all elements within the cast-div
    $('#cast-div').hide();

    // Hides all elements within the info-div
    $('.info-div').hide();

    // Hides the clear buttons
    $('.clear').hide();

    // Hides the recommendation div
    $('#recommendation-div').hide();

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

                    // Handles the error if the movie entered is not in the API database
                } catch (err) {

                    // Alert the page when a undefined movie was input
                    alert('Sorry your input was not valid with The Movie Database.');

                    // Clears the movie input field
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

                // AJAX Get request to return movie credits
                $.get('https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=' +

                    apiKey, (res) => {

                        // Shows the cast-div
                        $('#cast-div').show();

                        // Shows the info-div
                        $('.info-div').show();

                        // Shows the clear button
                        $('.clear').show();

                        // Iterates through 10 cast members
                        for (var i = 0; i < 10; i++) {

                            // Sets the cast members name to display in the table
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

                            // Sets the cast members character to display in the table
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

    //  Jquery click function targeted at he clear button
    $('.clear').click(() => {

        // Hides the cast-div
        $('#cast-div').hide();

        // Hides the info div
        $('.info-div').hide();

        // Hides the recommendation-div
        $('#recommendation-div').hide();

        // Hides the clear button
        $('.clear').hide();
    })

    // Jquery on click method used to perform the tv show search from TMDB API
    $('#show-submit').click(() => {

        // The showQueryTitle is given the value of the show name input
        var showQueryTitle = $('#show-query-title').val();

        // Checks if the tv show input field is blank
        if (showQueryTitle === "") {
            alert('Tv show input field can not be blank.');
        }

        // The showTitle will store the value of the show title returned from the API search
        var showTitle;

        // The airDate will store the value of the first_air_date returned from the API search
        var airDate;

        // The showImagePath will store the first half if the show image path
        // The poster_path returned from the AJAX Get request will concat to this path
        var showImagePath = 'https://image.tmdb.org/t/p/w500';

        // The showImage will store the full poster_path of the show searched
        var showImage;

        // The showOverview will store the value of the shows overview
        var showOverview;

        // The showId will store the value of the shows id
        var showId;

        // AJAX Get request to search for the show submitted from the input field
        // The apiKey and showQueryTitle variables are used to complete the query string
        $.get('https://api.themoviedb.org/3/search/tv?api_key=' +
            apiKey + '&language=en-US&page=1&query=' + showQueryTitle + '&include_adult=false', (res) => {

                $('.info-div').show();
                $('.clear').show();
                $('#recommendation-div').show();


                try {

                    // Sets the variable values
                    showTitle = res.results[0].name;
                    airDate = res.results[0].first_air_date;
                    showImage = showImagePath + res.results[0].poster_path;
                    showOverview = res.results[0].overview;
                    showId = res.results[0].id;

                    // Sets the show information in the browser
                    $('#show-title-span').html(showTitle);
                    $('#show-air-span').html(airDate);
                    $('#show-image').attr('src', showImage);
                    $('#show-image').css('border', 'solid 2px black');
                    $('#show-overview').html(showOverview);
                    $('#show-query-title').val('');

                } catch (err) {

                    alert('Sorry your input was not valid with The Movie Database.');

                    $('#show-query-title').val('');

                    $('.info-div').hide();

                    $('#recommendation-div').hide();

                    $('.clear').hide();

                }

                $.get('https://api.themoviedb.org/3/tv/' + showId + '/recommendations?api_key=' +
                    apiKey + '&language=en-US&page=1', (res) => {

                        for (var i = 0; i < 10; i++) {

                            $('#first-show').html(res.results[0].name);
                            $('#first-air-date').html(res.results[0].first_air_date);
                            $('#first-network').html(res.results[0].networks[0].name);

                            $('#second-show').html(res.results[1].name);
                            $('#second-air-date').html(res.results[1].first_air_date);
                            $('#second-network').html(res.results[1].networks[0].name);

                            $('#third-show').html(res.results[2].name);
                            $('#third-air-date').html(res.results[2].first_air_date);
                            $('#third-network').html(res.results[2].networks[0].name);

                            $('#fourth-show').html(res.results[3].name);
                            $('#fourth-air-date').html(res.results[3].first_air_date);
                            $('#fourth-network').html(res.results[3].networks[0].name);

                            $('#fifth-show').html(res.results[4].name);
                            $('#fifth-air-date').html(res.results[4].first_air_date);
                            $('#fifth-network').html(res.results[0].networks[0].name);

                            $('#sixth-show').html(res.results[5].name);
                            $('#sixth-air-date').html(res.results[5].first_air_date);
                            $('#sixth-network').html(res.results[5].networks[0].name);

                            $('#seventh-show').html(res.results[6].name);
                            $('#seventh-air-date').html(res.results[6].first_air_date);
                            $('#seventh-network').html(res.results[6].networks[0].name);

                            $('#eighth-show').html(res.results[7].name);
                            $('#eighth-air-date').html(res.results[7].first_air_date);
                            $('#eighth-network').html(res.results[7].networks[0].name);

                            $('#ninth-show').html(res.results[8].name);
                            $('#ninth-air-date').html(res.results[8].first_air_date);
                            $('#ninth-network').html(res.results[8].networks[0].name);

                            $('#tenth-show').html(res.results[9].name);
                            $('#tenth-air-date').html(res.results[9].first_air_date);
                            $('#tenth-network').html(res.results[9].networks[0].name);

                        }
                    })

            });
    })

});