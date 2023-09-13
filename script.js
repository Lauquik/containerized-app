const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const username = document.getElementById("login-username");
const password = document.getElementById("login-password");
const submit = document.getElementById("login-button");
const mainContent = document.getElementById("mainContent");
const loginConent = document.getElementById("loginConent");

submit.addEventListener("click", () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  };

  fetch("http://localhost:4000", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.found == true) {
        alert("login success");
        socket.emit("new-user", username.value);
        appendMessage("you're connected");
        mainContent.style.display = "block";
        loginConent.style.display = "none";
      } else {
        alert("username or email incorrect");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
