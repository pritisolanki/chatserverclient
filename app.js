const server = require('net').createServer();
let counter =0;
let sockets ={};

function timestamp(){
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
}

server.on('connection', socket =>{
    socket.id = counter++;
 
    console.log("Client connected !");
    socket.write(`Please type your name\n`);

    socket.on('data', data=>{
        if(!sockets[socket.id]){
            socket.name = data.toString().trim();
            socket.write(`Welcome ${socket.name}!\n`)
            sockets[socket.id]=socket;
            return;
        }

        Object.entries(sockets).forEach(([key,cs]) =>{
            if(socket.id == key) return;
            cs.write(`${socket.name} ${timestamp()}: `);
            cs.write(data);
        })
    })

    socket.on('end', ()=>{
        delete socket[socket.id];
        console.log('client disconnected!')
    })
});

server.listen(8000, ()=> console.log('Server bound'));

