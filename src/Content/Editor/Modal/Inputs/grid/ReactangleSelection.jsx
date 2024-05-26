// -----------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------  React Rectangle Selection Library by Rémi Gallego https://github.com/remigallego ---------------------------------------
//--------------------------------https://www.npmjs.com/package/react-rectangle-selection --------------------------------------------------------
//-------------------------------https://github.com/remigallego/react-rectangle-selection  -------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------added: ⭐ originID/targetID states that return start/ end IDs of elements  ----------------------------------------
// ----------------------------------🌟 fix size of the selection rectangle based on direction + other css chagnges -----------------------------
//---------------------------------- 🎇 propTypes -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------------------------

import React from "react";

// -------------- 🎇 --------------
import PropTypes from "prop-types";
// ---------------------------------

//----- removed import css --------

export default class ReactangleSelection extends React.Component {
  constructor(props) {
    super(props);
    this.animationInProgress = null;
    this.state = {
      // -------------- ⭐ --------------
      originID: "",
      targetID: "",
      // ---------------------------------
      hold: false,
      selectionBox: false,
      selectionBoxOrigin: [0, 0],
      selectionBoxTarget: [0, 0],
      animation: "",
    };
  }

  // -------------- 🎇 --------------
  static propTypes = {
    onMouseUp: PropTypes.func,
    disabled: PropTypes.string,
    doubleClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onSelect: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.array,
  };
  // ---------------------------------

  handleTransformBox() {
    const { selectionBoxOrigin, selectionBoxTarget } = this.state;
    if (
      selectionBoxOrigin[1] > selectionBoxTarget[1] &&
      selectionBoxOrigin[0] > selectionBoxTarget[0]
    )
      return "scaleY(-1) scaleX(-1)";

    if (selectionBoxOrigin[1] > selectionBoxTarget[1]) return "scaleY(-1)";
    if (selectionBoxOrigin[0] > selectionBoxTarget[0]) return "scaleX(-1)";
    return null;
  }

  closeSelectionBox() {
    if (this.props.onMouseUp) this.props.onMouseUp();
    this.setState({
      hold: false,
      animation: "react-rectangle-selection--fadeout",
    });
    this.animationInProgress = setTimeout(() => {
      this.setState({ animation: "" });
      this.setState({ selectionBox: false });
      this.animationInProgress = null;
    }, 300);
  }

  handleMouseDown(e) {
    if (this.props.disabled) return;

    clearTimeout(this.animationInProgress);
    this.animationInProgress = null;
    this.setState({ selectionBox: false, animation: "" });

    if (this.state.animation.length > 0 && e.target.id === "react-rectangle-selection") {
      this.setState({ selectionBox: false, animation: "" });
    }

    this.setState({
      hold: true,

      // -------------- ⭐ --------------
      originID: e.target.id,
      targetID: e.target.id,
      // ---------------------------------

      selectionBoxOrigin: [e.nativeEvent.pageX, e.nativeEvent.pageY],
      selectionBoxTarget: [e.nativeEvent.pageX, e.nativeEvent.pageY],
    });
  }

  render() {
    // -------------- 🌟 --------------
    let num = -1;
    if (
      this.state.selectionBoxOrigin[0] > this.state.selectionBoxTarget[0] &&
      this.state.selectionBoxOrigin[1] > this.state.selectionBoxTarget[1]
    ) {
      num = 5;
    }

    // ---------------------------------

    const baseStyle = {
      // -------------- 🌟 --------------
      position: "absolute",
      zIndex: 300,
      top: this.state.selectionBoxOrigin[1] - document.documentElement.scrollTop,
      // ---------------------------------

      left: this.state.selectionBoxOrigin[0],

      height: Math.abs(
        this.state.selectionBoxTarget[1] - this.state.selectionBoxOrigin[1] + num //⭐ num
      ),
      width: Math.abs(
        this.state.selectionBoxTarget[0] - this.state.selectionBoxOrigin[0] + num //⭐ num
      ),
      userSelect: "none",
      transformOrigin: "top left",
      transform: this.handleTransformBox(),
    };

    return (
      <div
        style={{ height: "inherit", width: "inherit" }}
        onMouseLeave={() => {
          this.closeSelectionBox();
        }}
        onMouseDown={(e) => this.handleMouseDown(e)}
        onMouseUp={() => {
          this.closeSelectionBox();
        }}
        onMouseMove={(evt) => {
          if (this.state.hold && !this.state.selectionBox) {
            if (this.props.onMouseDown) this.props.onMouseDown();
            this.setState({ selectionBox: true });
          }
          if (this.state.selectionBox && !this.animationInProgress) {
            this.setState({
              selectionBoxTarget: [evt.nativeEvent.pageX, evt.nativeEvent.pageY],
              // -------------- ⭐ --------------
              targetID: evt.target.id,
              // ---------------------------------
            });

            this.props.onSelect(evt, {
              origin: this.state.selectionBoxOrigin,
              target: this.state.selectionBoxTarget,
              // -------------- ⭐ --------------
              originID: this.state.originID,
              targetID: this.state.targetID,
              // ---------------------------------
            });
          }
        }}
      >
        {this.state.selectionBox && (
          <div
            className={`react-rectangle-selection ${this.state.animation}`}
            id={"react-rectangle-selection"}
            style={Object.assign(baseStyle, this.props.style)}
          />
        )}
        {this.props.children}
      </div>
    );
  }
}
