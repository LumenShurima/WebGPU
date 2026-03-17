// InputMgr.js


const debugging = false;

export class InputMgr {
    

    
    static dragging = false;
    static Canvas; 
    static mouseX = 0;
    static mouseY = 0;

    constructor() {    
        
    }

    // Key Input
    static Key_W() {}

    // Mouse Input
    static Mouse_Down_Left() {}
    static Mouse_Down_Wheel() {}
    static Mouse_Down_Right() {}
    static Mouse_Up_Left() {}
    static Mouse_Up_Wheel() {}
    static Mouse_Up_Right() {}
    static Mouse_Move() {}
    static Mouse_wheel() {}
    static Mouse_Drag_Begin() {}
    static Mouse_Dragging() {}
    static Mouse_Drag_End() {}
    
    static tick() {
        
    }

    static Init(elem) {
        this.Canvas = elem;
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

        

        elem.addEventListener("mousedown", (e)=> {
            if(debugging) console.log("down", e.button, e.clientX, e.clientY);
            if(!this.dragging)
            {
                this.dragging = true;
                InputMgr.Mouse_Drag_Begin();
                if(debugging) console.log("Dragging Begin");
            }
            if (e.button === 0) {
                if(debugging) console.log("Mouse Left Down");
                InputMgr.Mouse_Down_Left();
            }
            if (e.button === 1) {
                if(debugging) console.log("Mouse Wheel Down");
                InputMgr.Mouse_Down_Wheel();
            }
            if (e.button === 2) {
                if(debugging) console.log("Mouse Right Down");
                InputMgr.Mouse_Down_Right();
            }
            
        })

        
        elem.addEventListener("click", async () => {
            // 마우스 포인터 숨김
            // await elem.requestPointerLock();
        });


        elem.addEventListener("mousemove", (e) => {
            if(debugging) console.log("move", e.clientX, e.clientY);
            // Save Mouse Position
            // if (document.pointerLockElement !== elem) return;

            this.mouseX = e.clientX; this.mouseY = e.clientY;
            // console.log(this.getMousePosCanvasNDC());
            // IsDragging
            if(this.dragging) {
                InputMgr.Mouse_Dragging();
                if(debugging) console.log("Dragging");
                
            }

            InputMgr.Mouse_Move();
        });

        elem.addEventListener("mouseup", (e) => {
            if(debugging) console.log("up", e.button);
            if (e.button === 0) {
                if(debugging) console.log("Mouse Left Up");
                InputMgr.Mouse_Up_Left();
            }
            if (e.button === 1) {
                if(debugging) console.log("Mouse Wheel Up");
                InputMgr.Mouse_Up_Wheel();
            }
            if (e.button === 2) {
                if(debugging) console.log("Mouse Right Up");
                InputMgr.Mouse_Up_Right();
            }
        });

        window.addEventListener("mouseup", () => {
            if(this.dragging)
            {
                this.dragging = false;
                if(debugging) console.log("Dragging End");
                InputMgr.Mouse_Drag_End();
            }
        });

        elem.addEventListener("wheel", (e) => {
            if(debugging) console.log("wheel", e.deltaY);
        });
    }


    static getMousePosCanvasCartesian() {
        const rect = this.Canvas.getBoundingClientRect();
        const cx = rect.width  * 0.5;
        const cy = rect.height * 0.5;

        return {
            x: this.mouseX - cx,
            y: cy - this.mouseY,
        };
    }

    static getMousePosCanvasNDC(digits = 3) {
        const p = this.getMousePosCanvasCartesian();
        const rect = this.Canvas.getBoundingClientRect();
        const sx = 2 / rect.width;
        const sy = 2 / rect.height;

        return {
            ndcX: this.truncFloat(p.x * sx, digits),
            ndcY: this.truncFloat(p.y * sy, digits),
        };
    }

    static truncFloat(v, digits) {
        const k = 10 ** digits;
        return Math.trunc(v * k) / k;
    }

    
}