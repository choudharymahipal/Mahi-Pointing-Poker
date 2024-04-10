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
  averagePoint:number
}

export interface IEstimation {
  roomId: string;
  username: string;
  storyPoint: number;
}

export interface IAllUsersWithSP{
  roomId: string;
  isObserver: boolean;
  username: string;
  storyPoint:number;
}