import React, { Component } from "react";
import { changeInputState, addList, closeListInput } from "../store/lists.js";
import { connect } from "react-redux";
import TextField from "./textField.jsx";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  listWrapper: {
    backgroundColor: "hsla(0,0%,100%,.24)",
    cursor: "pointer",
    borderRadius: "3px",
    height: "auto",
    minHeight: "32px",
    padding: "4px",
    transition:
      "background 85ms ease-in,opacity 40ms ease-in,border-color 85ms ease-in",
    width: "272px",
    margin: "0 4px",
    boxSizing: "border-box",
    display: "inline-block",
    verticalAlign: "top",
    whiteSpace: "nowrap"
  },
  add: {
    backgroundColor: "hsla(0,0%,100%,.24)",
    cursor: "pointer"
  },
  placeholder: {
    display: "block"
  },
  addText: {
    color: "#fff",
    padding: "6px 8px"
  },
  addButton: {
    width: "100%",
    cursor: "pointer"
  }
});

class AddList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false
    };
  }
  toggleInput() {
    const { inputVisible } = this.state;
    const { dispatch, isListInputFinished } = this.props;
    this.setState({
      inputVisible: !inputVisible
    });
    dispatch(changeInputState(!isListInputFinished));
  }
  static getDerivedStateFromProps(props, state) {
    const { isListInputFinished } = props;
    const { inputVisible } = state;
    if (isListInputFinished && inputVisible) {
      return {
        inputVisible: false
      };
    }
    return null;
  }
  render() {
    const { inputVisible } = this.state;
    return (
      <div className={css(styles.listWrapper)}>
        {!inputVisible && (
          <a
            className={css(styles.addButton)}
            onClick={this.toggleInput.bind(this)}
          >
            <span className={css(styles.addText, styles.addButton)}>
              + Add another List
            </span>
          </a>
        )}
        {inputVisible && (
          <div>
            <TextField
              placeHolder="Enter list title..."
              label="Add list"
              action={addList}
              closeAction={closeListInput}
            />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { isListInputFinished } = state;
  return {
    isListInputFinished
  };
};

export default connect(mapStateToProps)(AddList);
