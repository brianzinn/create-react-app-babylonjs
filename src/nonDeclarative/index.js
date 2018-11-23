import React, { Component } from 'react'
import { Engine, Scene } from 'react-babylonjs'
import { Vector3, ArcRotateCamera, MeshBuilder, HemisphericLight } from 'babylonjs';
import { PrismCode } from 'react-prism';

export default class NonDeclarative extends Component 
{
  meshPicked(mesh) {
    console.log('mesh picked:', mesh)
  }

  onSceneMount(e) {
    const { canvas, scene } = e

    // Scene to build your environment, Canvas you need to attach your camera.       
    var camera = new ArcRotateCamera("Camera", 0, 1.05, 6, Vector3.Zero(), scene)
    camera.attachControl(canvas)

    MeshBuilder.CreateBox('box', { size: 3}, scene)

    new HemisphericLight('light', Vector3.Up(), scene);

    // TODO: setup your scene here
    scene.getEngine().runRenderLoop(() => {
        if (scene) {
            scene.render();
        }
    });
}

render() {
  return (
    <div>
      <div className="row">
        <div className="col-xs-12 col-lg-12 align-top">
          Not using any declarative components.  Note that you can mix this non-declarative model with declarative.
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <Engine canvasId="sample-canvas">
            <Scene onMeshPicked={this.meshPicked} onSceneMount={this.onSceneMount} />
          </Engine>
        </div>
        <div className="col-xs-12 col-md-6">
          <pre>
              <PrismCode className="language-jsx">
{`
// If you import Scene from 'babylonjs' then make sure to alias one of them.
import React, { Component } from 'react'
import { Scene } from 'react-babylonjs'
import { Vector3, ArcRotateCamera, MeshBuilder, HemisphericLight } from 'babylonjs';

export default class NonDeclarative extends Component 
{
  onMeshPicked(mesh) {
    console.log('mesh picked:', mesh)
  }

  onSceneMount(e) {
    const { canvas, scene } = e

    // Scene to build your environment, Canvas you need to attach your camera.       
    var camera = new ArcRotateCamera("Camera", 0, 1.05, 6, Vector3.Zero(), scene)
    camera.attachControl(canvas)

    MeshBuilder.CreateBox('box', { size: 3}, scene)

    new HemisphericLight('light', Vector3.Up(), scene);

    scene.getEngine().runRenderLoop(() => {
        if (scene) {
            scene.render();
        }
    });
}

render() {
  return (
    <Engine>
      <Scene onMeshPicked={this.onMeshPicked} onSceneMount={this.onSceneMount} />
    </Engine>
  )}
}`}
                </PrismCode>
              </pre>
          </div>
        </div>
      </div>
    )
  }
}