/**
 * @class 屏幕组件
 * @description 表示在地图上或者在浏览器上的组件
 */
export interface WidgetOnScreen {
    /**
     * @description 在屏幕上的组件信息
     * @type Array<WidgetManifest>
     */
    widgets: WidgetManifest[];
}

/**
 * @class 组件池
 * @description 放在Vue keep-alive的组件池中的组件，对应控制器面板
 */
export interface WidgetPool {
    /**
     * @type 组件组列表
     */
    groups: WidgetGroup[];
}

export interface WidgetGroup {
    name: string;
    widgets: WidgetManifest[];
}

/**
 * @class 组件属性
 * @description 对应Vue的data/props
 */
export interface WidgetProperties {
    /**
     * @description 确定widget是否支持2D，默认为true
     * @type boolean
     * @default true
     */
    "2D": boolean;

    /**
     * @description 确定widget是否支持3D，默认为true
     * @type boolean
     * @default true
     */
    "3D": boolean;

    /**
     * @description 设置widget是否inPanel，如果不在一个panel中，widget会直接展示，默认为true
     * @type boolean
     * @default false
     */
    inPanel: boolean;

    /**
     * @description 设置为true的话，默认加载config文件，反之不加载，默认为true
     * @type boolean
     * @default false
     */
    hasConfig: boolean;

    /**
     * @description 设为为true的话，builder会加载setting页。如果为false并且widget可配置则展示一个Json编辑器
     * @type boolean
     * @default true
     */
    hasSettingPage: boolean;

    /**
     * @description 如果有setting页，settingUiComponent表示设置页ui的组件名
     * @type string
     * @default '''
     */
    settingUiComponent: "";
}

/**
 * @class 组件元数据信息
 * @description 对应组件的基本的描述/图标/文件位置
 */
export interface WidgetManifest {
    /**
     * @description widget的标识名称，需要与widget文件夹的名称一致
     * @type string
     */
    name: string;

    /**
     * @description widget的作者
     * @type string
     * @default 'MapGIS'
     */
    anchor: string;

    /**
     * @description widget的描述
     * @type string
     * @default ''
     */
    description: string;
    /**
     * @description widget的组件名
     * @type string
     * @example 如果inPanel为false，则表示widget本身UI，如果inPanel为true，其icon会显示到屏幕占位区域或控制器中，widget本身UI会展示到Panel中
     */
    component: "";

    /**
     * @description widget图标,默认使用images/icon.svg
     * @type string
     * @default 'iconname'
     */
    icon: string;

    /**
     * @description 组件属性
     * @type WidgetProperties
     */
    properties: WidgetProperties;

    /**
     * @description 组件的元数据信息以及配置信息的网络地址
     */
    uri: string;
}

/**
 * @class 组件列表元数据信息
 */
export class WidgetsManifest {
    static wrapper(manifest: WidgetsManifest) {
        const { widgetOnScreen, widgetPool } = manifest;
        const obj = new WidgetsManifest(widgetOnScreen, widgetPool);
        return obj;
    }

    widgetOnScreen: WidgetOnScreen;
    widgetPool: WidgetPool;

    constructor(onscreen: WidgetOnScreen, pool: WidgetPool) {
        this.widgetOnScreen = onscreen;
        this.widgetPool = pool;
    }

    /**
     * @description 读取文件夹下的manifest文件并更新所有的widgets元数据信息
     */
    initManifest() {
        /* const { widgetOnScreen } = this;
           const uris = widgetOnScreen.widgets.map((widget) =>
           axios.get(`${widget.uri}/manifest.json`)
           );
           Promise.all(uris).then(
           axios.spread((widgets) => {
           console.log("spread", widgets);
           })
           ); */
        // widgetOnScreen.widgets.forEach((widget) => {});
    }

    initConfig() {
        // init config
    }
}

/**
 * @class WidgetConfig
 * @description 可选，如果没有设置，默认指向widget配置config.json（只要manifest.json的hasConfig为true）
 * 如果设置为字符串，表示自定义的config的位置，例："config": "configs/Scalebar/config.json"
 * 如果设置为对象，表示本widget实际的配置参数
 */
export interface WidgetConfig {
    initConfig();
}

export class WidgetPosition {
    static calcQuasarOffset(position: WidgetPosition) {
        const { anchor = "top-left", left, right, top, bottom } = position;

        if (anchor === "top-left") {
            return [left, top];
        } else if (anchor === "top-right") {
            return [right, top];
        } else if (anchor === "bottom-left") {
            return [left, bottom];
        } else if (anchor === "bottom-right") {
            return [right, bottom];
        } else if (anchor === "top") {
            return [left, top];
        } else if (anchor === "bottom") {
            return [left, bottom];
        } else if (anchor === "left") {
            return [left, top];
        } else if (anchor === "right") {
            return [right, top];
        }
    }
    /**
     * @description 可选，widget位置锚点，默认值为 top-left
     * @example top-right、top-left、bottom-right、bottom-left、top、right、bottom、left
     * @default top-left
     */
    anchor: "top-left";
    /**
     * @description 相对左方向偏移量
     * @default 0
     */
    left: 0;
    /**
     * @description 相对上方向偏移量
     * @default 0
     */
    top: 0;
    /**
     * @description 相对右方向偏移量
     * @default 0
     */
    right: 0;
    /**
     * @description 相对下方向偏移量
     * @default 0
     */
    bottom: 30;

    /**
     * @description 宽度
     * @default 100
     */
    width: 100;
    /**
     * @description 高度
     * @default 100
     */
    height: 100;

    /**
     * @description 可选，可以设置为map或browser，默认值为map
     * @default 'map'
     */
    relativeTo: "map";

    /**
     * @description 可选，如果relativeTo为browser，relativeType才生效
     * @example 可以设置为q-header、q-page、q-footer、q-drawer、q-dialog
     */
    relativeType: "q-page";
}

export const DefaultWidgetProperties: WidgetProperties = {
    "2D": true,
    "3D": false,
    "hasConfig": true,
    "hasSettingPage": false,
    "inPanel": true,
    "settingUiComponent": "",
};

export const DefaultWidgetPosition: WidgetPosition = {
    anchor: "top-left",
    left: 0,
    top: 0,
    right: 0,
    bottom: 30,
    width: 100,
    height: 100,
    relativeTo: "map",
    relativeType: "q-page",
};

export const DefaultWidgetStyle = {
    height: "100px",
    width: "100px",
    padding: "12px",
};

export class Widget implements WidgetConfig, WidgetManifest {
    id: string;
    uri: string;
    position: WidgetPosition;
    cssStyle: CSSStyleDeclaration;

    /**
     * @description 可选，如果没有设置，默认指向widget配置config.json（只要manifest.json的hasConfig为true）
     * 如果设置为字符串，表示自定义的config的位置，例："config": "configs/Scalebar/config.json"
     * 如果设置为对象，表示本widget实际的配置参数
     */
    config: WidgetConfig;
    /**
     * @description 可选，表示是否在应用启动的时候打开该widget，
     * 默认值为false,只有对于能够在面板中展示的widget有效
     * 如果有多个屏幕上的widget设置为true，只有第一个有效
     * 如果有多个在池中的widget设置为true，由控制器决定如何去打开
     */
    openAtStart: boolean;

    name: string;
    anchor: string;
    description: string;
    component: "";
    icon: string;
    properties: WidgetProperties;

    /**
     * @description 根据uri的文件位置的的config配置信息更新对应的配置信息
     */
    fixConfig() {
        // fix config
    }

    initConfig() {
        // init config
    }
}
