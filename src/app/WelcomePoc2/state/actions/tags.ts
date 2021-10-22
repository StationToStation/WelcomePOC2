// // #region imports
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import type { Context } from '@wm/accelerator-core/lib/types/Context';
// import { PageTagsService } from '@app/PageTags/services/PageTagsService';
// import { TTag } from '@app/PageTags/models/TTag';
// import { IAppState } from '../IAppState';
// // #endregion

// export const loadTags = createAsyncThunk<TTag[], void, { extra: Context, state: IAppState }>('tags/loadTags', async (_, api) => {
//     const selectedColumn = api.getState().props.selectedColumn;
//     if (!selectedColumn) { return []; }
//     const pts = api.extra.serviceScope.consume(PageTagsService.serviceKey);
//     const tags = await pts.getColumnTags(selectedColumn.key);
//     return tags;
// }, { condition: (_, api) => !api.getState().tags.isLoading });
