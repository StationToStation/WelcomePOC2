// // #region imports
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import type { Context } from '@wm/accelerator-core/lib/types/Context';
// import { PageTagsService } from '@app/WelcomePoc2/services/PageTagsService';
// import { IAppState } from '../IAppState';
// import { TColumn } from '@app/WelcomePoc2/models/TColumn'
// // #endregion

// export const loadColumns = createAsyncThunk<TColumn[], void, { extra: Context, state: IAppState }>('columns/loadColumns', async (_, api) => {
//     const pts = api.extra.serviceScope.consume(PageTagsService.serviceKey);
//     const columns = await pts.getSuitableColumns();
//     return columns;
// }, { condition: (_, api) => !api.getState().columns.isLoading });
