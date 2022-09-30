import React from "react";
import Popout from "react-popout";
//import { BsArrowUpRightSquare } from "react-icons/fa";
import { BsArrowUpRightSquare } from "react-icons/bs";
import FlipClock from "./Clock";

class Pop extends React.Component {
  constructor(props) {
    super(props);
    this.popout = this.popout.bind(this);
    this.popoutClosed = this.popoutClosed.bind(this);
    this.state = { isPoppedOut: false };
  }

  popout() {
    this.setState({ isPoppedOut: true });
  }

  popoutClosed() {
    this.setState({ isPoppedOut: false });
  }

  render() {
    if (this.state.isPoppedOut) {
      return (
        <Popout
          url="public/popup.html"
          title="test poppy"
          containerId="main"
          onClosing={this.popoutClosed}
        >
          <link
            rel="stylesheet"
            href={window.location.origin + "/public/css/popup.css"}
            crossOrigin="anonymous"
          />
          <div>Popped out content!</div>
          <FlipClock />
        </Popout>
      );
    } else {
      var popout = (
        <BsArrowUpRightSquare
          onClick={this.popout}
          className="buttonGlyphicon glyphicon glyphicon-export"
        />
      );
      return <div>{popout}</div>;
    }
  }
}

export default Pop;
