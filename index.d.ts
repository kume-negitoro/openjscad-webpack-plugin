export declare type FormatType = 
    'amf' | 'dxf' | 'json' | 'stl' | 'svg' | 'x3d'

export declare interface Options {
    addMetaData?: boolean
    format?: FormatType | FormatType[]
    params?: object
}

export declare class OpenJSCADWebpackPlugin {
    constructor(options: Options)
    hook(compilation: any): void
    apply(compiler: any): void
}
