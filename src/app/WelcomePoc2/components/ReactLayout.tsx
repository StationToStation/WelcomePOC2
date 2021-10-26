// #region imports
import * as React from 'react';
import { useDispatch } from 'react-redux';
import parse, { HTMLReactParserOptions, domToReact } from 'html-react-parser';
import { isTag } from 'domhandler/lib/node';


import { useAppSelector } from '../state/hooks';
import { showNextSlide, showPrevSlide } from '@app/WelcomePoc2/state/actions/slides';
import Time from './Time';
// #endregion

export interface IReactLayoutProps {
    source: string;
}

const ReactLayout: React.FC<IReactLayoutProps> = ({ source }) => {
    const instanceId = useAppSelector(state => state.props.instanceId);
    const dispatch = useDispatch();
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (isTag(domNode)) {
                const { attribs, children } = domNode;
                switch (attribs.id) {
                    case `${instanceId}-clock`: return <div {...attribs}><Time /></div>;
                    case `${instanceId}-left`: return (
                        <div {...attribs} onClick={() => dispatch(showPrevSlide())}>{domToReact(children, options)}</div>
                    );
                    case `${instanceId}-right`: return (
                        <div {...attribs} onClick={() => dispatch(showNextSlide())}>{domToReact(children, options)}</div>
                    );
                }
            }
            return domNode;
        }
    };

    const CustomLayout = parse(source, options);

    return <>{CustomLayout}</>;
};

export default React.memo(ReactLayout);
