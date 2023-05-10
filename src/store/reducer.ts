import { GetIssuesAction, Issue, Board, ReorderIssuesAction, defaultStateDragDrop } from '@/interface/interface';
import axios from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ERROR, GET, REORDER_ISSUES } from './actionTypes';

const todoBoard: Board = { id: 1, title: 'ToDo', items: [] };
const inProgressBoard: Board = { id: 2, title: 'In Progress', items: [] };
const doneBoard: Board = { id: 3, title: 'Done', items: [] };

const defaultStateApiGitHub: Board[] = [todoBoard, inProgressBoard, doneBoard];

export const reducerApiGitHub = (state = defaultStateApiGitHub, action: GetIssuesAction) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        issues: [
          { ...todoBoard, items: action.payload },
          inProgressBoard,
          doneBoard,
        ],
      };
    case ERROR:
      return { ...state, error: 'ERROR' };
    default:
      return state;
  }
}

interface DragDropState {
  currentBoard: Board | null;
  currentItem: Issue | null;
}

const defaultState: DragDropState = {
  currentBoard: null,
  currentItem: null,
};

export const reducerDragDrop = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        currentBoard: action.payload.currentBoardStart,
        currentItem: action.payload.currentItemStart,
      };
    case 'DROP':
      const { currentBoard, currentItem: dropCurrentItem } = state;
      const { targetBoard: dropTargetBoard, targetIndex: dropTargetIndex } = action.payload;
      if (!currentBoard || !dropCurrentItem || !dropTargetBoard) {
        return state;
      }
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
    case 'DROP_EMPTY':
      const { currentBoard: emptyCurrentBoard, currentItem: emptyCurrentItem } = state;
      const { targetBoard: emptyTargetBoard, targetIndex: emptyTargetIndex } = action.payload;
      if (!emptyCurrentItem || !emptyTargetBoard) {
        return state;
      }

      emptyTargetBoard.items.splice(emptyTargetIndex, 0, emptyCurrentItem);
      return {
        ...state,
        currentBoard: null,
        emptyCurrentItem: null,
      };
    default:
      return state;
  }
}




export const getIssuesCreator = (url: string) => async (dispatch: Dispatch<GetIssuesAction>) => {
  try {
    const response = await axios.get<Issue[]>(`https://api.github.com/repos/${url}/issues`);
    dispatch({
      type: 'GET',
      payload: response.data
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: 'ERROR'
    });
  };
}
