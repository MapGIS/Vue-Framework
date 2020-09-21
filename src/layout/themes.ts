import { WidgetOnScreen, WidgetPool } from './widgets'

export interface ThemeLayout {
  widgetOnScreen: WidgetOnScreen
  widgetPool: WidgetPool
}

export interface ThemeStyle {
  /**
   * @description 样式名称
   * @type string
   * @default 'ocean'
   */
  name: string

  /**
   * @description 样式描述
   * @type string
   * @default '海洋风格'
   */
  description: string

  /**
   * @description 样式字体图标颜色
   * @type string
   * @default 'secondary'
   */
  color: string

  /**
   * @description 样式主题，描述字体、边框、背景等
   * @type string
   * @description 'bg-accent text-white'
   */
  theme: string
}

/**
 * @description 主题控制器插槽
 */
export enum ThemeSlot {
  Launch = 'launch',
  Left = 'left',
  Right = 'right',
  Main = 'main',
  Header = 'header',
  Footer = 'footer'
}

export interface ThemeContent {
  /**
   * @description 对应的组名
   * @type string
   */
  name: string

  /**
   * @description 描述
   * @type string
   */
  description: string

  /**
   * @description 插槽名称
   * @type ThemeSlot
   * @example l
   */
  slot: ThemeSlot
}

/**
 * @class 主题元数据信息
 */
export interface ThemeManifest {
  /**
   * @description theme的名称
   * @type string
   */
  name: string

  /**
   * @description theme的作者
   * @type string
   * @default 'MapGIS'
   */
  author: string

  /**
   * @description theme的描述
   * @type string
   * @default '''
   */
  description: string

  /**
   * @description theme的组件名-对应某个DynamicLayout文件
   * @type string
   * @default 'Theme'
   */
  component: string

  /**
   * @description theme的样式集合
   * @type Array<ThemeStyle>
   */
  styles: Array<ThemeStyle>

  /**
   * @description  theme的布局内容区域集合，每个内容区域相当于一个widget控制器，通过内容区域把widget池分组
   * @type Array<ThemeContent>
   */
  contents: Array<ThemeContent>
}
