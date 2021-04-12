const ThirdLayers =  [
    {
        "id": "水田",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0101"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(248, 208, 114, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "水浇地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0102"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(248, 231, 28, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "旱地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0103"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(255, 251, 177, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "果园",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0201"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(214, 167, 201, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "可调整果园",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0201K"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(214, 167, 201, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "茶园",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0202"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(213, 167, 176, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "可调整茶园",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0202K"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(213, 167, 176, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "橡胶园",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0203"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(231, 204, 226, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "可调整橡胶园",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0203K"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(231, 204, 226, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "其他园地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0204"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(231, 204, 226, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "可调整其他园地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0204K"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(231, 204, 226, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "乔木林地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0301"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(49, 173, 105, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "可调整乔木林地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0301K"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(49, 173, 105, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "竹林地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0302"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(49, 173, 105, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "可调整竹林地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0302K"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(49, 173, 105, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "红树林地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0303"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(49, 173, 105, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "森林沼泽",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0304"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(49, 173, 105, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "灌木林地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0305"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(100, 185, 104, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "灌丛沼泽",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0306"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(100, 185, 104, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "其他林地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0307"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(151, 207, 178, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "可调整其他林地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0307K"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(151, 207, 178, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "天然牧草地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0401"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(131, 194, 56, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "沼泽草地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0402"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(131, 194, 56, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "人工牧草地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0403"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(154, 206, 127, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "可调整人工牧草地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0403K"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(154, 206, 127, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "其他草地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0404"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(200, 227, 160, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "商业服务业设施用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "05H1"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(226, 161, 149, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "物流仓储用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0508"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(197, 154, 140, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "工业用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0601"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(197, 154, 140, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "采矿用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0602"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(197, 154, 140, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "城镇住宅用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0701"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(229, 103, 102, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "农村宅基地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0702"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(236, 137, 138, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "机关团体新闻出版用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "08H1"
            ]
        ],
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(241, 165, 180, 1)"
        },
        "layout": {
            "visibility": "visible"
        }
    },
    {
        "id": "科教文卫用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "08H2"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(241, 165, 180, 1)"
        }
    },
    {
        "id": "高教用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "08H2A"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(241, 165, 180, 1)"
        }
    },
    {
        "id": "公共设施用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0809"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(241, 165, 180, 1)"
        }
    },
    {
        "id": "公园与绿地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0810"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(129, 195, 93, 1)"
        }
    },
    {
        "id": "广场用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "0810A"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(129, 195, 93, 1)"
        }
    },
    {
        "id": "特殊用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "09"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(193, 114, 97, 1)"
        }
    },
    {
        "id": "铁路用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1001"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(209, 201, 211, 1)"
        }
    },
    {
        "id": "轨道交通用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1002"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(209, 201, 211, 1)"
        }
    },
    {
        "id": "公路用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1003"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(210, 216, 201, 1)"
        }
    },
    {
        "id": "城镇村道路用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1004"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(222, 222, 221, 1)"
        }
    },
    {
        "id": "交通服务场地用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1005"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(170, 169, 169, 1)"
        }
    },
    {
        "id": "农村道路",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1006"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(194, 193, 193, 1)"
        }
    },
    {
        "id": "机场用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1007"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(235, 137, 126, 1)"
        }
    },
    {
        "id": "港口码头用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1008"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(235, 137, 126, 1)"
        }
    },
    {
        "id": "管道运输用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1009"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(235, 137, 126, 1)"
        }
    },
    {
        "id": "河流水面",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1101"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(163, 214, 245, 1)"
        }
    },
    {
        "id": "湖泊水面",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1102"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(163, 214, 245, 1)"
        }
    },
    {
        "id": "水库水面",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1103"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(163, 214, 245, 1)"
        }
    },
    {
        "id": "坑塘水面",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1104"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(144, 170, 207, 1)"
        }
    },
    {
        "id": "养殖坑塘",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1104A"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(144, 170, 207, 1)"
        }
    },
    {
        "id": "沿海滩涂",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1105"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(179, 222, 248, 1)"
        }
    },
    {
        "id": "内陆滩涂",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1106"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(179, 222, 248, 1)"
        }
    },
    {
        "id": "沟渠",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1107"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(160, 205, 240, 1)"
        }
    },
    {
        "id": "干渠",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1107A"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(160, 205, 240, 1)"
        }
    },
    {
        "id": "沼泽地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1108"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(175, 200, 220, 1)"
        }
    },
    {
        "id": "水工建筑用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1109"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(230, 130, 100, 1)"
        }
    },
    {
        "id": "冰川及永久积雪",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1110"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(215, 237, 251, 1)"
        }
    },
    {
        "id": "空闲地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1201"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(225, 220, 225, 1)"
        }
    },
    {
        "id": "设施农用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1202"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(220, 180, 130, 1)"
        }
    },
    {
        "id": "田坎",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1203"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(200, 204, 210, 1)"
        }
    },
    {
        "id": "盐碱地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1204"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(200, 190, 170, 1)"
        }
    },
    {
        "id": "沙地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1205"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(200, 190, 170, 1)"
        }
    },
    {
        "id": "裸土地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1206"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(215, 200, 185, 1)"
        }
    },
    {
        "id": "裸岩石砾地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "1207"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(222, 221, 214, 1)"
        }
    },
    {
        "id": "城市",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "201"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(229, 103, 102, 1)"
        }
    },
    {
        "id": "城市独立工业用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "201A"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(229, 103, 102, 1)"
        }
    },
    {
        "id": "建制镇",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "202"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(229, 103, 102, 1)"
        }
    },
    {
        "id": "建制镇独立工业用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "202A"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(229, 103, 102, 1)"
        }
    },
    {
        "id": "村庄",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "203"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(236, 137, 138, 1)"
        }
    },
    {
        "id": "村庄独立工业用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "203A"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(236, 137, 138, 1)"
        }
    },
    {
        "id": "盐田及采矿用地",
        "source": "地类图斑墨卡托",
        "source-layer": "地类图斑",
        "minzoom": 0,
        "maxzoom": 17,
        "type": "fill",
        "filter": [
            "any",
            [
                "==",
                "地类编码",
                "204"
            ]
        ],
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-outline-color": "rgba(0, 0, 0, 1)",
            "fill-color": "rgba(197, 154, 140, 1)"
        }
    }
];

export { ThirdLayers };
