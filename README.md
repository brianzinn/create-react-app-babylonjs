
## Starter Kit
react-babylonjs aims to be an unopinionated module for integrating React and BabylonJS.  This is a sample project to help people get started.

## Using BabylonJS with ReactJS

If you are cloning this repo, you just need:
```bash
$ yarn install    # Install project dependencies
$ yarn start      # Compile and launch (same as `npm start`)
```
or
```bash
npm install       # Install project dependencies
npm start         # Compile and launch (same as `yarn start`)
```

If you are starting a fresh Create React App, then you should only need these dependencies.
```csh
yarn add babylonjs
yarn add react-babylonjs

npm install babylonjs
npm install react-babylonjs
```

If you are using the 3D GUI components then you will need 'babylonjs-gui' and if you are loading 3D models 'babylonjs-loaders'.

A BabylonJS scene to your webpage in either a declarative manner or code manner (or combination).

## 100% Declarative
Can be done purely with React Components and zero code.
```jsx
<Scene id="sample-canvas">
    <FreeCamera name="camera1" position={new Vector3(0, 5, -10)} target={Vector3.Zero()} />
    <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
    <Sphere name="sphere1" diameter={2} segments={16} position={new Vector3(0, 1, 0)} />
    <Box name="box" size={1.7} position={new Vector3(0, 1, 0)}>
        <RotateMeshBehavior radians={0.01} axis={Axis.Y} />
    </Box>
    <Ground name="ground1" width={6} height={6} subdivisions={2}  />
</Scene>
```

## 100% declarative - Loading 3D models with zero code (optional state/props flow).
You can easily control BabylonJS models as well.  This sample loads 3D models and controls them with buttons.
live demo: [with model](https://brianzinn.github.io/create-react-app-babylonjs/withModel)
live demo: [with props](https://brianzinn.github.io/create-react-app-babylonjs/withProps)
```jsx
class WithModel extends React.Component 
{
  ...
  render() {
    return (
      <Scene id="sample-canvas">
        <ArcRotateCamera name="camera1" alpha={Math.PI / 2} beta={Math.PI / 2}
          radius={0.075} target={Vector3.Zero()} minZ={0.001}
        />
        <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
        <Model
          position={ new Vector3(0.02, 0, 0)}
          rootUrl = {`${baseUrl}BoomBox/glTF/`}
          sceneFilename="BoomBox.gltf"
        />
      </Scene>
    )
  }
}
```

```jsx
class WithVR extends React.Component
{
  render() {
    return (
      <Scene id="sample-canvas" onMeshPicked={this.onMeshPicked}>
        <ArcRotateCamera name="arc"
          target={ new Vector3(0, 1, 0) }
          alpha={-Math.PI / 2}
          beta={(0.5 + (Math.PI / 4))}
          radius={2}
          minZ={0.001} />

        <DirectionalLight name="dl" direction={new Vector3(0, -0.5, 0.5)} position = {new Vector3(0, 2, 0.5)}>
          <ShadowGenerator mapSize={1024} useBlurExponentialShadowMap={true} blurKernel={32}
            shadowCasters={["counterClockwise", "clockwise", "BoomBox"]}
          />
        </DirectionalLight>

        <IcoSphere name="counterClockwise" position={new Vector3(-0.5, 1, 0)} radius={0.2} flat={true} subdivisions={1}>
          <StandardMaterial
            diffuseColor={Color3.Yellow()}
            specularColor={Color3.Black()}
          />
          <RotateMeshBehavior radians={0.01} axis={Axis.Y} />
        </IcoSphere>
        <Model
          rotation= {new Vector3(0, this.state.modelRotationY, 0)}
          position={ new Vector3(0, 1, 0)}
          rootUrl = {`${baseUrl}BoomBox/glTF/`}
          sceneFilename="BoomBox.gltf"
          scaling={ new Vector3(20, 20, 20) }
        />
        <IcoSphere name="clockwise" position={new Vector3(0.5, 1, 0)} radius={0.2} flat={true} subdivisions={1}>
          <StandardMaterial
            diffuseColor={Color3.FromInts(255, 165, 0)}
            specularColor={Color3.Black()}
          />
          <RotateMeshBehavior radians={-0.01} axis={Axis.Y} />
        </IcoSphere>
        <VRExperience createDeviceOrientationCamera={false} teleportEnvironmentGround={true} />
        <Environment enableGroundShadow= {true} groundYBias={1} mainColor={Color3.FromHexString("#74b9ff")} />
      </Scene>
    )
  }
}
```

## Code only
You don't need to rely on the declarative Components except for Scene and are free to completely create your own scenes and even control the runRenderLoop() logic.  You are provided a created Scene (and Engine via scene.getEngine()) and loaded HTML5 canvas reference.
```jsx
export default class NonDeclarative extends Component 
{
  meshPicked(mesh) {
    console.log('mesh picked:', mesh)
  }

  onSceneMount(e) {
    const { canvas, scene } = e

    // Scene to build your environment, Canvas you need to attach your camera.       
    var camera = new ArcRotateCamera("Camera", 0, 1.05, 6, Vector3.Zero(), scene)
    camera.attachControl(canvas)

    // if you want to set the shader directory, use the "shadersRepository" prop.
    // var shader = new ShaderMaterial("gradient", scene, "gradient", {})

    MeshBuilder.CreateBox('box', { size: 3}, scene)

    new HemisphericLight('light', Vector3.Up(), scene);

    // TODO: setup your scene here
    scene.getEngine().runRenderLoop(() => {
        if (scene) {
            scene.render();
        }
    });
}

render() {
  return (
    <Scene
      onMeshPicked={this.meshPicked}
      onSceneMount={this.onSceneMount}
    />)
  }
}
```
## TODO: 
1. Add full example for code only as well as a code/declarative combination and new createCamera() usage example.
2. Add Gizmo example with redo/undo - synced with React + BabylonJS.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find out about bootstrapping and ejecting on that site.  This project has not been ejected.