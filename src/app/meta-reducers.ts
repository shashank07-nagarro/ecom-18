import { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import { loadState, saveState } from './local-storage';

const key = 'ngrx-state';

export function localStorageMetaReducer<T>(
  reducer: ActionReducer<T>
): ActionReducer<T> {
  return (state, action) => {
    const nextState: any = reducer(state, action);
    const saveCart = { cart: nextState?.cart };
    saveState(key, saveCart);
    return nextState;
  };
}

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [localStorageMetaReducer]
  : [localStorageMetaReducer];
