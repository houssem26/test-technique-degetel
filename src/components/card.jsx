import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import { deleteCard, openCardPopup } from "../store/lists";
import Modal from "react-modal";
import CardPopup from "./cardPopup.jsx";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: "3px",
    boxShadow: " 0 1px 0 rgba(9,30,66,.25)",
    cursor: "pointer",
    display: "block",
    marginBottom: "8px",
    maxWidth: "300px",
    minHeight: "20px",
    position: "relative",
    textDecoration: "none",
    zIndex: "0",
    color: "#172b4d"
  },
  cardTitle: {
    clear: "both",
    display: "block",
    margin: "0 0 4px",
    overflow: "hidden",
    textDecoration: "none",
    wordWrap: "break-word",
    color: "#172b4d",
    padding: "6px 8px 2px",
    position: "relative",
    zIndex: 10
  },
  toTheLeft: {
    position: "absolute",
    right: "4px",
    top: "4px",
    zIndex: 10,
    paddingLeft: "6px",
    paddingRight: "6px",
  },
});
const customStyles = {
  content: {
    width: "768px",
    margin: "auto"
  }
};

Modal.setAppElement("#root");
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }
  render() {
    const { data, listId, dispatch, cardPopupOpened } = this.props;
    return (
      <div>
        <Modal isOpen={cardPopupOpened} style={customStyles}>
          <CardPopup />
        </Modal>
        <a
          className={css(styles.card)}
          onClick={() => dispatch(openCardPopup(data.id, listId))}
        >
          <span className={css(styles.cardTitle)}>{data.name}</span>
          <a
              className={css(styles.toTheLeft)}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(deleteCard(data.id, listId));
              }}
            >
              X
            </a>
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cardPopupOpened: state.cardPopupOpened
  };
};

export default connect(mapStateToProps)(Card);
