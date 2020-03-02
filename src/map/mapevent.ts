import { Bounds } from './map';

/**
 * 基本的地图加载回调事件
 * @author 潘卓然
 */
export interface MapEvent {
  onMapLoad(event, target, option);
  onMapChange(event, target, option);
  onZoom(zoom: number);
}


/**
 * 基本的地图加载回调事件
 * @author 潘卓然
 */
export interface BoundEvent {
  onBoundChange(bounds: any): Bounds;
}