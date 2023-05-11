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
  type: 'GET';
  payload: Issue[];
}

export interface GetIssuesErrorAction {
  type: 'ERROR';
  payload?: string;
}

export type GetIssuesAction = GetIssuesSuccessAction | GetIssuesErrorAction | RootState;

export interface defaultStateDragDrop {
  issues: Board[];
}

export interface DragDropState {
  currentBoard: Board | null;
  currentItem: Issue | null;
}
export interface RootState {
  apiGitHub: {
    issues: Board[];
  };
  dragDrop: {
    currentBoard: Board | null;
    currentItem: Issue | null;
    emptyCurrentItem: Issue | null;
  };
}
