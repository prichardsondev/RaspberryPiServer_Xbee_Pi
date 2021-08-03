module.exports = (socket,xbeeSerial) => {
    require("./bench")(socket,xbeeSerial)
}

module.exports.radios = {
    bench: require("./bench")
};