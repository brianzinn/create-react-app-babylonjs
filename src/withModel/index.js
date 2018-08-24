import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Scene, ArcRotateCamera, HemisphericLight, Model } from 'react-babylonjs'
import { Vector3 } from 'babylonjs';
import { PrismCode } from 'react-prism';
import Octicon, {ArrowDown, ArrowUp} from '@githubprimer/octicons-react'

// import './WithModel.css'

class WithModel extends Component 
{
  constructor() {
    super();
    
    this.state = {
      avocadoYPos: -0.01,
      avocadoScaling: 0.25
    }

    this.moveAvocadoUp = this.moveAvocadoUp.bind(this);
    this.moveAvocadoDown = this.moveAvocadoDown.bind(this);
    this.increaseAvocadoSize = this.increaseAvocadoSize.bind(this);
    this.decreaseAvocadoSize = this.decreaseAvocadoSize.bind(this);
  }

  moveAvocadoDown() {
    this.setState((state) => ({
      ...state,
      avocadoYPos: state.avocadoYPos - 0.005
    }))
  }

  moveAvocadoUp() {
    this.setState((state) => ({
      ...state,
      avocadoYPos: state.avocadoYPos + 0.005
    }))
  }

  increaseAvocadoSize() {
    this.setState((state) => ({
      ...state,
      avocadoScaling: state.avocadoScaling + 0.025
    }))
  }

  decreaseAvocadoSize() {
    this.setState((state) => ({
      ...state,
      avocadoScaling: state.avocadoScaling - 0.025
    }))
  }

  render() {
    let baseUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/";
    return (
      <div>
        <div className="row">
          <div className="col-xs-3 col-lg-3 align-top">
            Move Avocado: 
            <Button onClick={this.moveAvocadoUp}><Octicon icon={ArrowUp}/></Button>
            &nbsp;&nbsp;
            <Button onClick={this.moveAvocadoDown}><Octicon icon={ArrowDown}/></Button>
          </div>
          <div className="col-xs-3 col-lg-3 align-top">
            Avocado Size:
            <Button onClick={this.increaseAvocadoSize}><Octicon icon={ArrowUp}/></Button>
            &nbsp;&nbsp;
            <Button onClick={this.decreaseAvocadoSize}><Octicon icon={ArrowDown}/></Button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <Scene id="sample-canvas">
              <ArcRotateCamera name="camera1" alpha={Math.PI / 2} beta={Math.PI / 2} radius={0.075} target={Vector3.Zero()} minZ={0.001} />
              <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
              <Model
                position={ new Vector3(0.02, 0, 0)}
                rootUrl = {`${baseUrl}BoomBox/glTF/`}
                sceneFilename="BoomBox.gltf"
              />
              <Model
                position={ new Vector3(-0.02, this.state.avocadoYPos, 0)}
                rootUrl={`${baseUrl}Avocado/glTF/`}
                sceneFilename="Avocado.gltf"
                scaling={new Vector3(this.state.avocadoScaling, this.state.avocadoScaling, this.state.avocadoScaling)}
              />
            </Scene>
          </div>
          <div className="col-xs-12 col-md-6">
            <pre>
                <PrismCode className="language-jsx">
{`<Scene id="sample-canvas">
  <ArcRotateCamera name="camera1"
    alpha={Math.PI / -2} beta={Math.PI / 2}
    radius={0.05} target={Vector3.Zero()} minZ={0.001} />
  <HemisphericLight name="light1" intensity={0.7}
    direction={Vector3.Up()} />
  <Model sceneFilename="BoomBox.gltf"
    rootUrl = {\`\${baseUrl}BoomBox/glTF/\`}
    position = { new Vector3(0.02, 0, 0) }
  />
  <Model sceneFilename="Avocado.gltf"
    rootUrl = {\`\${baseUrl}Avocado/glTF/\`}
    position = { new Vector3(-0.02, this.state.avocadoYPos, 0) }
    scaling={new Vector3(this.state.avocadoScaling,
      this.state.avocadoScaling, this.state.avocadoScaling)}
  />
</Scene>`}
                </PrismCode>
              </pre>
          </div>
        </div>
      </div>
    )
  }
}

export default WithModel