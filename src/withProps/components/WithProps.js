import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Engine, Scene } from 'react-babylonjs'
import { Vector3, Axis, Color3 } from '@babylonjs/core';
import { PrismCode } from 'react-prism';
import Switch from "react-switch";

import { toggleLights, toggleRotation } from '../reducers';
import SingleAxisRotateMeshBehavior from '../../SingleAxisRotateMeshBehavior'

class WithProps extends Component
{
  handleClockwiseChange = (clockwise) => {
    this.props.onToggleRotation(clockwise);
  }

  handleDimmerChange = (full) => {
    this.props.onToggleLights(full);
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
          <div className="col-xs-6">
            <span className="text-muted">[<strong>props</strong> are persisted in this example when you return on same visit (or HMR))]</span>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
              <Scene>
                <freeCamera name="camera1" position={new Vector3(0, 5, -12)} setTarget={{target: new Vector3(0, 1, 0)}} />
                <hemisphericLight name="light1" intensity={this.props.lightsDim ? 0.3 : 0.7} direction={Vector3.Up()} />
                <box name="box" size={4} position={new Vector3(0, 1, 0)}>
                  <SingleAxisRotateMeshBehavior rpm={this.props.clockwise ? 12 : -12 } axis={Axis.Y} />
                  <standardMaterial name="mat1" diffuseColor={Color3.Yellow()} specularColor={Color3.Black()} />
                </box>
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
    intensity={this.props.lightsDim ? 0.3 : 0.7} />
  <box name="box" size={4} position={new Vector3(0, 1, 0)}>
    <standardMaterial name="yellow-mat"
      diffuseColor={Color3.Yellow()} specularColor={Color3.Black()} />
    <RotateMeshBehavior rpm={this.props.clockwise ? 12 : -12 } axis={Axis.Y} />
  </box>
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
  clockwise: PropTypes.bool.isRequired,
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