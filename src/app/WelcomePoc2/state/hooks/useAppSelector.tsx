// #region imports
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { IAppState } from '@app/WelcomePoc2/state/IAppState';
// #endregion

export function useAppSelector<T>(selector: (state: IAppState) => T): T {
    return useSelector<IAppState, any>(selector, shallowEqual);
}

export function useAppDispatch(): Dispatch {
    return useDispatch();
}
