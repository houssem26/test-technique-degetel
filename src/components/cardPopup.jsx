import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import autosize from "autosize";
import {
  closeCardPopup,
  editCardName,
  editCardDescription
} from "../store/lists";
import CheckList from "./checkList.jsx";
const styles = StyleSheet.create({
  closeButton: {
    color: "#42526e",
    borderRadius: "50%",
    position: "absolute",
    top: "0",
    right: "0",
    height: "32px",
    overflow: "hidden",
    padding: "4px",
    marginTop: "20px",
    width: "32px",
    zIndex: "2",
    cursor: "pointer"
  },
  title: {
    padding: "8px 0 0",
    display: "block",
    color: "#172b4d",
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
    /* fontSize: '14px',
        lineHeight: '20px',
        fontWeight: '400',*/

    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "24px",
    minHeight: "24px",
    padding: "4px 8px"
  },
  firstTitleMargin: {
    marginLeft: "8px",
    marginRight: "8px"
  },
  secondaryTitle: {
    fontSize: "16px",
    lineHeight: "20px"
  },
  textArea: {
    width: "100%",
    overflow: "hidden",
    border: "none",
    overflowWrap: "break-word",
    background: "transparent",
    borderRadius: "3px",
    boxShadow: "none",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "24px",
    minHeight: "24px",
    padding: "4px 8px",
    resize: "none",
    width: "100%"
  },
  titleHeight: {
    height: "32px"
  },
  popupBody: {
    float: "none",
    maxHeight: "none",
    padding: "8px",
    maxWidth: "none",
    minWidth: "0",
    width: "100%",
    float: "left",
    marginTop: "16px",
    overflowX: "hidden",
    overflowY: "auto",
    minHeight: "24px",
    padding: "0 8px 8px 16px",
    position: "relative",
    width: "552px",
    zIndex: 0
  },
  marginTop: {
    marginTop: "16px"
  },
  description: {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "400",
    width: "100%"
  }
});
class cardPopup extends Component {
  componentDidMount() {
    this.textarea.focus();
    autosize(this.textarea);
  }
  handleNameBlur(event) {
    const { selectedListId, card, dispatch } = this.props;
    if (event.target.value !== "")
      dispatch(editCardName(selectedListId, card.id, event.target.value));
  }
  handleDescriptionBlur(event) {
    const { selectedListId, card, dispatch } = this.props;
    console.log("fromhandle", selectedListId, card);
    if (event.target.value !== "")
      dispatch(
        editCardDescription(selectedListId, card.id, event.target.value)
      );
  }
  render() {
    const {
      dispatch,
      card,
      selectedListId,
      isCheckListInputOpened
    } = this.props;
    return (
      <div>
        <div className={css(styles.title, styles.firstTitleMargin)}>
          <textarea
            className={css(styles.textArea, styles.titleHeight)}
            onBlur={this.handleNameBlur.bind(this)}
          >
            {card ? card.name : ''}
          </textarea>
        </div>
        <span
          className={css(styles.closeButton)}
          onClick={() => dispatch(closeCardPopup())}
        >
          X
        </span>
        <div className={css(styles.popupBody)}>
          <div className={css(styles.title, styles.secondaryTitle)} rows="20">
            Description
          </div>
          <div>
            <textarea
              ref={c => (this.textarea = c)}
              placeholder="add description here"
              className={css(styles.description)}
              onBlur={this.handleDescriptionBlur.bind(this)}
            >
              {card ? card.description : ''}
            </textarea>
          </div>
          <div
            className={css(
              styles.title,
              styles.marginTop,
              styles.secondaryTitle
            )}
          >
            Checklist
          </div>
          <CheckList
            isCheckListInputOpened={isCheckListInputOpened}
            checkList={card ? card.checkList : []}
            cardId={card ? card.id : 0}
            listId={selectedListId}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    selectedCardId,
    lists,
    selectedListId,
    isCheckListInputOpened
  } = state;
  const list = lists.find(l => l.id === selectedListId);
  const card = list ? list.cards.find(c => c.id === selectedCardId) : null;
  return {
    card,
    selectedListId,
    isCheckListInputOpened
  };
};
export default connect(mapStateToProps)(cardPopup);
