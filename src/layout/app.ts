import { ThemeManifest } from "./themes";
import { WidgetsManifest } from "./widgets";

export interface IApplication {
  appbuilder: IAppbuilder;
}

export interface IAppbuilder {
  theme: ThemeManifest;
  widgets: WidgetsManifest;
}
