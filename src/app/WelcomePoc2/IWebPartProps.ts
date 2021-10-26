import { ISlidesMap } from './models/ISlide';

export interface IWebPartProps {
    instanceId: string;
    slides: ISlidesMap;
    slidesOrder: string[];
    layoutString: string;
}
