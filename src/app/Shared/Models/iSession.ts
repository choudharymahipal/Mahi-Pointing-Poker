export interface ISession {
  roomId: string;
  isObserver: boolean;
  username: string;
}

export interface IStoryDescription {
  roomId: string;
  storyDescription: string;
}

export interface IShowHide {
  roomId: string;
  isShow: boolean;
}
