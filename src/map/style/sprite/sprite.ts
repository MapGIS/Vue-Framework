import {
    FillProperty,
    StrokeProperty,
    StrokeWidthProperty,
    BackgroundColorProperty,
    BorderRadiusProperty,
} from "csstype";

export interface GroupSpriteProperty {
    groupProp: GroupProperty;
    spriteProp: Array<SpriteProperty>;
}
export interface KeyProperty {
    key: String | Number;
}
export interface GroupProperty {
    group: String;
    descText: String;
    symbol: String;
}
/**
 * @author 创新中心-潘卓然
 */
export interface SpriteProperty {
    key: String | number;
    svg: SvgProperty;
}

export interface SvgProperty {
    width?: number;
    height?: number;
    background?: BackgroundColorProperty;
    borderRadius?: BorderRadiusProperty<number>;
    fill?: FillProperty;
    stroke?: StrokeProperty;
    strokeWidth?: StrokeWidthProperty<number>;
}
export const DefaultKeyProperty: KeyProperty = {
    key: "group_all",
};
export const DefaultSvgProperty: SvgProperty = {
    height: 25,
    width: 25,
    background: "rgba(0,0,0,0)",
    borderRadius: 0,
    fill: "#000000",
    stroke: "#000000",
    strokeWidth: 10,
};

export class Sprite {
    static base64ToImage(base64) {
        const img = document.createElement("img").setAttribute("src", base64);
        return img;
    }

    static dataURLtoFile(dataurl, filename = "file") {
        // tslint:disable-next-line: prefer-const
        let arr = dataurl.split(",");
        // tslint:disable-next-line: prefer-const
        let mime = arr[0].match(/:(.*?);/)[1];
        // tslint:disable-next-line: prefer-const
        let suffix = mime.split("/")[1];
        // tslint:disable-next-line: prefer-const
        let bstr = atob(arr[1]);
        let n = bstr.length;
        // tslint:disable-next-line: prefer-const
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], `${filename}.${suffix}`, {
            type: mime,
        });
    }

    /**
     * @param icon 图片名称
     * @param spriteImage 样式符号图片png
     * @param spriteData 样式说明文件json
     * @param canvas 画布
     */
    static getSpriteIcon(icon, spriteImage, spriteData, canvas) {
        canvas = canvas ? canvas : document.createElement("canvas");
        if (canvas && spriteImage && spriteData && spriteData[icon]) {
            let pattern;
            const spriteImageData = spriteData[icon];
            canvas.width = spriteImageData.width;
            canvas.height = spriteImageData.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                spriteImage,
                spriteImageData.x,
                spriteImageData.y,
                spriteImageData.width,
                spriteImageData.height,
                0,
                0,
                spriteImageData.width,
                spriteImageData.height
            );
            pattern = ctx.createPattern(canvas, "repeat");
            return pattern;
        }
        return undefined;
    }

    /**
     * @param icon 图片名称
     * @param spriteImage 样式符号图片png
     * @param spriteData 样式说明文件json
     * @param canvas 画布
     */
    static getSpriteReactDom(icon, spriteImage, spriteData, refs) {
        if (refs && spriteImage && spriteData && spriteData[icon]) {
            let pattern;
            const spriteImageData = spriteData[icon];
            const canvas = refs[`sprite-${icon}`].canvas;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                spriteImage,
                spriteImageData.x,
                spriteImageData.y,
                spriteImageData.width,
                spriteImageData.height,
                0,
                0,
                spriteImageData.width,
                spriteImageData.height
            );
            pattern = ctx.createPattern(canvas, "repeat");
            return pattern;
        }
        return undefined;
    }

    /**
     * @param icon 图片名称
     * @param spriteImage 样式符号图片png
     * @param spriteData 样式说明文件json
     * @param canvas 画布
     */
    static getSpriteImageData(icon, spriteImage, spriteData, canvas?) {
        canvas = canvas ? canvas : document.createElement("canvas");
        if (spriteImage && spriteData && spriteData[icon]) {
            let pattern;
            const spriteImageData = spriteData[icon];
            const { width = 16, height = 16, x = 0, y = 0 } = spriteImageData;
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(spriteImage, x, y, width, height, 0, 0, width, height);
            pattern = ctx.createPattern(canvas, "repeat");
            return ctx.getImageData(0, 0, width, height);
        }
        return undefined;
    }

    /**
     * @description 符号库名称
     **/
    title: string;
    /**
     * @description 符号库文件夹名称
     **/
    path: string;
    /**
     * @description 符号库json文件地址
     **/
    json: string;
    /**
     * @description 符号库png文件地址
     **/
    png: string;

    /**
     * @description 针对高分辨率屏幕导致的xxx@2 xxx@3的情况进行对应的统一path处理
     */
    fixPath() {
        if (this.title) {
            const names  = this.title.split('@');
            if (names && names.length >= 0) {
                this.path = names[0];
            }
        }
    }
}

export class SpriteManager {
    /**
     * @description 符号库列表
     */
    list: Sprite[];

    constructor(list: Sprite[]) {
        this.list = list;
    }

    getSpriteByTitle(title: string) {
        for (const sprite of this.list) {
            if (sprite.title === title) {
                return sprite;
            }
        }
        return undefined;
    }
}
