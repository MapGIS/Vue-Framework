import * as d3 from 'd3-scale-chromatic';

export enum ColorMode {
    Categorical = "类型配色",
    Diverging = "对比色",
    SequentialSingleHue = "单一渐变色",
    SequentialMultiHue = "复杂渐变色",
    Cyclical = "彩虹配色"
}

export const Categorical = {
    Category10: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/category10.png",
        scheme: d3.schemeCategory10,
        key: "schemeCategory10",
        title: "默认10色"
    },
    Accent: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Accent.png",
        scheme: d3.schemeAccent,
        key: "schemeAccent ",
        title: "强调色"
    },
    Dark2: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Dark2.png",
        scheme: d3.schemeDark2,
        key: "schemeDark2 ",
        title: "黑暗色"
    },
    Paired: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Paired.png",
        scheme: d3.schemePaired,
        key: "schemePaired",
        title: "匹配色"
    },
    Pastel1: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Pastel1.png",
        scheme: d3.schemePastel1,
        key: "schemePastel1 ",
        title: "蜡笔色1"
    },
    Pastel2: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Pastel2.png",
        scheme: d3.schemePastel2,
        key: "schemePastel2 ",
        title: "蜡笔色2"
    },
    Set1: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Set1.png",
        scheme: d3.schemeSet1,
        key: "schemeSet1",
        title: "固定色1"
    },
    Set2: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Set2.png",
        scheme: d3.schemeSet2,
        key: "schemeSet2",
        title: "固定色2"
    },
    Set3: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Set3.png",
        scheme: d3.schemeSet3,
        key: "schemeSet3",
        title: "固定色3"
    }
};

export const Diverging = {
    BrBG: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/BrBG.png",
        scheme: d3.schemeBrBG[11],
        interpolate: d3.interpolateBrBG,
        key: "schemeBrBG",
        title: ""
    },
    PRGn: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PRGn.png",
        scheme: d3.schemePRGn[11],
        interpolate: d3.interpolatePRGn,
        key: "schemePRGn",
        title: ""
    },
    PiYG: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PiYG.png",
        scheme: d3.schemePiYG[11],
        interpolate: d3.interpolatePiYG,
        key: "schemePiYG",
        title: ""
    },
    PuOr: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PuOr.png",
        scheme: d3.schemePuOr[11],
        interpolate: d3.interpolatePuOr,
        key: "schemePuOr",
        title: ""
    },
    RdBu: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdBu.png",
        scheme: d3.schemeRdBu[11],
        interpolate: d3.interpolateRdBu,
        key: "schemeRdBu",
        title: ""
    },
    RdGy: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdGy.png",
        scheme: d3.schemeRdGy[11],
        interpolate: d3.interpolateRdGy,
        key: "schemeRdGy",
        title: ""
    },
    YlBu: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdYlBu.png",
        scheme: d3.schemeRdYlBu[11],
        interpolate: d3.interpolateRdYlBu,
        key: "schemeRdYlBu",
        title: ""
    },
    RdYlGn: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdYlGn.png",
        scheme: d3.schemeRdYlGn[11],
        interpolate: d3.interpolateRdYlGn,
        key: "schemeRdYlGn",
        title: ""
    },
    Spectral: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Spectral.png",
        scheme: d3.schemeSpectral[11],
        interpolate: d3.interpolateSpectral,
        key: "schemeSpectral",
        title: ""
    }
};

export const SequentialSingleHue = {
    Blues: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Blues.png",
        scheme: d3.schemeBlues[9],
        interpolate: d3.interpolateBlues,
        key: "schemeBlues",
        title: "蓝色"
    },
    Greens: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Greens.png",
        scheme: d3.schemeGreens[9],
        interpolate: d3.interpolateGreens,
        key: "schemeGreens",
        title: "绿色"
    },
    Greys: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Greys.png",
        scheme: d3.schemeGreys[9],
        interpolate: d3.interpolateGreys,
        key: "schemeGreys",
        title: "灰色"
    },
    Oranges: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Oranges.png",
        scheme: d3.schemeOranges[9],
        interpolate: d3.interpolateOranges,
        key: "schemeOranges",
        title: "橘色"
    },
    Purples: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Purples.png",
        scheme: d3.schemePurples[9],
        interpolate: d3.interpolatePurples,
        key: "schemePurples",
        title: "紫色"
    },
    Reds: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Reds.png",
        scheme: d3.schemeReds[9],
        interpolate: d3.interpolateReds,
        key: "schemeReds",
        title: "红色"
    }
};

export const SequentialMultiHue = {
    Viridis: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/viridis.png",
        interpolate: d3.interpolateViridis,
        key: "interpolateViridis",
        title: ""
    },
    Inferno: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/inferno.png",
        interpolate: d3.interpolateInferno,
        key: "interpolateInferno",
        title: ""
    },
    Magma: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/magma.png",
        interpolate: d3.interpolateMagma,
        key: "interpolateMagma",
        title: ""
    },
    Plasma: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/plasma.png",
        interpolate: d3.interpolatePlasma,
        key: "interpolatePlasma",
        title: ""
    },
    Warm: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/warm.png",
        interpolate: d3.interpolateWarm,
        key: "interpolateWarm",
        title: ""
    },
    Cool: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/cool.png",
        interpolate: d3.interpolateCool,
        key: "interpolateCool",
        title: ""
    },
    Cubehelix: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/cubehelix.png",
        interpolate: d3.interpolateCubehelixDefault,
        key: "interpolateCubehelixDefault",
        title: ""
    },
    BuGn: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/BuGn.png",
        scheme: d3.schemeBuGn[9],
        interpolate: d3.interpolateBuGn,
        key: "schemeBuGn",
        title: ""
    },
    BuPu: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/BuPu.png",
        scheme: d3.schemeBuPu[9],
        interpolate: d3.interpolateBuPu,
        key: "interpolateBuPu",
        title: ""
    },
    GnBu: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/GnBu.png",
        scheme: d3.schemeGnBu[9],
        interpolate: d3.interpolateGnBu,
        key: "interpolateGnBu",
        title: ""
    },
    OrRd: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/OrRd.png",
        scheme: d3.schemeOrRd[9],
        interpolate: d3.interpolateOrRd,
        key: "interpolateOrRd",
        title: ""
    },
    PuBuGn: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PuBuGn.png",
        scheme: d3.schemePuBuGn[9],
        interpolate: d3.interpolatePuBuGn,
        key: "interpolatePuBuGn",
        title: ""
    },
    PuBu: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PuBu.png",
        scheme: d3.schemePuBu[9],
        interpolate: d3.interpolatePuBu,
        key: "interpolatePuBu",
        title: ""
    },
    PuRd: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PuRd.png",
        scheme: d3.schemePuRd[9],
        interpolate: d3.interpolatePuRd,
        key: "interpolatePuRd",
        title: ""
    },
    RdPu: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdPu.png",
        scheme: d3.schemeRdPu[9],
        interpolate: d3.interpolateRdPu,
        key: "interpolateRdPu",
        title: ""
    },
    YlGnBu: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/YlGnBu.png",
        scheme: d3.schemeYlGnBu[9],
        interpolate: d3.interpolateYlGnBu,
        key: "interpolateYlGnBu",
        title: ""
    },
    YlGn: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/YlGn.png",
        scheme: d3.schemeYlGn[9],
        interpolate: d3.interpolateYlGn,
        key: "interpolateYlGn",
        title: ""
    },
    YlOrBr: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/YlOrBr.png",
        scheme: d3.schemeYlOrBr[9],
        interpolate: d3.interpolateYlOrBr,
        key: "interpolateYlOrBr",
        title: ""
    },
    YlOrRd: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/YlOrRd.png",
        scheme: d3.schemeYlOrRd[9],
        interpolate: d3.interpolateYlOrRd,
        key: "interpolateYlOrRd",
        title: ""
    }
};

export const Cyclical = {
    Rainbow: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/rainbow.png",
        scheme: d3.interpolateRainbow,
        key: "interpolateRainbow",
        title: "马卡龙"
    },
    Sinebow: {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/sinebow.png",
        scheme: d3.interpolateSinebow,
        key: "interpolateSinebow",
        title: "彩虹"
    }
};

export const CategoricalList = [
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/category10.png",
        scheme: d3.schemeCategory10,
        key: "schemeCategory10",
        title: "默认10色"
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Accent.png",
        scheme: d3.schemeAccent,
        key: "schemeAccent ",
        title: "强调色"
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Dark2.png",
        scheme: d3.schemeDark2,
        key: "schemeDark2 ",
        title: "黑暗色"
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Paired.png",
        scheme: d3.schemePaired,
        key: "schemePaired",
        title: "匹配色"
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Pastel1.png",
        scheme: d3.schemePastel1,
        key: "schemePastel1 ",
        title: "蜡笔色1"
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Pastel2.png",
        scheme: d3.schemePastel2,
        key: "schemePastel2 ",
        title: "蜡笔色2"
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Set1.png",
        scheme: d3.schemeSet1,
        key: "schemeSet1",
        title: "固定色1"
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Set2.png",
        scheme: d3.schemeSet2,
        key: "schemeSet2",
        title: "固定色2"
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Set3.png",
        scheme: d3.schemeSet3,
        key: "schemeSet3",
        title: "固定色3"
    }
];

export const DivergingList = [
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/BrBG.png",
        scheme: d3.schemeBrBG[11],
        interpolate: d3.interpolateBrBG,
        key: "schemeBrBG",
        title: ""
    }, {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PRGn.png",
        scheme: d3.schemePRGn[11],
        interpolate: d3.interpolatePRGn,
        key: "schemePRGn",
        title: ""
    }, {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PiYG.png",
        scheme: d3.schemePiYG[11],
        interpolate: d3.interpolatePiYG,
        key: "schemePiYG",
        title: ""
    }, {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PuOr.png",
        scheme: d3.schemePuOr[11],
        interpolate: d3.interpolatePuOr,
        key: "schemePuOr",
        title: ""
    }, {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdBu.png",
        scheme: d3.schemeRdBu[11],
        interpolate: d3.interpolateRdBu,
        key: "schemeRdBu",
        title: ""
    }, {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdGy.png",
        scheme: d3.schemeRdGy[11],
        interpolate: d3.interpolateRdGy,
        key: "schemeRdGy",
        title: ""
    }, {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdYlBu.png",
        scheme: d3.schemeRdYlBu[11],
        interpolate: d3.interpolateRdYlBu,
        key: "schemeRdYlBu",
        title: ""
    }, {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdYlGn.png",
        scheme: d3.schemeRdYlGn[11],
        interpolate: d3.interpolateRdYlGn,
        key: "schemeRdYlGn",
        title: ""
    }, {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Spectral.png",
        scheme: d3.schemeSpectral[11],
        interpolate: d3.interpolateSpectral,
        key: "schemeSpectral",
        title: ""
    }
]

export const SequentialSingleHueList = [
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Blues.png",
        scheme: d3.schemeBlues[9],
        interpolate: d3.interpolateBlues,
        key: "schemeBlues",
        title: "蓝色"
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Greens.png",
        scheme: d3.schemeGreens[9],
        interpolate: d3.interpolateGreens,
        key: "schemeGreens",
        title: "绿色"
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Greys.png",
        scheme: d3.schemeGreys[9],
        interpolate: d3.interpolateGreys,
        key: "schemeGreys",
        title: "灰色"
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Oranges.png",
        scheme: d3.schemeOranges[9],
        interpolate: d3.interpolateOranges,
        key: "schemeOranges",
        title: "橘色"
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Purples.png",
        scheme: d3.schemePurples[9],
        interpolate: d3.interpolatePurples,
        key: "schemePurples",
        title: "紫色"
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Reds.png",
        scheme: d3.schemeReds[9],
        interpolate: d3.interpolateReds,
        key: "schemeReds",
        title: "红色"
    }];

export const SequentialMultiHueList = [
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/viridis.png",
        interpolate: d3.interpolateViridis,
        key: "interpolateViridis",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/inferno.png",
        interpolate: d3.interpolateInferno,
        key: "interpolateInferno",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/magma.png",
        interpolate: d3.interpolateMagma,
        key: "interpolateMagma",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/plasma.png",
        interpolate: d3.interpolatePlasma,
        key: "interpolatePlasma",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/warm.png",
        interpolate: d3.interpolateWarm,
        key: "interpolateWarm",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/cool.png",
        interpolate: d3.interpolateCool,
        key: "interpolateCool",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/cubehelix.png",
        interpolate: d3.interpolateCubehelixDefault,
        key: "interpolateCubehelixDefault",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/BuGn.png",
        scheme: d3.schemeBuGn[9],
        interpolate: d3.interpolateBuGn,
        key: "schemeBuGn",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/BuPu.png",
        scheme: d3.schemeBuPu[9],
        interpolate: d3.interpolateBuPu,
        key: "interpolateBuPu",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/GnBu.png",
        scheme: d3.schemeGnBu[9],
        interpolate: d3.interpolateGnBu,
        key: "interpolateGnBu",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/OrRd.png",
        scheme: d3.schemeOrRd[9],
        interpolate: d3.interpolateOrRd,
        key: "interpolateOrRd",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PuBuGn.png",
        scheme: d3.schemePuBuGn[9],
        interpolate: d3.interpolatePuBuGn,
        key: "interpolatePuBuGn",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PuBu.png",
        scheme: d3.schemePuBu[9],
        interpolate: d3.interpolatePuBu,
        key: "interpolatePuBu",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PuRd.png",
        scheme: d3.schemePuRd[9],
        interpolate: d3.interpolatePuRd,
        key: "interpolatePuRd",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdPu.png",
        scheme: d3.schemeRdPu[9],
        interpolate: d3.interpolateRdPu,
        key: "interpolateRdPu",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/YlGnBu.png",
        scheme: d3.schemeYlGnBu[9],
        interpolate: d3.interpolateYlGnBu,
        key: "interpolateYlGnBu",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/YlGn.png",
        scheme: d3.schemeYlGn[9],
        interpolate: d3.interpolateYlGn,
        key: "interpolateYlGn",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/YlOrBr.png",
        scheme: d3.schemeYlOrBr[9],
        interpolate: d3.interpolateYlOrBr,
        key: "interpolateYlOrBr",
        title: ""
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/YlOrRd.png",
        scheme: d3.schemeYlOrRd[9],
        interpolate: d3.interpolateYlOrRd,
        key: "interpolateYlOrRd",
        title: ""
    }
];

export const CyclicalList = [
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/rainbow.png",
        scheme: d3.interpolateRainbow,
        key: "interpolateRainbow",
        title: "马卡龙"
    },
    {
        url: "https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/sinebow.png",
        scheme: d3.interpolateSinebow,
        key: "interpolateSinebow",
        title: "彩虹"
    }
];
