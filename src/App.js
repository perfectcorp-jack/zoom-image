import './App.css';
import Upload from './Upload.js';
import React from 'react';

class App extends React.Component {
  // constructor
  constructor(props) {
    super(props);
    this.zoom = 1;
    this.image = '';
    this.state = {
      loaded: false,
    };
    this.canvasTag = React.createRef();
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleMouseWheel = this.handleMouseWheel.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
  }

  // upload image
  handleUploadImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    const canvas = this.canvasTag.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 480;
    const myImage = new Image();
    reader.addEventListener("load", () => {
      this.setState({
        loaded: true,
      });
      this.image = reader.result;
      myImage.src = this.image;
      console.log(myImage);
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

  // listen to mouse wheel event
  handleMouseWheel(e) {
    if (e.deltaY < 0) {
      this.handleZoomIn();
    } else {
      this.handleZoomOut();
    }
  }

  // zoom in function
  handleZoomIn() {
    if (!this.state.loaded) {
      return;
    }
    this.zoom += 0.1;
    console.log(this.zoom);
    const canvas = this.canvasTag.current;
    const ctx = canvas.getContext('2d');
    const myImage = new Image();
    myImage.src = this.image;
    const ratioX = canvas.width / myImage.width * this.zoom;
    const ratioY = canvas.height / myImage.height * this.zoom;
    const ratio = Math.min(ratioX, ratioY);
    const xCenter = (canvas.width - myImage.width * ratio) / 2;
    const yCenter = (canvas.height - myImage.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(myImage, xCenter, yCenter, myImage.width * ratio, myImage.height * ratio);
  }

  // zoom out function
  handleZoomOut() {
    if (!this.state.loaded) {
      return;
    }
    this.zoom -= 0.1;
    console.log(this.zoom);
    const canvas = this.canvasTag.current;
    const ctx = canvas.getContext('2d');
    const myImage = new Image();
    myImage.src = this.image;
    const ratioX = canvas.width / myImage.width * this.zoom;
    const ratioY = canvas.height / myImage.height * this.zoom;
    const ratio = Math.min(ratioX, ratioY);
    const xCenter = (canvas.width - myImage.width * ratio) / 2;
    const yCenter = (canvas.height - myImage.height * ratio) / 2;
    if (this.zoom >= 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(myImage, xCenter, yCenter, myImage.width * ratio, myImage.height * ratio);
    } else {
      this.zoom = 0;
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <canvas style={{ width: '640px', height: '480px', border: '1px solid black' }} onWheel={this.handleMouseWheel} ref={this.canvasTag}></canvas>
          <br />
          {!this.state.loaded && this.image === '' ? <Upload handleUploadImage={this.handleUploadImage} image={this.image} /> : null}
          {this.state.loaded && this.image !== '' ? <button type="button" style={{ width: '100px' }} onClick={this.handleZoomIn}>Zoom In</button> : null}
          {this.state.loaded && this.image !== '' ? <button type="button" style={{ width: '100px' }} onClick={this.handleZoomOut}>Zoom Out</button> : null}
        </div>
      </div>
    );
  }
}

export default App;
