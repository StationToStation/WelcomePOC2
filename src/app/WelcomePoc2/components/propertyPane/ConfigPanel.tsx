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
import { ISlide } from '@app/WelcomePoc2/models/ISlide';
import { DefaultButton } from 'office-ui-fabric-react';
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
        if (!isEdited) {
            setIsOpen(false);
        }
    }

    const slidesList = React.useMemo(() => {
        const list: ISlide[] = [];
        Object.keys(slidesMap).forEach(key => list.push(slidesMap[key]));
        return list;
    }, [slidesMap]);

    const handleEdit = (id: string) => {
        dispatch(slides.editSlide(id));
    }

    return (
        <Panel
            isOpen={isOpen}
            isLightDismiss={false}
            onDismiss={handleClosePanel} >
            <PrimaryButton
                onClick={handleAdd}
                text={strings.Slides.AddSlideButton} />
            {slidesList.map(s => (
                <>
                    <DefaultButton text={s.title} onClick={() => handleEdit(s.id)} />
                    <br />
                </>
            ))}
            {isEdited && <SlideEditor />}
        </Panel>
    );
};

export default React.memo(ConfigPanel);