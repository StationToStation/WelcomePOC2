// #region imports
import { PayloadAction, Middleware } from '@reduxjs/toolkit';
import { IAppState } from '@app/WelcomePoc2/state/IAppState';
import { IWebPartProps } from '@app/WelcomePoc2/IWebPartProps';
import { updateProps } from '@app/WelcomePoc2/state/actions/props';
// #endregion

function isUpdatePropsAction(action: { type: string; }): action is PayloadAction<{ key: keyof IWebPartProps, value: unknown, selectedColumn: IWebPartProps }> {
    return action.type === updateProps.type;
}

export const propsMiddleware: (updateProperty: <TKey extends keyof IWebPartProps>(key: TKey, value: unknown) => void) => Middleware<any, IAppState> =
    updateProperty => api => next => action => {
        next(action);
        if (isUpdatePropsAction(action)) {
            updateProperty(action.payload.key, action.payload.value);
        }
    };
