import React, { Component } from "react";
import { connect } from "react-redux";
import Lists from "./lists.jsx";
import { StyleSheet, css } from "aphrodite";
import AddList from "./addList.jsx";

const styles = StyleSheet.create({
  sideBySide: {
    display: "inline-block",
    verticalAlign: "top",
    position: "relative",
    whiteSpace: "nowrap"
  },
  listWrapper: {
    backgroundColor: "grey",
    margin: "10px",
    width: "272px",
    margin: "0 4px",
    boxSizing: "border-box",
    display: "inline-block",
    verticalAlign: "top",
    whiteSpace: "nowrap",
    borderRadius: "3px"
  }
});

class Container extends Component {
  render() {
    const { lists } = this.props;
    return (
      <div className={css(styles.sideBySide)}>
        <div className={css(styles.sideBySide)}>
          {lists.length > 0 && <Lists />}
        </div>
        <div className={css(styles.sideBySide)}>
          <AddList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { lists } = state;
  return {
    lists
  };
};

export default connect(mapStateToProps)(Container);
