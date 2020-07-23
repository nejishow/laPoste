import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import {
  catchError,
  map,
  switchMap,
  withLatestFrom,
  mergeMap,
} from "rxjs/operators";

import { Action, Store, select } from "@ngrx/store";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import * as fromClient from "../index";
import * as clientAction from "../actions/clients.action";
import { of } from "rxjs/internal/observable/of";
import { empty } from "rxjs/internal/observable/empty";
import { ClientsService } from "src/app/services/clients.service";

@Injectable()
export class ClientEffect {
  constructor(
    private clientService: ClientsService,
    private action$: Actions,
    private store: Store<any>
  ) {}

  @Effect()
  loadClients$: Observable<Action> = 
    this.action$.pipe(
      ofType("[Movies Page] Load Movies"),
      mergeMap(() =>
        this.clientService.getClients().pipe(
          map((clients) => ({ type: "[Client] Load", payload: clients })),
          catchError(() => of({ type: "[Client] Load Fail" }))
        )
      )
    )
//   loadClients$: Observable<Action> = this.action$.pipe(
//     ofType(clientAction.ClientActionTypes.Load),
//     withLatestFrom(this.store.pipe(select(fromClient.getLoaded))),
//     switchMap(([, loaded]) => {
//       if (loaded) {
//         return empty();
//       }

//       console.log("LOADING DATA", loaded);

//       return this.clientService.getClients().pipe(
//         map((clients: any) => {
//           return new clientAction.LoadSuccess(clients);
//         }),
//         catchError((err) => of(new clientAction.LoadFail(err)))
//       );
//     })
//   );
// }
        }
