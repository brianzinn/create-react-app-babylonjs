import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import {
  Scene, HemisphericLight, ArcRotateCamera, GUI3DManager, CylinderPanel, VRExperience, Button3D
} from 'react-babylonjs';
import { Vector3, Color3 } from 'babylonjs';
import Octicon, { Search } from '@githubprimer/octicons-react';

export default class RemixMeshMashup extends Component 
{
  constructor() {
    super();
    
    this.state = {
      headers: [],
      search: { text: undefined, results: [] }
    }
    
    this.getItems = this.getItems.bind(this)
    this.doSearch = this.doSearch.bind(this);

    // pre-fetch default channel:
    fetch('https://remixmeshmashup.azurewebsites.net/api/getToken?code=asLEw4snsUwpUJod9RQd1RUhvWwmnxWJ4EXaUNpgvdtipsC6/P5EFA==')
    .then(response => response.json())
    .then(headers => {
      this.setState((prevState) => ({
        headers,
        search: { text: undefined, results: [] }
      }));
      
      let jsonHeaders = headers;
      fetch('https://api.remix3d.com/v3/channelsets/Default/channels', {
        headers
      })
      .then(defaultChannelsResponse => defaultChannelsResponse.json())
      .then(defaultChannels => {
        if (defaultChannels.totalCount > 0 && defaultChannels.results && defaultChannels.results.length) {         
          this.getItems(`https://api.remix3d.com/v3/channels/${defaultChannels.results[0].id}/items`, jsonHeaders, 0);
        }
      })
    });
  }

  getItems(itemsUrl, headers, requests) {
    if (headers === undefined) {
      console.error('Cannot get items w/o headers');
      return;
    }  

    requests = (requests === undefined) ? 0 : ++requests;

    if (requests > 3) {
      console.warn('Max requests on items reached.');
      return;
    }

    fetch(itemsUrl, {
      headers
    })
    .then(itemsResponse => itemsResponse.json())
    .then(items => {          
      console.log('items request', items);
      // TODO: keep the type as it will 'click' differently? :)
      let boards = items.results.filter(item => 
        item.type === 'Board' &&
        item.board.previewImage &&
        item.board.previewImage.source
      ).map(item => item.board);

      // console.log('adding boards:', boards);

      this.setState((prevState) => ({
        ...prevState,
        search: {
          text: prevState.search.text,
          results: prevState.search.results.concat(boards)
        }
      }))

      if (items.continuationUri && requests <= 3) {
        this.getItems(items.continuationUri, headers, requests)
      }
    })
  }

  doSearch(text) {
    console.log('no search yet:', text);
    this.setState((prevState) => ({
      ...prevState      
    }))
  }

  render() {
    return (
      [
        <Row>
          <Col xs={12}>
            <div><strong>{this.state.search.results.length}</strong> models showing.<Button onClick={this.doSearch}><Octicon icon={Search}/></Button></div>
          </Col>
        </Row>,
        <Row>
          <Col xs={12}>
            <Scene id="sample-canvas">
              <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
              <ArcRotateCamera target={ Vector3.Zero() } radius={10} alpha={-Math.PI / 2} beta={(Math.PI / 2)} />
              <GUI3DManager name="gui3d">
                <CylinderPanel name="panel" margin={0.2} columns={7}>
                {
                  this.state.search.results.map(item => (
                    <Button3D key={item.id} name={item.name} imageUrl={item.previewImage.source}
                      text={item.name} fontColor={Color3.Black()} fontSize={item.name.length <= 15 ? 36 : 24}
                      diffuseColor={Color3.Black()} hoverEmmissiveColor={Color3.FromInts(15, 15, 15)}
                      onClick={(props) => {
                        console.log('clicked on:', item);
                      }}
                    />
                  ))
                }
                </CylinderPanel>
              </GUI3DManager>
              <VRExperience createDeviceOrientationCamera={false} />
            </Scene>
          </Col>
        </Row>
      ]
    )
  }
}