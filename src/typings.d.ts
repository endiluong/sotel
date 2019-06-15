/*
 * Extra typings definitions
 */

// Allow .json files imports
declare module '*.json';

// SystemJS module definition
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module 'highlight.js/lib/languages/typescript';

declare var mMenu: any;
declare var mOffcanvas: any;
declare var mScrollTop: any;
declare var mHeader: any;
declare var mToggle: any;
declare var mQuicksearch: any;
declare var mUtil: any;
declare var mPortlet: any;
