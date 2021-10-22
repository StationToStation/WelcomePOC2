// // #region imports
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import type { Context } from '@wm/accelerator-core/lib/types/Context';
// import { PageTagsService } from '@app/WelcomePoc2/services/PageTagsService';
// import { IAppState } from '../IAppState';
// // #endregion

// export const loadManagedProperties = createAsyncThunk<string[], Nullable<string>, { extra: Context, state: IAppState }>
//     ('managedProperties/loadManagedProperties', async (searchText, api) => {
//         const pts = api.extra.serviceScope.consume(PageTagsService.serviceKey);
//         // const managedProperties = await pts.getManagedProperties(searchText);
//         // return managedProperties;
//     });
