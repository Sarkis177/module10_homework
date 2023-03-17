const wsUri = "wss://echo-ws-service.herokuapp.com";

function pageLoaded() {
    const chatOutput = document.querySelector(".chat_output");
    const input = document.querySelector("input");
    const sendBtn = document.querySelector(".btn_send");
    const geoLocBtn = document.querySelector(".btn_geoLacation");
      
    let socket = new WebSocket(wsUri);

    socket.onmessage = (event) => {
        writeToChat(event.data, true);
    }

    sendBtn.addEventListener("click", sendMessage);
    geoLocBtn.addEventListener("click", getLocation);
  
  function getLocation() {
    if ("geolocation" in navigator) {
      let locationOptions = {
        enableHighAccuracy: true
      };
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
    } else {
        chatOutput.innerHTML +=`Ваш браузер не поддерживает функцию определения местоположения`;
    }
  }
  
  function locationSuccess(data) {
    let link = `https://www.openstreetmap.org/#map=18/{data.coords.longitude},${data.coords.latitude}`;
    chatOutput.innerHTML +=`<div class=recieved><a href="${link}" target="_blank">Вы находитесь здесь</a></div>`;
  }
  
  function locationError() {
    chatOutput.innerHTML +=`<div class=recieved>При получении местоположения произошла ошибка</div>`;
  }
  
  
  
    function sendMessage() {
        if (!input.value) return;
        socket.send(input.value);
        writeToChat(input.value, false);
        input.value === "";
    }

    function writeToChat(message, isRecieved) {
        let messageHTML = `<div class="${isRecieved ? "recieved" : "sent"}">${message}</div>`;
        chatOutput.innerHTML += messageHTML;
    }
}

document.addEventListener("DOMContentLoaded", pageLoaded);