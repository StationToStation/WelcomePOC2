import { ISlidesMap } from "./models/ISlide";

export interface IWebPartProps {
    slides: ISlidesMap;
    slidesOrder: string[];
    layoutString: string;
}
