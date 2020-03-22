import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Engine, Scene, Skybox } from 'react-babylonjs';
import { Vector3 } from '@babylonjs/core';
import { PrismCode } from 'react-prism';
import Octicon, {ArrowRight, ArrowLeft} from '@githubprimer/octicons-react';

let globalIndex = 0 // due to closure and how observables are assigned.
const SkyboxScenes = [{
  name: 'sunny day',
  texture: `${process.env.PUBLIC_URL}/textures/TropicalSunnyDay`
}, {
  name: 'specular HDR',
  texture: `${process.env.PUBLIC_URL}/textures/SpecularHDR.dds`
}]

function WithSkybox() { 
  const [skyboxIndex, setIndex] = useState(0);
  globalIndex = skyboxIndex
  
  return (
    <div>
      <div className="row">
        <div className="col-xs-12 col-md-6 align-top">
          Change Skybox (or click a holographic button in scene):&nbsp;
          <Button onClick={() => setIndex(skyboxIndex + 1)}><Octicon icon={ArrowLeft}/></Button>
          &nbsp;&nbsp;
          <Button onClick={() => setIndex(skyboxIndex - 1)}><Octicon icon={ArrowRight}/></Button>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
            <Scene>
              <hemisphericLight name="hemi-light" intensity={0.7} direction={Vector3.Up()} />
              <Skybox rootUrl={SkyboxScenes[Math.abs(skyboxIndex) % SkyboxScenes.length].texture} />
              <arcRotateCamera target={ Vector3.Zero() } radius={10}
                alpha={-Math.PI / 2} beta={(Math.PI / 2)} minZ={0.001} wheelPrecision={50}
              />
              <gui3DManager name="gui3d">
                <cylinderPanel name="panel" margin={0.2}>
                  {
                    Array.from(new Array(50), (_, index) => index).map(number => {
                      return (
                        <holographicButton
                          key={`btn-${number}`}
                          name={`btn-name-${number}`}
                          text={`btn-text-${number}`}
                          onPointerClickObservable={() => setIndex(globalIndex + 1)}
                        />
                      )
                    })
                  }
                </cylinderPanel>
              </gui3DManager>
            </Scene>
          </Engine>
        </div>
        <div className="col-xs-12 col-md-6">
          <pre>
              <PrismCode className="language-jsx">
{`<Scene id="sample-canvas">
<HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
<Skybox texture={activeSkybox.texture} />
<arcRotateCamera target={ Vector3.Zero() } radius={10}
alpha={-Math.PI / 4} beta={(Math.PI / 2)}
/>
<gui3DManager name="gui3d">
<cylinderPanel name="panel" margin={0.2}>
  {
    Array.from(new Array(60), (_, index) => index).map(number => {
      return (
        <holographicButton
          key={\`btn-\${number}\`}
          name={\`btn-name-\${number}\`}
          text={\`btn-text-\${number}\`}
          onClick={this.next}
        />
      )
    })
  }
</cylinderPanel>
</gui3DManager>
</Scene>`}
              </PrismCode>
            </pre>
        </div>
      </div>
    </div>
  );
}

export default WithSkybox