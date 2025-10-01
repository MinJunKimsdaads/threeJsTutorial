import { create } from "zustand";

export const useSceneStore = create((set)=>{
    geometry:{
        width:5.0,
        height:5.0,
        depth:5.0,
        radius:5.0,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
        segments: 10,
        thetaStart: Math.PI * 0.00,
        thetaLength: Math.PI * 0.00,
        radialSegments: 25,
        openEnded: false,
        radiusTop: 1.0,
        radiusBottom 1.0,
        detail: 0
        
    }
})