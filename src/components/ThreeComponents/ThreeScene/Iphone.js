import React, { Component } from 'react';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
CameraControls.install({ THREE: THREE }); // required otherwise it will'cannot read property of undefined for THREE objects
class Iphone extends Component {

    state = {
        show1: false,
        show2: false
    }
    componentDidMount() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight

        // this.geometry = null;
        // this.material = null;
        // this.cylinder = null;
        //ADD SCENE
        this.scene = new THREE.Scene()

        this.clock = new THREE.Clock();

        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        )
        this.camera.position.z = 4

        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('#ddd')
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)

        //ADD LIGHT
        this.light = new THREE.AmbientLight(0x404040); // soft white light
        this.scene.add(this.light);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.directionalLight.position.set(0, -70, 100).normalize()

        // create a point light
        const pointLight =
            new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

        // add to the scene
        this.scene.add(pointLight);

        this.cameraControls = new CameraControls(this.camera, this.renderer.domElement);
        //ADD GEOMETRY

        // this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // this.material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        // this.cube = new THREE.Mesh( this.geometry, this.material );
        // this.scene.add( this.cube );  

        // this.geometry = new THREE.CylinderGeometry(1, 1, 2, 32,32,true,0,6.3)
        // this.material = new THREE.MeshBasicMaterial({ color: '#777' })
        // this.cylinder = new THREE.Mesh(this.geometry, this.material)
        // this.scene.add(this.cylinder)
        this.start()

        console.log("ComponentDidMount ThreeScene");
    }

    componentWillUnmount() {
        console.log("ComponentWillUnmount ThreeScene");
    }

    componentWillReceiveProps(nextProps) {
        console.log("ComponentWillReceiveProps ThreeScene ");
        if (nextProps.showE && !this.state.show1) {

            this.setState({ show1: true });
            this.geometry = new THREE.SphereGeometry(1, 64, 64, 0, 6.3, 0, 1.5);
            this.material = new THREE.MeshPhongMaterial({ color: '#296789' });
            this.sphere = new THREE.Mesh(this.geometry, this.material);
            this.sphere.translateY(0.93);
            this.scene.add(this.sphere);
            this.cameraControls.rotate(0.,0.1,true);


        }
        if (nextProps.showC && !this.state.show2) {

            this.setState({ show2: true });
            this.geometry = new THREE.CylinderGeometry(1, 1, 2, 32, 32, true, 0, 6.3)
            this.material = new THREE.MeshPhongMaterial({ color: '#0b7dba' })
            this.cylinder = new THREE.Mesh(this.geometry, this.material)
            this.scene.add(this.cylinder)

        }
    }
    start = () => {
        if (!this.frameId) {
            this.renderScene();
            this.frameId = requestAnimationFrame(this.animate.bind(this))
        }
    }

    stop = () => {

        cancelAnimationFrame(this.frameId)
    }

    animate = () => {
        // if (this.cube != null) {
        //   this.cube.rotation.x += 0.01
        //   this.cube.rotation.y += 0.01
        // }
        // this.cylinder.rotation.x += 0.01
        // this.cylinder.rotation.y += 0.01
        const delta = this.clock.getDelta();
        // const isControlsUpdated = 
        
        this.cameraControls.update(delta);
        window.requestAnimationFrame(this.animate);

        // if (isControlsUpdated) {

            this.renderScene();

        // }
        // this.renderScene()
        // this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <div
                style={{ width: '100%', height: '700px' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

export default Iphone