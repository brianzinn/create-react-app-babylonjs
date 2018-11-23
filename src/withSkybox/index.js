import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {
  Engine, Scene, Skybox, HemisphericLight, ArcRotateCamera, GUI3DManager, CylinderPanel, HolographicButton, VRExperience
} from 'react-babylonjs';
import { Vector3 } from 'babylonjs';
import { PrismCode } from 'react-prism';
import Octicon, {ArrowRight, ArrowLeft} from '@githubprimer/octicons-react';

export default class WithSkybox extends Component 
{
  constructor() {
    super();
    
    this.state = {
      skyboxIndex: 1
    }

    this.skyboxScenes = [{
      name: 'sunny day',
      texture: `${process.env.PUBLIC_URL}/textures/TropicalSunnyDay`
    }, {
      name: 'specular HDR',
      texture: `${process.env.PUBLIC_URL}/textures/SpecularHDR.dds`
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
    const activeSkybox = this.skyboxScenes[this.state.skyboxIndex % this.skyboxScenes.length];
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-lg-12 align-top">
            Change Skybox (or click a holographic button in scene):&nbsp;
            <Button onClick={this.previous}><Octicon icon={ArrowLeft}/></Button>
            &nbsp;&nbsp;
            <Button onClick={this.next}><Octicon icon={ArrowRight}/></Button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <Engine canvasId="sample-canvas">
              <Scene>
                <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
                <Skybox rootUrl={activeSkybox.texture} />
                <ArcRotateCamera target={ Vector3.Zero() } radius={10}
                  alpha={-Math.PI / 2} beta={(Math.PI / 2)} minZ={0.001} wheelPrecision={30}
                />
                <GUI3DManager name="gui3d">
                  <CylinderPanel name="panel" margin={0.2}>
                    {
                      Array.from(new Array(50), (_, index) => index).map(number => {
                        return (
                          <HolographicButton
                            key={`btn-${number}`}
                            name={`btn-name-${number}`}
                            text={`btn-text-${number}`}
                            onPointerClickObservable={this.next}
                          />
                        )
                      })
                    }
                  </CylinderPanel>
                </GUI3DManager>
              </Scene>
            </Engine>
          </div>
          <div className="col-xs-12 col-md-6">
            <pre>
                <PrismCode className="language-jsx">
{`<Scene id="sample-canvas">
<HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
<Skybox texture={activeSkybox.texture} />
<ArcRotateCamera target={ Vector3.Zero() } radius={10}
  alpha={-Math.PI / 4} beta={(Math.PI / 2)}
/>
<GUI3DManager name="gui3d">
  <CylinderPanel name="panel" margin={0.2}>
    {
      Array.from(new Array(60), (_, index) => index).map(number => {
        return (
          <HolographicButton
            key={\`btn-\${number}\`}
            name={\`btn-name-\${number}\`}
            text={\`btn-text-\${number}\`}
            onClick={this.next}
          />
        )
      })
    }
  </CylinderPanel>
</GUI3DManager>
</Scene>`}
                </PrismCode>
              </pre>
          </div>
        </div>
      </div>
    )
  }
}