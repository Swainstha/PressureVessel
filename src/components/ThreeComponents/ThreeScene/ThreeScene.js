import React, { Component } from 'react';
import * as THREE from 'three';

import CameraControls from 'camera-controls';
import  * as TrackballControls from 'three-trackballcontrols';
 
CameraControls.install( { THREE: THREE } );
// TrackballControls.install( { THREE: THREE } );

class ThreeScene extends Component {

  state = {
    show1: false,
    show2: false
  }
  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    // this.clock = new THREE.Clock();
    
    //ADD SCENE
    this.scene = new THREE.Scene()

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    
    this.camera.position.z = 4

    //ADD trackball controller
    this.controls = new TrackballControls(this.camera);

    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    this.controls.keys = [ 65, 83, 68 ];


    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#ddd')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    // this.cameraControls = new CameraControls( this.camera, this.renderer.domElement );
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
    
    this.start()

    console.log("ComponentDidMount ThreeScene");
  }

  componentWillUnmount() {
    console.log("ComponentWillUnmount ThreeScene");
  }

  componentWillReceiveProps(nextProps) {
    console.log("ComponentWillReceiveProps ThreeScene ");
    if (nextProps.showE && !this.state.show1) {

      this.setState({show1: true});
      this.geometry = new THREE.SphereGeometry(1, 64, 64, 0, 6.3, 0, 1.5);
      this.material = new THREE.MeshPhongMaterial({ color: '#296789' });
      this.sphere = new THREE.Mesh(this.geometry, this.material);
      this.sphere.translateY(0.93);
      this.scene.add(this.sphere)


    }
    if (nextProps.showC && !this.state.show2) {

      this.setState({show2: true});
      this.geometry = new THREE.CylinderGeometry(1, 1, 2, 32, 32, true, 0, 6.3)
      this.material = new THREE.MeshPhongMaterial({ color: '#0b7dba' })
      this.cylinder = new THREE.Mesh(this.geometry, this.material)
      this.scene.add(this.cylinder)
      this.start()

    }
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    /*if (this.cube != null) {
      this.cube.rotation.x += 0.01
      this.cube.rotation.y += 0.01
    }*/
    // const delta = this.clock.getDelta();
    // const isControlsUpdated = this.cameraControls.update( delta );
    // this.cylinder.rotation.x += 0.01
    // this.cylinder.rotation.y += 0.01
    this.controls.update();
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
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

export default ThreeScene
