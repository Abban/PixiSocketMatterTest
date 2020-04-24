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

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
});

app.get('/matter', (req, res) => {
    res.sendFile(__dirname + '/pages/matter.html');
});

app.get('/sprite-swap', (req, res) => {
    res.sendFile(__dirname + '/pages/sprite-swap.html');
});

app.get('/sprite-drag', (req, res) => {
    res.sendFile(__dirname + '/pages/sprite-drag.html');
});

app.get('/collider', (req, res) => {
    res.sendFile(__dirname + '/pages/collider.html');
});

let spinner = null;
let sockets = [];
io.on('connection', (socket) => {
    console.log('a user connected');

    sockets.push(socket);
    io.emit('user connected', sockets.length);

    if(spinner === null) {
        spinner = spin();
    }

    socket.on('mousedown', (from, msg) => {
        clearInterval(spinner);
        spinner = null;
    });

    socket.on('mouseup', (from, msg) => {
        if(spinner === null) {
            spinner = spin();
        }
    });

    socket.on('disconnect', () => {
        let index = sockets.indexOf( socket );
        sockets.splice( index, 1 );

        io.emit('user disconnected', sockets.length);
    });
});

const spin = () => {
    return setInterval(() => {
        Matter.Engine.update(engine, tick);
        rotation += 0.1;
        io.emit('tick', rotation);
        // io.emit('position', imageBody.position);
    }, tick);
};

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
