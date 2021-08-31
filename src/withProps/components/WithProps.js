import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { Engine, Scene, useBeforeRender } from 'react-babylonjs'
import { Vector3, Color3 } from '@babylonjs/core';
import { PrismCode } from 'react-prism';
import Switch from "react-switch";

import { toggleLights, toggleRotation } from '../reducers';

const SpinningBox = ({ clockwise }) => {
  var boxRef = useRef(null);
  var clockwiseRef = useRef(() => clockwise);
  clockwiseRef.current = clockwise;

  var rpm = 12;
  useBeforeRender((scene) => {
    if (boxRef.current !== null) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();
      boxRef.current.rotation.y += (((clockwiseRef.current ? rpm: -rpm) / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));
    }
  })

  return <box name="box" ref={boxRef} size={4} position={new Vector3(0, 1, 0)}>
    <standardMaterial name="mat1" diffuseColor={Color3.Yellow()} specularColor={Color3.Black()} />
  </box>
}

const WithProps = ({ clockwise, lightsDim, onToggleLights, onToggleRotation }) => (
  <div>
    <div className="row">
      <div className="col-xs-3 col-lg-3 align-top">
        <label htmlFor="dimmer-switch">
          <span style={{ padding: '5px' }}>Lights:</span>
          <Switch
            onChange={onToggleLights}
            checked={!lightsDim}
            checkedIcon={<div style={{ paddingLeft: '2px', color: 'white' }}>full</div>}
            uncheckedIcon={<div style={{ paddingLeft: '2px', color: 'white' }}>dim</div>}
            className="react-switch"
            id="dimmer-switch"
          />
        </label>
      </div>
      <div className="col-xs-3 col-lg-3 align-top">
        <label htmlFor="rotation-switch">
          <span className="align-top" style={{ padding: '5px' }}>Clockwise:</span>
          <Switch
            onChange={onToggleRotation}
            checked={clockwise}
            className="react-switch"
            id="rotation-switch"
          />
        </label>
      </div>
      <div className="col-xs-6">
        <span className="text-muted">[<strong>props</strong> are persisted in this example when you return on same visit (or HMR))]</span>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12 col-md-6">
        <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
          <Scene>
            <freeCamera name="camera1" position={new Vector3(0, 5, -12)} setTarget={{ target: new Vector3(0, 1, 0) }} />
            <hemisphericLight name="light1" intensity={lightsDim ? 0.3 : 0.7} direction={Vector3.Up()} />
            <SpinningBox clockwise={clockwise} />
          </Scene>
        </Engine>
      </div>
      <div className="col-xs-12 col-md-6">
        <pre>
          <PrismCode className="language-jsx">
            {` <Scene id="sample-canvas">
  <freeCamera name="camera1"
    position={new Vector3(0, 5, -10)} target={Vector3.Zero()} />
  <hemisphericLight name="light1" direction={Vector3.Up()}
    intensity={lightsDim ? 0.3 : 0.7} />
  <box name="box" ref={boxRef} size={4} position={new Vector3(0, 1, 0)}>
    <standardMaterial name="yellow-mat"
      diffuseColor={Color3.Yellow()} specularColor={Color3.Black()} />
    </box>
</Scene>`}
          </PrismCode>
        </pre>
      </div>
    </div>
  </div>
)

const mapDispatchToProps = dispatch => {
  return {
    onToggleLights: (full) => {
      dispatch(toggleLights(full))
    },
    onToggleRotation: (clockwise) => {
      dispatch(toggleRotation(clockwise))
    }
  }
}

const mapStateToProps = state => {
  return state.withProps
}

const WithPropsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithProps)

export default WithPropsConnected