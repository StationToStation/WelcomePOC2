// #region imports
import * as React from 'react';
import Handlebars, { compile } from 'handlebars';

import { default as layoutHTML } from '../layouts/layout.html'
import { isArray } from 'lodash';
import { useAppSelector } from '../state/hooks';
import { useWebPartContext } from '@wm/accelerator-core';
// #endregion

const draft = {
    slides: [
        {
            title: 'please work',
            link: 'https://google.com',
            background: 'https://docs.microsoft.com/en-us/stream/media/stream-with-sharepoint/sp-webpart-picker.png'
        }
    ],
    username: 'Ana',
    icon: 'icon'
};

export interface ITemplatesMap {
    [key: string]: DocumentFragment | undefined
}

export interface ILayoutProps {

}

const Layout: React.FC<ILayoutProps> = () => {
    const parser = new DOMParser();

    const title = useAppSelector(state => state.props.title);
    const webPartContext = useWebPartContext();

    const [layoutString, setLayoutString] = React.useState(layoutHTML);
    const [parsedLayoutString, setParsedLayoutString] = React.useState(layoutHTML)
    const [layout, setLayout] = React.useState<Document | undefined>(undefined);
    const [htmlTemplates, setHtmlTemplates] = React.useState<ITemplatesMap | undefined>(undefined);

    const getHtmlTemplates = (rawLayout: Document | undefined, existingTemplates: ITemplatesMap | undefined) => {
        const templatesList = rawLayout?.querySelectorAll('template');
        const templatesMap: ITemplatesMap = { ...existingTemplates }
        templatesList?.forEach((t) => {
            console.log(t.id);
            const templateContent = t.content/* .cloneNode(true) */;
            templatesMap[t.id] = templateContent;
        })
        return templatesMap;
    }

    // TODO: context type
    const compileHandlebars = (layoutString: string, context: { [key: string]: any }) => {
        const template = compile(layoutString);
        return template(context);
    }

    const parseHtmlTemplates = (templatesMap: ITemplatesMap | undefined) => {
        const stringifiedTemplatesMap: { [key: string]: string } = {};
        for (const key in templatesMap) {
            if (!templatesMap[key]) { continue; }
            const parent = document.createElement('div');
            parent.append(templatesMap[key]!.cloneNode(true));
            console.log(key, parent.innerHTML)
            stringifiedTemplatesMap[key] = parent.innerHTML;
        }
        return stringifiedTemplatesMap;
    }

    // TODO: context type
    const parseStringContent = (context: { [key: string]: any }): { [key: string]: any } => {
        let newContext = {
            ...context,
            username: webPartContext.pageContext.user.displayName,
            userphoto: `/_layouts/15/userphoto.aspx?size=L&username=${webPartContext.pageContext.user.email}`
        };
        if (context.slides && isArray(context.slides)) {
            newContext = {
                ...newContext,
                ...context.slides[0],
                title: title
            };
        }
        return newContext;
    }

    const stringToHtml = (stringifiedHtml: string) => {
        const doc = parser.parseFromString(stringifiedHtml, 'text/html');
        return doc;
    }

    React.useEffect(() => {
        setLayout(stringToHtml(layoutString));
    }, [layoutString]);

    React.useEffect(() => {
        const newTemplates = getHtmlTemplates(layout, htmlTemplates);
        setHtmlTemplates(newTemplates);
    }, [layout]);

    React.useEffect(() => {
        if (layout && htmlTemplates && Object.keys(htmlTemplates).length > 0) {
            // const withHtmlTemplates = insertHtmlTemplates(layoutString, htmlTemplates);
            // const withStringValues = insertStrings(withHtmlTemplates, draft);
            const context = {
                ...parseHtmlTemplates(htmlTemplates),
                ...parseStringContent(draft)
            };
            const newLayoutString = compileHandlebars(layoutString, context);
            setLayoutString(newLayoutString);
        }
    }, [htmlTemplates, title])

    // const test = async () => {
    //     // const stream = await fetch("../layouts/layout.html");
    //     // const text = await stream.text();
    //     // const result = define(JSON.stringify(layoutHTML));
    //     // console.log(result);
    //     // return result;
    //     const p = new DOMParser();
    //     const d = p.parseFromString(JSON.stringify(layoutHTML), 'text/html');
    //     console.log(d);
    // }

    // test();

    return (
        <div dangerouslySetInnerHTML={{ __html: layoutString }}></div>
    )
}

export default React.memo(Layout);
