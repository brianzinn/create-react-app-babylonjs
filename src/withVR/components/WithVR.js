import React, { Component } from 'react'
import { Button } from 'reactstrap'
import {
  Scene, FreeCamera, HemisphericLight, Model, Box, StandardMaterial, VRExperience
} from 'react-babylonjs'
import { Vector3, Color3 } from 'babylonjs';
import { PrismCode } from 'react-prism';
import Octicon, {ArrowRight, ArrowLeft} from '@githubprimer/octicons-react'

import './WithVR.css'

class WithVR extends Component 
{
  constructor() {
    super();
    
    this.state = {
      modelRotationY: Math.PI
    }

    this.spinModelClockwise = this.spinModelClockwise.bind(this);
    this.spinModelCounterClockwise = this.spinModelCounterClockwise.bind(this);
  }

  spinModelClockwise() {
    this.setState((state) => ({
      ...state,
      modelRotationY: state.modelRotationY + 0.1
    }))
  }

  spinModelCounterClockwise() {
    this.setState((state) => ({
      ...state,
      modelRotationY: state.modelRotationY - 0.1
    }))
  }

  render() {
    let baseUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/";
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-lg-12 align-top">
            Spin Ghettoblaster: 
            <Button onClick={this.spinModelClockwise}><Octicon icon={ArrowLeft}/></Button> (or click yellow box)
            &nbsp;&nbsp;
            <Button onClick={this.spinModelCounterClockwise}><Octicon icon={ArrowRight}/></Button> (or click orange box)
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <Scene id="sample-canvas" onMeshPicked={(mesh, scene) => {
              switch(mesh.name) {
                case 'clockwise':
                  this.spinModelCounterClockwise();
                  break;
                case 'counterClockwise':
                  this.spinModelClockwise();
                  break;
                default:
                  console.log(`not handling mesh pick ${mesh.name}`);
              }
            }}>
              <FreeCamera name="camera1"
                position={new Vector3(0, 0.04, -0.075)}
                target={ Vector3.Zero() }
                minZ={0.001} />
              <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
              <Box name="counterClockwise" position={new Vector3(-0.02, 0, 0)} size={0.01}>
                <StandardMaterial
                  diffuseColor={Color3.Yellow()}
                  specularColor={Color3.Black()}
                />
              </Box>
              <Model
                rotation= {new Vector3(0, this.state.modelRotationY, 0)}
                position={ Vector3.Zero()}
                rootUrl = {`${baseUrl}BoomBox/glTF/`}
                sceneFilename="BoomBox.gltf"
              />
              <Box name="clockwise" position={new Vector3(0.02, 0, 0)} size={0.01}>
                <StandardMaterial
                  diffuseColor={Color3.FromInts(255, 165, 0)}
                  specularColor={Color3.Black()}
                />
              </Box>
              <VRExperience />
            </Scene>
          </div>
          <div className="col-xs-12 col-md-6">
            <pre>
                <PrismCode className="language-jsx">
{`<Scene id="sample-canvas" onMeshPicked={(mesh, scene) => { /* ... */}}>
  <FreeCamera name="camera1" position={new Vector3(0, 0.04, -0.075)}
    target={ Vector3.Zero() } minZ={0.001} />
  <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
  <Box name="counterClockwise" position={new Vector3(-0.02, 0, 0)} size={0.01}>
    <StandardMaterial diffuseColor={Color3.Yellow()}
      specularColor={Color3.Black()} />
  </Box>
  <Model
    rotation= {new Vector3(0, this.state.modelRotationY, 0)}
    position={ Vector3.Zero()}
    rootUrl = {\`\${baseUrl}BoomBox/glTF/\`}
    sceneFilename="BoomBox.gltf" />
  <Box name="clockwise" position={new Vector3(0.02, 0, 0)} size={0.01}>
    <StandardMaterial diffuseColor={Color3.FromInts(255, 165, 0)}
      specularColor={Color3.Black()} />
  </Box>
  <VRExperience />
</Scene>`}
                </PrismCode>
              </pre>
          </div>
        </div>
      </div>
    )
  }
}

export default WithVR