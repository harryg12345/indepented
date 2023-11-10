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

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  mainf = childKey;
                  console.log(mainf)
                  divtag ='<div class="room_name" id="'+mainf+'" onclick="redirect(this.id)">'+mainf+'</div> <hr>';
                  document.getElementById("output").innerHTML+=divtag;
            });
      });
}
getData();
function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "room created"
      });
      localStorage.setItem("room_key", room_name);
      window.location = "kwitter_message.html"

}
function redirect(room_id){
 localStorage.setItem("room_key" , room_id);  
 window.location = "kwitter_message.html"

}
function logout() {
localStorage.removeItem("user_key");
localStorage.removeItem("room_key");
window.location="index.html";
}