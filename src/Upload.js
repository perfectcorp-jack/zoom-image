import React from 'react';

class Upload extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div>
        <input type='file' accept='image/*' onChange={this.props.handleImageChange} />
      </div>
    );
  }
}

export default Upload;
