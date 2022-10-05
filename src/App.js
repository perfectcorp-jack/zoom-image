import './App.css';
import Upload from './Upload.js';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.zoom = 1;
    this.state = {
      image: '',
    };
    this.canvasTag = React.createRef();
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleMouseWheel = this.handleMouseWheel.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
  }

  handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    const canvas = this.canvasTag.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 480;
    const myImage = new Image();
    reader.addEventListener("load", () => {
      this.setState({
        image: reader.result,
      });
      myImage.src = reader.result;
      myImage.onload = function () {
        const ratioX = canvas.width / myImage.width;
        const ratioY = canvas.height / myImage.height;
        const ratio = Math.min(ratioX, ratioY);
        const xCenter = (canvas.width - myImage.width * ratio) / 2;
        const yCenter = (canvas.height - myImage.height * ratio) / 2;
        ctx.drawImage(myImage, xCenter, yCenter, myImage.width * ratio, myImage.height * ratio);
      }
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleMouseWheel(e) {
    if (e.deltaY < 0) {
      this.handleZoomIn();
    } else {
      this.handleZoomOut();
    }
  }

  handleZoomIn() {
    this.zoom += 0.1;
    const canvas = this.canvasTag.current;
    const ctx = canvas.getContext('2d');
    const myImage = new Image();
    myImage.src = this.state.image;
    const ratioX = canvas.width / myImage.width * this.zoom;
    const ratioY = canvas.height / myImage.height * this.zoom;
    const ratio = Math.min(ratioX, ratioY);
    const xCenter = (canvas.width - myImage.width * ratio) / 2;
    const yCenter = (canvas.height - myImage.height * ratio) / 2;
    myImage.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(myImage, xCenter, yCenter, myImage.width * ratio, myImage.height * ratio);
    };
  }

  handleZoomOut() {
    this.zoom -= 0.1;
    const canvas = this.canvasTag.current;
    const ctx = canvas.getContext('2d');
    const myImage = new Image();
    myImage.src = this.state.image;
    const ratioX = canvas.width / myImage.width * this.zoom;
    const ratioY = canvas.height / myImage.height * this.zoom;
    const ratio = Math.min(ratioX, ratioY);
    const xCenter = (canvas.width - myImage.width * ratio) / 2;
    const yCenter = (canvas.height - myImage.height * ratio) / 2;
    myImage.onload = function () {
      if (this.zoom >= 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(myImage, xCenter, yCenter, myImage.width * ratio, myImage.height * ratio);
      } else {
        this.zoom = 0;
      }
    }.bind(this);
  }

  render() {
    return (
      <div className="App">
        <div>
          <canvas id='canvas' style={{ width: '640px', height: '480px', border: '1px solid black' }} onWheel={this.handleMouseWheel} ref={this.canvasTag}></canvas>
          {this.state.image === '' ? <Upload handleImageChange={this.handleImageChange} image={this.state.image} /> : null}
          <div>
            {this.state.image !== '' ? <button type="button" style={{ width: '100px' }} onClick={this.handleZoomIn}>Zoom In</button> : null}
            {this.state.image !== '' ? <button type="button" style={{ width: '100px' }} onClick={this.handleZoomOut}>Zoom Out</button> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
