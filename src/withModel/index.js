import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Engine, Scene, ArcRotateCamera, HemisphericLight, Model, Box, StandardMaterial } from 'react-babylonjs'
import { Vector3, Matrix, Color3 } from 'babylonjs';
import { PrismCode } from 'react-prism';
import Octicon, {ArrowDown, ArrowUp} from '@githubprimer/octicons-react'

// import './WithModel.css'

class WithModel extends Component 
{
  constructor() {
    super();
    
    this.state = {
      avocadoYPos: -1.5,
      avocadoScaling: 3.0,
      boomBoxLoadProgress: 0.0,
      avocadoLoadProgress: 0.0
    }

    this.moveAvocadoUp = this.moveAvocadoUp.bind(this);
    this.moveAvocadoDown = this.moveAvocadoDown.bind(this);
    this.increaseAvocadoSize = this.increaseAvocadoSize.bind(this);
    this.decreaseAvocadoSize = this.decreaseAvocadoSize.bind(this);
  }

  moveAvocadoDown() {
    this.setState((state) => ({
      ...state,
      avocadoYPos: state.avocadoYPos - 0.5
    }))
  }

  moveAvocadoUp() {
    this.setState((state) => ({
      ...state,
      avocadoYPos: state.avocadoYPos + 0.5
    }))
  }

  increaseAvocadoSize() {
    this.setState((state) => ({
      ...state,
      avocadoScaling: state.avocadoScaling + 0.1
    }))
  }

  decreaseAvocadoSize() {
    this.setState((state) => ({
      ...state,
      avocadoScaling: state.avocadoScaling - 0.1
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
            <Engine canvasId="sample-canvas">
              <Scene>
                <ArcRotateCamera name="camera1" alpha={Math.PI / 2} beta={Math.PI / 2} radius={9.0} target={Vector3.Zero()} minZ={0.001} />
                <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
                <Model
                  scaleToDimension={3}
                  onLoadProgress={(evt) => {
                    if (evt.lengthComputable) {
                      let boomBoxLoadProgress = evt.loaded / evt.total
                      this.setState((prevState) => ({
                        ...prevState,
                        boomBoxLoadProgress
                      }))
                    }
                  }}
                  position={ new Vector3(2.5, 0, 0)}
                  rootUrl = {`${baseUrl}BoomBox/glTF/`}
                  sceneFilename="BoomBox.gltf"
                />
                
                {this.state.boomBoxLoadProgress < 1 &&
                  [<Box key="progress1" name="box" height={0.2} width={3} depth={0.1} position={new Vector3(4, 0, 2.1)}
                    scaling = { new Vector3(this.state.boomBoxLoadProgress, 1, 1) }
                    pivotMatrix={ Matrix.Translation(-3, 0, 0) }
                    preTransformMatrix={ Matrix.Translation(-3 / 2, 0, 0) }>
                    <StandardMaterial
                      diffuseColor={Color3.FromInts(255, 165, 0)}
                      specularColor={Color3.Black()}
                    />
                  </Box>,              
                  <Box key="back1" name="box" height={0.2} width={3} depth={0.1} position={new Vector3(2.5, 0, 2.0)} />
                  ]
                }
                
                <Model
                  position={ new Vector3(-3.0, this.state.avocadoYPos, 0)}
                  rootUrl={`${baseUrl}Avocado/glTF/`}
                  sceneFilename="Avocado.gltf"
                  onLoadProgress={(evt) => {
                    if (!evt.lengthComputable) {
                      console.log('length is not computable - no progress updates:', evt)
                    }
                  }}
                  scaleToDimension = {this.state.avocadoScaling}
                />              
              </Scene>
            </Engine>
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