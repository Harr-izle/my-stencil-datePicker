/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MyCard {
    }
}
export interface MyCardCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLMyCardElement;
}
declare global {
    interface HTMLMyCardElementEventMap {
        "dateSelected": Date;
    }
    interface HTMLMyCardElement extends Components.MyCard, HTMLStencilElement {
        addEventListener<K extends keyof HTMLMyCardElementEventMap>(type: K, listener: (this: HTMLMyCardElement, ev: MyCardCustomEvent<HTMLMyCardElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLMyCardElementEventMap>(type: K, listener: (this: HTMLMyCardElement, ev: MyCardCustomEvent<HTMLMyCardElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLMyCardElement: {
        prototype: HTMLMyCardElement;
        new (): HTMLMyCardElement;
    };
    interface HTMLElementTagNameMap {
        "my-card": HTMLMyCardElement;
    }
}
declare namespace LocalJSX {
    interface MyCard {
        "onDateSelected"?: (event: MyCardCustomEvent<Date>) => void;
    }
    interface IntrinsicElements {
        "my-card": MyCard;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-card": LocalJSX.MyCard & JSXBase.HTMLAttributes<HTMLMyCardElement>;
        }
    }
}
