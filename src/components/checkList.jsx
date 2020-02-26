import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import {
  addchecklistItem,
  openCheckListInput,
  closeCheckListInput
} from "../store/lists";
import CheckListItem from "./checkListItem.jsx";
import TextField from "./textField.jsx";
const styles = StyleSheet.create({
  addText: {
    color: "#fff",
    padding: "6px 8px"
  },
  addButton: {
    width: "100%",
    cursor: "pointer",
    borderRadius: "3px",
    color: "#5e6c84",
    display: "block",
    flex: "1 0 auto",
    margin: "2px 0 8px 8px",
    padding: "4px 8px",
    position: "relative",
    textDecoration: "none"
  },
  inputWidth: {
    width: "95%",
    margin: "auto"
  },
  cardInput: {
    backgroundColor: "#fff",
    borderRadius: "3px",
    boxShadow: "0 1px 0 rgba(9,30,66,.25)",
    display: "block",
    margin: "auto",
    marginBottom: "8px",
    maxWidth: "300px",
    minHeight: "20px",
    position: "relative",
    textDecoration: "none",
    zIndex: 0,
    width: "100%",
    padding: "8px 12px",
    right: "126"
  },
  checkList: {
    flex: "1 1 auto",
    marginBottom: 0,
    overflowY: "auto",
    overflowX: "hidden",
    margin: "0 4px",
    padding: "0 4px",
    zIndex: 1,
    minHeight: 0
  }
});
class checkList extends Component {
  render() {
    const {
      checkList,
      listId,
      cardId,
      dispatch,
      isCheckListInputOpened
    } = this.props;

    return (
      <div>
        {checkList && checkList.length > 0 && (
          <div className={css(styles.checkList)}>
            {checkList.map(item => (
              <CheckListItem data={item} />
            ))}
          </div>
        )}
        {!isCheckListInputOpened && (
          <a className={css(styles.addButton)}>
            <span
              className={css(styles.addText, styles.addButton)}
              onClick={() => dispatch(openCheckListInput())}
            >
              + Add an Item
            </span>
          </a>
        )}
        {isCheckListInputOpened && (
          <div className={css(styles.inputWidth)}>
            <TextField
              placeHolder="checklist Item"
              label="add item"
              actionAdditionalArgs={{
                cardId: cardId,
                listId
              }}
              closeAction={closeCheckListInput}
              action={addchecklistItem}
              inputStyle={css(styles.cardInput)}
            />
          </div>
        )}
      </div>
    );
  }
}

export default connect()(checkList);
