const dbLibrary = require("./kindaDatabaseService");

module.exports = {
  addList: async newList => {
    try {
      const savedList = await dbLibrary.insertList(newList);
      savedList.cards = [];
      return { status: 200, data: savedList };
    } catch (e) {
      return { status: 500, error: "Database error" };
    }
  },
  getAllListsFromBoard: async () => {
    try {
      const lists = await dbLibrary.selectAllLists();
      const listsWithCards = await Promise.all(
        lists.map(async list => {
          return {
            ...list,
            cards: await dbLibrary.selectCardsByList(list.id)
          };
        })
      );
      return { status: 200, data: listsWithCards };
    } catch (e) {
      return { status: 500, error: e };
    }
  },
  updateList: async (id, listData) => {
    try {
      listData.id = id;
      const updatedList = await dbLibrary.updateList(listData);
      return { status: 200, data: updatedList };
    } catch (e) {
      return { status: 500, error: "Database error" };
    }
  },
  deleteList: async id => {
    try {
      await dbLibrary.deleteList(id);
      return { status: 200 };
    } catch (e) {
      return { status: 500, error: "Database error" };
    }
  },
  addCard: async cardInfo => {
    try {
      const newCard = {
        ...cardInfo,
        name: `Task ${(await dbLibrary.selectCardsCount()) + 1}`
      };
      const savedCard = await dbLibrary.insertCard(newCard);
      return { status: 200, data: savedCard };
    } catch (e) {
      return { status: 500, error: "Database error" };
    }
  },
  updateCard: async (idCard, cardData) => {
    try {
      cardData.id = idCard;
      const updatedCard = await dbLibrary.updateCard(cardData);
      return { status: 200, data: updatedCard };
    } catch (e) {
      return { status: 500, error: "Database error" };
    }
  },
  deleteCard: async id => {
    try {
      await dbLibrary.deleteCard(id);
      return { status: 200 };
    } catch (e) {
      return { status: 500, error: "Database error" };
    }
  }
};
