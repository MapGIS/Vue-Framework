import source from "./source.js";
import Pinyin from '../../../utils/chinese';
import * as topojson from "topojson-client";

export default class China {
  public static sheng;
  public static shi;
  public static xian;

  public static shengKeys = {};
  public static shiKeys = {};
  public static xianKeys = {};

  constructor() {}

  static Init() {
    const pinyin = new Pinyin();
    if (!this.sheng) {
      this.sheng = topojson.feature(source, source.objects["全国"]);
      this.sheng.features.forEach(f => {
        const name = f.properties.name;
        const pinyins: any = pinyin.getPinyin(name);
        if(pinyins){
          const letter = pinyins.charAt(0);
          this.shengKeys[letter] = this.shengKeys[letter] || []
          if(this.shengKeys[letter].indexOf(name) < 0) this.shengKeys[letter].push(name);
        }
      });
    }
    if (!this.shi) {
      this.shi = topojson.feature(source, source.objects["中国地级市"]);
      this.shi.features.forEach(f => {
        const name = f.properties.NAME;
        const pinyins:any = pinyin.getPinyin(name);
        if(pinyins){
          const letter = pinyins.charAt(0);
          this.shiKeys[letter] = this.shiKeys[letter] || []
          if(this.shiKeys[letter].indexOf(name) < 0) this.shiKeys[letter].push(name);
        }
      });
    }
    if (!this.xian) {
      this.xian = topojson.feature(source, source.objects["中国地级县"]);
      this.xian.features.forEach(f => {
        const name = f.properties["县名"];
        const pinyins:any = pinyin.getPinyin(name);
        if(pinyins){
          const letter = pinyins.charAt(0);
          this.xianKeys[letter] = this.xianKeys[letter] || []
          if(this.xianKeys[letter].indexOf(name) < 0) this.xianKeys[letter].push(name);
        }
      });
    }
  }

  static Search(name): Object {
    this.Init();
    let geojson = undefined;
    for (let i = 0; i < this.sheng.features.length; i++) {
      const f = this.sheng.features[i];
      if (
        f.properties.name.indexOf(name) >= 0 ||
        f.properties.adcode === parseInt(name)
      ) {
        geojson = f;
        return geojson;
      }
    }
    for (let i = 0; i < this.shi.features.length; i++) {
      const f = this.shi.features[i];
      if (f.properties.NAME.indexOf(name) >= 0) {
        geojson = f;
        return geojson;
      }
    }
    for (let i = 0; i < this.xian.features.length; i++) {
      const f = this.xian.features[i];
      if (
        f.properties["县名"].indexOf(name) >= 0 ||
        f.properties["行政区代码"] === parseInt(name) ||
        f.properties["邮局"] === parseInt(name)
      ) {
        geojson = f;
        return geojson;
      }
    }
    return geojson;
  }

  static GetData() {
    this.Init();
    return {
      sheng: this.sheng,
      shi: this.shi,
      xian: this.xian,
    }
  }

  static GetKey() {
    this.Init();
    return {
      shengKeys: this.shengKeys,
      shiKeys: this.shiKeys,
      xianKeys: this.xianKeys,
    }
  }
}
