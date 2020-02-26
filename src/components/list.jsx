import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import { addCard } from "../store/lists.js";
import Card from "./card.jsx";
import TextField from "./textField.jsx";
import { connect } from "react-redux";
import {
  deleteList,
  changeCardInputState,
  closeCardInput
} from "../store/lists";

const styles = StyleSheet.create({
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
  },
  list: {
    backgroundColor: "#ebecf0",
    borderRadius: "3px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    whiteSpace: "normal"
  },
  sideBySide: {
    display: "inline-block",
    verticalAlign: "top",
    position: "relative",
    whiteSpace: "nowrap"
  },
  cardsList: {
    flex: "1 1 auto",
    marginBottom: 0,
    overflowY: "auto",
    overflowX: "hidden",
    margin: "0 4px",
    padding: "0 4px",
    zIndex: 1,
    minHeight: 0
  },
  listHeader: {
    flex: " 0 0 auto",
    padding: "10px 8px",
    position: "relative",
    minHeight: "20px"
  },
  headerName: {
    background: "transparent",
    boxShadow: "none",
    fontWeight: "600",
    margin: "-4px 0",
    minHeight: "20px",
    padding: " 4px 8px",
    resize: "none",
    maxHeight: "256px",
    overflow: "hidden",
    overflowWrap: "break-word",
    height: "28px",
    border: "none",
    display: "block",
    lineHeight: "20px"
  },
  toTheLeft: {
    position: "absolute",
    right: "4px",
    top: "4px",
    zIndex: 0,
    padding: "6px"
  },
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
    padding: "8px 12px"
  }
});

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false
    };
  }
  toggleInput() {
    const { inputVisible } = this.state;
    const { dispatch, data } = this.props;
    this.setState({
      inputVisible: !inputVisible
    });
    dispatch(changeCardInputState(data.id));
  }
  render() {
    const { data, dispatch } = this.props;
    return (
      <div className={css(styles.listWrapper)}>
        <div className={css(styles.list)} key={data.id}>
          <div className={css(styles.listHeader, styles.sideBySide)}>
            <textarea className={css(styles.headerName)}>{data.name}</textarea>
            <a
              className={css(styles.toTheLeft)}
              onClick={e => {
                e.preventDefault();
                dispatch(deleteList(data.id));
              }}
            >
              X
            </a>
          </div>
          <div>
            {data.cards && (
              <div className={css(styles.cardsList)}>
                {data.cards.map(card => (
                  <Card listId={data.id} data={card} key={card.id} />
                ))}
              </div>
            )}
            {!data.isCardInputOpened && (
              <a
                className={css(styles.addButton)}
                onClick={this.toggleInput.bind(this)}
              >
                <span className={css(styles.addText, styles.addButton)}>
                  + Add a card
                </span>
              </a>
            )}
            {data.isCardInputOpened && (
              <div className={css(styles.inputWidth)}>
                <TextField
                  placeHolder="Enter a title for this card…"
                  label="add Card"
                  actionAdditionalArgs={{ listId: data.id }}
                  action={addCard}
                  closeAction={closeCardInput}
                  inputStyle={css(styles.cardInput)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(List);
