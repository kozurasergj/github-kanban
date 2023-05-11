import { Board, GetIssuesAction } from '@/interface/interface';

import { GET } from './actionTypes';

const todoBoard: Board = { id: 1, title: 'ToDo', items: [] };
const inProgressBoard: Board = { id: 2, title: 'In Progress', items: [] };
const doneBoard: Board = { id: 3, title: 'Done', items: [] };

const defaultStateApiGitHub: Board[] = [todoBoard, inProgressBoard, doneBoard];

export const reducerApiGitHub = (state = defaultStateApiGitHub, action: GetIssuesAction) => {
  switch (action.type) {
    case GET:
      return {
        ...state,
        issues: [{ ...todoBoard, items: action.payload }, inProgressBoard, doneBoard],
      };
    default:
      return state;
  }
};
