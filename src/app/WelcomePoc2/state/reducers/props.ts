// #region imports
import { createReducer } from '@reduxjs/toolkit';

import { generateInstanceId } from '@wm/accelerator-core/lib/utilities/misc/generateInstanceId';

import { IWebPartProps } from '@app/WelcomePoc2/IWebPartProps';
import { getProps } from '@app/WelcomePoc2/state/actions/props';
import { ISlidesMap } from '@app/WelcomePoc2/models/ISlide';
import { default as layoutHTML } from '../../layouts/layout.html';
// #endregion

const initialState: IWebPartProps = {
    slides: {} as ISlidesMap,
    instanceId: generateInstanceId('webpart'),
    slidesOrder: [],
    layoutString: layoutHTML
};

export const propsReducer = createReducer(initialState, builder => {
    builder.addCase(getProps, (state, action) => {
        return {
            ...state,
            ...action.payload,
        };
    });
});
