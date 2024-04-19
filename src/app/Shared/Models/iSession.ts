export interface ISession {
  userId:string;
  roomId: string;
  socketId:string;
  isObserver: boolean;
  username: string;
  isOnline:boolean;
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
  userId:string;
  roomId: string;
  socketId:string;
  username: string;
  storyPoint: number;
}

export interface IAllUsersWithSP{
  userId:string;
  roomId: string;
  socketId:string;
  isObserver: boolean;
  isOnline:boolean;
  username: string;
  storyPoint:number;
}