import React from 'react'

const Home = () => (
  <div>   
    <p>There are examples for Virtual Reality, 3D models, 3D UI controls, Skybox and mesh creations using BabylonJS on WebGL running in a React App.</p>

    <p><strong>react-babylonjs</strong> is a react renderer using Fiber and has large API coverage by using code generation.</p>

    <p>Interesting part is the UI 2D, where a WebGL texture is dynamically updating from props - best experienced in VR mode :)</p>

    <p>
    Also, full HMR experience with browser udpating as you update your application in the editor.
    <img src="https://raw.githubusercontent.com/brianzinn/react-babylonjs/master/media/react-babylonjs-hmr.gif" width="90%" alt="React BabylonJS HMR" />
    </p>
    
    <p className="text-muted small">More coming soon...</p>
  </div>
)

export default Home