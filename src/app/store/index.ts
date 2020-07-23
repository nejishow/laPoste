
import {createFeatureSelector, createSelector, ActionReducerMap} from "@ngrx/store";
import * as fromClient from './reducers/client.reducer'

export interface State {
  clientFeature: fromClient.ClientState;
}
export const clientReducers: ActionReducerMap<State> = {
  clientFeature: fromClient.ClientReducer,
};

const getClientFeatureState =createFeatureSelector<fromClient.ClientState>('clientFeature')

export const getClients = createSelector(
  getClientFeatureState,
  state => {
    return state.clients
  }
);

export const getLoaded = createSelector(
  getClientFeatureState,
  state => {
    return state.loaded
  }
);
