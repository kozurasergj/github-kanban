export interface Issue {
  id: number;
  title: string;
  number: number;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  html_url: string;
  body: string;
}

export interface Board {
  id: number;
  title: string;
  items: Issue[];
}

export interface GetIssuesSuccessAction {
  type: 'GET',
  payload: Issue[]
}

export interface GetIssuesErrorAction {
  type: 'ERROR',
  payload?: string
}

export type GetIssuesAction = GetIssuesSuccessAction | GetIssuesErrorAction;
