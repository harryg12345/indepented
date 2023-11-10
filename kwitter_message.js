var firebaseConfig = {
      apiKey: "AIzaSyBKE95RUrsGqeQEDhA5e1rBzIwN6cDWLOw",
      authDomain: "kwitter-209dd.firebaseapp.com",
      databaseURL: "https://kwitter-209dd-default-rtdb.firebaseio.com",
      projectId: "kwitter-209dd",
      storageBucket: "kwitter-209dd.appspot.com",
      messagingSenderId: "744242466868",
      appId: "1:744242466868:web:0475ac56b56d1a02753a61"
};

firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_key");
room_name = localStorage.getItem("room_key");
function logout() {
      localStorage.removeItem("user_key");
      localStorage.removeItem("room_key");
      window.location = "index.html"
}
function send() {
      message_input = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: message_input,
            like: 0
      });
      document.getElementById("msg").value = "";

}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;

                        db_name = message_data["name"];
                        db_message = message_data["message"];
                        db_like = message_data["like"];
                        name_tag = '<h4>' + db_name + '<img src="tick.png" class="user_tick"></h4>';
                        message_tag = '<h4 class="message_h4">' + db_message + '</h4>';
                        button_start_tag = '<button class="btn btn-danger" id="' + firebase_message_id + '" value="' + db_like + '" onclick="addLikes(this.id)">';
                        button_text_tag = '<span class="glyphicon glyphicon-thumbs-up">like:' + db_like + '</span></button><hr>';
                        row = name_tag + message_tag + button_start_tag + button_text_tag;
                        document.getElementById("output").innerHTML += row
                  }
            });
      });
}
getData();
function addLikes(subfolder_name) {
      likes = document.getElementById(subfolder_name).value;
      likes = Number(likes)+1;
      firebase.database().ref(room_name).child(subfolder_name).update({
            like:likes
      });
}
