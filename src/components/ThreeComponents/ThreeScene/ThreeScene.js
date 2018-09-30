import React, { Component } from 'react';
import * as THREE from 'three';

class ThreeScene extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    this.geometry = null;
    this.material = null;
    this.cylinder = null;
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
    this.renderer.setClearColor('#fff')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    this.geometry = new THREE.CylinderGeometry(2, 2, 2, 2)
    this.material = new THREE.MeshBasicMaterial({ color: '#ffff00' })
    this.cylinder = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.cylinder)
    this.start()

    console.log("ComponentDidMount ThreeScene");
  }

  componentWillUnmount() {
    console.log("ComponentWillUnmount ThreeScene");
  }

  componentWillReceiveProps(nextProps) {
    console.log("ComponentWillReceiveProps ThreeScene ");
    console.log(nextProps.length);
    const l = nextProps.length;
    if (l > 0 && nextProps.length !== this.props.length) {

      //this.stop()
      this.scene.remove(this.cylinder)
      this.geometry = new THREE.CylinderGeometry(2, 2, 2, 2)
      this.material = new THREE.MeshBasicMaterial({ color: '#ffff00' })
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
    if (this.cube != null) {
      this.cube.rotation.x += 0.01
      this.cube.rotation.y += 0.01

      this.renderScene()
      this.frameId = window.requestAnimationFrame(this.animate)
    }
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        style={{ width: '100%', height: '600px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default ThreeScene