// #region imports
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { compile } from 'handlebars';

import { BaseService } from '@wm/accelerator-core/lib/services/BaseService';

import { ITemplatesMap } from '../components/Layout';
import { ISlide, ISlidesMap } from '../models/ISlide';
// #endregion

export interface IHandlebarsContext {
    [key: string]: string;
}

export class LayoutService extends BaseService {

    public static serviceKey = ServiceKey.create('@WM:LayoutService', LayoutService);
    private parser: DOMParser;
    constructor(scope: ServiceScope) {
        super(scope);
        this.parser = new DOMParser();
        // scope.whenFinished(() => {
        //     this.someService = scope.consume(SomeService.serviceKey);
        // });
    }

    public getHtmlTemplates = (rawLayout: Document | undefined) => {
        const templatesList = rawLayout?.querySelectorAll('template');
        const templatesMap: ITemplatesMap = {};
        templatesList?.forEach((t) => {
            const templateContent = t.content;
            templatesMap[t.id] = templateContent;
        });
        return templatesMap;
    }

    public compileHandlebars = (layoutString: string, context: IHandlebarsContext) => {
        const template = compile(layoutString);
        return template(context);
    }

    public parseHtmlTemplates = (templatesMap: ITemplatesMap, stringValues: IHandlebarsContext, componentId: string) => {
        const stringifiedTemplatesMap: IHandlebarsContext = {};
        for (const key in templatesMap) {
            if (!templatesMap[key]) { continue; }
            const parent = document.createElement('div');
            const content = templatesMap[key]!.cloneNode(true);
            if (
                (content as Element).firstElementChild
                && (key === 'left' || key === 'right' || key === 'clock')
            ) {
                (content as Element).firstElementChild!.id = `${componentId}-${key}`;
            }
            parent.append(content);
            console.log(key, parent.innerHTML);
            stringifiedTemplatesMap[key] = parent.innerHTML;
        }
        for (const key in stringifiedTemplatesMap) {
            const withInnerTemplates = this.compileHandlebars(stringifiedTemplatesMap[key], { ...stringifiedTemplatesMap, ...stringValues });
            stringifiedTemplatesMap[key] = withInnerTemplates;
        }
        return stringifiedTemplatesMap;
    }

    public parseStringContent = (
        webPartContext: WebPartContext,
        slides: ISlidesMap,
        componentId: string,
        activeSlide: string | undefined,
        editedSlide?: Partial<ISlide>
    ): IHandlebarsContext => {
        let newContext: any = {
            username: webPartContext.pageContext.user.displayName,
            userphoto: `/_layouts/15/userphoto.aspx?size=L&username=${webPartContext.pageContext.user.email}`,
            clock: `<div id="${componentId}-clock"></div>`
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

    public stringToHtml = (stringifiedHtml: string) => {
        const doc = this.parser.parseFromString(stringifiedHtml, 'text/html');
        return doc;
    }

}
