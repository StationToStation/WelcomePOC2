// #region imports
import { IWebPartProps } from '@app/WelcomePoc2/IWebPartProps';
import { ISlidesState } from './reducers/slides';
// #endregion

export interface IAppState {
    props: IWebPartProps;
    slides: ISlidesState;
}
