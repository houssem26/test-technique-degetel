import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  input: {
    margin: "auto",
    width: "100%",
    display: "block",
    padding: "8px 12px"
  },
  addListControls: {
    height: "32px",
    transition: "margin 85ms ease-in,height 85ms ease-in",
    overflow: "hidden",
    margin: "4px 0 0"
  },
  submitButton: {
    backgroundColor: "#5aac44",
    boxShadow: "none",
    border: "none",
    color: "#fff",
    width: "30%",
    float: "left",
    minHeight: "32px",
    height: "32px",
    marginTop: "0",
    paddingTop: "4px",
    paddingBottom: "4px",
    borderRadius: "3px"
  },
  closeButton: {
    height: "32px",
    lineHeight: "32px",
    width: "32px",
    fontSize: "24px",
    marginLeft: "8px",
    backgroundColor: "transparent",
    border: "none"
  }
});
class TextField extends Component {
  render() {
    const {
      dispatch,
      label,
      action,
      closeAction,
      actionAdditionalArgs,
      placeHolder,
      inputStyle
    } = this.props;
    let input;
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }
            if (actionAdditionalArgs)
              dispatch(action(input.value, actionAdditionalArgs));
            else dispatch(action(input.value));
            input.value = "";
          }}
        >
          <div>
            <input
              className={inputStyle ? inputStyle : css(styles.input)}
              ref={node => {
                input = node;
              }}
              placeholder={placeHolder}
            />
            <div className={css(styles.addListControls)}>
              <input
                className={css(styles.submitButton)}
                type="submit"
                value={label}
              />
              <input
                className={css(styles.closeButton)}
                type="button"
                onClick={e =>
                  dispatch(
                    closeAction(
                      actionAdditionalArgs ? actionAdditionalArgs.listId : null
                    )
                  )
                }
                value="X"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(TextField);
