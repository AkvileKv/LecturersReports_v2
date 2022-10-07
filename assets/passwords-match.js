  $(document).ready(function() {
    $('#password, #confirmPassword').on('keyup', function() {
      if ($('#password').val() == $('#confirmPassword').val()) {
        $('#message').html('Slaptažodžiai sutampa').css('color', 'green');
      } else
        $('#message').html('Slaptažodžiai nesutampa').css('color', 'red');
    });
  });