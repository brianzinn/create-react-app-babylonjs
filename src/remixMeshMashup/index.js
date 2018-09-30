import React, { Component } from 'react';
import { Button as ReactStrapButton, Row, Col, Input, FormGroup, Label, Form } from 'reactstrap';
import { Scene, HemisphericLight, ArcRotateCamera, GUI3DManager, CylinderPanel, VRExperience, Button3D, StandardMaterial,
  Plane, AdvancedDynamicTexture, Rectangle, StackPanel, InputText, Text, Box, Button, Environment, VirtualKeyboard, Model } from 'react-babylonjs';
import { Vector3, Color3, Matrix, Tools } from 'babylonjs';
import { Control } from 'babylonjs-gui'
import Octicon, { Search } from '@githubprimer/octicons-react';

export default class RemixMeshMashup extends Component 
{
  constructor() {
    super();
    
    this.state = {
      headers: [],
      autoFetch : {
        enabled: true,
        type: 'microsoft' // anything else will fall through to default channels, as if you went to the remix3d homepage
      },
      searchText: '',
      results: [],
      model: undefined,
      modelLoadProgress: 1      
    }
    
    fetch('https://remixmeshmashup.azurewebsites.net/api/getToken?code=asLEw4snsUwpUJod9RQd1RUhvWwmnxWJ4EXaUNpgvdtipsC6/P5EFA==')
    .then(response => response.json())
    .then(headers => {
      this.setState((prevState) => ({
        ...prevState,
        headers
      }));
      
      if (this.state.autoFetch.enabled === true) {
        switch(this.state.autoFetch.type) {
          case 'microsoft':
            this.getItems('https://api.remix3d.com/v3/users/46reU3-wFPz/uploads', 'uploads', headers);
            break;
          default:
            fetch('https://api.remix3d.com/v3/channelsets/Default/channels', {
              headers
            })
            .then(defaultChannelsResponse => defaultChannelsResponse.json())
            .then(defaultChannels => {
              if (defaultChannels.totalCount > 0 && defaultChannels.results && defaultChannels.results.length) {
                this.getItems(`https://api.remix3d.com/v3/channels/${defaultChannels.results[0].id}/items`, 'channels', headers);
              }
            })
            break;
        }
      }
    });
  }

  mapItem(item) {
    switch(item.type) {
      case 'Board':
        return { type: 'board', item: item.board }
      case 'Creation':
        return { type: 'creation', item: item.creation }
      default:
        console.warn(`result unknown type: ${item.type}`)
        return undefined;
    }
  }

  getItems = (itemsUri, requestType, headers, requests) => {
    if (headers === undefined) {
      console.error(`Cannot get ${requestType} 'items' w/o headers`);
      return;
    }  

    requests = (requests === undefined) ? 0 : ++requests;

    fetch(itemsUri, {
      headers
    })
    .then(itemsResponse => itemsResponse.json())
    .then(responseJson => {
      let results;
      let continuationUri;

      switch(requestType) {
        case 'channels': // contains generally boards
        case 'search': // contains creations
          results = responseJson.results.map(this.mapItem).filter(x => x !== undefined)
          continuationUri = responseJson.continuationUri
          break;
        case 'boards': // boards contain creations
        case 'uploads': // contains creations
          results = ((responseJson.items) ? responseJson.items : responseJson).results.map(result => ({type: 'creation', item: result}))
          continuationUri = ((responseJson.items) ? responseJson.items : responseJson).continuationUri
          break;
        default:
          console.error('Unknown requestType:' + requestType);
          return;
      }

      let newTotal = (requests === 0) ? results.length : this.state.results.length + results.length
      const max = 15 * 4; /* columns x rows */

      this.setState((prevState) => ({
        ...prevState,
        results: ((requests === 0) ? results : prevState.results.concat(results)).slice(0, max) /* truncate to max */
      }))

      if (newTotal < max && continuationUri && requests <= (max / 10)) {
        this.getItems(continuationUri, requestType, headers, requests)
      }
    })
  }

  loadCreation(creation) {
    const viewManifest = (!creation.manifestUris) ? undefined : creation.manifestUris.find(manifest => manifest.usage === 'View');

    if (viewManifest === undefined) {
      console.warn('creation has no (View) manifestUri :( - can try assetUris');
      return;
    }

    var uri = viewManifest.uri;
    var filenameIndex = uri.lastIndexOf("/");

    const viewerStagingData = creation.stagingData ? creation.stagingData.viewerStagingData : undefined;
    const modelYRotation = viewerStagingData && viewerStagingData['Model.RotationOffsetAxisY'] && viewerStagingData['Model.RotationOffsetAngle']
      ? viewerStagingData['Model.RotationOffsetAxisY'] * Tools.ToRadians(viewerStagingData['Model.RotationOffsetAngle'])
      : 0;

    this.setState((prevState) => ({
      ...prevState,
      model: {
        rootUrl: uri.substring(0, filenameIndex + 1),
        sceneFilename: uri.substring(filenameIndex + 1),
        fileExtension: "." + viewManifest.format.toLowerCase(), // ie: 'GLTF' -> '.gltf'
        key: creation.id,
        fileSize: creation.fileSize,
        description: creation.name,
        hasAnimations: creation.hasAnimations,
        yRotation: modelYRotation
      }
    }))
  }

  updateSearchTextBabylon = (input) => {
    const searchText = input.text; /* need local var for setState() */
    this.setState((prevState) => ({
      ...prevState,
      searchText
    }))
  }

  updateSearchTextForm = (e) => {
    const searchText = e.target.value /* need local var for setState() */
    this.setState((prevState) => ({
      ...prevState,
      searchText
    }))
  }

  doSearch = () => {
    this.getItems(`https://api.remix3d.com/v3/creations?q=${this.state.searchText}&$select=id,%20name,%20previewImage`, 'search', this.state.headers)
  }

  render() {
    return ([
        <Row key="formRow">
          <Col xs={12}>
          <Form onSubmit={(e) => { e.preventDefault(); this.doSearch(); }} inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="searchRemix">Search</Label>
              <Input name="searchInput" id="searchRemix" placeholder="search" value={this.state.searchText} onChange={this.updateSearchTextForm}  />
              <ReactStrapButton onClick={this.doSearch}><Octicon icon={Search}/></ReactStrapButton>
            </FormGroup>
            <div className="text-muted pull-right"><strong>{this.state.results.length}</strong> models showing.</div>
          </Form>
          </Col>
        </Row>, <Row key="exampleRow">
          <Col xs={12}>
            <Scene id="sample-canvas" enableOfflineSupport={false} engineOptions={{
              stencil: true,
              disableWebGL2Support: false,
              preserveDrawingBuffer: true
            }}>
              <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
              <ArcRotateCamera target={ Vector3.Zero() } radius={4} alpha={-Math.PI / 2} beta={(Math.PI / 2)} minZ={0.001} wheelPrecision={30} />
              <GUI3DManager name="gui3d">
                <CylinderPanel name="panel" margin={0.2} rows={4} radius={4} position={new Vector3(0, 2, 0)}>
                {
                  this.state.results.map(result => {
                    if (result.type === 'board' || result.type === 'creation') {
                      var buttonText = result.item.name + (result.item.hasAnimations ? ' *' : '');
                      var fontSize = buttonText.length <= 12 ? 36 : (buttonText.length <= 20 ? 24 : 20); // TODO: ctx.measureText(...)
                      return (
                        <Button3D key={result.item.id} name={result.item.name} imageUrl={result.item.previewImage.source}
                          text={buttonText} fontColor={Color3.Black()} fontSize={fontSize}
                          diffuseColor={Color3.Black()} hoverEmmissiveColor={Color3.FromInts(15, 15, 15)}
                          onClick={() => {
                            if(result.type === 'board') {
                              this.getItems(`https://api.remix3d.com/v3/boards/${result.item.id}`, 'boards', this.state.headers)
                            } else if (result.type === 'creation') {
                              this.loadCreation(result.item)
                            }
                          }}
                        />
                      )
                    } else {
                      return null;
                    }
                  })
                }
                </CylinderPanel>
              </GUI3DManager>
              <Box height={1/8 + 0.1} width={1.1} depth={0.01} position={new Vector3(0, -0.5, -2)}>
                <StandardMaterial diffuseColor={Color3.White()} specularColor={Color3.Black()} />
              </Box>
              <Plane name="dialog" width={1} height={1/8} position={new Vector3(0, -0.5, -2.008)}>
                <AdvancedDynamicTexture name="adt" createForParentMesh={true}>
                  <Rectangle name="rect" color="#666666" height={1/8} scaleY={8}>
                      <StackPanel name="sp-1" isVertical={false} padding={0.05}>
                        <InputText name="searchInputText" text={this.state.searchText} color='white' fontSize={36} width={0.8} onTextChanged={this.updateSearchTextBabylon} />
                        <Button name="button" background="#FFAF00" width={0.2} cornerRadius={10} onPointerDown={this.doSearch}>
                          <StackPanel name="sp-2" isVertical={false} padding={0.05}>
                            <Text key="search-text" name="search-text" text='Search' fontStyle="bold" fontSize={36} color="black" width={0.7} />
                            <Text key="search-icon" name="search-icon" text={'\uf002'} fontFamily="FontAwesome" fontSize={36} color="black" width={0.3} />
                          </StackPanel>
                        </Button>
                      </StackPanel>
                  </Rectangle>
                </AdvancedDynamicTexture>
              </Plane>
              <Plane name="keyboard" width={1} height={1/4} position={new Vector3(0, -(0.6 + 1/8), -2.1414)} rotation={new Vector3(Math.PI / 4, 0, 0)} >
                <AdvancedDynamicTexture createForParentMesh={true}>
                  <Rectangle color="white" height={1/4} scaleY={4}>
                    <VirtualKeyboard controlNames={['searchInputText']} disableOffFocus={true} verticalAlignment={ Control.VERTICAL_ALIGNMENT_TOP } />
                  </Rectangle>
                </AdvancedDynamicTexture>
              </Plane>
              {this.state.model &&
                <Model key={this.state.model.key} rootUrl={this.state.model.rootUrl} sceneFilename={this.state.model.sceneFilename} position={new Vector3(0, -0.5, 0)}
                  pluginExtension={this.state.model.fileExtension} scaleToDimension={2} rotation={new Vector3(0, this.state.model.yRotation, 0)}
                  onModelLoaded={() => {
                    this.setState((prevState) => ({
                      ...prevState,
                      modelLoadProgress: 1 /* final progress event not received when lengthComputable = false */
                    }))
                  }}
                  onLoadProgress={(evt) => {
                    let modelLoadProgress = evt.lengthComputable ?
                      evt.loaded / evt.total :
                      evt.loaded / (this.state.model.fileSize * 0.085) /* provided fileSize is not for 'view' manifest, a bad guess often, but generally factor ~0.085 smaller  */
                  
                    this.setState((prevState) => ({
                      ...prevState,
                      modelLoadProgress
                    }))
                  }}
                />
              }
              <Box key="progressBar" height={0.2} width={3} depth={0.1} position={new Vector3(-1.5, 0, 0)} visibility={this.state.modelLoadProgress === 1 ? 0 : 0.6}
                  scaling = { new Vector3(this.state.modelLoadProgress, 1, 1) }
                  pivotMatrix={ Matrix.Translation(3, 0, 0) } preTransformMatrix={ Matrix.Translation(3 / 2, 0, 0) }>
                  <StandardMaterial diffuseColor={Color3.FromInts(255, 165, 0)} specularColor={Color3.Black()} />
              </Box>              
              <Box key="progressBack" height={0.2} width={3} depth={0.1} position={new Vector3(0, 0, 0.1)} visibility={this.state.modelLoadProgress === 1 ? 0 : 1} />
              <VRExperience createDeviceOrientationCamera={false} teleportEnvironmentGround={true} enableInteractions={true} />
              <Environment enableGroundShadow={true} groundYBias={1} mainColor={Color3.FromHexString("#74b9ff")} />
            </Scene>
          </Col>
        </Row>]
    )
  }
}