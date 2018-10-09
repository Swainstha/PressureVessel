import React, { Component } from 'react';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
import * as TrackballControls from 'three-trackballcontrols';
import ThreeScene from './ThreeScene';
class Iphone extends Component {

    componentDidMount() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(-5, 12, 10);
        this.camera.lookAt(this.scene.position);

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.mount.appendChild(this.renderer.domElement)


        /////////////////////////////////////////
        // Trackball Controller
        /////////////////////////////////////////

        // this.controls = new THREE.TrackballControls(this.camera);
        // this.controls.rotateSpeed = 5.0;
        // this.controls.zoomSpeed = 3.2;
        // this.controls.panSpeed = 0.8;
        // this.controls.noZoom = false;
        // this.controls.noPan = true;
        // this.controls.staticMoving = false;
        // this.controls.dynamicDampingFactor = 0.2;


        /////////////////////////////////////////
        // Lighting
        /////////////////////////////////////////

        let iphone_color = '#FAFAFA',
            ambientLight = new THREE.AmbientLight('#EEEEEE'),
            hemiLight = new THREE.HemisphereLight(iphone_color, iphone_color, 0),
            light = new THREE.PointLight(iphone_color, 1, 100);

        hemiLight.position.set(0, 50, 0);
        light.position.set(0, 20, 10);

        this.scene.add(ambientLight);
        this.scene.add(hemiLight);
        this.scene.add(light);


        /////////////////////////////////////////
        // Utilities
        /////////////////////////////////////////

        let axisHelper = new THREE.AxisHelper(1.25);
        this.scene.add(axisHelper);

        // this.controls.addEventListener('change', this.renderPhone);

        /////////////////////////////////////////
        // Object Loader
        /////////////////////////////////////////

        let dae,
            loader = new THREE.DefaultLoadingManager;

        

        loader.options.convertUpAxis = true;
        loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/392/iphone6.dae', this.loadCollada);
        this.animationLoop();
    }

    loadCollada = (collada) => {
        this.dae = collada.scene;
        this.dae.position.set(0.4, 0, 0.8);
        this.scene.add(this.dae);
        this.renderPhone();
    }

    renderPhone = () => {
        this.renderer.render(this.scene, this.camera);
    }

    // Render the scene when the controls have changed.
    // If you don’t have other animations or changes in your scene,
    // you won’t be draining system resources every frame to render a scene.


    // Avoid constantly rendering the scene by only 
    // updating the controls every requestAnimationFrame
    animationLoop = () => {
        requestAnimationFrame(this.animationLoop);
        this.controls.update();
    }

    render() {

        return (
            <div
            style={{ width: '100%', height: '700px' }}
            ref={(mount) => { this.mount = mount }}
          />
        )
    }





    /////////////////////////////////////////
    // Render Loop
    /////////////////////////////////////////

    

    


    /////////////////////////////////////////
    // Window Resizing
    /////////////////////////////////////////

    // window.addEventListener('resize', function () {
    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize(window.innerWidth, window.innerHeight);
    //     controls.handleResize();
    //     renderPhone();
    // }, false);



}

export default Iphone;