// #region imports
import { createReducer } from '@reduxjs/toolkit';
import { IWebPartProps } from '@app/WelcomePoc2/IWebPartProps';
import { getProps } from '@app/WelcomePoc2/state/actions/props';
import strings from 'WelcomePoc2WebPartStrings';
import { ISlide, ISlidesMap } from '@app/WelcomePoc2/models/ISlide';
import { addSlide, saveSlide, updateSlide } from '../actions/slides';
// #endregion

export interface ISlidesState {
    slide?: Partial<ISlide>;
    active?: string;
    edited?: string;
}

const initialState: ISlidesState = {
};

export const slidesReducer = createReducer(initialState, builder => {
    builder.addCase(addSlide.fulfilled, (state, action) => {
        return {
            ...state,
            slide: action.payload,
            active: action.payload.id,
            edited: action.payload.id
        };
    });
    builder.addCase(updateSlide, (state, action) => {
        return {
            ...state,
            slide: action.payload
        }
    });
    builder.addCase(saveSlide.fulfilled, (state, action) => {
        return {
            ...state,
            slide: undefined,
            active: action.payload.id,
            edited: undefined
        };
    });
});
