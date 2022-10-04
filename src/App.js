import './App.css';
import Upload from './Upload.js';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 1,
      image: '',
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleMouseWheel = this.handleMouseWheel.bind(this);
  }

  handleMouseWheel(e) {
    if (e.deltaY < 0) {
      this.handleZoomIn();
    } else {
      this.handleZoomOut();
    }
  }

  handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      this.setState({
        image: reader.result,
      });
      const myImage = new Image();
      myImage.src = reader.result;
      myImage.onload = function () {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 640;
        canvas.height = 480;
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

  handleZoomIn() {
    console.log(this.state.zoom);

    this.state.zoom += 0.1;
    const zoom = this.state.zoom;
    console.log(this.state.zoom);
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const myImage = new Image();
    myImage.src = this.state.image;
    const ratioX = canvas.width / myImage.width * zoom;
    const ratioY = canvas.height / myImage.height * zoom;
    const ratio = Math.min(ratioX, ratioY);
    const xCenter = (canvas.width - myImage.width * ratio) / 2;
    const yCenter = (canvas.height - myImage.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(myImage, xCenter, yCenter, myImage.width * ratio, myImage.height * ratio);
  }

  handleZoomOut() {
    this.state.zoom -= 0.1;
    console.log(this.state.zoom);
    const zoom = this.state.zoom;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const myImage = new Image();
    myImage.src = this.state.image;
    const ratioX = canvas.width / myImage.width * zoom;
    const ratioY = canvas.height / myImage.height * zoom;
    const ratio = Math.min(ratioX, ratioY);
    const xCenter = (canvas.width - myImage.width * ratio) / 2;
    const yCenter = (canvas.height - myImage.height * ratio) / 2;
    if (zoom >= 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(myImage, xCenter, yCenter, myImage.width * ratio, myImage.height * ratio);
    } else {
      this.state.zoom = 0;
      console.log(this.state.zoom);
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <canvas id='canvas' style={{ width: '640px', height: '480px', border: '1px solid black' }} onWheel={this.handleMouseWheel}></canvas>
          <Upload
            handleImageChange={this.handleImageChange}
            image={this.state.image}
          />
          {this.state.image !== '' ? <button type="button" style={{ width: '100px' }} onClick={this.handleZoomIn}>Zoom In</button> : null}
          {this.state.image !== '' ? <button type="button" style={{ width: '100px' }} onClick={this.handleZoomOut}>Zoom Out</button> : null}
        </div>
      </div>
    );
  }
}

export default App;
