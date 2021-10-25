// #region imports
import { Store } from 'redux';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { IAppState } from '@app/WelcomePoc2/state/IAppState';
import { IWebPartProps } from './IWebPartProps';
import * as strings from 'WelcomePoc2WebPartStrings';
// #endregion

export function getPropertyPaneConfiguration(
    context: WebPartContext,
    store: Store<IAppState>,
    properties: IWebPartProps,
    updateProps: (key: keyof IWebPartProps, value: unknown) => void,
): IPropertyPaneConfiguration {

    return {
        pages: [
            {
                displayGroupsAsAccordion: true,
                header: {
                    description: 'stop hardcoding strings',//strings.PropertyPane.Header,
                },
                groups: [
                    {
                        groupName: 'Title',
                        groupFields: [
                            PropertyPaneTextField('title', {
                                label: 'Title'
                            }),
                            PropertyPaneTextField('layoutString', {
                                label: 'Layout string',
                                multiline: true,
                                resizable: true
                            })
                        ]
                    }
                ]
            }
        ]
    };
}
