const SerialPort = require("serialport");
const xbee_api = require("xbee-api");
const { radios } = require("../radios/index");

const xbeeSerial = new SerialPort("/dev/ttyUSB0", {
  baudRate: 9600,
});

const xbeeAPI = new xbee_api.XBeeAPI({ api_mode: 1 });
xbeeSerial.pipe(xbeeAPI.parser);

xbeeSerial.on("open", () => {
  console.log("Xbee Port Open");

  //ask all radios (remote arduino's) for update
  Object.entries(radios).forEach(([k, v]) =>
    send({ payload: "update", address: v.address }));

  // by hand calling each radio
  // let data = { payload: "update", address: radios.bench.address };
  // send(data);
  // data = { payload: "update", address: radios.garage.address };
  // send(data);
});


module.exports = io => {

  xbeeAPI.parser.on("data", frame => {
    if (typeof frame != "undefined") {

      //data we sent
      if (frame.type == 144) {

        let radio = Object.entries(radios).find(([key]) =>
          radios[key].address == frame.remote64);
        let name = radio[0];
        radio = radios[name];

        if (frame.data.length == 2) {
          radio.state[`pin${frame.data[1]}`] = frame.data[0];
          io.emit('update', { radio: name, state: radio.state });
        }
        else if (frame.data.length == 4) {
          radio.state[`pin${frame.data[3]}`] =
            { r: `${frame.data[0]}`, g: `${frame.data[1]}`, b: `${frame.data[2]}` };
          io.emit('update', { radio: name, state: radio.state });
        }
      }
      // if (frame.remote64 == radios.garage.address) {
      //   if (frame.data.length == 2) {
      //     radios.garage.state[`pin${frame.data[1]}`] = frame.data[0];
      //     io.emit('update', { radio: "garage", state: radios.garage.state });
      //   }
      //   else if (frame.data.length == 4) {
      //     radios.bench.state[`pin${frame.data[3]}`] =
      //       { r: `${frame.data[0]}`, g: `${frame.data[1]}`, b: `${frame.data[2]}` };
      //     io.emit('update', { radio: "garage", state: radios.garage.state });
      //   }
      //}
    }
    //io data from radio
    else if (frame.type == 146) {
      if (frame.remote64 == "") {
        //check frame.digitalSamples.DIO0 ...
      }
    }
  })
};

let send = (data) => {

  if (data.hasOwnProperty('payload')) {

    if (data.isHex == true) {
      var color = data.payload.match(/.{2}/g);
      data.payload = [];
      color.forEach((element, i) => {
        data.payload[i] = parseInt(element, 16);
      });
      let pin = parseInt(data.pin,);
      data.payload.push(pin);
    }

    let frame = {
      type: 0x10,
      id: 0x01,
      destination64: data.address,
      destination16: "fffe",
      broadcastRadius: 0x00,
      options: 0x00,
      data: data.payload
    }

    xbeeSerial.write(xbeeAPI.buildFrame(frame));
  }

};

module.exports.send = send;