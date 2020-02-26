import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import List from "./list.jsx";
import equal from "fast-deep-equal";

const styles = StyleSheet.create({
  sideBySide: {
    display: "inline-block",
    verticalAlign: "top"
  },
  container: {
    overflowX: "none",
    whiteSpace: "nowrap"
  }
});

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateLists: []
    };
  }
  static getDerivedStateFromProps(props, state) {
    const { lists } = props;
    const { stateLists } = state;
    if (!equal(lists, stateLists)) return { stateLists: lists };
    return null;
  }

  render() {
    const { stateLists } = this.state;
    console.log("lists1", stateLists);
    return (
      <div className={css(styles.container)}>
        {stateLists.map(e => (
          <List data={e} key={e.id} />
        ))}
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

export default connect(mapStateToProps)(Lists);
