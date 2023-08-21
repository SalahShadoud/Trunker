const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const outputDiv = document.getElementById("output");
const constraints = { video: { facingMode: "environment" } };

navigator.mediaDevices
  .getUserMedia(constraints)
  .then(function (stream) {
    video.srcObject = stream;
    video.setAttribute("playsinline", true);
    video.play();
    requestAnimationFrame(tick);
  })
  .catch(function (error) {
    console.error(error);
  });


  function request(data) {
    let xhttp = new XMLHttpRequest();

    // Making our connection
    xhttp.open("POST", '/scan_code', true);
    
    const formdata = new FormData()
    formdata.append("order_num", data)
    // function execute after request is successful
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            outputDiv.innerHTML = this.responseText
        }
    }
    // Sending our request
    xhttp.send(formdata);
}


function tick() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
      outputDiv.innerHTML = "Please wait until we process your request...";
      document.querySelector(".scanner").remove()
      var data = code.data
      console.log(typeof data);
      var response = request(data);
    }
  }
  requestAnimationFrame(tick);
  
}


