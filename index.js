const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
import Matter from 'matter-js';

const World = Matter.World;
const engine = Matter.Engine.create();

const imageBody = Matter.Bodies.circle(
    0,
    0,
    80,
    {
        restitution: 0.8,
    }
);
World.addBody(engine.world, imageBody);

http.listen(3030);

const port = 3000;

let rotation = 0;
let FPS = 60;
const tick = 1000/FPS;

setInterval(() => {
    Matter.Engine.update(engine, tick);
    rotation += 0.1;
    io.emit('tick', rotation);
    // io.emit('position', imageBody.position);
}, tick);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('ClickyClicky', (from, msg) => {
        console.log('ClickyClicky');
    });

    socket.on('disconnect', () => {
        io.emit('user disconnected');
    });
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
