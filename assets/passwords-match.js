$(document).ready(function () {
  $('#password, #confirmPassword').on('keyup', function () {
    if ($('#password').val() == $('#confirmPassword').val()) {
      $('#isAvailable').attr("disabled", false),
      $('#message').html('Slaptažodžiai sutampa').css('color', 'green');

    } else
    $('#isAvailable').attr("disabled", true),
      $('#message').html('Slaptažodžiai nesutampa').css('color', 'red');

  });
});