import React from 'react';

class CanvasShape extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  // Life cycles
  componentDidMount() {
    this.setContext();
    this.setupAnimation();
    this.renderFrame();
  }
  componentDidUpdate() {
    console.log("CanvasShape Updated");
    if(this.requestId) cancelAnimationFrame(this.requestId);
    this.setContext();
    this.setupAnimation();
    this.renderFrame();
  }
  // Methods
  setContext = () => {
    this.canvas = this.canvasRef.current;
    this.context = this.canvas.getContext('2d');
  }
  setupAnimation = () => {
    this.radians = 0;
  }
  drawCircle = () => {
    this.context.beginPath();
    this.context.arc(50,50,50 * Math.abs(Math.cos(this.radians)),0,2 * Math.PI);
    this.context.fill();
  }
  drawSquare = () => {
    const side = 90 * Math.abs(Math.cos(this.radians));
    const middle = (this.canvas.width - side) / 2;
    this.context.beginPath()
    this.context.fillRect(middle, middle, side, side);

  }
  renderFrame = () => {
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    switch(this.props.shape) {
      case 'circle': this.drawCircle(); break;
      case 'square': this.drawSquare(); break;
    }
    this.radians += 0.05;
    this.requestId = requestAnimationFrame(this.renderFrame);
  }
  render() {
    return (
      <canvas 
      ref={this.canvasRef}
      width={this.props.width} 
      height={this.props.height}>
      </canvas> 
    );
  };
}

export default CanvasShape;