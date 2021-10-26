export interface ISlide {
    id: string;
    backgroundUrl: string;
    title: string;
    link: string;
}

export interface ISlidesMap {
    [id: string]: ISlide;
}
