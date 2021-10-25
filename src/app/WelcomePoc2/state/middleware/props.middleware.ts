// #region imports
import { PayloadAction, Middleware } from '@reduxjs/toolkit';
import { IAppState } from '@app/WelcomePoc2/state/IAppState';
import { IWebPartProps } from '@app/WelcomePoc2/IWebPartProps';
import { getProps, updateProps } from '@app/WelcomePoc2/state/actions/props';
import { setActiveSlide } from '../actions/slides';
// #endregion

function isUpdatePropsAction(action: { type: string; }): action is PayloadAction<{ key: keyof IWebPartProps, value: unknown }> {
    return action.type === updateProps.type;
}

function isGetPropsAction(action: { type: string; }): action is PayloadAction<IWebPartProps> {
    return action.type === getProps.type;
}

export const propsMiddleware: (updateProperty: <TKey extends keyof IWebPartProps>(key: TKey, value: unknown) => void) => Middleware<any, IAppState> =
    updateProperty => api => next => action => {
        next(action);
        if (isUpdatePropsAction(action)) {
            updateProperty(action.payload.key, action.payload.value);
        }
        else if (isGetPropsAction(action)) {
            console.log('get props action');
            api.dispatch(setActiveSlide(action.payload.slidesOrder[0]))
        }
    };
