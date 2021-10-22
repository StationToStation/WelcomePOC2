// #region imports
import { ConfigureStoreOptions, configureStore, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import type { Context } from '@wm/accelerator-core/lib/types/Context';
import { isDebugMode } from '@wm/accelerator-core/lib/utilities/debugging/isDebugMode';
import crashReportMiddleware from '@wm/accelerator-core/lib/xredux/middleware/crash-report.middleware';
import { propsReducer } from '@app/WelcomePoc2/state/reducers/props';
import { IAppState } from './IAppState';
// #endregion

export const createWebPartStore = (context: Context, { devTools, middleware = [], enhancers, preloadedState, reducer }: Partial<ConfigureStoreOptions> = {}) => {
    return configureStore<IAppState>({
        devTools: typeof devTools === 'boolean' ? devTools : { ...devTools, name: SOLUTION_NAME, },
        enhancers,
        preloadedState,
        middleware: getDefaultMiddleware =>
            [
                crashReportMiddleware(context),
                ...(isDebugMode() ? [logger] : []),
                ...getDefaultMiddleware({ thunk: { extraArgument: context } }),
                ...middleware as Middleware<any, any, any>[],
            ] as any,
        reducer: {
            ...reducer,
            props: propsReducer
        },
    });
};

export default createWebPartStore;
