// #region imports
import * as React from 'react';

import { useService, useWebPartContext } from '@wm/accelerator-core';

import { useAppSelector } from '../state/hooks';
import ConfigPanel from './propertyPane/ConfigPanel';
import { LayoutService } from '../services/LayoutService';
import ReactLayout from './ReactLayout';
// #endregion

export interface ITemplatesMap {
    [key: string]: DocumentFragment | undefined;
}


export interface ILayoutProps {

}

const Layout: React.FC<ILayoutProps> = () => {
    const { slides, layoutString, instanceId } = useAppSelector(state => state.props);
    const { active, slide } = useAppSelector(state => state.slides);
    const webPartContext = useWebPartContext();

    const [parsedLayoutString, setParsedLayoutString] = React.useState(layoutString);

    const layoutService: LayoutService = useService(LayoutService.serviceKey);

    React.useEffect(() => {
        const layout = layoutService.stringToHtml(layoutString);
        const newHtmlTemplates = layoutService.getHtmlTemplates(layout);
        if (layout && newHtmlTemplates && Object.keys(newHtmlTemplates).length > 0) {
            const stringContent = layoutService.parseStringContent(webPartContext, slides, instanceId, active, slide);
            const context = {
                ...layoutService.parseHtmlTemplates(newHtmlTemplates, stringContent, instanceId),
                ...stringContent
            };

            let newLayoutString = layoutService.compileHandlebars(layoutString, context);
            setParsedLayoutString(newLayoutString);
        }
    }, [layoutString, slides, active, slide]);

    return (
        <div>
            <ReactLayout source={parsedLayoutString} />
            <ConfigPanel />
        </div>
    );
};

export default React.memo(Layout);
