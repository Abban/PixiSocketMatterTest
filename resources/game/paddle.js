export default class Paddle {

    constructor(settings, app, handleTexture) {
        this.settings = settings;
        this.app = app;

        this.handle = new PIXI.Sprite.from(handleTexture);
        // const redMan = new PIXI.Sprite.from(redManTexture);
        // redMan.setParent(handle);

        this.handle.anchor.set(0.5);
        this.handle.x = app.screen.width / 2;
        this.handle.y = app.screen.height / 2;

        this.app.stage.addChild(this.handle);

        // make the sprite interactive
        this.handle.interactive = true;
        this.handle.buttonMode = true;

        this.handle.on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);
    }



    onDragStart(event) {
        console.log(event);
        this.data = event.data;
        this.startPositionY = this.y;
        this.clickStartPosition = this.data.getLocalPosition(this.parent);
        this.alpha = 0.5;
        this.dragging = true;
    }

    onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
        this.startPositionY = null;
    }

    onDragMove() {
        if (!this.dragging) {
            return;
        }

        const newPosition = this.data.getLocalPosition(this.parent);
        const newPositionY = this.startPositionY - (this.clickStartPosition.y - newPosition.y);

        if (newPositionY < this.height / 2) {
            return;
        }

        if (newPositionY > this.app.screen.height - (this.height / 2)) {
            return;
        }

        this.y = this.startPositionY - (this.clickStartPosition.y - newPosition.y);
    }
}