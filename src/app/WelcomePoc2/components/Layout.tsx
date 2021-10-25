// #region imports
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { useWebPartContext } from '@wm/accelerator-core';

import { useAppSelector } from '../state/hooks';
import ConfigPanel from './propertyPane/ConfigPanel';
import { compileHandlebars, getHtmlTemplates, parseHtmlTemplates, parseStringContent, stringToHtml } from '../util/layoutUtil';
import { showNextSlide, showPrevSlide } from '@app/WelcomePoc2/state/actions/slides';
// #endregion

export interface ITemplatesMap {
    [key: string]: DocumentFragment | undefined
}

export interface ILayoutProps {

}

const Layout: React.FC<ILayoutProps> = () => {
    const { slides, layoutString } = useAppSelector(state => state.props);
    const { active, slide } = useAppSelector(state => state.slides);
    const dispatch = useDispatch();
    const webPartContext = useWebPartContext();
    const containerRef = React.useRef<HTMLDivElement>(null);

    const [parsedLayoutString, setParsedLayoutString] = React.useState(layoutString);



    React.useEffect(() => {
        const layout = stringToHtml(layoutString);
        const newHtmlTemplates = getHtmlTemplates(layout);
        if (layout && newHtmlTemplates && Object.keys(newHtmlTemplates).length > 0) {
            const stringContent = parseStringContent(webPartContext, slides, active, slide);
            const context = {
                ...parseHtmlTemplates(newHtmlTemplates, stringContent),
                ...stringContent
            };

            let newLayoutString = compileHandlebars(layoutString, context);
            setParsedLayoutString(newLayoutString);
        }
    }, [layoutString, slides, active, slide])

    React.useEffect(() => {
        if (!containerRef.current) { return; }
        //todo: add guid
        const prevSlideButton = containerRef.current.querySelector('#left-clickable');
        if (prevSlideButton) {
            prevSlideButton.addEventListener('click', () => dispatch(showPrevSlide()))
        }
        const nextSlideButton = containerRef.current.querySelector('#right-clickable');
        if (nextSlideButton) {
            nextSlideButton.addEventListener('click', () => dispatch(showNextSlide()))
        }
    }, [parsedLayoutString])


    return (
        <div>
            <div
                ref={containerRef}
                dangerouslySetInnerHTML={{ __html: parsedLayoutString }}>

            </div>
            <ConfigPanel />
        </div>
    )
}

export default React.memo(Layout);
