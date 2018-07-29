import React, { Component } from 'react'
import { Scene, FreeCamera, HemisphericLight, Sphere, Ground, Box, RotateMeshBehaviour } from 'react-babylonjs'
import { Vector3, Axis } from 'babylonjs';
import { PrismCode } from 'react-prism';
import Switch from "react-switch";

import './WithProps.css'

class WithProps extends Component 
{
  constructor() {
    super();
    this.state = {
      dimmerChecked: true,
      intensity: 0.7,
      clockwiseChecked: true
    };
    this.handleDimmerChange = this.handleDimmerChange.bind(this);
    this.handleClockwiseChange = this.handleClockwiseChange.bind(this);
  }

  handleClockwiseChange(clockwiseChecked) {
    this.setState({
      ...this.state,
      clockwiseChecked
    });
  }

  handleDimmerChange(dimmerChecked) {
    this.setState({
      ...this.state,
      dimmerChecked,
      intensity: (dimmerChecked ? 0.7 : 0.2)
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-3 col-lg-3 align-top">
            <label htmlFor="dimmer-switch">
              <span style={{padding: '5px'}}>Lights:</span>
              <Switch
                onChange={this.handleDimmerChange}
                checked={this.state.dimmerChecked}
                checkedIcon={<div style={{ paddingLeft: '2px', color: 'white'}}>full</div>}
                uncheckedIcon={<div style={{ paddingLeft: '2px', color: 'white'}}>dim</div>}
                className="react-switch"
                id="dimmer-switch"
              />
            </label>
          </div>
          <div className="col-xs-3 col-lg-3 align-top">
            <label htmlFor="rotation-switch">
            <span className="align-top" style={{padding: '5px'}}>Clockwise:</span>
              <Switch
                onChange={this.handleClockwiseChange}
                checked={this.state.clockwiseChecked}
                className="react-switch"
                id="rotation-switch"
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <Scene id="sample-canvas">
              <FreeCamera name="camera1" position={new Vector3(0, 5, -10)} target={Vector3.Zero()} />
              <HemisphericLight name="light1" intensity={this.state.intensity} direction={Vector3.Up()} />
              <Box name="box" size={4} position={new Vector3(0, 1, 0)}>
                <RotateMeshBehaviour radians={this.state.clockwiseChecked ? 0.01 : -0.01} axis={Axis.Y} />
              </Box>
            </Scene>
          </div>
          <div className="col-xs-12 col-md-6">
            <pre>
                <PrismCode className="language-jsx">
{` <Scene id="sample-canvas">
  <FreeCamera name="camera1"
    position={new Vector3(0, 5, -10)} target={Vector3.Zero()} />
  <HemisphericLight name="light1"
    intensity={this.state.intensity} direction={Vector3.Up()} />
  <Box name="box" size={4} position={new Vector3(0, 1, 0)}>
    <RotateMeshBehaviour axis={Axis.Y}
      radians={this.state.clockwiseChecked ? 0.01 : -0.01} />
  </Box>
</Scene>`}
                </PrismCode>
              </pre>
          </div>
        </div>
      </div>
    )
  }
}

export default WithProps