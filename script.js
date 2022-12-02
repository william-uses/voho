var chatList = document.querySelector(".chat-list");
var chatSpace = document.querySelector(".chat-space");
var sender = document.querySelector(".sender");

sender.addEventListener("click",(e)=>{
    chatList.classList.add("hidden")
    chatSpace.classList.remove("hidden")

})

const firebaseConfig = {
    apiKey: "AIzaSyCf-wzHxEXPYaS2YSwuqw1Dmz2_fSXOLmM",
    authDomain: "chat-app-ac3b1.firebaseapp.com",
    databaseURL: "https://chat-app-ac3b1-default-rtdb.firebaseio.com",
    projectId: "chat-app-ac3b1",
    storageBucket: "",
    messagingSenderId: "99671200397",
    appId: "1:99671200397:web:9a37c4184ee8dfa78e88c4",
    // measurementId: "G-2QE0XKMSRG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var myName = prompt("Enter your name");




  function sendMessage() {
    // get message
    var message = document.getElementById("message-space").value;

    // save in database
    if (message != ''){
    firebase.database().ref("messages").push().set({
      "sender": myName,
      "message": message
    })};
   
document.getElementById("message-space").value = '';
    // prevent form from submitting
    return false;
  }

  firebase.database().ref("messages").on("child_added", function (snapshot) {
    var html = "";
    // give each message a unique ID
    html += "<li id='message-" + snapshot.key + "'";
    // show delete button if message is sent by me
    if (snapshot.val().sender == myName) {
      html += "class='flex justify-start'>"
      html += "<div class='bg-slate-400 relative max-w-xl px-4 py-2 text-gray-700 rounded shadow transition-all'>"
      html += "<svg class='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' data-id='" + snapshot.key + "' onclick='deleteMessage(this);'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'></path></svg>";
      html += "<span class='block break-words'>You: "
    }
    else{
      html += "class='flex justify-end'>"
      html += "<div class='bg-slate-300 relative max-w-xl px-4 py-2 text-gray-700 rounded shadow transition-all'>"
      html+= "<span class='block break-words'>"+ snapshot.val().sender + ": "
    }
    html += snapshot.val().message; + "</span>"
     html += "</div>";
    html += '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>'
    html += "</li>";

    document.getElementById("messages").innerHTML += html;
  });

  function deleteMessage(self) {
    // get message ID
    var messageId = self.getAttribute("data-id");

    // delete message
    firebase.database().ref("messages").child(messageId).remove();
  }

  // attach listener for delete message
  firebase.database().ref("messages").on("child_removed", function (snapshot) {
    // remove message node
  var deletedMessage = '<i class="flex rounded bg-slate-300 px-4 py-2">'
    deletedMessage += '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>'
  deletedMessage += "This message has been removed</i>"
    document.getElementById("message-" + snapshot.key).innerHTML = deletedMessage;
  });

var backButton = document.getElementById('back-button')
backButton.addEventListener("click",(e)=>{
    chatList.classList.remove("hidden")
    chatSpace.classList.add("hidden")
})