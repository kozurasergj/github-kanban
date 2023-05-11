import { AnyAction } from 'redux';

import { DragDropState } from '@/interface/interface';

import { DROP, DROP_EMPTY, START } from './actionTypes';

const defaultState: DragDropState = {
  currentBoard: null,
  currentItem: null,
};

export const reducerDragDrop = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case START:
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        currentBoard: action.payload.currentBoardStart,
        currentItem: action.payload.currentItemStart,
      };
    case DROP:
      // eslint-disable-next-line no-case-declarations
      const { currentBoard, currentItem: dropCurrentItem } = state;
      // eslint-disable-next-line no-case-declarations
      const { targetBoard: dropTargetBoard, targetIndex: dropTargetIndex } = action.payload;
      if (!currentBoard || !dropCurrentItem || !dropTargetBoard) {
        return state;
      }
      // eslint-disable-next-line no-case-declarations
      const currentIndex = currentBoard.items.indexOf(dropCurrentItem);
      if (currentIndex === -1) {
        return state;
      }
      currentBoard.items.splice(currentIndex, 1);
      dropTargetBoard.items.splice(dropTargetIndex, 0, dropCurrentItem);
      return {
        ...state,
        dropCurrentItem: null,
        currentItem: null,
      };
    case DROP_EMPTY:
      // eslint-disable-next-line no-case-declarations
      const { currentBoard: emptyCurrentBoard, currentItem: emptyCurrentItem } = state;
      // eslint-disable-next-line no-case-declarations
      const { targetBoard: emptyTargetBoard, targetIndex: emptyTargetIndex } = action.payload;
      if (!emptyCurrentItem || !emptyTargetBoard || !emptyCurrentBoard) {
        return state;
      }
      // eslint-disable-next-line no-case-declarations
      const currentIndex1 = emptyCurrentBoard.items.indexOf(emptyCurrentItem);
      emptyCurrentBoard.items.splice(currentIndex1, 1);
      emptyTargetBoard.items.splice(emptyTargetIndex, 0, emptyCurrentItem);
      return {
        ...state,
        currentBoard: null,
        emptyCurrentItem: null,
      };
    default:
      return state;
  }
};
