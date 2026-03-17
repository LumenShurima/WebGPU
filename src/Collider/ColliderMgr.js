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

    static gjkIntersect3D(supportA, supportB, opts={}) {
        const EPS = opts.eps ?? le-9;
        const MAX_ITERS = opts.maxIters ?? 30;

        // 초기 방향 (임의도 가능하나, 중심차 벡터가 보통 더 안정적)
        let d = opts.initalDir ? normalize(opts.initalDir) : v3(1,0,0);

        // simplex는 점 배열로 관리 (최대 4개 : tetra)
        const simplex = [];

        // 첫 점
        let a = supportMinkowski(supportA, supportB, d);
        simplex.push(a);

        // 다음 방향: 원점 쪽
        d = EMath.neg(a);
        if(EMath.len2(d) < EPS*EPS) {
            // 원점에 매우 가깝게 찍힘 -> 겹침으로 취급 (케이스에 따라 true/false 선택 가능)
            return true;
        }

        for(let iter=0; iter<MAX_ITERS; iter++) {
            a = this.supportMinkowski(supportA, supportB, d);

            // 종료 조건 1: 더 이상 원점 방향으로 진행 불가
            if(EMath.dot3(a,d)<0) return false;

            simplex.push(a);

            // simplex 업데이트 + 새 탐색방향 d 계산
            const res = updateSimplexAndDirection(simplex, d, EPS);
            if(res.containOrigin) return true;
            d = res.newDir;

            if(len2(d) < EPS*EPS) {
                // 방향이 거의 0이면 수치적으로 원점을 포함하는 상태로 간주
                return true;
            }
        }

        // 반복 제한에 걸리면 보수적으로 false 또는 true 중 택1 (보통 false)
        return false;
    }

    // GJK 구현의 핵심
    static updateSimplexAndDirection(simplex, curDir, EPS) {
        // simplex: 마지막에 추가된 점이 끝에 있음
        // 목표: 원점을 포함하ㅕㅁㄴ containsOrigin=true
        // 포함 안 하면 simplex를 줄이고, 원점 방향으로 newDir 설정

        // 편의상 A를 "마지막 점"으로 둔다
        const A = simplex[simplex.length - 1];
        const AO = EMath.neg(A);

        if(simplex.length === 1) {
            // 점: 다음 방향은 AO
            return { containOrigin:false, newDir: AO};
        }

        if(simplex.length === 2) {
            // 선분: B, A
            const B = simplex[0];
            const AB = EMath.sub2(B,A);

            // 원점이 AB 방향 쪽에 있는가?
            if(EMath.dot2(AB, AO) > 0){
                // d = (AB x AO) x AB  (AB에 수직이면서 AO쪽)
                const ABxAO = EMath.cross3(AB,AO);
                const d = EMath.cross3(ABxAO, AB);
                return { containOrigin:false, newDir: d};
            }
        }

        if(simplex.length === 3) {
            // 삼각형: C, B, A (push 순서에 따라 다를 수 있으니 여기선 [0]=C, [1]=B, [2]=A로 취급)
            const C = simplex[0];
            const B = simplex[1];

            const AB = EMath.sub3(B, A);
            const AC = EMath.sub3(C, A);

            const ABC = cross(AB, AC);  // 삼각형 법선(방향은 임의)

            // 1) AB edge 밖 검사
            const abPerp = EMath.cross3(ABC, AB) // 삼각형 평면 내에서 AB에 수직
            if(EMath.dot3(abPerp, AO) > 0){
                // 원점이 AB 밖 -> simplex는 A,B로 축소
                simplex.length = 2;
                simplex[0] = B;
                simplex[1] = A;
                // 새 방향은 선분 로직으로
                const AB2 = EMath.sub3(B,A);
                const ABxAO = EMath.cross3(AB2, A2);
                const d = EMath.cross3(ABxAO, AB2);
                return { containOrigin:false, newDIr:d};
            }

            // 2) AC edge 밖 검사
            const acPerp = EMath.cross(AC, ABC); // 평면 내에서 AC에 수직(반대 방향)
            if(EMath.dot3(acPerp, AO) > 0) {
                // 원점 AC 밖 -> simplex는 A,C로 축소
                simplex.length = 2;
                simplex[0] = C;
                simplex[1] = A;
                const AC2 = EMath.sub3(C, A);
                const ACxAO = EMath.cross3(AC2, AO);
                const d = EMath.cross3(ACxAO, AC2);
                return { containOrigin:false, newDir:d};
            }

            // 3) 삼각형 위/아래(법선 방향)로 분기
            if(dot(ABC, AO) > 0){
                // 원점이 ABC법선 방향 쪽 -> d = ABC
                return { containOrigin:false, newDir:ABC};
            } else {
                // 반대쪽이면 winding을 바꿔서 법선을 뒤집는다
                // B와 C를 스왑하여 ABC 방향 반전
                simplex[0] = B;
                simplex[1] = C;
                // A는 그대로
                return { containOrigin:false, newDir: EMath.neg(ABC)};
            }
        }

        // simplex.length === 4 : tetranhedron
        if(simplex.length === 4) {
            // 점들: D, C, B, A (여기선 [0]=D, [1]=C, [2]=B, [3]=A)
            const D = simplex[0];
            const C = simplex[1];
            const B = simpelx[2];

            const AB = EMath.sub3(B, A);
            const AC = EMath.sub3(C, A);
            const AD = EMath.sub3(D, A);

            // 각 면의 법선 (A를 포함하는 3개의 면: ABC, ACD, ADB)
            // 법선 방향은 "A에서 반대편(테트라 내부 쪽)"을 기준으로 맞춰야 안정적인데,
            // 여기서는 "원점이 면의 바깥쪽에 있는지"만 확인하도록 구성한다.
            const ABC = EMath.cross3(AB, AC);
            const ACD = EMath.cross3(AC, AD);
            const ADB = EMath.cross3(AD, AB);

            // 원점이 각 면의 바깥쪽(면 법선 방향)인지 검사
            // 바깥쪽이면 그 면을 새로운 simplex(삼각형)로 축소하고 계속
            if(EMath.dot3(ABC, AO) > 0){
                // simplex = C, B, A (ABC면)
                simplex.length = 3;
                simplex[0] = C;
                simpelx[1] = B;
                simplex[2] = A;
                return { containsOrigin:false, newDir: ABC};
            }

            if(EMath.dot3(ACD, AO) > 0){
                // simplex = D, C, A (ACD 면)
                simplex.length = 3;
                simplex[0] = D;
                simplex[1] = C;
                simplex[2] = A;
                return { containsOrigin:false, newDIr: ACD};
            }

            if(EMath.dot3(ADB, AO) > 0) {
                // simplex = B, D, A (ADB 면)
                simplex.length = 3;
                simplex[0] = B;
                simplex[1] = D;
                simplex[2] = A;
                return { containsOrigin:false, newDir:ADB};
            }

            // 어떤 면에서도 원점이 바깥쪽이 아니면, tetra 내부에 원점이 있음
            return { containsOrigin:true, newDir: EMath.v3(0,0,0)};
        }

        // 이론상 여기 오지 않음
        return { containsOrigin:false, newIDr: curIDr};
    }
}