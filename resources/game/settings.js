export const PLAYER_TYPE_RED = 0;
export const PLAYER_TYPE_BLUE = 1;

export let settings = {
    windowWidth: 1100,
    windowHeight: 1100,

    ball: {
        width: 48,
        radius: 24
    },

    kickVelocity: {
        block: 2,
        kick: 20
    },

    kickColliderOffset: 30,
    kickerRadius: 16,

    edges: [
        {x: 70, y: 265, width: 960, height: 16},
        {x: 70, y: 820, width: 960, height: 16},
        {x: 25, y: 265, width: 45, height: 190},
        {x: 0, y: 265, width: 5, height: 571},
        {x: 25, y: 646, width: 45, height: 190},
        {x: 1030, y: 265, width: 45, height: 190},
        {x: 1095, y: 265, width: 5, height: 571},
        {x: 1030, y: 646, width: 45, height: 190}
    ],

    goals: [
        {x: 5, y: 455, width: 45, height: 191, label: 'red goal'},
        {x: 1050, y: 455, width: 45, height: 191, label: 'blue goal'},
    ],

    paddles: [
        {
            id: 'redGoalie',
            type: PLAYER_TYPE_RED,
            xPosition: 178,
            moveConstraints: 60,
            players: [
                {yPosition: 0}
            ]
        },
        {
            id: 'redBacks',
            type: PLAYER_TYPE_RED,
            xPosition: 178 + 107,
            moveConstraints: 60,
            players: [
                {yPosition: -130},
                {yPosition: 130}
            ]
        },
        {
            id: 'redMidfield',
            type: PLAYER_TYPE_RED,
            xPosition: 178 + 107 * 3,
            moveConstraints: 60,
            players: [
                {yPosition: -170},
                {yPosition: -85},
                {yPosition: 0},
                {yPosition: 85},
                {yPosition: 170}
            ]
        },
        {
            id: 'redForwards',
            type: PLAYER_TYPE_RED,
            xPosition: 178 + 107 * 5,
            moveConstraints: 60,
            players: [
                {yPosition: -150},
                {yPosition: 0},
                {yPosition: 150}
            ]
        },

        {
            id: 'blueGoalie',
            type: PLAYER_TYPE_BLUE,
            xPosition: 178 + 107 * 7,
            moveConstraints: 60,
            players: [
                {yPosition: 0}
            ]
        },
        {
            id: 'blueBacks',
            type: PLAYER_TYPE_BLUE,
            xPosition: 178 + 107 * 6,
            moveConstraints: 60,
            players: [
                {yPosition: -130},
                {yPosition: 130}
            ]
        },
        {
            id: 'blueMidfield',
            type: PLAYER_TYPE_BLUE,
            xPosition: 178 + 107 * 4,
            moveConstraints: 60,
            players: [
                {yPosition: -170},
                {yPosition: -85},
                {yPosition: 0},
                {yPosition: 85},
                {yPosition: 170}
            ]
        },
        {
            id: 'blueForwards',
            type: PLAYER_TYPE_BLUE,
            xPosition: 178 + 107 * 2,
            moveConstraints: 60,
            players: [
                {yPosition: -150},
                {yPosition: 0},
                {yPosition: 150}
            ]
        }
    ]
};

settings.windowCenter = {
    x: settings.windowWidth / 2,
    y: settings.windowHeight / 2
};
