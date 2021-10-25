// // #region imports
// import { PayloadAction, Middleware } from '@reduxjs/toolkit';

// import { IAppState } from '@app/WelcomePoc2/state/IAppState';
// import { IWebPartProps } from '@app/WelcomePoc2/IWebPartProps';
// import { addSlide, updateSlide } from '@app/WelcomePoc2/state/actions/slides';
// import { ISlide } from '@app/WelcomePoc2/models/ISlide';
// import strings from 'WelcomePoc2WebPartStrings';
// // #endregion

// function isAddSlidesAction(action: { type: string; }): action is PayloadAction<{ id: string }> {
//     return action.type === addSlide.type;
// }

// export const slidesMiddleware: (createSlide: () => void) => Middleware<any, IAppState> =
// createSlide => api => next => action => {
//         next(action);
//         if (isAddSlidesAction(action)) {
//             createSlide();
//             const existingSlides = api.getState().slides;
//             if (Object.keys(existingSlides).length === 0) {
//                 api.dispatch(updateSlide({ id: action.payload.id, title: strings.Slides.DefaultSlideTitle }))
//             }
//         }
//     };
