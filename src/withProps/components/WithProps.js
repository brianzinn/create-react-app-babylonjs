import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Scene, FreeCamera, HemisphericLight, Box, RotateMeshBehavior, StandardMaterial } from 'react-babylonjs'
import { Vector3, Axis, Color3 } from 'babylonjs';
import { PrismCode } from 'react-prism';
import Switch from "react-switch";

import { toggleLights, toggleRotation } from '../reducers';

class WithProps extends Component
{
  handleClockwiseChange = (clockwise) => {
    this.props.onToggleRotation(clockwise);
  }

  handleDimmerChange = (full) => {
    this.props.onToggleLights(full);
  }

  render() {
    console.log(`rendering with dim: ${this.props.lightsDim} - clockwise: ${this.props.clockwise}`);

    return (
      <div>
        <div className="row">
          <div className="col-xs-3 col-lg-3 align-top">
            <label htmlFor="dimmer-switch">
              <span style={{padding: '5px'}}>Lights:</span>
              <Switch
                onChange={this.handleDimmerChange}
                checked={!this.props.lightsDim}
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
                checked={this.props.clockwise}
                className="react-switch"
                id="rotation-switch"
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <Scene id="sample-canvas" touchActionNone={true}>
              <FreeCamera name="camera1" position={new Vector3(0, 5, -12)} target={Vector3.Zero()} />
              <HemisphericLight name="light1" intensity={this.props.lightsDim ? 0.3 : 0.7} direction={Vector3.Up()} />
              <Box name="box" size={4} position={new Vector3(0, 1, 0)}>
                <RotateMeshBehavior radians={this.props.clockwise ? 0.01 : -0.01} axis={Axis.Y} />
                <StandardMaterial diffuseColor={Color3.Yellow()} specularColor={Color3.Black()} />
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
    <RotateMeshBehavior axis={Axis.Y}
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

WithProps.propTypes = {
  rotation: PropTypes.number.isRequired,
  lightsDim: PropTypes.bool.isRequired,
  onToggleLights: PropTypes.func.isRequired,
  onToggleRotation: PropTypes.func.isRequired
}

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