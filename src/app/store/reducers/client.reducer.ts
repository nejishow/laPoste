import { ClientActions, ClientActionTypes } from "../actions/clients.action";
interface Client {
  id: string | null;
  name: string;
  address: string;
  number: number;
  email: string;
  idClientType: string;
  idBoite: string;
  
}

export interface ClientState {
  clients: Client[],
  loaded: boolean;
  error: string
}

const initialState: ClientState = {
  clients: [],
  loaded: false,
  error: ''
};


export function ClientReducer(state = initialState, action: ClientActions): ClientState {
  switch (action.type) {
case ClientActionTypes.LoadSuccess:
  return {
    ...state,
    clients: [...action.payload],
    loaded: true,
    error: ''
  }
    default:
      return state
  }
}


