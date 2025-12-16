// InputMgr.js



export class InputMgr {
    constructor() {
        window.addEventListener("keydown", (e) => {
            this.key_W();
        });
        
        window.addEventListener("keyup", (e) => {
            console.log("released:", e.key);
        });
    }

    static key_W() {

    }
}