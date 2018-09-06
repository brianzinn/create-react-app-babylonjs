import React, { Component } from 'react';
import { Button as ReactStrapButton, Row, Col, Input, FormGroup, Label, Form } from 'reactstrap';
import {
  Scene, HemisphericLight, ArcRotateCamera, GUI3DManager, CylinderPanel, VRExperience, Button3D, StandardMaterial,
  Plane, AdvancedDynamicTexture, Rectangle, StackPanel, InputText, Text, Box, Button, Environment, VirtualKeyboard, Model
} from 'react-babylonjs';
import { Vector3, Color3 } from 'babylonjs';
import { Control } from 'babylonjs-gui'
import Octicon, { Search } from '@githubprimer/octicons-react';

export default class RemixMeshMashup extends Component 
{
  constructor() {
    super();
    
    this.state = {
      headers: [],
      autoFetchChannels: true, // pre-fetch default channel:
      searchText: '',
      results: [],
      model: undefined
    }
    
    fetch('https://remixmeshmashup.azurewebsites.net/api/getToken?code=asLEw4snsUwpUJod9RQd1RUhvWwmnxWJ4EXaUNpgvdtipsC6/P5EFA==')
    .then(response => response.json())
    .then(headers => {
      this.setState((prevState) => ({
        ...prevState,
        headers
      }));
      
      if (this.state.autoFetchChannels) {
        let jsonHeaders = headers;
        fetch('https://api.remix3d.com/v3/channelsets/Default/channels', {
          headers
        })
        .then(defaultChannelsResponse => defaultChannelsResponse.json())
        .then(defaultChannels => {
          if (defaultChannels.totalCount > 0 && defaultChannels.results && defaultChannels.results.length) {
            this.getItems(`https://api.remix3d.com/v3/channels/${defaultChannels.results[0].id}/items`, 'channels', jsonHeaders);
          }
        })
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

    if (requests > 3) {
      console.warn('Max requests on items reached.');
      return;
    }

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
        case 'boards': // board contains creations
          results = ((responseJson.items) ? responseJson.items : responseJson).results.map(result => ({type: 'creation', item: result}))
          continuationUri = ((responseJson.items) ? responseJson.items : responseJson).continuationUri
          break;
        default:
          throw new Error('Unknown requestType:' + requestType);
      }
     
      let newTotal = (requests === 0) ? results.length : this.state.results.length + results.length
      const max = 7 * 4; // columns x rows

      // console.log(`request #${requests} got (${this.state.results.length}.  Now ${newTotal})/${max}`)
      // console.log('results to state ->', results);
      this.setState((prevState) => ({
        ...prevState,
        results: ((requests === 0) ? results : prevState.results.concat(results)).slice(0, max)
      }))

      if (newTotal < max && continuationUri && requests <= 3) {
        this.getItems(continuationUri, requestType, headers, requests)
      }
    })
  }

  loadCreation(creation) {
    const viewManifest = (!creation.manifestUris)// same as "Performance" in assetUris?
      ? undefined
      : creation.manifestUris.find(manifest => manifest.usage === 'View');

    if (viewManifest === undefined) {
      console.warn('creation has no (View) manifestUri :(');
      return;
    }

    var uri = viewManifest.uri;
    var fileIndex = uri.lastIndexOf("/");
    
    this.setState((prevState) => ({
      ...prevState,
      model: {
        rootUrl: uri.substring(0, fileIndex + 1),
        sceneFilename: uri.substring(fileIndex + 1),
        format: viewManifest.format, // ie: 'GLTF'
        key: creation.id,
        fileSize: creation.fileSize,
        hasAnimations: creation.hasAnimations
      }
    }))

    if (creation.stagingData && creation.stagingData.viewerStagingData) {
      console.log('TODO: use staging data?', creation.stagingData.viewerStagingData)
    }
  }

  updateSearchTextBabylon = (input) => {
    const searchText = input.text;
    this.setState((prevState) => ({
      ...prevState,
      searchText
    }))
  }

  updateSearchTextForm = (e) => {
    const searchText = e.target.value
    this.setState((prevState) => ({
      ...prevState,
      searchText
    }))
  }

  doSearch = () => {
    let searchUri = `https://api.remix3d.com/v3/creations?q=${this.state.searchText}&$select=id,%20name,%20previewImage`
    this.getItems(searchUri, 'search', this.state.headers)
  }

  render() {
    let cameraRadius = 0.866;

    return (
      [
        <Row>
          <Col xs={6}>
            <div><strong>{this.state.results.length}</strong> models showing.</div>
          </Col>
          <Col xs={6}>
          <Form onSubmit={(e) => { e.preventDefault(); this.doSearch(); }} inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="searchRemix">Search</Label>
              <Input name="searchInput" id="searchRemix" placeholder="search" value={this.state.searchText} onChange={this.updateSearchTextForm}  />
              <ReactStrapButton onClick={this.doSearch}><Octicon icon={Search}/></ReactStrapButton>
            </FormGroup>
          </Form>
          </Col>
        </Row>, <Row>
          <Col xs={12}>
            <Scene id="sample-canvas" enableOfflineSupport={false}>
              <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
              <ArcRotateCamera target={ Vector3.Zero() } radius={cameraRadius} alpha={-Math.PI / 2} beta={(Math.PI / 2)} minZ={0.001} wheelPrecision={30} />
              <GUI3DManager name="gui3d">
                <CylinderPanel name="panel" margin={0.2} columns={7} radius={cameraRadius * 3} >
                {
                  this.state.results.map(result => {
                    if (result.type==='board') {
                      return (
                        <Button3D key={result.item.id} name={result.item.name} imageUrl={result.item.previewImage.source}
                          text={result.item.name} fontColor={Color3.Black()} fontSize={result.item.name.length <= 15 ? 36 : 24}
                          diffuseColor={Color3.Black()} hoverEmmissiveColor={Color3.FromInts(15, 15, 15)}
                          onClick={() => { this.getItems(`https://api.remix3d.com/v3/boards/${result.item.id}`, 'boards', this.state.headers) }}
                        />
                      )
                    }

                    if (result.type==='creation') {
                      return (
                        <Button3D key={result.item.id} name={result.item.name} imageUrl={result.item.previewImage.source}
                          text={result.item.name} fontColor={Color3.Black()} fontSize={result.item.name.length <= 15 ? 36 : 24}
                          diffuseColor={Color3.Black()} hoverEmmissiveColor={Color3.FromInts(15, 15, 15)}
                          onClick={(props) => this.loadCreation(result.item)}
                        />
                      )
                    }
                    console.error('unknown item type:', result.type);
                  })
                }
                </CylinderPanel>
              </GUI3DManager>
              <Box height={0.05 + 1/8} width={1.05} depth={0.01} position={new Vector3(0, -cameraRadius / 4, (cameraRadius / 2)+0.008)}>
                <StandardMaterial diffuseColor={Color3.White()} specularColor={Color3.Black()} />
                <Plane name="dialog" width={1} height={1/8} position={new Vector3(0, -cameraRadius /4, cameraRadius / 2)}>
                  <AdvancedDynamicTexture createForParentMesh={true}>
                    <Rectangle color="#666666" height={1/8} scaleY={8}>
                        <StackPanel isVertical={false} padding={0.05}>
                          <InputText name="searchInputText" text={this.state.searchText} color='white' fontSize={36} width={0.8} onTextChanged={this.updateSearchTextBabylon} />
                          <Button background="#FFAF00" width={0.2} height={0.9} cornerRadius={10} onPointerDown={this.doSearch}>
                            <StackPanel isVertical={false} padding={0.05}>
                              <Text text='Search' fontStyle="bold" fontSize={36} color="black" width={0.7} />
                              <Text text={'\uf002'} fontFamily="FontAwesome" fontSize={36} color="black" width={0.3} />
                            </StackPanel>
                          </Button>
                        </StackPanel>
                    </Rectangle>
                  </AdvancedDynamicTexture>
                </Plane>
              </Box>
              <Plane name="keyboard" width={1} height={1/4} position={new Vector3(0, -0.05-1/8-cameraRadius /4, (cameraRadius / 2)-0.1)} rotation={new Vector3(Math.PI / 4, 0, 0)} >
                <AdvancedDynamicTexture createForParentMesh={true}>
                  <Rectangle color="white" height={1/4} scaleY={4}>
                    <VirtualKeyboard controlNames={['searchInputText']} disableOffFocus={true} verticalAlignment={ Control.VERTICAL_ALIGNMENT_TOP } />
                  </Rectangle>
                </AdvancedDynamicTexture>
              </Plane>
              {this.state.model &&
                <Model key={this.state.model.key} rootUrl={this.state.model.rootUrl} sceneFilename={this.state.model.sceneFilename} />
              }
              <VRExperience createDeviceOrientationCamera={false} teleportEnvironmentGround={true} />
              <Environment enableGroundShadow={true} groundYBias={1} mainColor={Color3.FromHexString("#74b9ff")} />
            </Scene>
          </Col>
        </Row>
      ]
    )
  }
}