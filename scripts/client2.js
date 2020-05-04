import * as THREE from 'three'
export class GameClient {
    constructor(page){
        this.page = page
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({color: "#FF5733"});
    cube = new THREE.Mesh(this.geometry, this.material);

    onWindowResize(window) {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

    }
    animate = function () {
        requestAnimationFrame(this.animate.bind(this));
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
    };
    clientInit() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.page.mount.appendChild(this.renderer.domElement)
        this.scene.add(this.cube);
        this.camera.position.z = 5;
        window.addEventListener('resize', this.onWindowResize, false);
    }



}