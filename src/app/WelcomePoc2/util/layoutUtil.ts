import { WebPartContext } from "@microsoft/sp-webpart-base";
import { compile } from "handlebars";
import { ITemplatesMap } from "../components/Layout";
import { ISlide, ISlidesMap } from "../models/ISlide";

export const getHtmlTemplates = (rawLayout: Document | undefined) => {
    const templatesList = rawLayout?.querySelectorAll('template');
    const templatesMap: ITemplatesMap = {};
    templatesList?.forEach((t) => {
        const templateContent = t.content;
        templatesMap[t.id] = templateContent;
    })
    return templatesMap;
}

// TODO: context type
export const compileHandlebars = (layoutString: string, context: { [key: string]: any }) => {
    const template = compile(layoutString);
    return template(context);
}

export const parseHtmlTemplates = (templatesMap: ITemplatesMap, stringValues: { [key: string]: any }) => {
    const stringifiedTemplatesMap: { [key: string]: string } = {};
    for (const key in templatesMap) {
        if (!templatesMap[key]) { continue; }
        const parent = document.createElement('div');
        const content = templatesMap[key]!.cloneNode(true);
        if (
            (content as Element).firstElementChild
            && (key === 'left' || key === 'right')
        ) {
            (content as Element).firstElementChild!.id = `${key}-clickable`;
        }
        parent.append(content);
        console.log(key, parent.innerHTML)
        stringifiedTemplatesMap[key] = parent.innerHTML;
    }
    for (const key in stringifiedTemplatesMap) {
        const withInnerTemplates = compileHandlebars(stringifiedTemplatesMap[key], { ...stringifiedTemplatesMap, ...stringValues })
        stringifiedTemplatesMap[key] = withInnerTemplates;
    }
    return stringifiedTemplatesMap;
}

// TODO: context type
export const parseStringContent = (
    webPartContext: WebPartContext,
    slides: ISlidesMap,
    activeSlide?: string,
    editedSlide?: Partial<ISlide>
): { [key: string]: any } => {
    let newContext: any = {
        username: webPartContext.pageContext.user.displayName,
        userphoto: `/_layouts/15/userphoto.aspx?size=L&username=${webPartContext.pageContext.user.email}`
    };
    if (slides && Object.keys(slides).length > 0 && activeSlide) {
        const sourceSlide = editedSlide || slides[activeSlide];
        newContext = {
            ...newContext,
            title: sourceSlide.title || '',
            link: sourceSlide.link || '',
            background: sourceSlide.backgroundUrl || ''
        };
    }
    return newContext;
}

export const stringToHtml = (stringifiedHtml: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(stringifiedHtml, 'text/html');
    return doc;
}