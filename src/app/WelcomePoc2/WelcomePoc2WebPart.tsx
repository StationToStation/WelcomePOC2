// #region imports
import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { sp } from '@pnp/sp';
import { BaseAcceleratorWebPart } from '@wm/accelerator-core/lib/components/BaseAcceleratorWebPart';
import { propsMiddleware } from '@app/WelcomePoc2/state/middleware/props.middleware';
import { IAppState } from '@app/WelcomePoc2/state/IAppState';
import { IWebPartProps } from '@app/WelcomePoc2/IWebPartProps';
import * as props from '@app/WelcomePoc2/state/actions/props';
import { App } from '@app/WelcomePoc2/components/App';
import { createWebPartStore } from '@app/WelcomePoc2/state/store';
// #endregion


import * as strings from 'WelcomePoc2WebPartStrings';

interface IWelcomePoc2WebPartProps extends IWebPartProps {
    // add properties to `IWebPartProps` if must be stored in redux store
    // add properties here if doesn't have to be stored in redux store
}

export default class WelcomePoc2WebPart extends BaseAcceleratorWebPart<IWelcomePoc2WebPartProps>  {

    private store!: Store<IAppState, any>;

    public async onInit(): Promise<void> {
        await super.onInit();
        this.store = createWebPartStore(this.context, {
            middleware: [
                propsMiddleware(this.wmUpdateProperty.bind(this)),
            ]
        });

        this.store.dispatch(props.getProps(this.properties));
        sp.setup({
            spfxContext: this.context
        });
    }

    protected wmRenderRootComponent(): JSX.Element {
        return <Provider store={this.store}><App /></Provider>;
    }

    protected onPropertyPaneFieldChanged(field: string, oldValue: any, newValue: any): void {
        super.onPropertyPaneFieldChanged(field, oldValue, newValue);
        this.store.dispatch(props.getProps(this.properties));
    }

    protected async wmGetPropertyPaneConfigurationAsync(): Promise<() => IPropertyPaneConfiguration> {
        const { getPropertyPaneConfiguration } = await import(/* webpackChunkName: "property-pane" */'./WelcomePoc2WebPartPropertyPane');
        // await this.store.dispatch(loadManagedProperties(this.properties.searchText));
        return () => getPropertyPaneConfiguration(this.context, this.store, this.properties, this.wmUpdateProperty.bind(this));
    }

}
