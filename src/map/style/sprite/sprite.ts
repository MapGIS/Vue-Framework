import { FillProperty, StrokeProperty, StrokeWidthProperty, BackgroundColorProperty, BorderRadiusProperty } from 'csstype';

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
    key: "group_all"
};
export const DefaultSvgProperty: SvgProperty = {
    height: 25,
    width: 25,
    background: "rgba(0,0,0,0)",
    borderRadius: 0,
    fill: '#000000',
    stroke: '#000000',
    strokeWidth: 10
}

export class Sprite {
    static base64ToImage(base64) {
        const img = document.createElement('img').setAttribute('src', base64);
        return img;
    }

    static dataURLtoFile(dataurl, filename = 'file') {
        // tslint:disable-next-line: prefer-const
        let arr = dataurl.split(',')
        // tslint:disable-next-line: prefer-const
        let mime = arr[0].match(/:(.*?);/)[1]
        // tslint:disable-next-line: prefer-const
        let suffix = mime.split('/')[1]
        // tslint:disable-next-line: prefer-const
        let bstr = atob(arr[1])
        let n = bstr.length
        // tslint:disable-next-line: prefer-const
        let u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], `${filename}.${suffix}`, {
            type: mime
        })
    }

    static getSpriteIcon(icon, spriteImage, spriteData, canvas) {
        if (canvas && spriteImage && spriteData && spriteData[icon]) {
            // let pattern = patternCache[icon_cache_key];
            // if (!pattern) {
            let pattern;
            const spriteImageData = spriteData[icon];
            // const canvas = document.createElement('canvas');
            canvas.width = spriteImageData.width;
            canvas.height = spriteImageData.height;
            const ctx = canvas.getContext('2d');
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
            pattern = ctx.createPattern(canvas, 'repeat');
            // patternCache[icon_cache_key] = pattern;
            // }
            return pattern;
        }
        return undefined;
    }
}
