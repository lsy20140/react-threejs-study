import './App.css';
import ModelViewer from './modelviewer';

function App() {
  return (
    <div className="container">
      <ModelViewer modelPath="/images/EXERCISE1.gltf" scale="50" position={[0,10,0]}/>
      <ModelViewer modelPath="/images/EXERCISE2.gltf" scale="2" position={[10,0,0]}/>
    </div>
  );
}

export default App;
