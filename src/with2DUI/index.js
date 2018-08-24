import React, { Component } from 'react'
import { Control } from 'babylonjs-gui'
import {
  Scene, ArcRotateCamera, HemisphericLight, Plane, AdvancedDynamicTexture, Text, Rectangle, StackPanel, Button, Box, StandardMaterial, VRExperience
} from 'react-babylonjs'
import { Vector3, Color3, Animation, ExponentialEase, EasingFunction } from 'babylonjs';
import { PrismCode } from 'react-prism';

export default class With2DUI extends Component 
{
  constructor() {
    super();
    
    this.state = {
      plane: undefined,
      showModal: false,
      clickMeshName: undefined,
      allowedMeshes: [
        'red box',
        'blue box',
        'green box'
      ]
    }

    this.meshPicked = this.meshPicked.bind(this);
    this.setPlane = this.setPlane.bind(this);
    this.setCamera = this.setCamera.bind(this);
    // TODO: fix that bind() is needed on assignment on button pointerDown handlers
  }

  meshPicked(mesh) {
    console.log('clicked mesh:', mesh.name)
    if (this.state.allowedMeshes.indexOf(mesh.name) !== -1)
    {
      this.setState((state) => ({
        ...state,
        showModal: true,
        clickedMeshName: mesh.name
      }))
    } else {
      console.log('ignoring clicks on:', mesh.name, this.state)
    }
  }

  deleteSelectedMesh() {
    let { plane } = this.state
    let meshToDelete = plane._scene.getMeshByName(this.state.clickedMeshName);
    meshToDelete.dispose();

    this.setState((state) => ({
      ...state,
      allowedMeshes: state.allowedMeshes.filter(name => name !== state.clickedMeshName)
    }))

    this.hideModal();
  }

  hideModal(v2, eventState) {
    let { plane } = this.state

    if (!plane) {
      return;
    }
    
    let keys = [];
    keys.push({ frame: 0, value: 1 });
    keys.push({ frame: 10, value: 0 });

    var animationClose = new Animation(
        'tv-off-1984',
        'scaling.x',
        10,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    animationClose.setKeys(keys);

    let easingFunction = new ExponentialEase(9.7); // BABYLON.QuarticEase()
    easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    animationClose.setEasingFunction(easingFunction);

    plane.animations.push(animationClose);
    plane._scene.beginAnimation(plane, 0, 100, false, 1, () => {
      plane.dispose();
      this.setState((state) => ({
        ...state,
        showModal: false,
        plane: undefined
      }));
    });
  }

  setCamera(camera) {
    console.log('setting camera');
    // not adding remove(..), as whole scene unloads then.
    camera.onViewMatrixChangedObservable.add(() => {
      let { plane } = this.state

      if (plane) {
        let forwardRay = camera.getForwardRay();
        plane.position = camera.position.add(forwardRay.direction.scale(0.9 /* * forwardRay.length */));
        plane.lookAt(camera.position);
      }
    })
  }

  setPlane(plane) {
    console.log('setting plane:', plane)
    this.setState((state) => ({
      ...state,
      plane
    }))

    if (plane._scene && plane._scene.activeCamera) {
      let { activeCamera } = plane._scene
      let forwardRay = activeCamera.getForwardRay();
      plane.position = activeCamera.position.add(forwardRay.direction.scale(0.9 /* * forwardRay.length */));
      plane.lookAt(activeCamera.position);
    }
  }

  render() {
    let dialogWidth = 3;
    let dialogHeight = 1;

    return (
      <div>
        <div className="row">
          <div className="col-xs-6 col-lg-6 align-top">
            Click on boxes to open UI for removing them.
          </div>
          <div className="col-xs-6 col-lg-6 align-top">
            How the GUI declared <span className="text-muted">(see github repo for full source)</span>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
<Scene id="sample-canvas" onMeshPicked={this.meshPicked}>
  <ArcRotateCamera name="camera1" radius={7} beta={Math.PI / 4} target={Vector3.Zero()} minZ={0.001} onCreated={this.setCamera} />
  <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
  <Box size={2} name="red box" position={new Vector3(-2.5, 1, 0)}>
    <StandardMaterial diffuseColor={Color3.Red()} specularColor={Color3.Black()}/>
  </Box>
  <Box size={2} name="blue box" position={new Vector3(0, 1, 0)}>
    <StandardMaterial diffuseColor={Color3.Blue()} specularColor={Color3.Black()}/>
  </Box>
  <Box size={2} name="green box" position={new Vector3(2.5, 1, 0)}>
    <StandardMaterial diffuseColor={Color3.Green()} specularColor={Color3.Black()}/>
  </Box>
  {this.state.showModal === true &&
    <Plane name="dialog" width={1} height={dialogHeight/dialogWidth} onCreated={this.setPlane}>
      <AdvancedDynamicTexture createForParentMesh={true}>
        <Rectangle background="white" color="#666666" height={dialogHeight/dialogWidth} width={1}
          scaleY={dialogWidth} scaleX={1}  thickness={2} cornerRadius={12} >
          <StackPanel>
            <Rectangle height="20%" paddingTop="6%">
              <StackPanel isVertical={false}>
                <Text text="Selection Made" color="black" fontSize={28} fontStyle="bold"
                  textHorizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
                  textVerticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                  paddingLeft="2%" paddingTop="6%" width="80%"
                />
                <Button background="white" paddingLeft="13%" width="18%" height="75%" onPointerDown={this.hideModal.bind(this)}>
                  <Text text={'X'} fontStyle="bold" fontSize={24} color="black" />
                </Button>
              </StackPanel>
            </Rectangle>
            <Rectangle height="60%" thickness={2} color="#EEEEEE">
              <StackPanel>
              <Text key={`body-${this.state.clickedMeshName}`} text={`You have clicked on '${this.state.clickedMeshName}' .\n....${this.state.allowedMeshes.length} remaining...`}
                  color="black" fontSize={28} textWrapping={true} height="40%"
                  textHorizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
                  textVerticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                  paddingLeft="2%" paddingTop="6%"
                />
                {
                  this.state.allowedMeshes.map(allowedMesh => (
                    <Text key={`opt--${this.state.clickedMeshName}-${allowedMesh}`} text={'• ' + allowedMesh} color="black" fontSize={28} height="20%"
                      textHorizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
                      textVerticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
                      paddingLeft="6%"
                    />
                  ))
                }
              </StackPanel>
            </Rectangle>
            <StackPanel name="footer-sp" height="20%" isVertical={false}>
              <Button background="#6c757d" paddingLeft="56%" width="70%" height="79%" cornerRadius={10} onPointerDown={this.hideModal.bind(this)}>
                <Text text="Cancel" fontSize={28} fontStyle="bold" color="white" />
              </Button>
              <Button background="#007bff" paddingLeft="2%" width="28%" height="85%" cornerRadius={10} onPointerDown={this.deleteSelectedMesh.bind(this)}>
                <Text text={ `Delete '${this.state.clickedMeshName}'` } fontSize={28} fontStyle="bold" color="white" />
              </Button>
            </StackPanel>
          </StackPanel>
        </Rectangle>
      </AdvancedDynamicTexture>
    </Plane>
  }
  <VRExperience createDeviceOrientationCamera={false} enableInteractions={true} />
</Scene>
          </div>
          <div className="col-xs-12 col-md-6">
            <pre>
                <PrismCode className="language-jsx">
{`<Scene id="sample-canvas" onMeshPicked={this.meshPicked}>
... camera, lights, buttons ...
{this.state.showModal === true &&
  <Plane name="dialog" width={1} height={dialogHeight/dialogWidth} onCreated={this.setPlane}>
    <AdvancedDynamicTexture createForParentMesh={true}>
      ... header
      <Rectangle height="60%" thickness={2} color="#EEEEEE">
        <StackPanel>
          <Text text={\`You have clicked on '\${this.state.clickedMeshName}' ...\`} ... />
            {this.state.allowedMeshes.map(allowedMesh => (
                <Text key={...} text={'• ' + allowedMesh} color="black" fontSize={28} height="20%" />
            ))}
        </StackPanel>
      </Rectangle>
       ... footer
    </AdvancedDynamicTexture>
  </Plane>
}
</Scene>`}
                </PrismCode>
              </pre>
          </div>
        </div>
      </div>
    )
  }
}