import React from 'react';
import playerSprite from '../Assets/playerRun.png';

class CanvasSprite extends React.Component {
  constructor(props){
    super(props);
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
    this.setContext();
    this.loadSprite();
  //this.spriteSheet = await this.loadSpritePromise();
    this.renderFrame();
  }

  //Methods
  setContext = () => {
    this.canvas = this.canvasRef.current;
    this.context = this.canvas.getContext('2d');
  }
  loadSprite = () => {
    this.spriteSheet = new Image();
    this.spriteSheet.src = playerSprite;
    this.totalFrames = 8;
    this.currentFrame = 0;
    this.spriteWidth = this.spriteSheet.width / this.totalFrames;
    this.spriteHeight = this.spriteSheet.height;
  }
  updateFrame = () => {
    this.currentFrame += 1;
    if(this.currentFrame >= this.totalFrames) this.currentFrame = 0;

    this.sourceX = this.currentFrame * 321;//this.spriteWidth;
  }
  drawSprite = () => {
    this.context.drawImage(
      this.spriteSheet,
      this.sourceX, 0, 321, 271, // Source
      0, 0, 321, 271 // Destination
    )
  }
  renderFrame = () => {
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.updateFrame();
    this.drawSprite();
    this.timeoutId = setTimeout(() => requestAnimationFrame(this.renderFrame), 100);
  }
  loadSpritePromise = () => {
    return new Promise((resolve, reject) => {
      const sprite = new Image();
      sprite.src = playerSprite;
      sprite.onload = () => resolve(sprite);
      sprite.onerror = reject;
    })
  }

  render() {
    return (
      <canvas 
        ref={this.canvasRef}
        width={this.props.width}
        height={this.props.height}
      ></canvas>
    );
  };
}

export default CanvasSprite;