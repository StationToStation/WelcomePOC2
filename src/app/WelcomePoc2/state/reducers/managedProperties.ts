// // #region imports
// import { createReducer } from '@reduxjs/toolkit';
// import { loadManagedProperties } from '@app/PageTags/state/actions/managedProperties';
// // #endregion

// export interface IManagedPropertiesState {
//     data: string[];
//     filteredProperties: string[];
// }

// const initialState: IManagedPropertiesState = {
//     data: [],
//     filteredProperties: []
// };

// export const managedPropertiesReducer = createReducer(initialState, builder => {
//     builder.addCase(loadManagedProperties.fulfilled, (state, action) => {
//         state.data = action.payload;
//         state.filteredProperties = action.payload;
//     });
//     builder.addCase(loadManagedProperties.pending, (state) => {
//         state.data = [];
//     });
//     builder.addCase(loadManagedProperties.rejected, (state) => {
//         state.data = [];
//     });
// });
