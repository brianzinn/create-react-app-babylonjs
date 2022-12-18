# GCanvas React Native Examples

Examples for [@flyskywhy/react-native-gcanvas](https://github.com/flyskywhy/react-native-gcanvas).

```
npm install --legacy-peer-deps
```

## Android
`npm run android` to generate `android/app/build/outputs/apk/debug/app-debug.apk` for development.

`npm run build-android` to generate `android/app/build/outputs/apk/release/app-release.apk` for production.

`npm run bundle-android` to `android/app/build/outputs/bundle/release/app-release.aab` for production.

## iOS
Run with Xcode.

## Web
`npm run web` for development, then view it at [http://localhost:3000](http://localhost:3000) in web browser.

`npm run build-web` to generate files in `build/` for production to deploy to `https://foo.bar.com/` , and can use `npx http-server@13.0.2 build` to simply test it at [http://127.0.0.1:8080](http://127.0.0.1:8080) in web browser.

## Refs
The babylonjs examples are ported from <https://github.com/brianzinn/create-react-app-babylonjs> with few code change like this commit [react -> react-native: `babylonjs Non-Declarative` works well on Android with new version @flyskywhy/react-native-gcanvas support 3d game engine babylonjs](https://github.com/flyskywhy/GCanvasRNExamples/commit/686eb9f).