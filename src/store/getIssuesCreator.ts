import axios from 'axios';
import { Dispatch } from 'redux';

import { GetIssuesAction, Issue } from '@/interface/interface';

export const getIssuesCreator = (url: string) => async (dispatch: Dispatch<GetIssuesAction>) => {
  try {
    const response = await axios.get<Issue[]>(`https://api.github.com/repos/${url}/issues`);
    dispatch({
      type: 'GET',
      payload: response.data,
    });
  } catch (err) {
    throw new Error('error getting issues');
  }
};
