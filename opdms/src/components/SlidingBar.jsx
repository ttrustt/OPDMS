import React, { Component } from 'react';
import SlidingPane from "react-sliding-pane";
// import {  Button } from 'react-bootstrap';
import "react-sliding-pane/dist/react-sliding-pane.css";
class SlidingBar extends Component {
  //fly out pane from left
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SlidingPane
        isOpen={this.props.isPaneOpen}
        title={this.props.title}
        subtitle={this.props.selected_ds}
        onRequestClose={
          // triggered on "<" on left top click or on outside click
          this.props.onTogglePane
        }
        // onChangeUserType={this.props.onChangeUserType}
        from="right"
        width="400px"
      >
        {this.props.paneContent} 


      </SlidingPane>
      
    );
  }
}

export default SlidingBar;