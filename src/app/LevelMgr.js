// LevelMgr.js


import Actor from "./Actor.js";


export class LevelMgr {
    static Actors = [];

    static addActor(_actor) {
        this.Actors.push(_actor);
    }

    static update() {
        this.Actors.forEach(e => {
            e.update();
        });
    }

    static render(renderPass) {
        this.Actors.forEach(e => {
            e.render(renderPass);
        });
    }
}