import React, { Component } from 'react';
import * as THREE from 'three';

class ThreeScene extends Component{
  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    this.geometry = null;
    this.material = null;
    this.cube = null;
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

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)    

    

    console.log("ComponentDidMount ThreeScene");
  }

componentWillUnmount(){
    console.log("ComponentWillUnmount ThreeScene");
  }

  componentWillReceiveProps(nextProps){
    console.log("ComponentWillReceiveProps ThreeScene ");
    console.log(nextProps.length);
    const l = nextProps.length;
    if(l > 0 && nextProps.length !== this.props.length) {
        
        //this.stop()
        this.scene.remove(this.cube)
        this.geometry = new THREE.BoxGeometry(l, l, l)
        this.material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
        this.cube = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.cube)
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
   if(this.cube != null) {
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01

        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }
 }

renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}

render(){
    return(
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default ThreeScene