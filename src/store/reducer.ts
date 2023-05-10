import { GetIssuesAction, Issue, Board } from '@/interface/interface';
import axios from 'axios';
import { Dispatch } from 'redux';

const todoBoard: Board = { id: 1, title: 'ToDo', items: [] };
const inProgressBoard: Board = { id: 2, title: 'In Progress', items: [] };
const doneBoard: Board = { id: 3, title: 'Done', items: [] };

const defaultState: Board[] = [todoBoard, inProgressBoard, doneBoard];

const reducer = (state = defaultState, action: GetIssuesAction) => {
  switch (action.type) {
    case 'GET':
      return {
        ...state,
        issues: [
          { ...todoBoard, items: action.payload },
          inProgressBoard,
          doneBoard,
        ],
      };
    case 'ERROR':
      return { ...state, error: 'ERROR' };
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

export default reducer;
