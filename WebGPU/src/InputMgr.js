// InputMgr.js



export class InputMgr {
    
    constructor() {
        
    }

    static Init() {
        console.log("InputMgr Init.");
        window.addEventListener("keydown", (e) => {
            if(e.key === "w" || e.key === "W") {
                InputMgr.key_W();
            }
            if(e.key === "s" || e.key === "S") {
                InputMgr.key_S();
            }
            
        });
        
        window.addEventListener("keyup", (e) => {
            console.log("released:", e.key);
        });
    }

    static Key_W() {

    }
}