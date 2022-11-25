function rr(){
 document.body.innerHTML=`
 <video width="100%" height="100%" autoplay onplay="clicked()">
  <source src="roll.mp4" type="video/mp4">
  Your browser does not support HTML5 video.
</video>
 `;
}
function clicked() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.countapi.xyz/hit/osmiumNetwork/EduKit");
    xhr.responseType = "json";
    xhr.onload = function() {
        alert(`You are the ${this.response.value} person to get rolled`);
    }
    xhr.send();
}
function openInNewTab(url) {


  win = window.open();
  win.document.body.style.margin = '0';
  win.document.body.style.height = '100vh';

  /*
  var icon = win.document.createElement('link')
  icon.rel = "shortcut icon"
  icon.href = ""
  icon.type = "image/png"
  win.document.head.appendChild(icon)


  var arc = win.document.createElement('script')
  arc.async = true
  arc.src = "https://arc.io/widget.min.js#arcidhereithink"
  win.document.head.appendChild(arc)

  var title = win.document.createElement('title')
  title.innerText = "Calculator"
  win.document.head.appendChild(title)
  
  var home = win.document.createElement('a')
  home.style.display = "block"
  home.style.position = "absolute"
  home.style.fontFamily = "'Courier New', Courier, monospace";
  home.style.color = "rgb(76, 160, 55)"
  home.href="#"
  home.onclick = 'return console.log("hi") && false'
  home.innerText = "home"
  win.document.body.appendChild(home);
  */

  var iframe = win.document.createElement('iframe');
  iframe.style.border = 'none';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.margin = '0';
  iframe.id = 'content';
  iframe.src = url;
  win.document.body.appendChild(iframe);

}
