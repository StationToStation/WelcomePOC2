import { ServiceKey } from '@microsoft/sp-core-library';
import { IPalette, ISemanticColors, ISemanticTextColors } from '@microsoft/sp-component-base';

declare global {
    /**
     * Debug build conditional.
     */
    const DEBUG: boolean;

    /**
     * Solution full name build conditional.
     * 
     * E.g `wm-reply-tabs-web-part (v1.9.1.11 DEV, NO TELEMETRY, SPO CDN)`
     */
    const SOLUTION: string;
    /**
     * Solution name build conditional.
     * 
     * E.g `wm-reply-tabs-web-part`
     */    
    const SOLUTION_NAME: string;
    
    /**
     * Represends any object.
     */
    interface AnyObject {
        [key: string]: any;
    }

    /**
     * Represents any class.
     */
    interface AnyClass<T = {}> {
        new(...params: any[]): T;
    }

    /**
     * Theme state.
     */
    const __themeState__: {
        theme: Readonly<IPalette> & Readonly<ISemanticColors> & Readonly<ISemanticTextColors>;
    };

    /**
     * Nullable type. Value of this type can be null or undefined.
     */
    type Nullable<T> = T | undefined | null;

    /** 
     * Represents injectable SPFx class.
     */
    interface IInjectedService<T> {
        new(...params: any[]): T;
        serviceKey: ServiceKey<T>;
    }

}

export { };
