import {Action} from "@ngrx/store";

interface Client {
    id: string | null;
    name: string;
    address: string;
    number: number;
    email: string;
    idClientType: string;
    idBoite: string;
    
  }

export enum ClientActionTypes {
  Load = '[Client] Load',
  LoadSuccess = '[Client] Load Success',
  LoadFail = '[Client] Load Fail',
}


export class Load implements Action {
  readonly type = ClientActionTypes.Load;

  constructor() { }
}

export class LoadSuccess implements Action {
  readonly type = ClientActionTypes.LoadSuccess;

  constructor(public payload: Client[]) { }
}

export class LoadFail implements Action {
  readonly type = ClientActionTypes.LoadFail;

  constructor(public payload: string) {
  }

}

// Union the valid types
export type ClientActions = Load
  | LoadSuccess
  | LoadFail

