var uniqid = require("uniqid");
export const ADD_LIST = "ADD_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const CLOSE_LIST_INPUT = "CLOSE_LIST_INPUT";

export const ADD_CARD = "ADD_CARD";
export const DELETE_CARD = "DELETE_CARD";

export const CHANGE_INPUT_PROGRESS_STATE = "CHANGE_INPUT_PROGRESS_STATE";

export const OPEN_CARD_INPUT = "OPEN_CARD_INPUT";
export const OPEN_CARD_POPUP = "OPEN_CARD_POPUP";
export const CLOSE_CARD_POPUP = "CLOSE_CARD_POPUP";
export const EDIT_CARD_NAME = "EDIT_CARD_NAME";
export const EDIT_CARD_DESCRIPTION = "EDIT_CARD_DESCRIPTION";
export const CLOSE_CARD_INPUT = "CLOSE_CARD_INPUT";

export const ADD_CHECKLIST_ITEM = "ADD_CHECKLIST_ITEM";
export const EDIT_CHECKLIST_ITEM = "EDIT_CHECKLIST_ITEM";
export const DELETE_CHECKLIST_ITEM = "DELETE_CHECKLIST_ITEM";
export const OPEN_CHECK_LIST_INPUT = "OPEN_CHECK_LIST_INPUT";
export const CLOSE_CHECK_LIST_INPUT = "CLOSE_CHECK_LIST_INPUT";
export function addList(list) {
  return {
    type: ADD_LIST,
    list
  };
}
export function deleteList(listId) {
  return {
    type: DELETE_LIST,
    listId
  };
}

export function addCard(card, { listId }) {
  return {
    type: ADD_CARD,
    card,
    listId
  };
}
export function deleteCard(cardId, listId) {
  return {
    type: DELETE_CARD,
    listId,
    cardId
  };
}
export function closeListInput() {
  return {
    type: CLOSE_LIST_INPUT
  };
}
export function closeCardInput(listId) {
  return {
    type: CLOSE_CARD_INPUT,
    listId
  };
}
export function changeInputState(value) {
  return {
    type: CHANGE_INPUT_PROGRESS_STATE,
    value
  };
}
export function changeCardInputState(listId) {
  return {
    type: OPEN_CARD_INPUT,
    listId
  };
}
export function openCheckListInput() {
  return {
    type: OPEN_CHECK_LIST_INPUT
  };
}
export function closeCheckListInput() {
  return {
    type: CLOSE_CHECK_LIST_INPUT
  };
}

export function openCardPopup(cardId, listId) {
  return {
    type: OPEN_CARD_POPUP,
    cardId,
    listId
  };
}
export function closeCardPopup() {
  return {
    type: CLOSE_CARD_POPUP
  };
}
export function editCardName(listId, cardId, newName) {
  return {
    type: EDIT_CARD_NAME,
    listId,
    cardId,
    newName
  };
}
export function editCardDescription(listId, cardId, newDescription) {
  return {
    type: EDIT_CARD_DESCRIPTION,
    listId,
    cardId,
    newDescription
  };
}

export function addchecklistItem(newItem, { listId, cardId }) {
  return {
    type: ADD_CHECKLIST_ITEM,
    listId,
    cardId,
    newItem
  };
}
export function editchecklistItem(listId, cardId, newValue) {
  return {
    type: EDIT_CHECKLIST_ITEM,
    listId,
    cardId,
    newValue
  };
}
export function deletechecklistItem(listId, cardId) {
  return {
    type: DELETE_CHECKLIST_ITEM,
    listId,
    cardId
  };
}

const intitialState = {
  lists: [],
  isListInputFinished: true,
  cardPopupOpened: false,
  selectedCardId: 0,
  selectedListId: 0,
  isCheckListInputOpened: false
};
export const lists = (state = intitialState, action) => {
  const { lists } = state;
  let list;
  switch (action.type) {
    case ADD_LIST:
      const newList = {
        id: uniqid(),
        name: action.list,
        isCardInputOpened: false
      };
      return {
        ...state,
        lists: [...lists, newList],
        isListInputFinished: true
      };
    case CLOSE_LIST_INPUT:
      return {
        ...state,
        isListInputFinished: true
      };
    case ADD_CARD:
      list = lists.find(l => l.id === action.listId);
      const card = {
        name: action.card,
        id: uniqid(),
        description: "",
        checkList: []
      };
      if (!list.cards) list.cards = [card];
      else list.cards = [...list.cards, card];
      return {
        ...state,
        lists: lists.map(l =>
          l.id === list.id
            ? Object.assign({}, list, { isCardInputOpened: false })
            : l
        )
      };
    case OPEN_CARD_INPUT:
      list = lists.find(l => l.id === action.listId);
      return {
        ...state,
        lists: lists.map(l =>
          l.id === list.id
            ? Object.assign({}, list, { isCardInputOpened: true })
            : l
        )
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: lists.filter(l => l.id !== action.listId)
      };
    case DELETE_CARD:
      return {
        ...state,
        cardPopupOpened: false,
        lists: lists.map(l => {
          if (l.id !== action.listId) return l;
          return Object.assign({}, l, {
            cards: l.cards.filter(card => card.id !== action.cardId)
          });
        })
      };
    case CHANGE_INPUT_PROGRESS_STATE:
      return {
        ...state,
        isListInputFinished: action.value
      };
    case OPEN_CARD_POPUP:
      return {
        ...state,
        cardPopupOpened: true,
        selectedCardId: action.cardId,
        selectedListId: action.listId
      };
    case CLOSE_CARD_POPUP:
      return {
        ...state,
        cardPopupOpened: false,
        selectedCardId: 0,
        selectedListId: 0,
        isCheckListInputOpened: false
      };
    case EDIT_CARD_NAME:
      return {
        ...state,
        lists: lists.map(l => {
          if (l.id === action.listId) {
            let cards = l.cards.map(c => {
              if (c.id === action.cardId)
                return Object.assign({}, c, { name: action.newName });
              return c;
            });
            return Object.assign({}, l, { cards });
          }
          return l;
        })
      };
    case EDIT_CARD_DESCRIPTION:
      return {
        ...state,
        lists: lists.map(l => {
          if (l.id === action.listId) {
            let cards = l.cards.map(c => {
              if (c.id === action.cardId) {
                return Object.assign({}, c, {
                  description: action.newDescription
                });
              } else return c;
            });
            return Object.assign({}, l, { cards });
          }
          return l;
        })
      };
    case CLOSE_CARD_INPUT:
      list = lists.find(l => l.id === action.listId);
      return {
        ...state,
        lists: lists.map(l =>
          l.id === list.id
            ? Object.assign({}, list, { isCardInputOpened: false })
            : l
        )
      };
    case ADD_CHECKLIST_ITEM:
      return {
        ...state,
        lists: lists.map(l => {
          if (l.id === action.listId) {
            let cards = l.cards.map(c => {
              if (c.id === action.cardId) {
                let card = Object.assign({}, c);
                card.checkList = [
                  ...card.checkList,
                  Object.assign({
                    id: uniqid(),
                    name: action.newItem
                  })
                ];
                return card;
              }
              return c;
            });
            return Object.assign({}, l, { cards });
          }
          return l;
        })
      };
    case EDIT_CHECKLIST_ITEM:
      return {
        ...state,
        lists: lists.map(l => {
          if (l.id === action.listId) {
            let cards = l.cards.map(c => {
              if (c.id === action.cardId) {
                let card = Object.assign({}, c);
                card.checkList = card.checkList.map(cle => {
                  if (cle.id === action.checkListItemId) {
                  }
                });
                return card;
              }
              return c;
            });
            return Object.assign({}, l, { cards });
          }
          return l;
        })
      };
    case DELETE_CHECKLIST_ITEM:
      return {
        ...state,
        lists: lists.map(l => {
          if (l.id === action.listId) {
            let cards = l.cards.map(c => {
              if (c.id === action.cardId)
                return Object.assign({}, c, {
                  description: action.newDescription
                });
              return c;
            });
            return Object.assign({}, l, { cards });
          }
          return l;
        })
      };
    case CLOSE_CHECK_LIST_INPUT:
      return {
        ...state,
        isCheckListInputOpened: false
      };
    case OPEN_CHECK_LIST_INPUT:
      return {
        ...state,
        isCheckListInputOpened: true
      };
    default:
      return state;
  }
};
