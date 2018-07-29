
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

A BabylonJS scene to your webpage in either a declarative manner or code manner (or combination).

## Declarative only
Can be done purely with React Components and zero code.
```jsx
<Scene id="sample-canvas">
    <FreeCamera name="camera1" position={new Vector3(0, 5, -10)} target={Vector3.Zero()} />
    <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
    <Sphere name="sphere1" diameter={2} segments={16} position={new Vector3(0, 1, 0)} />
    <Box name="box" size={1.7} position={new Vector3(0, 1, 0)}>
        <RotateMeshBehaviour radians={0.01} axis={Axis.Y} />
    </Box>
    <Ground name="ground1" width={6} height={6} subdivisions={2}  />
</Scene>
```

There is a live demo on GH pages:
[live demo declarative syntax](https://brianzinn.github.io/create-react-app-babylonjs/sample)

## Code only
```jsx
<Scene id="sample-canvas" onSceneMount={this.loadScene} />
```
## TODO: 
1. Add full example for code only as well as a code/declarative combination.
2. Add example with React props (state) propagating to BabylonJS meshes.
3. Add Gizmo example with redo/undo - synced with React + BabylonJS.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find out about bootstrapping and ejecting on that site.  This project has not been ejected.