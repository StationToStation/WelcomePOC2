// // #region imports
// import { createReducer } from '@reduxjs/toolkit';
// import { TTag } from '@app/PageTags/models/TTag';
// import { loadTags } from '@app/PageTags/state/actions/tags';
// import strings from 'PageTagsWebPartStrings';
// // #endregion

// export interface ITagState {
//     data: TTag[];
//     isLoading: boolean;
//     loadingError: Nullable<string>;
// }

// const initialState: ITagState = {
//     data: [],
//     isLoading: false,
//     loadingError: undefined
// };

// export const tagsReducer = createReducer(initialState, builder => {
//     builder.addCase(loadTags.pending, (state) => {
//         state.isLoading = true;
//     });
//     builder.addCase(loadTags.fulfilled, (state, action) => {
//         state.data = action.payload;
//         state.loadingError = undefined;
//         state.isLoading = false;
//     });
//     builder.addCase(loadTags.rejected, (state, action) => {
//         state.isLoading = false;
//         state.loadingError = strings.LoadColumnsError.replace('{x}', action.error.message ?? strings.UnknownError);
//     });
// });
