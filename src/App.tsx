import Controller from "./components/common/Controller";
import ThreeScene from "./components/three/ThreeScene";
import '@/assets/css/common.scss';

function App() {

  return (
    <div style={{ display: "block",width:'100vw',height:'100vh' }}>
      <ThreeScene />
      <Controller />
    </div>
  )
}

export default App;
