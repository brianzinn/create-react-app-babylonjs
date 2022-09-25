// ref to "2D canvas" in @flyskywhy/react-native-gcanvas/README.md

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GCanvasView} from '@flyskywhy/react-native-gcanvas';
import {Loader} from 'resource-loader';
import {Asset} from 'expo-asset';

function sleepMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class Canvas2dDemo extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
    this.state = {
      debugInfo: 'Click me to draw some on canvas',
    };

    // only useful on Android, because it's always true on iOS
    this.isGReactTextureViewReady = true;
  }

  componentDidMount() {
    if (Platform.OS === 'web') {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target.id === 'canvasExample') {
            let {width, height} = entry.contentRect;
            this.onCanvasResize({width, height, canvas: entry.target});
          }
        }
      });
      resizeObserver.observe(document.getElementById('canvasExample'));
    }
  }

  initCanvas = (canvas) => {
    if (this.canvas) {
      return;
    }

    this.canvas = canvas;
    if (Platform.OS === 'web') {
      // canvas.width not equal canvas.clientWidth but "Defaults to 300" ref
      // to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas,
      // so have to assign again, unless <canvas width=SOME_NUMBER/> in render()
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
    }
    // should not name this.context because this.context is already be {} here and will
    // be {} again after componentDidUpdate() on react-native or react-native-web, so
    // name this.ctx
    this.ctx = this.canvas.getContext('2d');
  };

  onCanvasResize = ({width, height, canvas}) => {
    canvas.width = width;
    canvas.height = height;
    this.drawSome();
  };

  drawSome = async () => {
    // On Android, sometimes this.isGReactTextureViewReady is false e.g.
    // navigate from a canvas page into a drawer item page with
    // react-navigation on Android, the canvas page will be maintain
    // mounted by react-navigation, then if you continually call
    // this drawSome() in some loop, it's wasting CPU and GPU,
    // if you don't care about such wasting, you can delete
    // this.isGReactTextureViewReady and related onIsReady.

    if (this.ctx && this.isGReactTextureViewReady) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.beginPath();

      //rect
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(0, 0, 50, 50);

      //rect
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(50, 50, 50, 50);

      this.ctx.fill();

      this.ctx.beginPath();

      //circle
      this.ctx.fillStyle = 'blue';
      this.ctx.moveTo(100, 150);
      this.ctx.arc(125, 125, 25, 0, Math.PI * 2, true);

      this.ctx.fill();

      const imagedata = this.ctx.getImageData(25, 25, 50, 50);
      this.ctx.putImageData(imagedata, 100, 100, 12, 12, 25, 25);

      // const imageHttpSrc =
      //   '//gw.alicdn.com/tfs/TB1KwRTlh6I8KJjy0FgXXXXzVXa-225-75.png';
      // if use `//` above, will be convert to `http:` in `packages/gcanvas/src/env/image.js`,
      // then in Android release mode, will cause error:
      // `CLEARTEXT communication to gw.alicdn.com not permitted by network security policy`,
      // so use `https://` below
      const imageHttpSrc =
        'https://gw.alicdn.com/tfs/TB1KwRTlh6I8KJjy0FgXXXXzVXa-225-75.png';
      // `await Asset.fromModule` needs `expo-file-system`, and `expo-file-system` needs
      // [install react-native-unimodules without install expo](https://github.com/flyskywhy/g/blob/master/i%E4%B8%BB%E8%A7%82%E7%9A%84%E4%BD%93%E9%AA%8C%E6%96%B9%E5%BC%8F/t%E5%BF%AB%E4%B9%90%E7%9A%84%E4%BD%93%E9%AA%8C/%E7%94%B5%E4%BF%A1/Tool/%E7%BC%96%E7%A8%8B%E8%AF%AD%E8%A8%80/JavaScript/React%E4%BD%BF%E7%94%A8%E8%AF%A6%E8%A7%A3.md#install-react-native-unimodules-without-install-expo)
      const imageRequireAsset = await Asset.fromModule(
        require('@flyskywhy/react-native-gcanvas/tools/build_website/assets/logo-gcanvas.png'),
      );
      const imageRequireSrc = imageRequireAsset.uri;

      const loader = new Loader();
      const setup = (loader, resources) => {
        this.ctx.drawImage(resources[imageHttpSrc].data, 70, 0, 112, 37);
        this.ctx.drawImage(resources[imageRequireSrc].data, 0, 100, 120, 120);
      };
      loader.add(imageHttpSrc).add(imageRequireAsset.uri).load(setup);

      // you can use Loader() above instead of Image() below, or vice versa

      // // because already `import '@flyskywhy/react-native-browser-polyfill';` in GCanvasView, so can `new Image()`
      // // not `Platform.OS === 'web' ? new Image() : new GImage()` here
      // const imageHttp = new Image();
      // imageHttp.crossOrigin = true; // need this to solve `Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.` on Web in production mode
      // imageHttp.onload = () => {
      //   this.ctx.drawImage(imageHttp, 70, 0, 112, 37);
      // };
      // imageHttp.onerror = (error) => {
      //   this.setState({
      //     debugInfo: error.message,
      //   });
      // };
      // imageHttp.src = imageHttpSrc;

      // // to [Call drawImage() in loop with only one GImage instance](https://github.com/flyskywhy/react-native-gcanvas/issues/41)
      // for (let i = 0; i < 10; i++) {
      //   await sleepMs(1000);
      //   if (i % 2) {
      //     imageHttp.src =
      //       'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAADklEQVR4AWP4nwZCUAoAKxYFld+CjjoAAAAASUVORK5CYII=';
      //   } else {
      //     imageHttp.src =
      //       'https://gw.alicdn.com/tfs/TB1KwRTlh6I8KJjy0FgXXXXzVXa-225-75.png';
      //   }
      // }

      // const imageRequire = new Image();
      // imageRequire.onload = () => {
      //   this.ctx.drawImage(imageRequire, 0, 100, 120, 120);
      // };
      // imageRequire.onerror = (error) => {
      //   this.setState({
      //     debugInfo: error.message,
      //   });
      // };
      // imageRequire.src = imageRequireSrc;
    }
  };

  takePicture = () => {
    if (this.canvas) {
      const data = this.canvas.toDataURL();
      console.warn(data);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.drawSome}>
          <Text style={styles.welcome}>{this.state.debugInfo}</Text>
        </TouchableOpacity>
        {Platform.OS === 'web' ? (
          <canvas
            id={'canvasExample'}
            ref={this.initCanvas}
            style={
              {
                flex: 1,
                width: '100%',
              } /* canvas with react-native-web can't use width and height in styles.gcanvas */
            }
          />
        ) : (
          <GCanvasView
            onCanvasResize={this.onCanvasResize}
            onCanvasCreate={this.initCanvas}
            onIsReady={(value) => (this.isGReactTextureViewReady = value)}
            isGestureResponsible={true /* Here is just for example, you can remove this line because default is true */}
            isAutoClearRectBeforePutImageData={false /* default is false, if you want to be exactly compatible with Web, you can set it to true*/}
            devicePixelRatio={undefined /* Here is just for example, you can remove this line because default is undefined and means default is PixelRatio.get(), ref to "About devicePixelRatio" in @flyskywhy/react-native-gcanvas/README.md */}
            style={styles.gcanvas}
          />
        )}
        <TouchableOpacity onPress={this.takePicture}>
          <Text style={styles.welcome}>Click me toDataURL()</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  gcanvas: {
    flex: 1,
    width: '100%',
    // backgroundColor: '#FF000030', // TextureView doesn't support displaying a background drawable since Android API 24
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
});
