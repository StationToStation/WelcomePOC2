// #region imports
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { generateInstanceId } from '@wm/accelerator-core/lib/utilities/misc/generateInstanceId';
import type { Context } from '@wm/accelerator-core/lib/types/Context';

import { ISlide } from '@app/WelcomePoc2/models/ISlide';
import { IAppState } from '../IAppState';
import strings from 'WelcomePoc2WebPartStrings';
import * as props from '@app/WelcomePoc2/state/actions/props';
// #endregion


// export const loadCustomFields = createAsyncThunk<ProfileField[], void, { extra: Context, state: IAppState }>('editor/loadCustomFields', async (_, api) => {
//     const context = api.extra;
//     const service = context.serviceScope.consume(CustomFieldsService.serviceKey);
//     return service.getFields();
// });

export const addSlide = createAsyncThunk<Partial<ISlide>, void, { extra: Context, state: IAppState }>('slides/add', async (_, api) => {
    const slide: Partial<ISlide> = {
        id: generateInstanceId('slide')
    };
    const existingSlides = api.getState().slides;
    if (Object.keys(existingSlides).length === 0) {
        slide.title = strings.Slides.DefaultSlideTitle;
    }
    return slide;
});

export const updateSlide = createAction('slides/update', (slide: Partial<ISlide>) => {
    return { payload: { ...slide } };
});

export const saveSlide = createAsyncThunk<ISlide, ISlide, { extra: Context, state: IAppState }>('slides/save', async (slide, api) => {
    const existingSlides = api.getState().props.slides;
    const updatedSlides = {
        ...existingSlides
        , [slide.id]: slide
    };
    api.dispatch(props.updateProps('slides', updatedSlides))
    return slide;
});
