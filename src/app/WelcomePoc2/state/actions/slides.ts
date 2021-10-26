// #region imports
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { generateInstanceId } from '@wm/accelerator-core/lib/utilities/misc/generateInstanceId';

import { ISlide } from '@app/WelcomePoc2/models/ISlide';
import { IAppState } from '../IAppState';
import strings from 'WelcomePoc2WebPartStrings';
import * as props from '@app/WelcomePoc2/state/actions/props';
import { Context } from '@wm/accelerator-core/lib/types/Context';
// #endregion


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

export const editSlide = createAsyncThunk<string, string, { extra: Context, state: IAppState }>('slides/edit', async (id, api) => {
    const slide = api.getState().props.slides[id];
    api.dispatch(updateSlide(slide));
    return id;
});

export const saveSlide = createAsyncThunk<ISlide, ISlide, { extra: Context, state: IAppState }>('slides/save', async (slide, api) => {
    const { slides, slidesOrder } = api.getState().props;
    const updatedSlides = {
        ...slides
        , [slide.id]: slide
    };
    api.dispatch(props.updateProps('slides', updatedSlides));
    if (slidesOrder.indexOf(slide.id) === -1) {
        api.dispatch(props.updateProps('slidesOrder', [...slidesOrder, slide.id]));
    }
    return slide;
});

export const setActiveSlide = createAction('slides/show', (id: string) => {
    return { payload: id };
});

export const showNextSlide = createAsyncThunk<void, void, { extra: Context, state: IAppState }>('slides/next', async (_, api) => {
    const { slides, props } = api.getState();
    if (typeof slides.active === 'string') {
        const currentIndex = props.slidesOrder.indexOf(slides.active);
        const nextIndex = currentIndex === props.slidesOrder.length - 1
            ? 0 :
            currentIndex + 1;
        api.dispatch(setActiveSlide(props.slidesOrder[nextIndex]));
    }
});

export const showPrevSlide = createAsyncThunk<void, void, { extra: Context, state: IAppState }>('slides/prev', async (_, api) => {
    const { slides, props } = api.getState();
    if (typeof slides.active === 'string') {
        const currentIndex = props.slidesOrder.indexOf(slides.active);
        const nextIndex = currentIndex === 0
            ? props.slidesOrder.length - 1 :
            currentIndex - 1;
        api.dispatch(setActiveSlide(props.slidesOrder[nextIndex]));
    }
});