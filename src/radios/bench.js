module.exports = (socket,xbeeSerial) => {
    socket.on('bench', (data) => {
        data.address = address;
        xbeeSerial.send(data);
    });
}
const address = "TODO Radio Address";
module.exports.address =  address;

let state = {}
module.exports.state = state;