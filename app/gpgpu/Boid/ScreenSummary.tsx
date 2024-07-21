import * as THREE from 'three';
import { BoidInformation } from './BoidInformation';

export class ScreenSummary{
    boidInfo: BoidInformation;
    vs = ``;
    fs = ``;
    geometry: THREE.PlaneGeometry;
    material: THREE.ShaderMaterial;
    uniforms: { [key: string]: THREE.Uniform };
    mesh: THREE.Mesh;

    constructor(boidInfo: BoidInformation){
        this.boidInfo = boidInfo;
        this.geometry = new THREE.PlaneGeometry(2.0, 2.0);
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { type: "f", value: 0.0 },
                delta: { type: "f", value: 0.0 },
                resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            },
            vertexShader: this.vs,
            fragmentShader: this.fs
        });
        this.uniforms = this.material.uniforms;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    update(){
        this.uniforms['time'].value = this.boidInfo.timeInfo.nowTime;
        this.uniforms['delta'].value = this.boidInfo.timeInfo.delta;
    }
}