import React from 'react';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  };

  render() {
    return (
      <div>
        {this.props.image === '' ? <input type='file' accept='image/*' onChange={this.props.handleImageChange} ref={this.myRef} /> : null}
      </div>
    );
  }
}

export default Upload;
