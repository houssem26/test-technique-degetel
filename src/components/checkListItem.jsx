import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  item: {
    color: "#172b4d",
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "400"
  },
  itemName: {
    clear: "both",
    paddingLeft: "8px",
    position: "relative",
    borderRadius: "3px",
    transformOrigin: "left bottom",
    paddingTop: "5px"
  },
  row: {
    left: "-10px",
    position: "relative",
    display: "flex"
  },
  checkBox: {
    borderRadius: "2px",
    boxSizing: "border-box",
    lineHeight: "18px",
    overflow: "hidden",
    textIndent: "100%",
    height: "18px",
    width: "18px",
    whiteSpace: "nowrap",
    backgroundColor: "#fafbfc",
    boxShadow: "inset 0 0 0 2px #dfe1e6",
    margin: "6px",
    textAlign: "center"
  }
});
export default class checkListItem extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className={css(styles.row)}>
        <div>
          <input className={css(styles.checkBox)} type="checkbox" />
        </div>
        <div className={css(styles.itemName)}>{data.name}</div>
      </div>
    );
  }
}
