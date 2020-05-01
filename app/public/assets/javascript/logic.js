
// Detects the state of the state of the DOM before JavaScript code is executed
$(document).ready(function () {
    $.post('/token', function (res) {
        console.log(res);
    })
})