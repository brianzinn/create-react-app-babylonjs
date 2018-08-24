import React from 'react'
import { Scene, FreeCamera, HemisphericLight, Sphere, Ground } from 'react-babylonjs'
import { Vector3 } from 'babylonjs';
import { PrismCode } from 'react-prism';

const DefaultPlayground = () => (
  <div className="row">
    <div className="col-xs-12 col-md-6">
      <Scene id="sample-canvas">
        <FreeCamera name="camera1" position={new Vector3(0, 5, -10)} target={Vector3.Zero()} />
        <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
        <Sphere name="sphere1" diameter={2} segments={16} position={new Vector3(0, 1, 0)} />
        <Ground name="ground1" width={6} height={6} subdivisions={2}  />
      </Scene>
    </div>
    <div className="col-xs-12 col-md-6">
      <pre>
          <PrismCode className="language-jsx">
{`<Scene id="sample-canvas">
  <FreeCamera name="camera1"
    position={new Vector3(0, 5, -10)} target={Vector3.Zero()} />
  <HemisphericLight name="light1"
    intensity={0.7} direction={Vector3.Up()} />
  <Sphere name="sphere1"
    diameter={2} segments={16} position={new Vector3(0, 1, 0)} />
  <Ground name="ground1"
    width={6} height={6} subdivisions={2} />
</Scene>`}
          </PrismCode>
        </pre>
    </div>
  </div>
)

export default DefaultPlayground