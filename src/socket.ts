module.exports = function(io: any) {
  io.on('connection', (client: any) => {
    console.log("Client connected...");
    //Do Socket Magic here
  });
}
