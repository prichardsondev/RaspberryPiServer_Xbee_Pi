const socketio = io.connect('/');
let hex;
const sendData = ((event, payload, isHex, pin) =>  { 
  if(payload!=undefined)
    socketio.emit(event, { payload, isHex, pin });
});

socketio.on("update", data => {

    let radio = data.radio;
    let state = data.state;

    for (const key in state) {

      if (Object.hasOwnProperty.call(state, key)) {
        const val = state[key];

        if (typeof val !== 'object') {
          let btn = document.getElementById(`${radio}#${key.slice(-1)}#button`);
          if(btn!=null)
            (val == 0 ? (btn.innerHTML = "Off", btn.style.color = '#000000') :
              (btn.innerHTML = "On", btn.style.color = '#ffff00'));
        }
        else {
          let span = document.getElementById(`${radio}#${key.slice(-1)}#span`);
          if(span!=null){
            let color = `#${toHex(parseInt(val.r))}${toHex(parseInt(val.g))}${toHex(parseInt(val.b))}`;
            span.style.color = color;
          }
        }
      }
    }

});

function togglecheckboxes(source) {
  var checkboxes = document.getElementsByName('ledlightcheckbox');
  for (var i = 0; i < checkboxes.length; i++)
    if (checkboxes[i] != source)
      checkboxes[i].checked = source.checked;
}

function setledlights(val) {
  if (val != undefined){ 
    hex = val;
    document.getElementById("setledlights").style.background = '#7a7895';
  }
  var tags = document.getElementsByName('ledlightcheckbox');
  for (var i = 0; i < tags.length; ++i) {
    if (tags[i].checked) {
      let data = tags[i].id.split("#");
      sendData(data[0], hex, true, data[1]);
    }
  }
}

// https://stackoverflow.com/questions/40253697/how-to-create-a-color-picker-in-html
function initColorPicker() {
  var canvas = document.getElementById('colorCanvas');
  var canvasContext = canvas.getContext('2d');

  let gradient = canvas.getContext('2d').createLinearGradient(0, 0, canvas.width, 0)
  gradient.addColorStop(0, '#ff0000')
  gradient.addColorStop(1 / 6, '#ffff00')
  gradient.addColorStop((1 / 6) * 2, '#00ff00')
  gradient.addColorStop((1 / 6) * 3, '#00ffff')
  gradient.addColorStop((1 / 6) * 4, '#0000ff')
  gradient.addColorStop((1 / 6) * 5, '#ff00ff')
  gradient.addColorStop(1, '#ff0000')
  canvas.getContext('2d').fillStyle = gradient
  canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)

  gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  canvas.getContext('2d').fillStyle = gradient
  canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)

  gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, canvas.height)
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
  gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
  canvas.getContext('2d').fillStyle = gradient
  canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height)


  canvas.onclick = function (e) {
    var imgData = canvasContext.getImageData((e.offsetX / canvas.clientWidth) * canvas.width, (e.offsetY / canvas.clientHeight) * canvas.height, 1, 1);
    canvasClick(imgData);
  }
}

function canvasClick(imgData) {
  var rgba = imgData.data;
  hex = `${toHex(rgba[0])}${toHex(rgba[1])}${toHex(rgba[2])}`;
  document.getElementById("setledlights").style.background = `#${hex}`;
}

function toHex(n) {
  var hex = n.toString(16);
  while (hex.length < 2) { hex = "0" + hex; }
  return hex;
}

initColorPicker();