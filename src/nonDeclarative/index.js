import React from 'react'
import { Engine, Scene } from 'react-babylonjs'
import { Vector3, ArcRotateCamera, MeshBuilder, HemisphericLight } from 'babylonjs';
import { PrismCode } from 'react-prism';

function meshPicked(mesh) {
  console.log('mesh picked:', mesh)
}

function onSceneMount(e) {
  const { canvas, scene } = e

  // Scene to build your environment, Canvas you need to attach your camera.       
  var camera = new ArcRotateCamera("Camera", 0, 1.05, 6, Vector3.Zero(), scene)
  camera.attachControl(canvas)

  // setup your scene here
  MeshBuilder.CreateBox('box', { size: 3}, scene)
  new HemisphericLight('light', Vector3.Up(), scene);
  
  scene.getEngine().runRenderLoop(() => {
      if (scene) {
          scene.render();
      }
  });
}

function NonDeclarative() {
return (
  <div>
    <div className="row">
      <div className="col-xs-12 col-lg-12 align-top">
        Not using any declarative components.  Note that you can mix this non-declarative model with declarative.
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12 col-md-6">
        <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
          <Scene onMeshPicked={meshPicked} onSceneMount={onSceneMount} />
        </Engine>
      </div>
      <div className="col-xs-12 col-md-6">
        <pre>
            <PrismCode className="language-jsx">
{`// If you import Scene from 'babylonjs' then make sure to alias one of them.
import React, { Component } from 'react'
import { Scene } from 'react-babylonjs'
import { Vector3, ArcRotateCamera, MeshBuilder, HemisphericLight } from 'babylonjs';

function meshPicked(mesh) {
  console.log('mesh picked:', mesh)
}

function onSceneMount(e) {
  const { canvas, scene } = e

  // Scene to build your environment, Canvas you need to attach your camera.       
  var camera = new ArcRotateCamera("Camera", 0, 1.05, 6, Vector3.Zero(), scene)
  camera.attachControl(canvas)

  // setup your scene here
  MeshBuilder.CreateBox('box', { size: 3}, scene)
  new HemisphericLight('light', Vector3.Up(), scene);
  
  scene.getEngine().runRenderLoop(() => {
      if (scene) {
          scene.render();
      }
  });
}

function NonDeclarative() {
  return (
    <Engine canvasId="sample-canvas">
      <Scene onMeshPicked={meshPicked} onSceneMount={onSceneMount} />
    </Engine>
  );
}`}
              </PrismCode>
            </pre>
        </div>
      </div>
    </div>
  )
}

export default NonDeclarative