import React from 'react';
import CanvasShape from './Components/CanvasShape'

class App extends React.Component {
  state = {shape: 'circle'};

  setShapeSquare = () => {
    this.setState({shape: 'square'});
  }
  setShapeCircle = () => {
    this.setState({shape: 'circle'});
  }
  render() {
    return (
      <>
        <h1>Canvas Animation!</h1>
        <CanvasShape width={100} height={100} shape={this.state.shape}/>
        <button onClick={this.setShapeSquare}>Square</button>
        <button onClick={this.setShapeCircle}>Circle</button>
      </>
    );
  }
}

export default App;
