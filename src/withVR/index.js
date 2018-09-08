import React, { Component } from 'react'
import { Button } from 'reactstrap'
import {
  Scene, ArcRotateCamera, Model, StandardMaterial, VRExperience, RotateMeshBehavior, IcoSphere, 
  DirectionalLight, ShadowGenerator, Environment
} from 'react-babylonjs'
import { Vector3, Color3, Axis } from 'babylonjs';
import { PrismCode } from 'react-prism';
import Octicon, {ArrowRight, ArrowLeft} from '@githubprimer/octicons-react'

export default class WithVR extends Component 
{
  constructor() {
    super();
    
    this.state = {
      modelRotationY: Math.PI
    }

    this.spinModelClockwise = this.spinModelClockwise.bind(this);
    this.spinModelCounterClockwise = this.spinModelCounterClockwise.bind(this);
    this.onMeshPicked = this.onMeshPicked.bind(this);
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

  onMeshPicked(mesh) {
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
            <Scene id="sample-canvas" onMeshPicked={this.onMeshPicked}>
              <ArcRotateCamera name="arc"
                target={ new Vector3(0, 1, 0) }
                alpha={-Math.PI / 2}
                beta={(0.5 + (Math.PI / 4))}
                radius={2}
                minZ={0.001} />

              <DirectionalLight name="dl" direction={new Vector3(0, -0.5, 0.5)} position = {new Vector3(0, 2, 0.5)}>
                <ShadowGenerator mapSize={1024} useBlurExponentialShadowMap={true} blurKernel={32} shadowCasters={["counterClockwise", "clockwise", "BoomBox"]} />
              </DirectionalLight>

              <IcoSphere name="counterClockwise" position={new Vector3(-0.5, 1, 0)} radius={0.2} flat={true} subdivisions={1}>
                <StandardMaterial
                  diffuseColor={Color3.Yellow()}
                  specularColor={Color3.Black()}
                />
                <RotateMeshBehavior radians={0.01} axis={Axis.Y} />
              </IcoSphere>
              <Model
                rotation= {new Vector3(0, this.state.modelRotationY, 0)}
                position={ new Vector3(0, 1, 0)}
                rootUrl = {`${baseUrl}BoomBox/glTF/`}
                sceneFilename="BoomBox.gltf"
                scaling={ new Vector3(20, 20, 20) }
              />
              <IcoSphere name="clockwise" position={new Vector3(0.5, 1, 0)} radius={0.2} flat={true} subdivisions={1}>
                <StandardMaterial
                  diffuseColor={Color3.FromInts(255, 165, 0)}
                  specularColor={Color3.Black()}
                />
                <RotateMeshBehavior radians={-0.01} axis={Axis.Y} />
              </IcoSphere>
              <VRExperience createDeviceOrientationCamera={false} teleportEnvironmentGround={true} enableInteractions={true} />
              <Environment enableGroundShadow={true} groundYBias={1} mainColor={Color3.FromHexString("#74b9ff")} />
            </Scene>
          </div>
          <div className="col-xs-12 col-md-6">
            <pre>
                <PrismCode className="language-jsx">
{`<Scene id="sample-canvas" onMeshPicked={(mesh, scene) => {...}}>
  <ArcRotateCamera />
  <DirectionalLight name="dl" direction={new Vector3(0, -0.5, 0.5)} position = {new Vector3(0, 2, 0.5)}>
    <ShadowGenerator mapSize={1024} useBlurExponentialShadowMap={true} blurKernel={32}
      shadowCasters={["counterClockwise", "clockwise", "BoomBox"]}
    />
  </DirectionalLight>
  <IcoSphere name="counterClockwise" radius={0.2} flat={true} subdivisions={1}>
    <StandardMaterial diffuseColor={Color3.Yellow()} specularColor={Color3.Black()}/>
  </IcoSphere>
  <Model rootUrl = {'/assets/BoomBox/glTF/'}
    sceneFilename='BoomBox.gltf' />
  <VRExperience createDeviceOrientationCamera={false} teleportEnvironmentGround={true} />
  <Environment enableGroundShadow={true} groundYBias={1} mainColor={Color3.FromHexString("#74b9ff")} />
</Scene>`}
                </PrismCode>
              </pre>
          </div>
        </div>
      </div>
    )
  }
}