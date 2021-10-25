// #region imports
import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { useDispatch } from 'react-redux';
import { IconButton } from '@fluentui/react/lib/Button';

import { URLPicker } from '@wm/accelerator-core/lib/controls/url-picker/URLPicker';
import { ImagePicker } from '@wm/accelerator-core/lib/controls/image-picker/ImagePicker';

import * as slides from '@app/WelcomePoc2/state/actions/slides';
import { useAppDispatch, useAppSelector } from '@app/WelcomePoc2/state/hooks';
import strings from 'WelcomePoc2WebPartStrings';
import { ISlide } from '@app/WelcomePoc2/models/ISlide';
// #endregion

export interface ISlideEditorProps { };

const SlideEditor: React.FC<ISlideEditorProps> = () => {
    const slide = useAppSelector(state => state.slides.slide);
    const dispatch = useDispatch();

    const handleChangeTitle = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
        dispatch(slides.updateSlide({ ...slide, title: newValue }));
    };

    const handleChangeLink = (url: string | string[] | undefined) => {
        const link = Array.isArray(url)
            ? url[0]
            : url;
        dispatch(slides.updateSlide({ ...slide, link }));
    };

    const handleChangeBackground = (backgroundUrl: string | undefined) => {
        dispatch(slides.updateSlide({ ...slide, backgroundUrl }));
    };

    const handleSave = () => {
        if (slide?.title && slide.backgroundUrl && slide.id /* && slide.link */) {
            dispatch(slides.saveSlide(slide as ISlide))
        }
    }

    return (
        <div>
            <TextField value={slide?.title} onChange={handleChangeTitle} />
            <URLPicker selected={slide?.link} onSelect={handleChangeLink} />
            <ImagePicker selected={slide?.backgroundUrl} onSelect={handleChangeBackground} />
            <IconButton iconProps={{ iconName: 'Save' }} text={strings.Slides.SaveSlideButton} onClick={handleSave} />
        </div>
    )
}

export default React.memo(SlideEditor);