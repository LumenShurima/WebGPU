/*
 * ColliderMgr.js
*/

import EMath from "../EMath";


class ColliderMgr {
    

    static supportMinkowski(supportA, supportB, d) {
        // support_(A⊖B)(d) = supportA(d) - supportB(-d)
        const p1 = supportA(d);
        const p2 = supportB(EMath.neg(d));
        return EMath.sub3(p1,p2);
    }
}