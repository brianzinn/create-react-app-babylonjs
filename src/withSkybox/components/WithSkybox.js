import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Scene, Skybox, HemisphericLight, ArcRotateCamera } from 'react-babylonjs';
import { Vector3 } from 'babylonjs';
import { PrismCode } from 'react-prism';
import Octicon, {ArrowRight, ArrowLeft} from '@githubprimer/octicons-react';

import './WithSkybox.css'

export default class WithSkybox extends Component 
{
  constructor() {
    super();
    
    this.state = {
      skyboxIndex: 0
    }

    this.skyboxScenes = [{
      name: 'sunny day',
      texture: 'textures/TropicalSunnyDay'
    }, {
      name: 'specular HDR',
      texture: '/textures/SpecularHDR.dds'
    }]

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  next() {
    this.setState((state) => ({
      ...state,
      skyboxIndex: state.skyboxIndex + 1
    }))
  }

  previous() {
    this.setState((state) => ({
      ...state,
      skyboxIndex: state.skyboxIndex + 1
    }))
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-lg-12 align-top">
            Change Skybox: 
            <Button onClick={this.previous}><Octicon icon={ArrowLeft}/></Button>
            &nbsp;&nbsp;
            <Button onClick={this.next}><Octicon icon={ArrowRight}/></Button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <Scene id="sample-canvas">
              <Skybox texture={this.skyboxScenes[this.state.skyboxIndex % this.skyboxScenes.length].texture} />
              <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
              <ArcRotateCamera name="arc"
                target={ new Vector3(0, 1, 0) }
                alpha={Math.PI / 2}
                beta={(Math.PI / 2)}
                radius={2}
                minZ={0.001} />
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