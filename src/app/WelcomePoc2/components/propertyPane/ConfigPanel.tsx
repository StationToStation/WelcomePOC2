// #region imports
import * as React from 'react';
import { Panel } from '@fluentui/react/lib/Panel';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { useDispatch } from 'react-redux';

import { DisplayMode, useDisplayMode } from '@wm/accelerator-core/lib/hooks/useDisplayMode';

import * as slides from '@app/WelcomePoc2/state/actions/slides';
import { useAppDispatch, useAppSelector } from '@app/WelcomePoc2/state/hooks';
import strings from 'WelcomePoc2WebPartStrings';
import SlideEditor from './SlideEditor';
// #endregion

export interface IConfigPanelProps { };

const ConfigPanel: React.FC<IConfigPanelProps> = () => {
    const slidesMap = useAppSelector(state => state.props.slides);
    const isEdited = useAppSelector(state => state.slides.edited);
    const dispatch = useDispatch();

    const displayMode = useDisplayMode()
    const [isOpen, setIsOpen] = React.useState(displayMode === DisplayMode.Edit);

    const handleAdd = () => {
        dispatch(slides.addSlide());
    };

    const handleClosePanel = () => {
        setIsOpen(false);
    }

    return (
        <Panel
            isOpen={isOpen}
            onDismiss={handleClosePanel} >
            <PrimaryButton
                onClick={handleAdd}
                text={strings.Slides.AddSlideButton} />
            {isEdited && <SlideEditor />}
        </Panel>
    );
};

export default React.memo(ConfigPanel);