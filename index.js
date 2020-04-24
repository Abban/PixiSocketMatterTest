const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
import Matter from 'matter-js';

import {settings} from './resources/game/settings';

const port = 3000;
http.listen(3030);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
});

const globalCollisions = 0x0001,
    noCollisions = 0x0002;

let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    Body = Matter.Body;

// create engine
let engine = Engine.create(),
    world = engine.world;

engine.world.gravity.y = 0;

let sockets = [];
io.on('connection', (socket) => {
    console.log('a user connected');

    sockets.push(socket);
    io.emit('user connected', sockets.length);

    socket.on('kick', (direction) => {
        console.log('Kicked: ', direction);
        Body.setVelocity(ball, direction);
    });

    socket.on('reset', (from) => {
        console.log('reset');
        ball.reset();
    });

    socket.on('bump', (from) => {
        console.log('bump');
        Body.setVelocity(ball, {x: Common.random(-10, 10), y: Common.random(-10, 10)});
    });

    socket.on('disconnect', () => {
        let index = sockets.indexOf( socket );
        sockets.splice( index, 1 );
        io.emit('user disconnected', sockets.length);
    });
});

// Add edges
let edgeColliders = [];
settings.edges.forEach(edge => {
    edgeColliders.push(
        Bodies.rectangle(
            edge.x + (edge.width / 2),
            edge.y + (edge.height / 2),
            edge.width,
            edge.height,
            {
                isStatic: true,
                collisionFilter: {category: globalCollisions},
            }
        )
    );
});

World.add(world, edgeColliders);

let ball = Bodies.circle(
    settings.windowCenter.x,
    settings.windowCenter.y,
    settings.ball.radius,
    {
        restitution: 1,
        friction: 0,
        label: 'ball',
        collisionFilter: {mask: globalCollisions},
    }
);

ball.reset = function() {
    Body.setPosition(
        this,
        {
            x: settings.windowCenter.x,
            y: settings.windowCenter.y
        }
    );
    Body.setVelocity(this, {x: 0, y: 0});
}

World.add(world, ball);

let FPS = 10;
const tick = 1000/FPS;
setInterval(() => {
    Matter.Engine.update(engine, tick);
    io.emit('tick', { ballPosition: ball.position });
}, tick);

// const io = require('socket.io')(http);
// import Matter from 'matter-js';

/*const World = Matter.World;
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
const tick = 1000/FPS;*/

/*let spinner = null;
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
};*/

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
