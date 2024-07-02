const { Server } = require("socket.io");

const io = new Server(3000, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

const Email=new Map();
const Socket=new Map();

io.on("connection", (socket) => {
    console.log("connected", socket.id);
    socket.on("JOIN",(data)=>{
        console.log(data);
        const { email, room } = data;
        Email.set(email, socket.id);
        Socket.set(socket.id, email);
        io.to(room).emit("JOINED", { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit("JOIN", data);
    })


    socket.on("make-call",({to,sendoffer})=>{
        io.to(to).emit("recieve-call",{from:socket.id,sendoffer})
    })

    socket.on("accept-call",({to,ans})=>{
        io.to(to).emit("accepted",{from:socket.id,ans})
    })

});

// socket.on("make-call",({to,sendoffer})=>{
//     io.to(to).emit("recieve-call",{from:socket.id,sendoffer})
// })

io.engine.on("headers", (headers, request) => {
    headers["Access-Control-Allow-Origin"] = "http://localhost:5173";
    headers["Access-Control-Allow-Methods"] = "GET, POST";
    headers["Access-Control-Allow-Headers"] = "my-custom-header";
    headers["Access-Control-Allow-Credentials"] = "true";
});

// const {Server}=require ("socket.io");

// const io = new Server(3000, { 
//     cors:{
//         origin: "http://localhost:5173/",
//         methods: ["GET", "POST"],
//         allowedHeaders: ["my-custom-header"],
//         credentials: true
//     },
//  });

//  io.on("connection", (socket) => {
//     console.log("connected",socket.id);
//   });