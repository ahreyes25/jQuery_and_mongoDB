const login = _ => {
  $.ajax({
      url: "https://api.mlab.com/api/1/databases/sogeti-training-exercise/collections/users?apiKey=yhXLy4qd8TCJB5v3DRZrCu5_CF5sjeWt",
      type: "GET",
      success: function(res) {
        authenticate(res);
        
        $('#login').remove()
        $('#signup').remove()

        showLabel();
      }
  }).done(function( msg ) {});
}

const showSignup = _ => {
  $('#signup').removeClass('inactive');
  $('#signup').addClass('active');
}

const hideSignup = _ => {
  $('#signup').removeClass('active');
  $('#signup').addClass('inactive');
}

const showLabel = _ => {
  $('#questions-label').removeClass('inactive');
  $('#questions-label').addClass('active');
}

const signup = _ => {
  var name = document.getElementById("txtBx_name").value;
  var username = document.getElementById("txtBx_username2").value;
  var password = document.getElementById("txtBx_password2").value;

  $.ajax({
    url: "https://api.mlab.com/api/1/databases/sogeti-training-exercise/collections/users?apiKey=yhXLy4qd8TCJB5v3DRZrCu5_CF5sjeWt",
    data: JSON.stringify(
      {
        "name": name, 
        "userName": username, 
        "password": password, 
        "score": 0
      }
    ),
    type: "POST",
    contentType: "application/json"
  });
}

const authenticate = (res) => {
  var username = document.getElementById("txtBx_username1").value;
  var password = document.getElementById("txtBx_password1").value;

  var found = false;
  for (var i = 0; i < Object.keys(res).length; i++) {
    if (res[i].userName == username && res[i].password == password) {
      found = true;
      alert("Success");
      break;
    }
  }
  if (!found) {
    document.getElementById("txtBx_password").value = "";
  }
}
