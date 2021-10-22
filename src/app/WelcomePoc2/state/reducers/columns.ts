// // #region imports
// import { createReducer } from '@reduxjs/toolkit';
// import { loadColumns } from '@app/PageTags/state/actions/columns';
// import { TColumn } from '@app/PageTags/models/TColumn';
// import strings from 'PageTagsWebPartStrings';
// // #endregion

// export interface IColumnsState {
//     data: TColumn[];
//     isLoading: boolean;
//     loadingError: Nullable<string>;
// }

// const initialState: IColumnsState = {
//     data: [],
//     isLoading: false,
//     loadingError: undefined
// };

// export const columnsReducer = createReducer(initialState, builder => {
//     builder.addCase(loadColumns.fulfilled, (state, action) => {
//         state.data = action.payload;
//         state.loadingError = undefined;
//         state.isLoading = false;
//     });
//     builder.addCase(loadColumns.pending, (state) => {
//         state.isLoading = true;
//     });
//     builder.addCase(loadColumns.rejected, (state, action) => {
//         state.isLoading = false;
//         state.loadingError = strings.LoadColumnsError.replace('{x}', action.error.message ?? strings.UnknownError);
//     });
// });
