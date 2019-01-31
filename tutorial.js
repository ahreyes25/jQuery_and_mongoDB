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

(function scopeWrapper($) {
    $(document).ready(function(){
        //callForQuestions(); 
        //callForQuote();
    });
    
    function callForQuestions() {
        $.ajax({
            url: "https://opentdb.com/api.php?amount=10&encode=base64"
        }).done(function(data) {
            console.log(data);
            buildQuestionList(data);
        });
    }
    
    function callForQuote() {
        $.ajax({
            url: "http://quotes.rest/qod.json"
        }).done(function(data) {
            console.log(data);
            // TODO add a quote of the day to your web page if you would like!
        });
    }
    
    function buildQuestionList(data) {
        
        $.each(data.results, function(i,e) {
           var question = $("<div/>").addClass("question border border-primary p-3").appendTo($("#questionsList"));
           $("<h6/>").addClass("text-center").html("Question " + (i+1)).appendTo(question);
           $("<span/>").addClass("text-secondary").html(atob(e.question)).appendTo(question);
           
           var answerDiv = $("<div/>").addClass("row answerDiv").appendTo(question);
           // TODO wouldn't it be better to shuffle the answers so that the
            // last one isn't always the right one? Just a thought...
           $.each(e.incorrect_answers,function(index,element){
               $("<button/>").addClass("btn btn-primary form-control col-3 answer").html(atob(element)).appendTo(answerDiv);
           });
           $("<button/>").addClass("btn btn-primary form-control col-3 correctAnswer answer").html(atob(e.correct_answer)).appendTo(answerDiv);
        });

        var submit = $("<button/>").addClass("btn btn-secondary text-center form-control").html("Submit").appendTo($("#questionsList"));
        submit.click(function(e) {
           e.preventDefault(); 
           // TODO there is probably a better way to determine the right
            // answer.
           var len = $(".btn-info").length;
           if (len < 10) {
               alert("Please complete all ten questions to submit.")
           } else {
               var right = $(".btn-info.correctAnswer").length;
               alert("Well done, you got " + right + " right!");
           }
        });

        $(".answer").click(function(e) {
           e.preventDefault(); 
           $(this).parent().children().removeClass('btn-info');
           $(this).parent().children().addClass('btn-primary');
           $(this).addClass("btn-info");
           $(this).removeClass("btn-primary");
        });
    }
    
    function uuid4() {
        const ho = (n, p) => n.toString(16).padStart(p, 0); 
        const view = new DataView(new ArrayBuffer(16)); 
        crypto.getRandomValues(new Uint8Array(view.buffer)); 
        view.setUint8(6, (view.getUint8(6) & 0xf) | 0x40); 
        view.setUint8(8, (view.getUint8(8) & 0x3f) | 0x80); 
        return `${ho(view.getUint32(0), 8)}-${ho(view.getUint16(4), 4)}-${ho(view.getUint16(6), 4)}-${ho(view.getUint16(8), 4)}-${ho(view.getUint32(10), 8)}${ho(view.getUint16(14), 4)}`; 
    }
}(jQuery));