import React, { Component } from 'react';
import { Button as ReactStrapButton, Row, Col, Input, FormGroup, Label, Form } from 'reactstrap';
import {
  Scene, HemisphericLight, ArcRotateCamera, GUI3DManager, CylinderPanel, VRExperience, Button3D, StandardMaterial,
  Plane, AdvancedDynamicTexture, Rectangle, StackPanel, InputText, Text, Box, Button, Environment, VirtualKeyboard
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
      autoFetchChannels: true,
      searchText: '',
      results: []
    }
    
    this.getItems = this.getItems.bind(this)
    this.doSearch = this.doSearch.bind(this);
    this.updateSearchTextBabylon = this.updateSearchTextBabylon.bind(this);
    this.updateSearchTextForm = this.updateSearchTextForm.bind(this);

    // pre-fetch default channel:
    // PG: https://playground.babylonjs.com/#TC80RU#36
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
            const channelsUri = `https://api.remix3d.com/v3/channels/${defaultChannels.results[0].id}/items`
            console.log('getting channels from:', channelsUri);
            this.getItems(channelsUri, 'channels', jsonHeaders);
          }
        })
      }
    });
  }

  // map their state into ours.
  mapItem(item) {
    if (item.type === 'Board') {
      return {
        item: item.board,
        type: 'board'
      }
    } else if (item.type === 'Creation') {
      return {
        item: item.creation,
        type: 'creation'
      }
    }
    console.warn(`result unknown type: ${item.type}`)
    return undefined
  }

  getItems(itemsUri, requestType, headers, requests) {
    if (headers === undefined) {
      console.error('Cannot get items w/o headers');
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
      console.log(`splitting response by type '${requestType}'`, responseJson);
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

      console.log(`request #${requests} got (${this.state.results.length}.  Now ${newTotal})/${max}`)
      console.log('results to state ->', results);

      this.setState((prevState) => ({
        ...prevState,
        results: ((requests === 0) ? results : prevState.results.concat(results)).slice(0, max)
      }))

      if (newTotal < max && continuationUri && requests <= 3) {
        console.log('getting more from continuationUri:', continuationUri)
        this.getItems(continuationUri, requestType, headers, requests)
      }
    })
  }

  updateSearchTextBabylon(input) {
    let searchText = input.text
    this.setState((prevState) => ({
      ...prevState,
      searchText
    }))
  }

  updateSearchTextForm(e) {
    let searchText = e.target.value
    this.setState((prevState) => ({
      ...prevState,
      searchText
    }))
  }

  doSearch() {
    console.log(`Searching for: '${this.state.searchText}'`);
    let searchUri = `https://api.remix3d.com/v3/creations?q=${this.state.searchText}&$select=id,%20name,%20previewImage`

    this.getItems(searchUri, 'search', this.state.headers)
  }

  render() {
    return (
      [
        <Row>
          <Col xs={12}>
            <div><strong>{this.state.results.length}</strong> models showing.</div>
          </Col>
        </Row>,
        <Row>
        <Col xs={12}>
        <Form onSubmit={(e) => {
          e.preventDefault();
          this.doSearch();
        }} inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="searchRemix">Search</Label>
            <Input name="searchInput" id="searchRemix" placeholder="search" value={this.state.searchText} onChange={this.updateSearchTextForm}  />
            <ReactStrapButton onClick={this.doSearch}><Octicon icon={Search}/></ReactStrapButton>
          </FormGroup>
        </Form>
        </Col>
      </Row>,
        <Row>
          <Col xs={12}>
            <Scene id="sample-canvas">
              <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
              <ArcRotateCamera target={ Vector3.Zero() } radius={10} alpha={-Math.PI / 2} beta={(Math.PI / 2)} minZ={0.001} wheelPrecision={30} />
              <GUI3DManager name="gui3d">
                <CylinderPanel name="panel" margin={0.2} columns={7}>
                {
                  this.state.results.map(result => {
                    if (result.type==='board') {
                      return (
                        <Button3D key={result.item.id} name={result.item.name} imageUrl={result.item.previewImage.source}
                          text={result.item.name} fontColor={Color3.Black()} fontSize={result.item.name.length <= 15 ? 36 : 24}
                          diffuseColor={Color3.Black()} hoverEmmissiveColor={Color3.FromInts(15, 15, 15)}
                          onClick={(props) => {
                            const boardUri = `https://api.remix3d.com/v3/boards/${result.item.id}`
                            console.log('clicked on board:', result.item);
                            this.getItems(boardUri, 'boards', this.state.headers)
                          }}
                        />
                      )
                    }

                    if (result.type==='creation') {
                      return (
                        <Button3D key={result.item.id} name={result.item.name} imageUrl={result.item.previewImage.source}
                          text={result.item.name} fontColor={Color3.Black()} fontSize={result.item.name.length <= 15 ? 36 : 24}
                          diffuseColor={Color3.Black()} hoverEmmissiveColor={Color3.FromInts(15, 15, 15)}
                          onClick={(props) => {
                            console.log('clicked on creation:', result.item);
                          }}
                        />
                      )
                    }

                    console.error('unknown item type:', result.type);
                  })
                }
                </CylinderPanel>
              </GUI3DManager>
              <Box height={0.145} width={1.02} depth={0.5} position={new Vector3(0, -1, -(7-(0.5/2)))}>
                <StandardMaterial
                  diffuseColor={Color3.White()}
                  specularColor={Color3.Black()}
                />
                <Plane name="dialog" width={1} height={1/8} position={new Vector3(0, -1, -7.008)}>
                  <AdvancedDynamicTexture createForParentMesh={true}>
                    <Rectangle color="#666666" height={1/8} scaleY={8} >
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
              <Plane name="keyboard" width={4} height={4} position={new Vector3(0, -0.45, -7)} rotation={new Vector3(0, 0, 0)} >
                <AdvancedDynamicTexture createForParentMesh={true}>
                  <VirtualKeyboard controlNames={['searchInputText']} verticalAlignment={ Control.VERTICAL_ALIGNMENT_TOP } />
                </AdvancedDynamicTexture>
              </Plane>
              <VRExperience createDeviceOrientationCamera={false} teleportEnvironmentGround={true} />
              <Environment enableGroundShadow={true} groundYBias={1} mainColor={Color3.FromHexString("#74b9ff")} />
            </Scene>
          </Col>
        </Row>
      ]
    )
  }
}