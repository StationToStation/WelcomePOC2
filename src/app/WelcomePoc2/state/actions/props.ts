// #region imports
import { createAction } from '@reduxjs/toolkit';
import { IWebPartProps } from '@app/WelcomePoc2/IWebPartProps';
// #endregion

export const updateProps = createAction('props/update', <K extends keyof IWebPartProps>(key: K, value: any) => {
    return { payload: { key, value } };
});

export const getProps = createAction<IWebPartProps>('props/get');
