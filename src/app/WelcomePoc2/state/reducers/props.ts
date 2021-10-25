// #region imports
import { createReducer } from '@reduxjs/toolkit';
import { IWebPartProps } from '@app/WelcomePoc2/IWebPartProps';
import { getProps } from '@app/WelcomePoc2/state/actions/props';
import strings from 'WelcomePoc2WebPartStrings';
import { ISlidesMap } from '@app/WelcomePoc2/models/ISlide';
// #endregion

const initialState: IWebPartProps = {
    // TODO: remove?
    // instanceId: '',
    title: '',
    slides: {} as ISlidesMap
};

export const propsReducer = createReducer(initialState, builder => {
    builder.addCase(getProps, (state, action) => {
        return {
            ...state,
            ...action.payload,
        };
    });
});
