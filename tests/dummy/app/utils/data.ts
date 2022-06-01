import { Spec } from 'vega';

export type DataArray = Array<Record<string, number | null>>;
export type DataRecord = Record<string, DataArray>;

export const CONFIG: object =  {
  "background": "#fff",
  "arc": {"fill": "#3e5c69"},
  "area": {"fill": "#3e5c69"},
  "line": {"stroke": "#3e5c69"},
  "path": {"stroke": "#3e5c69"},
  "rect": {"fill": "#3e5c69"},
  "shape": {"stroke": "#3e5c69"},
  "symbol": {"fill": "#3e5c69"},
  "axis": {
    "domainWidth": 0.5,
    "grid": true,
    "labelPadding": 2,
    "tickSize": 5,
    "tickWidth": 0.5,
    "titleFontWeight": "normal"
  },
  "axisBand": {"grid": false},
  "axisX": {"gridWidth": 0.2},
  "axisY": {"gridDash": [3], "gridWidth": 0.4},
  "legend": {"labelFontSize": 11, "padding": 1, "symbolType": "square"},
  "range": {
    "category": [
      "#3e5c69",
      "#6793a6",
      "#182429",
      "#0570b0",
      "#3690c0",
      "#74a9cf",
      "#a6bddb",
      "#e2ddf2"
    ]
  }
};

export const SPEC_TYPE: string = 'vega';

export const SPEC: Spec = {
  "data": [
    {
      "name": "sas_result_fit"
    },
    {
      "name": "sas_result_data",
      "transform": [
        {
          "as": "errorLower",
          "expr": "datum.y - datum.dy",
          "type": "formula"
        },
        {
          "as": "errorUpper",
          "expr": "datum.y + datum.dy",
          "type": "formula"
        },
        {
          "as": [
            "yFit",
            "residuals"
          ],
          "key": "x",
          "from": "sas_result_fit",
          "type": "lookup",
          "fields": [
            "x"
          ],
          "values": [
            "y",
            "residuals"
          ]
        }
      ]
    },
    {
      "name": "highlightedDataPoint",
      "source": "sas_result_data",
      "transform": [
        {
          "expr": "hover && hover.datum.x === datum.x && hover.datum.y === datum.y",
          "type": "filter"
        }
      ]
    },
    {
      "name": "highlightedFitPoint",
      "source": "sas_result_fit",
      "transform": [
        {
          "expr": "hover && hover.datum.x === datum.x",
          "type": "filter"
        }
      ]
    },
    {
      "name": "highlightedResidualsPoint",
      "source": "sas_result_fit",
      "transform": [
        {
          "expr": "hover && hover.datum.x === datum.x",
          "type": "filter"
        }
      ]
    }
  ],
  "marks": [
    {
      "axes": [
        {
          "aria": false,
          "grid": true,
          "scale": "mainX",
          "ticks": true,
          "title": "Q (A^-1)",
          "domain": false,
          "labels": true,
          "orient": "bottom",
          "zindex": 0,
          "gridScale": "mainY",
          "maxExtent": 0,
          "minExtent": 0,
          "tickCount": {
            "signal": "ceil(width/200)"
          },
          "titlePadding": 20
        },
        {
          "aria": false,
          "grid": true,
          "scale": "mainY",
          "ticks": true,
          "title": "I (cm^-1)",
          "domain": false,
          "labels": true,
          "orient": "left",
          "zindex": 0,
          "maxExtent": 0,
          "minExtent": 0,
          "tickCount": {
            "signal": "ceil(mainHeight/100)"
          },
          "titlePadding": 40
        }
      ],
      "name": "mainGroup",
      "type": "group",
      "marks": [
        {
          "from": {
            "data": "sas_result_data"
          },
          "name": "dataPlot",
          "type": "line",
          "encode": {
            "enter": {
              "x": {
                "field": "x",
                "scale": "mainX"
              },
              "y": {
                "field": "y",
                "scale": "mainY"
              },
              "stroke": {
                "signal": "dataColor"
              }
            }
          }
        },
        {
          "from": {
            "data": "sas_result_data"
          },
          "name": "dataErrorPlot",
          "type": "area",
          "encode": {
            "enter": {
              "x": {
                "field": "x",
                "scale": "mainX"
              },
              "y": {
                "field": "errorLower",
                "scale": "mainY"
              },
              "y2": {
                "field": "errorUpper",
                "scale": "mainY"
              },
              "fill": {
                "value": "grey"
              },
              "fillOpacity": {
                "value": 0.3
              },
              "interpolate": {
                "value": "linear"
              }
            }
          }
        },
        {
          "from": {
            "data": "sas_result_fit"
          },
          "name": "fitPlot",
          "type": "line",
          "encode": {
            "enter": {
              "x": {
                "field": "x",
                "scale": "mainX"
              },
              "y": {
                "field": "y",
                "scale": "mainY"
              },
              "stroke": {
                "signal": "fitColor"
              }
            }
          }
        },
        {
          "from": {
            "data": "sas_result_data"
          },
          "name": "vPoints",
          "type": "symbol",
          "encode": {
            "update": {
              "x": {
                "field": "x",
                "scale": "mainX"
              },
              "y": {
                "value": 0
              },
              "fill": {
                "value": "transparent"
              },
              "size": {
                "value": 10
              },
              "stroke": {
                "value": "transparent"
              },
              "strokeWidth": {
                "value": 0.5
              }
            }
          }
        },
        {
          "from": {
            "data": "vPoints"
          },
          "name": "vCell",
          "type": "path",
          "encode": {
            "enter": {
              "fill": {
                "value": "transparent"
              },
              "stroke": {
                "value": "transparent"
              },
              "isVoronoi": {
                "value": true
              },
              "strokeWidth": {
                "value": 0.35
              }
            },
            "update": {
              "tooltip": {
                "signal": "datum.datum"
              }
            }
          },
          "transform": [
            {
              "x": "datum.x",
              "y": "datum.y",
              "size": [
                {
                  "signal": "width"
                },
                {
                  "signal": "height"
                }
              ],
              "type": "voronoi"
            }
          ]
        },
        {
          "from": {
            "data": "highlightedDataPoint"
          },
          "name": "dataPoint",
          "type": "symbol",
          "encode": {
            "enter": {
              "x": {
                "field": "x",
                "scale": "mainX"
              },
              "y": {
                "field": "y",
                "scale": "mainY"
              },
              "fill": {
                "signal": "dataColor"
              },
              "size": {
                "signal": "pointSize"
              },
              "fillOpacity": {
                "signal": "pointOpacity"
              }
            }
          },
          "interactive": false
        },
        {
          "from": {
            "data": "highlightedFitPoint"
          },
          "name": "fitPoint",
          "type": "symbol",
          "encode": {
            "enter": {
              "x": {
                "field": "x",
                "scale": "mainX"
              },
              "y": {
                "field": "y",
                "scale": "mainY"
              },
              "fill": {
                "signal": "fitColor"
              },
              "size": {
                "signal": "pointSize"
              },
              "fillOpacity": {
                "signal": "pointOpacity"
              }
            }
          },
          "interactive": false
        },
        {
          "name": "yRule",
          "type": "rule",
          "encode": {
            "update": {
              "x": {
                "scale": "mainX",
                "offset": 0.5,
                "signal": "xValue"
              },
              "y": {
                "value": 0
              },
              "y2": {
                "signal": "yRuleHeightMain"
              },
              "stroke": {
                "value": "grey"
              },
              "opacity": {
                "value": 0.5
              },
              "strokeWidth": {
                "value": 1.5
              }
            }
          },
          "interactive": false
        }
      ],
      "style": "cell",
      "encode": {
        "update": {
          "width": {
            "signal": "width"
          },
          "height": {
            "signal": "mainHeight"
          }
        }
      }
    },
    {
      "axes": [
        {
          "aria": false,
          "grid": true,
          "scale": "subX",
          "ticks": true,
          "title": "Residuals",
          "domain": false,
          "labels": true,
          "orient": "bottom",
          "zindex": 0,
          "gridScale": "subY",
          "maxExtent": 0,
          "minExtent": 0,
          "tickCount": {
            "signal": "ceil(width/200)"
          },
          "titlePadding": 20
        },
        {
          "aria": false,
          "grid": true,
          "scale": "subY",
          "ticks": true,
          "title": "I (cm^-1)",
          "domain": false,
          "labels": true,
          "orient": "left",
          "zindex": 0,
          "maxExtent": 0,
          "minExtent": 0,
          "tickCount": {
            "signal": "ceil(subHeight/100)"
          },
          "titlePadding": 40
        }
      ],
      "name": "subGroup",
      "type": "group",
      "marks": [
        {
          "clip": true,
          "from": {
            "data": "sas_result_fit"
          },
          "name": "residualsPlot",
          "type": "line",
          "encode": {
            "enter": {
              "x": {
                "field": "x",
                "scale": "subX"
              },
              "y": {
                "field": "residuals",
                "scale": "subY"
              },
              "stroke": {
                "signal": "fitColor"
              }
            }
          }
        },
        {
          "from": {
            "data": "highlightedResidualsPoint"
          },
          "name": "residualsPoint",
          "type": "symbol",
          "encode": {
            "enter": {
              "x": {
                "field": "x",
                "scale": "subX"
              },
              "y": {
                "field": "residuals",
                "scale": "subY"
              },
              "fill": {
                "signal": "fitColor"
              },
              "size": {
                "signal": "pointSize"
              },
              "fillOpacity": {
                "signal": "pointOpacity"
              }
            }
          },
          "interactive": false
        },
        {
          "name": "yRule",
          "type": "rule",
          "encode": {
            "update": {
              "x": {
                "scale": "subX",
                "offset": 0.5,
                "signal": "xValue"
              },
              "y": {
                "value": 0
              },
              "y2": {
                "signal": "yRuleHeightSub"
              },
              "stroke": {
                "value": "grey"
              },
              "opacity": {
                "value": 0.5
              },
              "strokeWidth": {
                "value": 1.5
              }
            }
          },
          "interactive": false
        }
      ],
      "style": "cell",
      "encode": {
        "update": {
          "width": {
            "signal": "width"
          },
          "height": {
            "signal": "subHeight"
          }
        }
      }
    }
  ],
  "layout": {
    "align": "each",
    "bounds": "full",
    "columns": 1,
    "padding": {
      "signal": "layoutPadding"
    }
  },
  "scales": [
    {
      "name": "mainX",
      "nice": false,
      "type": "log",
      "zero": false,
      "range": [
        0,
        {
          "signal": "width"
        }
      ],
      "domain": {
        "fields": [
          {
            "data": "sas_result_data",
            "field": "x"
          },
          {
            "data": "sas_result_fit",
            "field": "x"
          }
        ]
      }
    },
    {
      "name": "mainY",
      "nice": true,
      "type": "symlog",
      "zero": false,
      "range": [
        {
          "signal": "mainHeight"
        },
        0
      ],
      "round": true,
      "domain": {
        "fields": [
          {
            "data": "sas_result_data",
            "field": "y"
          },
          {
            "data": "sas_result_fit",
            "field": "y"
          }
        ]
      }
    },
    {
      "name": "subX",
      "nice": false,
      "type": "log",
      "zero": false,
      "range": [
        0,
        {
          "signal": "width"
        }
      ],
      "domain": {
        "fields": [
          {
            "data": "sas_result_data",
            "field": "x"
          },
          {
            "data": "sas_result_fit",
            "field": "x"
          }
        ]
      }
    },
    {
      "name": "subY",
      "nice": true,
      "type": "symlog",
      "zero": false,
      "range": [
        {
          "signal": "subHeight"
        },
        0
      ],
      "round": true,
      "domain": {
        "fields": [
          {
            "data": "sas_result_fit",
            "field": "residuals"
          }
        ]
      }
    }
  ],
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "signals": [
    {
      "on": [
        {
          "events": "@vCell:mouseover",
          "update": "datum"
        },
        {
          "events": "@vCell:mouseout",
          "update": "null"
        }
      ],
      "name": "hover",
      "value": null
    },
    {
      "on": [
        {
          "events": "window:resize",
          "update": "isFinite(containerSize()[0]) ? containerSize()[0] : 500"
        }
      ],
      "init": "isFinite(containerSize()[0]) ? containerSize()[0] : 500",
      "name": "width"
    },
    {
      "on": [
        {
          "events": "window:resize",
          "update": "isFinite(containerSize()[1]) ? containerSize()[1] : 500"
        }
      ],
      "init": "isFinite(containerSize()[1]) ? containerSize()[1] : 500",
      "name": "height"
    },
    {
      "on": [
        {
          "events": "mousemove",
          "update": "invert('mainX', clamp(x(), 0, width))"
        }
      ],
      "name": "xValue",
      "value": 0
    },
    {
      "on": [
        {
          "events": "@vCell:mousemove",
          "update": "mainHeight"
        },
        {
          "events": "@vCell:mouseout",
          "update": "null"
        }
      ],
      "name": "yRuleHeightMain",
      "value": 0
    },
    {
      "on": [
        {
          "events": "@vCell:mousemove",
          "update": "subHeight"
        },
        {
          "events": "@vCell:mouseout",
          "update": "null"
        }
      ],
      "name": "yRuleHeightSub",
      "value": 0
    },
    {
      "on": [
        {
          "events": {
            "type": "resize",
            "source": "window"
          },
          "update": "pluck(data('data'), 'x')"
        }
      ],
      "name": "dataX",
      "value": 0
    },
    {
      "on": [
        {
          "events": "window:resize",
          "update": "height/1.8"
        }
      ],
      "init": "height/1.8",
      "name": "mainHeight",
      "value": "null"
    },
    {
      "on": [
        {
          "events": "window:resize",
          "update": "clamp(height - mainHeight - boxModelOffset, 0, MAX_VALUE)"
        }
      ],
      "init": "clamp(height - mainHeight - boxModelOffset, 0, MAX_VALUE)",
      "name": "subHeight",
      "value": "null"
    },
    {
      "name": "layoutPadding",
      "value": 20
    },
    {
      "init": "layoutPadding * 4 + 15",
      "name": "boxModelOffset"
    },
    {
      "name": "fitColor",
      "value": "firebrick"
    },
    {
      "name": "dataColor",
      "value": "steelblue"
    },
    {
      "on": [
        {
          "events": "window:resize",
          "update": "height/12"
        }
      ],
      "init": "height/12",
      "name": "pointSize"
    },
    {
      "name": "pointOpacity",
      "value": 0.8
    }
  ],
  "autosize": "fit"
};

export const DATA_1: DataRecord = {
  'sas_result_data': [
    {
      "dlam": null,
      "dx": 0.00144239,
      "dy": 1.93973,
      "lam": null,
      "x": 0.00714,
      "y": 226.539,
      "errorLower": 224.59927,
      "errorUpper": 228.47872999999998,
      "yFit": 594.7156752091166,
      "residuals": 189.80820795116674
    },
    {
      "dlam": null,
      "dx": 0.00147496,
      "dy": 1.62915,
      "lam": null,
      "x": 0.0074256,
      "y": 221.513,
      "errorLower": 219.88385,
      "errorUpper": 223.14215000000002,
      "yFit": 628.1034648613285,
      "residuals": 249.57214796754653
    },
    {
      "dlam": null,
      "dx": 0.0015166,
      "dy": 1.48514,
      "lam": null,
      "x": 0.00772262,
      "y": 227.287,
      "errorLower": 225.80186,
      "errorUpper": 228.77214,
      "yFit": 664.9377380458241,
      "residuals": 294.68651982023516
    },
    {
      "dlam": null,
      "dx": 0.00155158,
      "dy": 1.3466,
      "lam": null,
      "x": 0.00803153,
      "y": 224.28,
      "errorLower": 222.9334,
      "errorUpper": 225.6266,
      "yFit": 704.0209311986553,
      "residuals": 356.26090241991335
    },
    {
      "dlam": null,
      "dx": 0.00159088,
      "dy": 1.18008,
      "lam": null,
      "x": 0.00835279,
      "y": 223.997,
      "errorLower": 222.81692,
      "errorUpper": 225.17708000000002,
      "yFit": 745.5609303524525,
      "residuals": 441.9733665111284
    },
    {
      "dlam": null,
      "dx": 0.00162593,
      "dy": 1.05878,
      "lam": null,
      "x": 0.0086869,
      "y": 223.672,
      "errorLower": 222.61321999999998,
      "errorUpper": 224.73078,
      "yFit": 787.8436630053666,
      "residuals": 532.8506989226908
    },
    {
      "dlam": null,
      "dx": 0.00168048,
      "dy": 0.976591,
      "lam": null,
      "x": 0.00903438,
      "y": 228.475,
      "errorLower": 227.49840899999998,
      "errorUpper": 229.451591,
      "yFit": 833.7939188865907,
      "residuals": 619.8284838653958
    },
    {
      "dlam": null,
      "dx": 0.00170509,
      "dy": 0.900282,
      "lam": null,
      "x": 0.00939575,
      "y": 229.011,
      "errorLower": 228.110718,
      "errorUpper": 229.911282,
      "yFit": 881.0434283593453,
      "residuals": 724.2535431779656
    },
    {
      "dlam": null,
      "dx": 0.00172049,
      "dy": 0.884191,
      "lam": null,
      "x": 0.00977158,
      "y": 235.962,
      "errorLower": 235.077809,
      "errorUpper": 236.84619099999998,
      "yFit": 929.1405989885193,
      "residuals": 783.969299606668
    },
    {
      "dlam": null,
      "dx": 0.00171975,
      "dy": 0.84357,
      "lam": null,
      "x": 0.0101624,
      "y": 241.236,
      "errorLower": 240.39243,
      "errorUpper": 242.07957,
      "yFit": 980.3772408976719,
      "residuals": 876.2061724547718
    },
    {
      "dlam": null,
      "dx": 0.00173361,
      "dy": 0.807803,
      "lam": null,
      "x": 0.0105689,
      "y": 247.454,
      "errorLower": 246.646197,
      "errorUpper": 248.26180300000001,
      "yFit": 1030.4215667412864,
      "residuals": 969.2555817956685
    },
    {
      "dlam": null,
      "dx": 0.00176472,
      "dy": 0.787324,
      "lam": null,
      "x": 0.0109917,
      "y": 256.09,
      "errorLower": 255.30267599999996,
      "errorUpper": 256.877324,
      "yFit": 1079.3556824902878,
      "residuals": 1045.6504342434473
    },
    {
      "dlam": null,
      "dx": 0.00182598,
      "dy": 0.755671,
      "lam": null,
      "x": 0.0114314,
      "y": 269.423,
      "errorLower": 268.667329,
      "errorUpper": 270.178671,
      "yFit": 1126.453775028181,
      "residuals": 1134.132148816325
    },
    {
      "dlam": null,
      "dx": 0.00187949,
      "dy": 0.711765,
      "lam": null,
      "x": 0.0118886,
      "y": 282.029,
      "errorLower": 281.317235,
      "errorUpper": 282.740765,
      "yFit": 1167.5684621522319,
      "residuals": 1244.1458376742771
    },
    {
      "dlam": null,
      "dx": 0.00193137,
      "dy": 0.704532,
      "lam": null,
      "x": 0.0123642,
      "y": 296.626,
      "errorLower": 295.921468,
      "errorUpper": 297.33053199999995,
      "yFit": 1202.112317621233,
      "residuals": 1285.2309300659629
    },
    {
      "dlam": null,
      "dx": 0.00198554,
      "dy": 0.68349,
      "lam": null,
      "x": 0.0128587,
      "y": 318.537,
      "errorLower": 317.85350999999997,
      "errorUpper": 319.22049,
      "yFit": 1227.7696865785122,
      "residuals": 1330.2794284898273
    },
    {
      "dlam": null,
      "dx": 0.00203315,
      "dy": 0.675291,
      "lam": null,
      "x": 0.0133731,
      "y": 345.447,
      "errorLower": 344.771709,
      "errorUpper": 346.122291,
      "yFit": 1243.0094275779782,
      "residuals": 1329.1491039832874
    },
    {
      "dlam": null,
      "dx": 0.00208813,
      "dy": 0.668046,
      "lam": null,
      "x": 0.013908,
      "y": 377.838,
      "errorLower": 377.169954,
      "errorUpper": 378.506046,
      "yFit": 1246.1857101358723,
      "residuals": 1299.832212356443
    },
    {
      "dlam": null,
      "dx": 0.00213326,
      "dy": 0.678959,
      "lam": null,
      "x": 0.0144643,
      "y": 418.942,
      "errorLower": 418.263041,
      "errorUpper": 419.620959,
      "yFit": 1233.9666897964098,
      "residuals": 1200.4033966652034
    },
    {
      "dlam": null,
      "dx": 0.00217358,
      "dy": 0.686981,
      "lam": null,
      "x": 0.0150429,
      "y": 467.433,
      "errorLower": 466.746019,
      "errorUpper": 468.119981,
      "yFit": 1206.3907504158715,
      "residuals": 1075.6596622262794
    },
    {
      "dlam": null,
      "dx": 0.00220131,
      "dy": 0.703031,
      "lam": null,
      "x": 0.0156446,
      "y": 521.277,
      "errorLower": 520.573969,
      "errorUpper": 521.980031,
      "yFit": 1165.0768651812634,
      "residuals": 915.7489003774563
    },
    {
      "dlam": null,
      "dx": 0.00222531,
      "dy": 0.727639,
      "lam": null,
      "x": 0.0162704,
      "y": 587.111,
      "errorLower": 586.383361,
      "errorUpper": 587.838639,
      "yFit": 1105.847156450134,
      "residuals": 712.9031792552818
    },
    {
      "dlam": null,
      "dx": 0.00226428,
      "dy": 0.744067,
      "lam": null,
      "x": 0.0169212,
      "y": 657.003,
      "errorLower": 656.2589330000001,
      "errorUpper": 657.747067,
      "yFit": 1029.75619833087,
      "residuals": 500.9672493617777
    },
    {
      "dlam": null,
      "dx": 0.00227136,
      "dy": 0.754121,
      "lam": null,
      "x": 0.0175981,
      "y": 727.944,
      "errorLower": 727.1898789999999,
      "errorUpper": 728.698121,
      "yFit": 940.9165765484569,
      "residuals": 282.411677368031
    },
    {
      "dlam": null,
      "dx": 0.00228228,
      "dy": 0.762387,
      "lam": null,
      "x": 0.018302,
      "y": 789.992,
      "errorLower": 789.229613,
      "errorUpper": 790.754387,
      "yFit": 841.7114391564263,
      "residuals": 67.8388261557796
    },
    {
      "dlam": null,
      "dx": 0.00229589,
      "dy": 0.750767,
      "lam": null,
      "x": 0.0190341,
      "y": 832.073,
      "errorLower": 831.322233,
      "errorUpper": 832.823767,
      "yFit": 736.7364242439793,
      "residuals": -126.98557043133316
    },
    {
      "dlam": null,
      "dx": 0.00231852,
      "dy": 0.728338,
      "lam": null,
      "x": 0.0197954,
      "y": 839.815,
      "errorLower": 839.086662,
      "errorUpper": 840.5433380000001,
      "yFit": 624.8305891347636,
      "residuals": -295.17121290559663
    },
    {
      "dlam": null,
      "dx": 0.00233235,
      "dy": 0.680064,
      "lam": null,
      "x": 0.0205873,
      "y": 805.586,
      "errorLower": 804.905936,
      "errorUpper": 806.266064,
      "yFit": 517.7287382740686,
      "residuals": -423.2796644520683
    },
    {
      "dlam": null,
      "dx": 0.00237326,
      "dy": 0.609523,
      "lam": null,
      "x": 0.0214107,
      "y": 732.561,
      "errorLower": 731.9514770000001,
      "errorUpper": 733.170523,
      "yFit": 417.42508393303734,
      "residuals": -517.0205489652773
    },
    {
      "dlam": null,
      "dx": 0.00244917,
      "dy": 0.525037,
      "lam": null,
      "x": 0.0222672,
      "y": 623.581,
      "errorLower": 623.055963,
      "errorUpper": 624.106037,
      "yFit": 327.71996959657736,
      "residuals": -563.5051061228497
    },
    {
      "dlam": null,
      "dx": 0.00254252,
      "dy": 0.431254,
      "lam": null,
      "x": 0.0231579,
      "y": 498.338,
      "errorLower": 497.906746,
      "errorUpper": 498.76925400000005,
      "yFit": 250.13900151053926,
      "residuals": -575.5285713047549
    },
    {
      "dlam": null,
      "dx": 0.00263583,
      "dy": 0.345621,
      "lam": null,
      "x": 0.0240842,
      "y": 379.651,
      "errorLower": 379.305379,
      "errorUpper": 379.996621,
      "yFit": 184.8421981090658,
      "residuals": -563.648626359319
    },
    {
      "dlam": null,
      "dx": 0.00274294,
      "dy": 0.275152,
      "lam": null,
      "x": 0.0250475,
      "y": 277.92,
      "errorLower": 277.644848,
      "errorUpper": 278.195152,
      "yFit": 132.19872388016105,
      "residuals": -529.6028236023687
    },
    {
      "dlam": null,
      "dx": 0.0028428,
      "dy": 0.215742,
      "lam": null,
      "x": 0.0260494,
      "y": 199.772,
      "errorLower": 199.55625799999999,
      "errorUpper": 199.987742,
      "yFit": 90.91124383355539,
      "residuals": -504.5876842081959
    },
    {
      "dlam": null,
      "dx": 0.00286564,
      "dy": 0.172114,
      "lam": null,
      "x": 0.0270914,
      "y": 141.351,
      "errorLower": 141.178886,
      "errorUpper": 141.523114,
      "yFit": 56.234826621458275,
      "residuals": -494.53370079448354
    },
    {
      "dlam": null,
      "dx": 0.00289349,
      "dy": 0.138782,
      "lam": null,
      "x": 0.0281751,
      "y": 102.756,
      "errorLower": 102.617218,
      "errorUpper": 102.894782,
      "yFit": 34.58145206268919,
      "residuals": -491.2347994502949
    },
    {
      "dlam": null,
      "dx": 0.00289295,
      "dy": 0.114218,
      "lam": null,
      "x": 0.0293021,
      "y": 78.1058,
      "errorLower": 77.99158200000001,
      "errorUpper": 78.220018,
      "yFit": 20.770238179186027,
      "residuals": -501.9835912099142
    },
    {
      "dlam": null,
      "dx": 0.00284193,
      "dy": 0.0977755,
      "lam": null,
      "x": 0.0304742,
      "y": 62.5493,
      "errorLower": 62.451524500000005,
      "errorUpper": 62.6470755,
      "yFit": 12.505942974822046,
      "residuals": -511.8189835406411
    },
    {
      "dlam": null,
      "dx": 0.0027452,
      "dy": 0.0869322,
      "lam": null,
      "x": 0.0316931,
      "y": 53.8731,
      "errorLower": 53.7861678,
      "errorUpper": 53.9600322,
      "yFit": 10.7252045358092,
      "residuals": -496.3396240310357
    },
    {
      "dlam": null,
      "dx": 0.0026771,
      "dy": 0.0804389,
      "lam": null,
      "x": 0.0329609,
      "y": 49.8906,
      "errorLower": 49.8101611,
      "errorUpper": 49.971038899999996,
      "yFit": 12.622188153165856,
      "residuals": -463.3132955178918
    },
    {
      "dlam": null,
      "dx": 0.00262863,
      "dy": 0.0759295,
      "lam": null,
      "x": 0.0342793,
      "y": 48.5347,
      "errorLower": 48.4587705,
      "errorUpper": 48.6106295,
      "yFit": 16.836891823389934,
      "residuals": -417.46367586524434
    },
    {
      "dlam": null,
      "dx": 0.00257297,
      "dy": 0.0728817,
      "lam": null,
      "x": 0.0356505,
      "y": 47.7805,
      "errorLower": 47.7076183,
      "errorUpper": 47.85338170000001,
      "yFit": 21.3498645864527,
      "residuals": -362.65119246048465
    },
    {
      "dlam": null,
      "dx": 0.00256056,
      "dy": 0.0692472,
      "lam": null,
      "x": 0.0370765,
      "y": 46.4139,
      "errorLower": 46.3446528,
      "errorUpper": 46.4831472,
      "yFit": 24.98386593987589,
      "residuals": -309.47148852407184
    },
    {
      "dlam": null,
      "dx": 0.00256325,
      "dy": 0.0640746,
      "lam": null,
      "x": 0.0385595,
      "y": 43.3373,
      "errorLower": 43.2732254,
      "errorUpper": 43.4013746,
      "yFit": 26.409891253395084,
      "residuals": -264.1828235619874
    },
    {
      "dlam": null,
      "dx": 0.00258859,
      "dy": 0.0581762,
      "lam": null,
      "x": 0.0401019,
      "y": 38.7575,
      "errorLower": 38.6993238,
      "errorUpper": 38.8156762,
      "yFit": 25.443067111121852,
      "residuals": -228.86391494938047
    },
    {
      "dlam": null,
      "dx": 0.002619,
      "dy": 0.0513839,
      "lam": null,
      "x": 0.041706,
      "y": 32.8237,
      "errorLower": 32.772316100000005,
      "errorUpper": 32.8750839,
      "yFit": 22.31244728454257,
      "residuals": -204.5631552968426
    },
    {
      "dlam": null,
      "dx": 0.00267382,
      "dy": 0.0443289,
      "lam": null,
      "x": 0.0433742,
      "y": 26.4637,
      "errorLower": 26.4193711,
      "errorUpper": 26.5080289,
      "yFit": 17.66628478054633,
      "residuals": -198.45778305921576
    },
    {
      "dlam": null,
      "dx": 0.00272568,
      "dy": 0.0378276,
      "lam": null,
      "x": 0.0451092,
      "y": 20.8371,
      "errorLower": 20.7992724,
      "errorUpper": 20.8749276,
      "yFit": 12.48008994959975,
      "residuals": -220.9236126637759
    },
    {
      "dlam": null,
      "dx": 0.00276587,
      "dy": 0.0320347,
      "lam": null,
      "x": 0.0469136,
      "y": 16.2119,
      "errorLower": 16.1798653,
      "errorUpper": 16.2439347,
      "yFit": 7.699263224961208,
      "residuals": -265.73174635750587
    },
    {
      "dlam": null,
      "dx": 0.00279571,
      "dy": 0.0278154,
      "lam": null,
      "x": 0.0487901,
      "y": 13.0286,
      "errorLower": 13.000784600000001,
      "errorUpper": 13.0564154,
      "yFit": 3.8645861384283373,
      "residuals": -329.45828072117115
    },
    {
      "dlam": null,
      "dx": 0.00281708,
      "dy": 0.0245709,
      "lam": null,
      "x": 0.0507417,
      "y": 10.9345,
      "errorLower": 10.9099291,
      "errorUpper": 10.9590709,
      "yFit": 1.8611969330584426,
      "residuals": -369.27027772452607
    },
    {
      "dlam": null,
      "dx": 0.00282959,
      "dy": 0.0222794,
      "lam": null,
      "x": 0.0527714,
      "y": 9.67899,
      "errorLower": 9.6567106,
      "errorUpper": 9.701269400000001,
      "yFit": 1.4196773595821721,
      "residuals": -370.7152185614437
    },
    {
      "dlam": null,
      "dx": 0.0028401,
      "dy": 0.0206342,
      "lam": null,
      "x": 0.0548822,
      "y": 8.78581,
      "errorLower": 8.7651758,
      "errorUpper": 8.8064442,
      "yFit": 2.1101023242948878,
      "residuals": -323.52636282022627
    },
    {
      "dlam": null,
      "dx": 0.00286615,
      "dy": 0.0191646,
      "lam": null,
      "x": 0.0570775,
      "y": 8.02647,
      "errorLower": 8.0073054,
      "errorUpper": 8.0456346,
      "yFit": 3.2444428948983135,
      "residuals": -249.5239715465852
    },
    {
      "dlam": null,
      "dx": 0.00290825,
      "dy": 0.0176645,
      "lam": null,
      "x": 0.0593606,
      "y": 7.19768,
      "errorLower": 7.1800155,
      "errorUpper": 7.2153445000000005,
      "yFit": 4.099096700118251,
      "residuals": -175.41302045807973
    },
    {
      "dlam": null,
      "dx": 0.00296442,
      "dy": 0.0160657,
      "lam": null,
      "x": 0.0617351,
      "y": 6.25872,
      "errorLower": 6.2426543,
      "errorUpper": 6.274785700000001,
      "yFit": 4.195065775330769,
      "residuals": -128.4509373802095
    },
    {
      "dlam": null,
      "dx": 0.00303237,
      "dy": 0.0145183,
      "lam": null,
      "x": 0.0642045,
      "y": 5.30149,
      "errorLower": 5.2869717000000005,
      "errorUpper": 5.3160083,
      "yFit": 3.4757604737072643,
      "residuals": -125.75367131776696
    },
    {
      "dlam": null,
      "dx": 0.00310777,
      "dy": 0.0131602,
      "lam": null,
      "x": 0.0667726,
      "y": 4.52106,
      "errorLower": 4.507899800000001,
      "errorUpper": 4.5342202,
      "yFit": 2.2910574956884084,
      "residuals": -169.4505025996255
    },
    {
      "dlam": null,
      "dx": 0.00317865,
      "dy": 0.0120429,
      "lam": null,
      "x": 0.0694435,
      "y": 3.93014,
      "errorLower": 3.9180971,
      "errorUpper": 3.9421829,
      "yFit": 1.1776951805548224,
      "residuals": -228.55332348895845
    },
    {
      "dlam": null,
      "dx": 0.00323071,
      "dy": 0.0112192,
      "lam": null,
      "x": 0.0722213,
      "y": 3.49251,
      "errorLower": 3.4812907999999996,
      "errorUpper": 3.5037292,
      "yFit": 0.5600044095230652,
      "residuals": -261.38277154136966
    },
    {
      "dlam": null,
      "dx": 0.00329721,
      "dy": 0.0105821,
      "lam": null,
      "x": 0.0751101,
      "y": 3.18734,
      "errorLower": 3.1767578999999997,
      "errorUpper": 3.1979221,
      "yFit": 0.5263028657314547,
      "residuals": -251.46588430165514
    },
    {
      "dlam": null,
      "dx": 0.00336836,
      "dy": 0.0100843,
      "lam": null,
      "x": 0.0781145,
      "y": 2.92726,
      "errorLower": 2.9171757,
      "errorUpper": 2.9373443,
      "yFit": 0.8987631419722563,
      "residuals": -201.1539579373624
    },
    {
      "dlam": null,
      "dx": 0.00345727,
      "dy": 0.00955912,
      "lam": null,
      "x": 0.0812391,
      "y": 2.64566,
      "errorLower": 2.63610088,
      "errorUpper": 2.65521912,
      "yFit": 1.1896069965962524,
      "residuals": -152.32082068263057
    },
    {
      "dlam": null,
      "dx": 0.0035437,
      "dy": 0.00901861,
      "lam": null,
      "x": 0.0844887,
      "y": 2.37452,
      "errorLower": 2.36550139,
      "errorUpper": 2.38353861,
      "yFit": 1.1170175086363778,
      "residuals": -139.43418014124373
    },
    {
      "dlam": null,
      "dx": 0.00362227,
      "dy": 0.00853411,
      "lam": null,
      "x": 0.0878682,
      "y": 2.13092,
      "errorLower": 2.1223858900000003,
      "errorUpper": 2.13945411,
      "yFit": 0.7375118985760059,
      "residuals": -163.2751512956822
    },
    {
      "dlam": null,
      "dx": 0.0036993,
      "dy": 0.00801442,
      "lam": null,
      "x": 0.091383,
      "y": 1.93426,
      "errorLower": 1.92624558,
      "errorUpper": 1.9422744200000002,
      "yFit": 0.34518041662814325,
      "residuals": -198.2775526328614
    },
    {
      "dlam": null,
      "dx": 0.00374223,
      "dy": 0.00759625,
      "lam": null,
      "x": 0.0950383,
      "y": 1.7841,
      "errorLower": 1.77650375,
      "errorUpper": 1.79169625,
      "yFit": 0.21212960236793044,
      "residuals": -206.94031892474177
    },
    {
      "dlam": null,
      "dx": 0.00381774,
      "dy": 0.00721554,
      "lam": null,
      "x": 0.0988398,
      "y": 1.65305,
      "errorLower": 1.6458344599999999,
      "errorUpper": 1.66026554,
      "yFit": 0.3305050582112544,
      "residuals": -183.29119397699208
    },
    {
      "dlam": null,
      "dx": 0.00388979,
      "dy": 0.00691554,
      "lam": null,
      "x": 0.102793,
      "y": 1.52134,
      "errorLower": 1.5144244599999999,
      "errorUpper": 1.52825554,
      "yFit": 0.4530306688678962,
      "residuals": -154.47952453924114
    },
    {
      "dlam": null,
      "dx": 0.00396133,
      "dy": 0.0066253,
      "lam": null,
      "x": 0.106905,
      "y": 1.40698,
      "errorLower": 1.4003546999999998,
      "errorUpper": 1.4136053,
      "yFit": 0.38912781050128376,
      "residuals": -153.63110945900056
    },
    {
      "dlam": null,
      "dx": 0.0040448,
      "dy": 0.00633815,
      "lam": null,
      "x": 0.111181,
      "y": 1.28636,
      "errorLower": 1.28002185,
      "errorUpper": 1.2926981499999999,
      "yFit": 0.20757031599786563,
      "residuals": -170.20576729836534
    },
    {
      "dlam": null,
      "dx": 0.00412381,
      "dy": 0.00611845,
      "lam": null,
      "x": 0.115629,
      "y": 1.19797,
      "errorLower": 1.19185155,
      "errorUpper": 1.20408845,
      "yFit": 0.11368599530182577,
      "residuals": -177.21547200650068
    },
    {
      "dlam": null,
      "dx": 0.00420457,
      "dy": 0.00589653,
      "lam": null,
      "x": 0.120254,
      "y": 1.12096,
      "errorLower": 1.11506347,
      "errorUpper": 1.12685653,
      "yFit": 0.16208829371310413,
      "residuals": -162.61626859981988
    },
    {
      "dlam": null,
      "dx": 0.00427869,
      "dy": 0.00572062,
      "lam": null,
      "x": 0.125064,
      "y": 1.05444,
      "errorLower": 1.04871938,
      "errorUpper": 1.06016062,
      "yFit": 0.2059896036114229,
      "residuals": -148.31441284136633
    },
    {
      "dlam": null,
      "dx": 0.00438243,
      "dy": 0.00560039,
      "lam": null,
      "x": 0.130066,
      "y": 0.982053,
      "errorLower": 0.9764526099999999,
      "errorUpper": 0.98765339,
      "yFit": 0.14450378690903282,
      "residuals": -149.5519442558406
    },
    {
      "dlam": null,
      "dx": 0.00449707,
      "dy": 0.00551959,
      "lam": null,
      "x": 0.135269,
      "y": 0.930887,
      "errorLower": 0.92536741,
      "errorUpper": 0.93640659,
      "yFit": 0.07212216366138106,
      "residuals": -155.58489604094126
    },
    {
      "dlam": null,
      "dx": 0.00460143,
      "dy": 0.00546427,
      "lam": null,
      "x": 0.14068,
      "y": 0.882886,
      "errorLower": 0.8774217299999999,
      "errorUpper": 0.88835027,
      "yFit": 0.08222562739010415,
      "residuals": -146.526502645348
    },
    {
      "dlam": null,
      "dx": 0.00471315,
      "dy": 0.00543486,
      "lam": null,
      "x": 0.146307,
      "y": 0.846909,
      "errorLower": 0.84147414,
      "errorUpper": 0.8523438600000001,
      "yFit": 0.10453116476014196,
      "residuals": -136.59557656312361
    },
    {
      "dlam": null,
      "dx": 0.00482935,
      "dy": 0.00541176,
      "lam": null,
      "x": 0.152159,
      "y": 0.795072,
      "errorLower": 0.78966024,
      "errorUpper": 0.80048376,
      "yFit": 0.06923038387359784,
      "residuals": -134.12302395642124
    },
    {
      "dlam": null,
      "dx": 0.00494456,
      "dy": 0.00543268,
      "lam": null,
      "x": 0.158246,
      "y": 0.765342,
      "errorLower": 0.75990932,
      "errorUpper": 0.7707746799999999,
      "yFit": 0.04210502637856247,
      "residuals": -133.12710736164058
    },
    {
      "dlam": null,
      "dx": 0.00506276,
      "dy": 0.00544301,
      "lam": null,
      "x": 0.164576,
      "y": 0.725141,
      "errorLower": 0.71969799,
      "errorUpper": 0.7305840100000001,
      "yFit": 0.05651901388674973,
      "residuals": -122.84048460562268
    },
    {
      "dlam": null,
      "dx": 0.00519308,
      "dy": 0.00556163,
      "lam": null,
      "x": 0.171159,
      "y": 0.69475,
      "errorLower": 0.68918837,
      "errorUpper": 0.70031163,
      "yFit": 0.04929943214299541,
      "residuals": -116.05420854264031
    },
    {
      "dlam": null,
      "dx": 0.00532144,
      "dy": 0.00568705,
      "lam": null,
      "x": 0.178005,
      "y": 0.664438,
      "errorLower": 0.65875095,
      "errorUpper": 0.67012505,
      "yFit": 0.027006186998035895,
      "residuals": -112.08479141241313
    },
    {
      "dlam": null,
      "dx": 0.00544726,
      "dy": 0.00589887,
      "lam": null,
      "x": 0.185125,
      "y": 0.640604,
      "errorLower": 0.63470513,
      "errorUpper": 0.64650287,
      "yFit": 0.03336437077499559,
      "residuals": -102.94168700530855
    },
    {
      "dlam": null,
      "dx": 0.00558291,
      "dy": 0.00622744,
      "lam": null,
      "x": 0.19253,
      "y": 0.625173,
      "errorLower": 0.61894556,
      "errorUpper": 0.63140044,
      "yFit": 0.030579179024976828,
      "residuals": -95.47965471767262
    },
    {
      "dlam": null,
      "dx": 0.00570866,
      "dy": 0.00663393,
      "lam": null,
      "x": 0.200231,
      "y": 0.5956,
      "errorLower": 0.58896607,
      "errorUpper": 0.60223393,
      "yFit": 0.018484793892093624,
      "residuals": -86.99446724760531
    },
    {
      "dlam": null,
      "dx": 0.00583848,
      "dy": 0.00724923,
      "lam": null,
      "x": 0.208241,
      "y": 0.582752,
      "errorLower": 0.57550277,
      "errorUpper": 0.59000123,
      "yFit": 0.02272011331185366,
      "residuals": -77.25398237994193
    },
    {
      "dlam": null,
      "dx": 0.00595692,
      "dy": 0.00810892,
      "lam": null,
      "x": 0.21657,
      "y": 0.571269,
      "errorLower": 0.5631600800000001,
      "errorUpper": 0.57937792,
      "yFit": 0.016528860267945124,
      "residuals": -68.41110033543985
    },
    {
      "dlam": null,
      "dx": 0.00607578,
      "dy": 0.00929792,
      "lam": null,
      "x": 0.225233,
      "y": 0.563012,
      "errorLower": 0.55371408,
      "errorUpper": 0.5723099199999999,
      "yFit": 0.014281626890903707,
      "residuals": -59.016465307197336
    },
    {
      "dlam": null,
      "dx": 0.00621921,
      "dy": 0.010755,
      "lam": null,
      "x": 0.234242,
      "y": 0.539121,
      "errorLower": 0.528366,
      "errorUpper": 0.5498759999999999,
      "yFit": 0.014109910467660195,
      "residuals": -48.81553598627055
    },
    {
      "dlam": null,
      "dx": 0.00636952,
      "dy": 0.0125021,
      "lam": null,
      "x": 0.243612,
      "y": 0.511661,
      "errorLower": 0.4991589,
      "errorUpper": 0.5241631,
      "yFit": 0.010560545080817281,
      "residuals": -40.08130273467519
    },
    {
      "dlam": null,
      "dx": 0.00613893,
      "dy": 0.0181216,
      "lam": null,
      "x": 0.251694,
      "y": 0.520131,
      "errorLower": 0.5020094,
      "errorUpper": 0.5382526,
      "yFit": 0.011034074904657878,
      "residuals": -28.093376142026205
    }
  ],
  'sas_result_fit': [
    {
      "residuals": 189.80820795116674,
      "x": 0.00714,
      "y": 594.7156752091166
    },
    {
      "residuals": 249.57214796754653,
      "x": 0.0074256,
      "y": 628.1034648613285
    },
    {
      "residuals": 294.68651982023516,
      "x": 0.00772262,
      "y": 664.9377380458241
    },
    {
      "residuals": 356.26090241991335,
      "x": 0.00803153,
      "y": 704.0209311986553
    },
    {
      "residuals": 441.9733665111284,
      "x": 0.00835279,
      "y": 745.5609303524525
    },
    {
      "residuals": 532.8506989226908,
      "x": 0.0086869,
      "y": 787.8436630053666
    },
    {
      "residuals": 619.8284838653958,
      "x": 0.00903438,
      "y": 833.7939188865907
    },
    {
      "residuals": 724.2535431779656,
      "x": 0.00939575,
      "y": 881.0434283593453
    },
    {
      "residuals": 783.969299606668,
      "x": 0.00977158,
      "y": 929.1405989885193
    },
    {
      "residuals": 876.2061724547718,
      "x": 0.0101624,
      "y": 980.3772408976719
    },
    {
      "residuals": 969.2555817956685,
      "x": 0.0105689,
      "y": 1030.4215667412864
    },
    {
      "residuals": 1045.6504342434473,
      "x": 0.0109917,
      "y": 1079.3556824902878
    },
    {
      "residuals": 1134.132148816325,
      "x": 0.0114314,
      "y": 1126.453775028181
    },
    {
      "residuals": 1244.1458376742771,
      "x": 0.0118886,
      "y": 1167.5684621522319
    },
    {
      "residuals": 1285.2309300659629,
      "x": 0.0123642,
      "y": 1202.112317621233
    },
    {
      "residuals": 1330.2794284898273,
      "x": 0.0128587,
      "y": 1227.7696865785122
    },
    {
      "residuals": 1329.1491039832874,
      "x": 0.0133731,
      "y": 1243.0094275779782
    },
    {
      "residuals": 1299.832212356443,
      "x": 0.013908,
      "y": 1246.1857101358723
    },
    {
      "residuals": 1200.4033966652034,
      "x": 0.0144643,
      "y": 1233.9666897964098
    },
    {
      "residuals": 1075.6596622262794,
      "x": 0.0150429,
      "y": 1206.3907504158715
    },
    {
      "residuals": 915.7489003774563,
      "x": 0.0156446,
      "y": 1165.0768651812634
    },
    {
      "residuals": 712.9031792552818,
      "x": 0.0162704,
      "y": 1105.847156450134
    },
    {
      "residuals": 500.9672493617777,
      "x": 0.0169212,
      "y": 1029.75619833087
    },
    {
      "residuals": 282.411677368031,
      "x": 0.0175981,
      "y": 940.9165765484569
    },
    {
      "residuals": 67.8388261557796,
      "x": 0.018302,
      "y": 841.7114391564263
    },
    {
      "residuals": -126.98557043133316,
      "x": 0.0190341,
      "y": 736.7364242439793
    },
    {
      "residuals": -295.17121290559663,
      "x": 0.0197954,
      "y": 624.8305891347636
    },
    {
      "residuals": -423.2796644520683,
      "x": 0.0205873,
      "y": 517.7287382740686
    },
    {
      "residuals": -517.0205489652773,
      "x": 0.0214107,
      "y": 417.42508393303734
    },
    {
      "residuals": -563.5051061228497,
      "x": 0.0222672,
      "y": 327.71996959657736
    },
    {
      "residuals": -575.5285713047549,
      "x": 0.0231579,
      "y": 250.13900151053926
    },
    {
      "residuals": -563.648626359319,
      "x": 0.0240842,
      "y": 184.8421981090658
    },
    {
      "residuals": -529.6028236023687,
      "x": 0.0250475,
      "y": 132.19872388016105
    },
    {
      "residuals": -504.5876842081959,
      "x": 0.0260494,
      "y": 90.91124383355539
    },
    {
      "residuals": -494.53370079448354,
      "x": 0.0270914,
      "y": 56.234826621458275
    },
    {
      "residuals": -491.2347994502949,
      "x": 0.0281751,
      "y": 34.58145206268919
    },
    {
      "residuals": -501.9835912099142,
      "x": 0.0293021,
      "y": 20.770238179186027
    },
    {
      "residuals": -511.8189835406411,
      "x": 0.0304742,
      "y": 12.505942974822046
    },
    {
      "residuals": -496.3396240310357,
      "x": 0.0316931,
      "y": 10.7252045358092
    },
    {
      "residuals": -463.3132955178918,
      "x": 0.0329609,
      "y": 12.622188153165856
    },
    {
      "residuals": -417.46367586524434,
      "x": 0.0342793,
      "y": 16.836891823389934
    },
    {
      "residuals": -362.65119246048465,
      "x": 0.0356505,
      "y": 21.3498645864527
    },
    {
      "residuals": -309.47148852407184,
      "x": 0.0370765,
      "y": 24.98386593987589
    },
    {
      "residuals": -264.1828235619874,
      "x": 0.0385595,
      "y": 26.409891253395084
    },
    {
      "residuals": -228.86391494938047,
      "x": 0.0401019,
      "y": 25.443067111121852
    },
    {
      "residuals": -204.5631552968426,
      "x": 0.041706,
      "y": 22.31244728454257
    },
    {
      "residuals": -198.45778305921576,
      "x": 0.0433742,
      "y": 17.66628478054633
    },
    {
      "residuals": -220.9236126637759,
      "x": 0.0451092,
      "y": 12.48008994959975
    },
    {
      "residuals": -265.73174635750587,
      "x": 0.0469136,
      "y": 7.699263224961208
    },
    {
      "residuals": -329.45828072117115,
      "x": 0.0487901,
      "y": 3.8645861384283373
    },
    {
      "residuals": -369.27027772452607,
      "x": 0.0507417,
      "y": 1.8611969330584426
    },
    {
      "residuals": -370.7152185614437,
      "x": 0.0527714,
      "y": 1.4196773595821721
    },
    {
      "residuals": -323.52636282022627,
      "x": 0.0548822,
      "y": 2.1101023242948878
    },
    {
      "residuals": -249.5239715465852,
      "x": 0.0570775,
      "y": 3.2444428948983135
    },
    {
      "residuals": -175.41302045807973,
      "x": 0.0593606,
      "y": 4.099096700118251
    },
    {
      "residuals": -128.4509373802095,
      "x": 0.0617351,
      "y": 4.195065775330769
    },
    {
      "residuals": -125.75367131776696,
      "x": 0.0642045,
      "y": 3.4757604737072643
    },
    {
      "residuals": -169.4505025996255,
      "x": 0.0667726,
      "y": 2.2910574956884084
    },
    {
      "residuals": -228.55332348895845,
      "x": 0.0694435,
      "y": 1.1776951805548224
    },
    {
      "residuals": -261.38277154136966,
      "x": 0.0722213,
      "y": 0.5600044095230652
    },
    {
      "residuals": -251.46588430165514,
      "x": 0.0751101,
      "y": 0.5263028657314547
    },
    {
      "residuals": -201.1539579373624,
      "x": 0.0781145,
      "y": 0.8987631419722563
    },
    {
      "residuals": -152.32082068263057,
      "x": 0.0812391,
      "y": 1.1896069965962524
    },
    {
      "residuals": -139.43418014124373,
      "x": 0.0844887,
      "y": 1.1170175086363778
    },
    {
      "residuals": -163.2751512956822,
      "x": 0.0878682,
      "y": 0.7375118985760059
    },
    {
      "residuals": -198.2775526328614,
      "x": 0.091383,
      "y": 0.34518041662814325
    },
    {
      "residuals": -206.94031892474177,
      "x": 0.0950383,
      "y": 0.21212960236793044
    },
    {
      "residuals": -183.29119397699208,
      "x": 0.0988398,
      "y": 0.3305050582112544
    },
    {
      "residuals": -154.47952453924114,
      "x": 0.102793,
      "y": 0.4530306688678962
    },
    {
      "residuals": -153.63110945900056,
      "x": 0.106905,
      "y": 0.38912781050128376
    },
    {
      "residuals": -170.20576729836534,
      "x": 0.111181,
      "y": 0.20757031599786563
    },
    {
      "residuals": -177.21547200650068,
      "x": 0.115629,
      "y": 0.11368599530182577
    },
    {
      "residuals": -162.61626859981988,
      "x": 0.120254,
      "y": 0.16208829371310413
    },
    {
      "residuals": -148.31441284136633,
      "x": 0.125064,
      "y": 0.2059896036114229
    },
    {
      "residuals": -149.5519442558406,
      "x": 0.130066,
      "y": 0.14450378690903282
    },
    {
      "residuals": -155.58489604094126,
      "x": 0.135269,
      "y": 0.07212216366138106
    },
    {
      "residuals": -146.526502645348,
      "x": 0.14068,
      "y": 0.08222562739010415
    },
    {
      "residuals": -136.59557656312361,
      "x": 0.146307,
      "y": 0.10453116476014196
    },
    {
      "residuals": -134.12302395642124,
      "x": 0.152159,
      "y": 0.06923038387359784
    },
    {
      "residuals": -133.12710736164058,
      "x": 0.158246,
      "y": 0.04210502637856247
    },
    {
      "residuals": -122.84048460562268,
      "x": 0.164576,
      "y": 0.05651901388674973
    },
    {
      "residuals": -116.05420854264031,
      "x": 0.171159,
      "y": 0.04929943214299541
    },
    {
      "residuals": -112.08479141241313,
      "x": 0.178005,
      "y": 0.027006186998035895
    },
    {
      "residuals": -102.94168700530855,
      "x": 0.185125,
      "y": 0.03336437077499559
    },
    {
      "residuals": -95.47965471767262,
      "x": 0.19253,
      "y": 0.030579179024976828
    },
    {
      "residuals": -86.99446724760531,
      "x": 0.200231,
      "y": 0.018484793892093624
    },
    {
      "residuals": -77.25398237994193,
      "x": 0.208241,
      "y": 0.02272011331185366
    },
    {
      "residuals": -68.41110033543985,
      "x": 0.21657,
      "y": 0.016528860267945124
    },
    {
      "residuals": -59.016465307197336,
      "x": 0.225233,
      "y": 0.014281626890903707
    },
    {
      "residuals": -48.81553598627055,
      "x": 0.234242,
      "y": 0.014109910467660195
    },
    {
      "residuals": -40.08130273467519,
      "x": 0.243612,
      "y": 0.010560545080817281
    },
    {
      "residuals": -28.093376142026205,
      "x": 0.251694,
      "y": 0.011034074904657878
    }
  ]
};

export const DATA_2: DataRecord = {
  'sas_result_data': [
    {
      "dlam": null,
      "dx": 0.00144239,
      "dy": 1.93973,
      "lam": null,
      "x": 0.00714,
      "y": 226.539,
      "errorLower": 224.59927,
      "errorUpper": 228.47872999999998,
      "yFit": 201.14353025229178,
      "residuals": -13.092270443674225
    },
    {
      "dlam": null,
      "dx": 0.00147496,
      "dy": 1.62915,
      "lam": null,
      "x": 0.0074256,
      "y": 221.513,
      "errorLower": 219.88385,
      "errorUpper": 223.14215000000002,
      "yFit": 205.29092895461838,
      "residuals": -9.957383325894869
    },
    {
      "dlam": null,
      "dx": 0.0015166,
      "dy": 1.48514,
      "lam": null,
      "x": 0.00772262,
      "y": 227.287,
      "errorLower": 225.80186,
      "errorUpper": 228.77214,
      "yFit": 209.91500495032528,
      "residuals": -11.697210397453926
    },
    {
      "dlam": null,
      "dx": 0.00155158,
      "dy": 1.3466,
      "lam": null,
      "x": 0.00803153,
      "y": 224.28,
      "errorLower": 222.9334,
      "errorUpper": 225.6266,
      "yFit": 214.89112069310778,
      "residuals": -6.9722852420111545
    },
    {
      "dlam": null,
      "dx": 0.00159088,
      "dy": 1.18008,
      "lam": null,
      "x": 0.00835279,
      "y": 223.997,
      "errorLower": 222.81692,
      "errorUpper": 225.17708000000002,
      "yFit": 220.3039218068919,
      "residuals": -3.1295151117789533
    },
    {
      "dlam": null,
      "dx": 0.00162593,
      "dy": 1.05878,
      "lam": null,
      "x": 0.0086869,
      "y": 223.672,
      "errorLower": 222.61321999999998,
      "errorUpper": 224.73078,
      "yFit": 225.99658853940122,
      "residuals": 2.1955349925397334
    },
    {
      "dlam": null,
      "dx": 0.00168048,
      "dy": 0.976591,
      "lam": null,
      "x": 0.00903438,
      "y": 228.475,
      "errorLower": 227.49840899999998,
      "errorUpper": 229.451591,
      "yFit": 232.5069590271238,
      "residuals": 4.128605554550272
    },
    {
      "dlam": null,
      "dx": 0.00170509,
      "dy": 0.900282,
      "lam": null,
      "x": 0.00939575,
      "y": 229.011,
      "errorLower": 228.110718,
      "errorUpper": 229.911282,
      "yFit": 239.50715770388211,
      "residuals": 11.658744375520246
    },
    {
      "dlam": null,
      "dx": 0.00172049,
      "dy": 0.884191,
      "lam": null,
      "x": 0.00977158,
      "y": 235.962,
      "errorLower": 235.077809,
      "errorUpper": 236.84619099999998,
      "yFit": 246.94541642627374,
      "residuals": 12.421995277348163
    },
    {
      "dlam": null,
      "dx": 0.00171975,
      "dy": 0.84357,
      "lam": null,
      "x": 0.0101624,
      "y": 241.236,
      "errorLower": 240.39243,
      "errorUpper": 242.07957,
      "yFit": 255.55189788360858,
      "residuals": 16.97061048117949
    },
    {
      "dlam": null,
      "dx": 0.00173361,
      "dy": 0.807803,
      "lam": null,
      "x": 0.0105689,
      "y": 247.454,
      "errorLower": 246.646197,
      "errorUpper": 248.26180300000001,
      "yFit": 265.05280306369554,
      "residuals": 21.78600854873716
    },
    {
      "dlam": null,
      "dx": 0.00176472,
      "dy": 0.787324,
      "lam": null,
      "x": 0.0109917,
      "y": 256.09,
      "errorLower": 255.30267599999996,
      "errorUpper": 256.877324,
      "yFit": 275.9285406128905,
      "residuals": 25.19742902907893
    },
    {
      "dlam": null,
      "dx": 0.00182598,
      "dy": 0.755671,
      "lam": null,
      "x": 0.0114314,
      "y": 269.423,
      "errorLower": 268.667329,
      "errorUpper": 270.178671,
      "yFit": 288.4439970905856,
      "residuals": 25.171003109270544
    },
    {
      "dlam": null,
      "dx": 0.00187949,
      "dy": 0.711765,
      "lam": null,
      "x": 0.0118886,
      "y": 282.029,
      "errorLower": 281.317235,
      "errorUpper": 282.740765,
      "yFit": 303.0494737433603,
      "residuals": 29.532884791132325
    },
    {
      "dlam": null,
      "dx": 0.00193137,
      "dy": 0.704532,
      "lam": null,
      "x": 0.0123642,
      "y": 296.626,
      "errorLower": 295.921468,
      "errorUpper": 297.33053199999995,
      "yFit": 320.1354748800009,
      "residuals": 33.368924165262804
    },
    {
      "dlam": null,
      "dx": 0.00198554,
      "dy": 0.68349,
      "lam": null,
      "x": 0.0128587,
      "y": 318.537,
      "errorLower": 317.85350999999997,
      "errorUpper": 319.22049,
      "yFit": 340.4403231168381,
      "residuals": 32.04629638595755
    },
    {
      "dlam": null,
      "dx": 0.00203315,
      "dy": 0.675291,
      "lam": null,
      "x": 0.0133731,
      "y": 345.447,
      "errorLower": 344.771709,
      "errorUpper": 346.122291,
      "yFit": 364.6927180229718,
      "residuals": 28.499888230365578
    },
    {
      "dlam": null,
      "dx": 0.00208813,
      "dy": 0.668046,
      "lam": null,
      "x": 0.013908,
      "y": 377.838,
      "errorLower": 377.169954,
      "errorUpper": 378.506046,
      "yFit": 394.82096275423146,
      "residuals": 25.42184633128772
    },
    {
      "dlam": null,
      "dx": 0.00213326,
      "dy": 0.678959,
      "lam": null,
      "x": 0.0144643,
      "y": 418.942,
      "errorLower": 418.263041,
      "errorUpper": 419.620959,
      "yFit": 430.58647704056506,
      "residuals": 17.150486318857325
    },
    {
      "dlam": null,
      "dx": 0.00217358,
      "dy": 0.686981,
      "lam": null,
      "x": 0.0150429,
      "y": 467.433,
      "errorLower": 466.746019,
      "errorUpper": 468.119981,
      "yFit": 473.4856799870963,
      "residuals": 8.81054932683193
    },
    {
      "dlam": null,
      "dx": 0.00220131,
      "dy": 0.703031,
      "lam": null,
      "x": 0.0156446,
      "y": 521.277,
      "errorLower": 520.573969,
      "errorUpper": 521.980031,
      "yFit": 523.1523485819362,
      "residuals": 2.6675190452997426
    },
    {
      "dlam": null,
      "dx": 0.00222531,
      "dy": 0.727639,
      "lam": null,
      "x": 0.0162704,
      "y": 587.111,
      "errorLower": 586.383361,
      "errorUpper": 587.838639,
      "yFit": 582.6980418266448,
      "residuals": -6.0647631220359965
    },
    {
      "dlam": null,
      "dx": 0.00226428,
      "dy": 0.744067,
      "lam": null,
      "x": 0.0169212,
      "y": 657.003,
      "errorLower": 656.2589330000001,
      "errorUpper": 657.747067,
      "yFit": 647.7761859351956,
      "residuals": -12.40051509447999
    },
    {
      "dlam": null,
      "dx": 0.00227136,
      "dy": 0.754121,
      "lam": null,
      "x": 0.0175981,
      "y": 727.944,
      "errorLower": 727.1898789999999,
      "errorUpper": 728.698121,
      "yFit": 716.3590854441541,
      "residuals": -15.362142886679854
    },
    {
      "dlam": null,
      "dx": 0.00228228,
      "dy": 0.762387,
      "lam": null,
      "x": 0.018302,
      "y": 789.992,
      "errorLower": 789.229613,
      "errorUpper": 790.754387,
      "yFit": 780.0094966301884,
      "residuals": -13.093748148658785
    },
    {
      "dlam": null,
      "dx": 0.00229589,
      "dy": 0.750767,
      "lam": null,
      "x": 0.0190341,
      "y": 832.073,
      "errorLower": 831.322233,
      "errorUpper": 832.823767,
      "yFit": 831.4532497483467,
      "residuals": -0.8254894683081067
    },
    {
      "dlam": null,
      "dx": 0.00231852,
      "dy": 0.728338,
      "lam": null,
      "x": 0.0197954,
      "y": 839.815,
      "errorLower": 839.086662,
      "errorUpper": 840.5433380000001,
      "yFit": 856.0375098932918,
      "residuals": 22.27332624865347
    },
    {
      "dlam": null,
      "dx": 0.00233235,
      "dy": 0.680064,
      "lam": null,
      "x": 0.0205873,
      "y": 805.586,
      "errorLower": 804.905936,
      "errorUpper": 806.266064,
      "yFit": 841.6339851278051,
      "residuals": 53.00675396404615
    },
    {
      "dlam": null,
      "dx": 0.00237326,
      "dy": 0.609523,
      "lam": null,
      "x": 0.0214107,
      "y": 732.561,
      "errorLower": 731.9514770000001,
      "errorUpper": 733.170523,
      "yFit": 779.4148516431798,
      "residuals": 76.8697024446653
    },
    {
      "dlam": null,
      "dx": 0.00244917,
      "dy": 0.525037,
      "lam": null,
      "x": 0.0222672,
      "y": 623.581,
      "errorLower": 623.055963,
      "errorUpper": 624.106037,
      "yFit": 674.3709350051355,
      "residuals": 96.7359157642899
    },
    {
      "dlam": null,
      "dx": 0.00254252,
      "dy": 0.431254,
      "lam": null,
      "x": 0.0231579,
      "y": 498.338,
      "errorLower": 497.906746,
      "errorUpper": 498.76925400000005,
      "yFit": 546.3272232223003,
      "residuals": 111.27832604984594
    },
    {
      "dlam": null,
      "dx": 0.00263583,
      "dy": 0.345621,
      "lam": null,
      "x": 0.0240842,
      "y": 379.651,
      "errorLower": 379.305379,
      "errorUpper": 379.996621,
      "yFit": 415.3683240557716,
      "residuals": 103.34245909759997
    },
    {
      "dlam": null,
      "dx": 0.00274294,
      "dy": 0.275152,
      "lam": null,
      "x": 0.0250475,
      "y": 277.92,
      "errorLower": 277.644848,
      "errorUpper": 278.195152,
      "yFit": 297.1199388123701,
      "residuals": 69.77939034559108
    },
    {
      "dlam": null,
      "dx": 0.0028428,
      "dy": 0.215742,
      "lam": null,
      "x": 0.0260494,
      "y": 199.772,
      "errorLower": 199.55625799999999,
      "errorUpper": 199.987742,
      "yFit": 199.8459305057949,
      "residuals": 0.342680172590036
    },
    {
      "dlam": null,
      "dx": 0.00286564,
      "dy": 0.172114,
      "lam": null,
      "x": 0.0270914,
      "y": 141.351,
      "errorLower": 141.178886,
      "errorUpper": 141.523114,
      "yFit": 117.60581121929866,
      "residuals": -137.96198322449854
    },
    {
      "dlam": null,
      "dx": 0.00289349,
      "dy": 0.138782,
      "lam": null,
      "x": 0.0281751,
      "y": 102.756,
      "errorLower": 102.617218,
      "errorUpper": 102.894782,
      "yFit": 65.09672067552056,
      "residuals": -271.3556464417536
    },
    {
      "dlam": null,
      "dx": 0.00289295,
      "dy": 0.114218,
      "lam": null,
      "x": 0.0293021,
      "y": 78.1058,
      "errorLower": 77.99158200000001,
      "errorUpper": 78.220018,
      "yFit": 34.66405990382478,
      "residuals": -380.3405776337812
    },
    {
      "dlam": null,
      "dx": 0.00284193,
      "dy": 0.0977755,
      "lam": null,
      "x": 0.0304742,
      "y": 62.5493,
      "errorLower": 62.451524500000005,
      "errorUpper": 62.6470755,
      "yFit": 19.47617953042686,
      "residuals": -440.53081262251936
    },
    {
      "dlam": null,
      "dx": 0.0027452,
      "dy": 0.0869322,
      "lam": null,
      "x": 0.0316931,
      "y": 53.8731,
      "errorLower": 53.7861678,
      "errorUpper": 53.9600322,
      "yFit": 19.674700372259792,
      "residuals": -393.3916273571842
    },
    {
      "dlam": null,
      "dx": 0.0026771,
      "dy": 0.0804389,
      "lam": null,
      "x": 0.0329609,
      "y": 49.8906,
      "errorLower": 49.8101611,
      "errorUpper": 49.971038899999996,
      "yFit": 25.742931197876572,
      "residuals": -300.1988938451847
    },
    {
      "dlam": null,
      "dx": 0.00262863,
      "dy": 0.0759295,
      "lam": null,
      "x": 0.0342793,
      "y": 48.5347,
      "errorLower": 48.4587705,
      "errorUpper": 48.6106295,
      "yFit": 34.50699547305281,
      "residuals": -184.7464361934056
    },
    {
      "dlam": null,
      "dx": 0.00257297,
      "dy": 0.0728817,
      "lam": null,
      "x": 0.0356505,
      "y": 47.7805,
      "errorLower": 47.7076183,
      "errorUpper": 47.85338170000001,
      "yFit": 43.336468550844366,
      "residuals": -60.97595760191705
    },
    {
      "dlam": null,
      "dx": 0.00256056,
      "dy": 0.0692472,
      "lam": null,
      "x": 0.0370765,
      "y": 46.4139,
      "errorLower": 46.3446528,
      "errorUpper": 46.4831472,
      "yFit": 50.29569450598411,
      "residuals": 56.05706087732228
    },
    {
      "dlam": null,
      "dx": 0.00256325,
      "dy": 0.0640746,
      "lam": null,
      "x": 0.0385595,
      "y": 43.3373,
      "errorLower": 43.2732254,
      "errorUpper": 43.4013746,
      "yFit": 52.54857686176571,
      "residuals": 143.75863230930372
    },
    {
      "dlam": null,
      "dx": 0.00258859,
      "dy": 0.0581762,
      "lam": null,
      "x": 0.0401019,
      "y": 38.7575,
      "errorLower": 38.6993238,
      "errorUpper": 38.8156762,
      "yFit": 49.17084478695563,
      "residuals": 178.99664788961167
    },
    {
      "dlam": null,
      "dx": 0.002619,
      "dy": 0.0513839,
      "lam": null,
      "x": 0.041706,
      "y": 32.8237,
      "errorLower": 32.772316100000005,
      "errorUpper": 32.8750839,
      "yFit": 40.66201519604856,
      "residuals": 152.54418594245578
    },
    {
      "dlam": null,
      "dx": 0.00267382,
      "dy": 0.0443289,
      "lam": null,
      "x": 0.0433742,
      "y": 26.4637,
      "errorLower": 26.4193711,
      "errorUpper": 26.5080289,
      "yFit": 29.247892177690073,
      "residuals": 62.80760807712516
    },
    {
      "dlam": null,
      "dx": 0.00272568,
      "dy": 0.0378276,
      "lam": null,
      "x": 0.0451092,
      "y": 20.8371,
      "errorLower": 20.7992724,
      "errorUpper": 20.8749276,
      "yFit": 18.045385245640112,
      "residuals": -73.80100123613148
    },
    {
      "dlam": null,
      "dx": 0.00276587,
      "dy": 0.0320347,
      "lam": null,
      "x": 0.0469136,
      "y": 16.2119,
      "errorLower": 16.1798653,
      "errorUpper": 16.2439347,
      "yFit": 9.421008071206717,
      "residuals": -211.9855009971463
    },
    {
      "dlam": null,
      "dx": 0.00279571,
      "dy": 0.0278154,
      "lam": null,
      "x": 0.0487901,
      "y": 13.0286,
      "errorLower": 13.000784600000001,
      "errorUpper": 13.0564154,
      "yFit": 4.010126934076892,
      "residuals": -324.22589881587567
    },
    {
      "dlam": null,
      "dx": 0.00281708,
      "dy": 0.0245709,
      "lam": null,
      "x": 0.0507417,
      "y": 10.9345,
      "errorLower": 10.9099291,
      "errorUpper": 10.9590709,
      "yFit": 2.629509671142825,
      "residuals": -338.00106340659784
    },
    {
      "dlam": null,
      "dx": 0.00282959,
      "dy": 0.0222794,
      "lam": null,
      "x": 0.0527714,
      "y": 9.67899,
      "errorLower": 9.6567106,
      "errorUpper": 9.701269400000001,
      "yFit": 3.7142178759054767,
      "residuals": -267.7258868773182
    },
    {
      "dlam": null,
      "dx": 0.0028401,
      "dy": 0.0206342,
      "lam": null,
      "x": 0.0548822,
      "y": 8.78581,
      "errorLower": 8.7651758,
      "errorUpper": 8.8064442,
      "yFit": 5.928369496267521,
      "residuals": -138.4807990487869
    },
    {
      "dlam": null,
      "dx": 0.00286615,
      "dy": 0.0191646,
      "lam": null,
      "x": 0.0570775,
      "y": 8.02647,
      "errorLower": 8.0073054,
      "errorUpper": 8.0456346,
      "yFit": 7.908606924391415,
      "residuals": -6.150040992694081
    },
    {
      "dlam": null,
      "dx": 0.00290825,
      "dy": 0.0176645,
      "lam": null,
      "x": 0.0593606,
      "y": 7.19768,
      "errorLower": 7.1800155,
      "errorUpper": 7.2153445000000005,
      "yFit": 8.50615678460269,
      "residuals": 74.07380818040076
    },
    {
      "dlam": null,
      "dx": 0.00296442,
      "dy": 0.0160657,
      "lam": null,
      "x": 0.0617351,
      "y": 6.25872,
      "errorLower": 6.2426543,
      "errorUpper": 6.274785700000001,
      "yFit": 7.306715195960211,
      "residuals": 65.23184149836055
    },
    {
      "dlam": null,
      "dx": 0.00303237,
      "dy": 0.0145183,
      "lam": null,
      "x": 0.0642045,
      "y": 5.30149,
      "errorLower": 5.2869717000000005,
      "errorUpper": 5.3160083,
      "yFit": 4.919605893160927,
      "residuals": -26.30363794928284
    },
    {
      "dlam": null,
      "dx": 0.00310777,
      "dy": 0.0131602,
      "lam": null,
      "x": 0.0667726,
      "y": 4.52106,
      "errorLower": 4.507899800000001,
      "errorUpper": 4.5342202,
      "yFit": 2.5522299195214138,
      "residuals": -149.6048753422126
    },
    {
      "dlam": null,
      "dx": 0.00317865,
      "dy": 0.0120429,
      "lam": null,
      "x": 0.0694435,
      "y": 3.93014,
      "errorLower": 3.9180971,
      "errorUpper": 3.9421829,
      "yFit": 1.1723355604393952,
      "residuals": -228.99836746635816
    },
    {
      "dlam": null,
      "dx": 0.00323071,
      "dy": 0.0112192,
      "lam": null,
      "x": 0.0722213,
      "y": 3.49251,
      "errorLower": 3.4812907999999996,
      "errorUpper": 3.5037292,
      "yFit": 1.0187868672135822,
      "residuals": -220.49015373524114
    },
    {
      "dlam": null,
      "dx": 0.00329721,
      "dy": 0.0105821,
      "lam": null,
      "x": 0.0751101,
      "y": 3.18734,
      "errorLower": 3.1767578999999997,
      "errorUpper": 3.1979221,
      "yFit": 1.6583626814881005,
      "residuals": -144.48713568307795
    },
    {
      "dlam": null,
      "dx": 0.00336836,
      "dy": 0.0100843,
      "lam": null,
      "x": 0.0781145,
      "y": 2.92726,
      "errorLower": 2.9171757,
      "errorUpper": 2.9373443,
      "yFit": 2.301034585915579,
      "residuals": -62.09904644689476
    },
    {
      "dlam": null,
      "dx": 0.00345727,
      "dy": 0.00955912,
      "lam": null,
      "x": 0.0812391,
      "y": 2.64566,
      "errorLower": 2.63610088,
      "errorUpper": 2.65521912,
      "yFit": 2.2519271719461833,
      "residuals": -41.18923374262658
    },
    {
      "dlam": null,
      "dx": 0.0035437,
      "dy": 0.00901861,
      "lam": null,
      "x": 0.0844887,
      "y": 2.37452,
      "errorLower": 2.36550139,
      "errorUpper": 2.38353861,
      "yFit": 1.5338239887831873,
      "residuals": -93.2179139819565
    },
    {
      "dlam": null,
      "dx": 0.00362227,
      "dy": 0.00853411,
      "lam": null,
      "x": 0.0878682,
      "y": 2.13092,
      "errorLower": 2.1223858900000003,
      "errorUpper": 2.13945411,
      "yFit": 0.7324378945971008,
      "residuals": -163.869707023099
    },
    {
      "dlam": null,
      "dx": 0.0036993,
      "dy": 0.00801442,
      "lam": null,
      "x": 0.091383,
      "y": 1.93426,
      "errorLower": 1.92624558,
      "errorUpper": 1.9422744200000002,
      "yFit": 0.41294586846352865,
      "residuals": -189.82211208502568
    },
    {
      "dlam": null,
      "dx": 0.00374223,
      "dy": 0.00759625,
      "lam": null,
      "x": 0.0950383,
      "y": 1.7841,
      "errorLower": 1.77650375,
      "errorUpper": 1.79169625,
      "yFit": 0.6075042862972029,
      "residuals": -154.8916522893266
    },
    {
      "dlam": null,
      "dx": 0.00381774,
      "dy": 0.00721554,
      "lam": null,
      "x": 0.0988398,
      "y": 1.65305,
      "errorLower": 1.6458344599999999,
      "errorUpper": 1.66026554,
      "yFit": 0.8674813601021584,
      "residuals": -108.87177396256435
    },
    {
      "dlam": null,
      "dx": 0.00388979,
      "dy": 0.00691554,
      "lam": null,
      "x": 0.102793,
      "y": 1.52134,
      "errorLower": 1.5144244599999999,
      "errorUpper": 1.52825554,
      "yFit": 0.7820565832561379,
      "residuals": -106.90176280433082
    },
    {
      "dlam": null,
      "dx": 0.00396133,
      "dy": 0.0066253,
      "lam": null,
      "x": 0.106905,
      "y": 1.40698,
      "errorLower": 1.4003546999999998,
      "errorUpper": 1.4136053,
      "yFit": 0.43466472907895076,
      "residuals": -146.75792355380878
    },
    {
      "dlam": null,
      "dx": 0.0040448,
      "dy": 0.00633815,
      "lam": null,
      "x": 0.111181,
      "y": 1.28636,
      "errorLower": 1.28002185,
      "errorUpper": 1.2926981499999999,
      "yFit": 0.22469200511260526,
      "residuals": -167.50439716437677
    },
    {
      "dlam": null,
      "dx": 0.00412381,
      "dy": 0.00611845,
      "lam": null,
      "x": 0.115629,
      "y": 1.19797,
      "errorLower": 1.19185155,
      "errorUpper": 1.20408845,
      "yFit": 0.2983223548590445,
      "residuals": -147.0384893463141
    },
    {
      "dlam": null,
      "dx": 0.00420457,
      "dy": 0.00589653,
      "lam": null,
      "x": 0.120254,
      "y": 1.12096,
      "errorLower": 1.11506347,
      "errorUpper": 1.12685653,
      "yFit": 0.3957314919412212,
      "residuals": -122.99242233292782
    },
    {
      "dlam": null,
      "dx": 0.00427869,
      "dy": 0.00572062,
      "lam": null,
      "x": 0.125064,
      "y": 1.05444,
      "errorLower": 1.04871938,
      "errorUpper": 1.06016062,
      "yFit": 0.29439787476376233,
      "residuals": -132.86009649937205
    },
    {
      "dlam": null,
      "dx": 0.00438243,
      "dy": 0.00560039,
      "lam": null,
      "x": 0.130066,
      "y": 0.982053,
      "errorLower": 0.9764526099999999,
      "errorUpper": 0.98765339,
      "yFit": 0.145829763518179,
      "residuals": -149.3151792074875
    },
    {
      "dlam": null,
      "dx": 0.00449707,
      "dy": 0.00551959,
      "lam": null,
      "x": 0.135269,
      "y": 0.930887,
      "errorLower": 0.92536741,
      "errorUpper": 0.93640659,
      "yFit": 0.15144925047672253,
      "residuals": -141.21297950088274
    },
    {
      "dlam": null,
      "dx": 0.00460143,
      "dy": 0.00546427,
      "lam": null,
      "x": 0.14068,
      "y": 0.882886,
      "errorLower": 0.8774217299999999,
      "errorUpper": 0.88835027,
      "yFit": 0.2004025621276484,
      "residuals": -124.89928899420262
    },
    {
      "dlam": null,
      "dx": 0.00471315,
      "dy": 0.00543486,
      "lam": null,
      "x": 0.146307,
      "y": 0.846909,
      "errorLower": 0.84147414,
      "errorUpper": 0.8523438600000001,
      "yFit": 0.14068511451435764,
      "residuals": -129.943344536132
    },
    {
      "dlam": null,
      "dx": 0.00482935,
      "dy": 0.00541176,
      "lam": null,
      "x": 0.152159,
      "y": 0.795072,
      "errorLower": 0.78966024,
      "errorUpper": 0.80048376,
      "yFit": 0.08134491684832981,
      "residuals": -131.8844670036495
    },
    {
      "dlam": null,
      "dx": 0.00494456,
      "dy": 0.00543268,
      "lam": null,
      "x": 0.158246,
      "y": 0.765342,
      "errorLower": 0.75990932,
      "errorUpper": 0.7707746799999999,
      "yFit": 0.10493643934456855,
      "residuals": -121.56165293288606
    },
    {
      "dlam": null,
      "dx": 0.00506276,
      "dy": 0.00544301,
      "lam": null,
      "x": 0.164576,
      "y": 0.725141,
      "errorLower": 0.71969799,
      "errorUpper": 0.7305840100000001,
      "yFit": 0.09760787613025608,
      "residuals": -115.29156181409623
    },
    {
      "dlam": null,
      "dx": 0.00519308,
      "dy": 0.00556163,
      "lam": null,
      "x": 0.171159,
      "y": 0.69475,
      "errorLower": 0.68918837,
      "errorUpper": 0.70031163,
      "yFit": 0.05598979540953052,
      "residuals": -114.85125846028403
    },
    {
      "dlam": null,
      "dx": 0.00532144,
      "dy": 0.00568705,
      "lam": null,
      "x": 0.178005,
      "y": 0.664438,
      "errorLower": 0.65875095,
      "errorUpper": 0.67012505,
      "yFit": 0.06093374074595219,
      "residuals": -106.11903522108085
    },
    {
      "dlam": null,
      "dx": 0.00544726,
      "dy": 0.00589887,
      "lam": null,
      "x": 0.185125,
      "y": 0.640604,
      "errorLower": 0.63470513,
      "errorUpper": 0.64650287,
      "yFit": 0.06013423523978789,
      "residuals": -98.40355267368362
    },
    {
      "dlam": null,
      "dx": 0.00558291,
      "dy": 0.00622744,
      "lam": null,
      "x": 0.19253,
      "y": 0.625173,
      "errorLower": 0.61894556,
      "errorUpper": 0.63140044,
      "yFit": 0.03543541755226805,
      "residuals": -94.69984174038319
    },
    {
      "dlam": null,
      "dx": 0.00570866,
      "dy": 0.00663393,
      "lam": null,
      "x": 0.200231,
      "y": 0.5956,
      "errorLower": 0.58896607,
      "errorUpper": 0.60223393,
      "yFit": 0.041952553487281406,
      "residuals": -83.4569322426855
    },
    {
      "dlam": null,
      "dx": 0.00583848,
      "dy": 0.00724923,
      "lam": null,
      "x": 0.208241,
      "y": 0.582752,
      "errorLower": 0.57550277,
      "errorUpper": 0.59000123,
      "yFit": 0.03251384220228803,
      "residuals": -75.90297973684268
    },
    {
      "dlam": null,
      "dx": 0.00595692,
      "dy": 0.00810892,
      "lam": null,
      "x": 0.21657,
      "y": 0.571269,
      "errorLower": 0.5631600800000001,
      "errorUpper": 0.57937792,
      "yFit": 0.025545311891923213,
      "residuals": -67.29918264184093
    },
    {
      "dlam": null,
      "dx": 0.00607578,
      "dy": 0.00929792,
      "lam": null,
      "x": 0.225233,
      "y": 0.563012,
      "errorLower": 0.55371408,
      "errorUpper": 0.5723099199999999,
      "yFit": 0.026682603086302777,
      "residuals": -57.68272870853882
    },
    {
      "dlam": null,
      "dx": 0.00621921,
      "dy": 0.010755,
      "lam": null,
      "x": 0.234242,
      "y": 0.539121,
      "errorLower": 0.528366,
      "errorUpper": 0.5498759999999999,
      "yFit": 0.017911884923038544,
      "residuals": -48.46202836605871
    },
    {
      "dlam": null,
      "dx": 0.00636952,
      "dy": 0.0125021,
      "lam": null,
      "x": 0.243612,
      "y": 0.511661,
      "errorLower": 0.4991589,
      "errorUpper": 0.5241631,
      "yFit": 0.019076455196023627,
      "residuals": -39.40014436006562
    },
    {
      "dlam": null,
      "dx": 0.00613893,
      "dy": 0.0181216,
      "lam": null,
      "x": 0.251694,
      "y": 0.520131,
      "errorLower": 0.5020094,
      "errorUpper": 0.5382526,
      "yFit": 0.014018198100829875,
      "residuals": -27.928703972009654
    }
  ],
  'sas_result_fit': [
    {
      "residuals": -13.092270443674225,
      "x": 0.00714,
      "y": 201.14353025229178
    },
    {
      "residuals": -9.957383325894869,
      "x": 0.0074256,
      "y": 205.29092895461838
    },
    {
      "residuals": -11.697210397453926,
      "x": 0.00772262,
      "y": 209.91500495032528
    },
    {
      "residuals": -6.9722852420111545,
      "x": 0.00803153,
      "y": 214.89112069310778
    },
    {
      "residuals": -3.1295151117789533,
      "x": 0.00835279,
      "y": 220.3039218068919
    },
    {
      "residuals": 2.1955349925397334,
      "x": 0.0086869,
      "y": 225.99658853940122
    },
    {
      "residuals": 4.128605554550272,
      "x": 0.00903438,
      "y": 232.5069590271238
    },
    {
      "residuals": 11.658744375520246,
      "x": 0.00939575,
      "y": 239.50715770388211
    },
    {
      "residuals": 12.421995277348163,
      "x": 0.00977158,
      "y": 246.94541642627374
    },
    {
      "residuals": 16.97061048117949,
      "x": 0.0101624,
      "y": 255.55189788360858
    },
    {
      "residuals": 21.78600854873716,
      "x": 0.0105689,
      "y": 265.05280306369554
    },
    {
      "residuals": 25.19742902907893,
      "x": 0.0109917,
      "y": 275.9285406128905
    },
    {
      "residuals": 25.171003109270544,
      "x": 0.0114314,
      "y": 288.4439970905856
    },
    {
      "residuals": 29.532884791132325,
      "x": 0.0118886,
      "y": 303.0494737433603
    },
    {
      "residuals": 33.368924165262804,
      "x": 0.0123642,
      "y": 320.1354748800009
    },
    {
      "residuals": 32.04629638595755,
      "x": 0.0128587,
      "y": 340.4403231168381
    },
    {
      "residuals": 28.499888230365578,
      "x": 0.0133731,
      "y": 364.6927180229718
    },
    {
      "residuals": 25.42184633128772,
      "x": 0.013908,
      "y": 394.82096275423146
    },
    {
      "residuals": 17.150486318857325,
      "x": 0.0144643,
      "y": 430.58647704056506
    },
    {
      "residuals": 8.81054932683193,
      "x": 0.0150429,
      "y": 473.4856799870963
    },
    {
      "residuals": 2.6675190452997426,
      "x": 0.0156446,
      "y": 523.1523485819362
    },
    {
      "residuals": -6.0647631220359965,
      "x": 0.0162704,
      "y": 582.6980418266448
    },
    {
      "residuals": -12.40051509447999,
      "x": 0.0169212,
      "y": 647.7761859351956
    },
    {
      "residuals": -15.362142886679854,
      "x": 0.0175981,
      "y": 716.3590854441541
    },
    {
      "residuals": -13.093748148658785,
      "x": 0.018302,
      "y": 780.0094966301884
    },
    {
      "residuals": -0.8254894683081067,
      "x": 0.0190341,
      "y": 831.4532497483467
    },
    {
      "residuals": 22.27332624865347,
      "x": 0.0197954,
      "y": 856.0375098932918
    },
    {
      "residuals": 53.00675396404615,
      "x": 0.0205873,
      "y": 841.6339851278051
    },
    {
      "residuals": 76.8697024446653,
      "x": 0.0214107,
      "y": 779.4148516431798
    },
    {
      "residuals": 96.7359157642899,
      "x": 0.0222672,
      "y": 674.3709350051355
    },
    {
      "residuals": 111.27832604984594,
      "x": 0.0231579,
      "y": 546.3272232223003
    },
    {
      "residuals": 103.34245909759997,
      "x": 0.0240842,
      "y": 415.3683240557716
    },
    {
      "residuals": 69.77939034559108,
      "x": 0.0250475,
      "y": 297.1199388123701
    },
    {
      "residuals": 0.342680172590036,
      "x": 0.0260494,
      "y": 199.8459305057949
    },
    {
      "residuals": -137.96198322449854,
      "x": 0.0270914,
      "y": 117.60581121929866
    },
    {
      "residuals": -271.3556464417536,
      "x": 0.0281751,
      "y": 65.09672067552056
    },
    {
      "residuals": -380.3405776337812,
      "x": 0.0293021,
      "y": 34.66405990382478
    },
    {
      "residuals": -440.53081262251936,
      "x": 0.0304742,
      "y": 19.47617953042686
    },
    {
      "residuals": -393.3916273571842,
      "x": 0.0316931,
      "y": 19.674700372259792
    },
    {
      "residuals": -300.1988938451847,
      "x": 0.0329609,
      "y": 25.742931197876572
    },
    {
      "residuals": -184.7464361934056,
      "x": 0.0342793,
      "y": 34.50699547305281
    },
    {
      "residuals": -60.97595760191705,
      "x": 0.0356505,
      "y": 43.336468550844366
    },
    {
      "residuals": 56.05706087732228,
      "x": 0.0370765,
      "y": 50.29569450598411
    },
    {
      "residuals": 143.75863230930372,
      "x": 0.0385595,
      "y": 52.54857686176571
    },
    {
      "residuals": 178.99664788961167,
      "x": 0.0401019,
      "y": 49.17084478695563
    },
    {
      "residuals": 152.54418594245578,
      "x": 0.041706,
      "y": 40.66201519604856
    },
    {
      "residuals": 62.80760807712516,
      "x": 0.0433742,
      "y": 29.247892177690073
    },
    {
      "residuals": -73.80100123613148,
      "x": 0.0451092,
      "y": 18.045385245640112
    },
    {
      "residuals": -211.9855009971463,
      "x": 0.0469136,
      "y": 9.421008071206717
    },
    {
      "residuals": -324.22589881587567,
      "x": 0.0487901,
      "y": 4.010126934076892
    },
    {
      "residuals": -338.00106340659784,
      "x": 0.0507417,
      "y": 2.629509671142825
    },
    {
      "residuals": -267.7258868773182,
      "x": 0.0527714,
      "y": 3.7142178759054767
    },
    {
      "residuals": -138.4807990487869,
      "x": 0.0548822,
      "y": 5.928369496267521
    },
    {
      "residuals": -6.150040992694081,
      "x": 0.0570775,
      "y": 7.908606924391415
    },
    {
      "residuals": 74.07380818040076,
      "x": 0.0593606,
      "y": 8.50615678460269
    },
    {
      "residuals": 65.23184149836055,
      "x": 0.0617351,
      "y": 7.306715195960211
    },
    {
      "residuals": -26.30363794928284,
      "x": 0.0642045,
      "y": 4.919605893160927
    },
    {
      "residuals": -149.6048753422126,
      "x": 0.0667726,
      "y": 2.5522299195214138
    },
    {
      "residuals": -228.99836746635816,
      "x": 0.0694435,
      "y": 1.1723355604393952
    },
    {
      "residuals": -220.49015373524114,
      "x": 0.0722213,
      "y": 1.0187868672135822
    },
    {
      "residuals": -144.48713568307795,
      "x": 0.0751101,
      "y": 1.6583626814881005
    },
    {
      "residuals": -62.09904644689476,
      "x": 0.0781145,
      "y": 2.301034585915579
    },
    {
      "residuals": -41.18923374262658,
      "x": 0.0812391,
      "y": 2.2519271719461833
    },
    {
      "residuals": -93.2179139819565,
      "x": 0.0844887,
      "y": 1.5338239887831873
    },
    {
      "residuals": -163.869707023099,
      "x": 0.0878682,
      "y": 0.7324378945971008
    },
    {
      "residuals": -189.82211208502568,
      "x": 0.091383,
      "y": 0.41294586846352865
    },
    {
      "residuals": -154.8916522893266,
      "x": 0.0950383,
      "y": 0.6075042862972029
    },
    {
      "residuals": -108.87177396256435,
      "x": 0.0988398,
      "y": 0.8674813601021584
    },
    {
      "residuals": -106.90176280433082,
      "x": 0.102793,
      "y": 0.7820565832561379
    },
    {
      "residuals": -146.75792355380878,
      "x": 0.106905,
      "y": 0.43466472907895076
    },
    {
      "residuals": -167.50439716437677,
      "x": 0.111181,
      "y": 0.22469200511260526
    },
    {
      "residuals": -147.0384893463141,
      "x": 0.115629,
      "y": 0.2983223548590445
    },
    {
      "residuals": -122.99242233292782,
      "x": 0.120254,
      "y": 0.3957314919412212
    },
    {
      "residuals": -132.86009649937205,
      "x": 0.125064,
      "y": 0.29439787476376233
    },
    {
      "residuals": -149.3151792074875,
      "x": 0.130066,
      "y": 0.145829763518179
    },
    {
      "residuals": -141.21297950088274,
      "x": 0.135269,
      "y": 0.15144925047672253
    },
    {
      "residuals": -124.89928899420262,
      "x": 0.14068,
      "y": 0.2004025621276484
    },
    {
      "residuals": -129.943344536132,
      "x": 0.146307,
      "y": 0.14068511451435764
    },
    {
      "residuals": -131.8844670036495,
      "x": 0.152159,
      "y": 0.08134491684832981
    },
    {
      "residuals": -121.56165293288606,
      "x": 0.158246,
      "y": 0.10493643934456855
    },
    {
      "residuals": -115.29156181409623,
      "x": 0.164576,
      "y": 0.09760787613025608
    },
    {
      "residuals": -114.85125846028403,
      "x": 0.171159,
      "y": 0.05598979540953052
    },
    {
      "residuals": -106.11903522108085,
      "x": 0.178005,
      "y": 0.06093374074595219
    },
    {
      "residuals": -98.40355267368362,
      "x": 0.185125,
      "y": 0.06013423523978789
    },
    {
      "residuals": -94.69984174038319,
      "x": 0.19253,
      "y": 0.03543541755226805
    },
    {
      "residuals": -83.4569322426855,
      "x": 0.200231,
      "y": 0.041952553487281406
    },
    {
      "residuals": -75.90297973684268,
      "x": 0.208241,
      "y": 0.03251384220228803
    },
    {
      "residuals": -67.29918264184093,
      "x": 0.21657,
      "y": 0.025545311891923213
    },
    {
      "residuals": -57.68272870853882,
      "x": 0.225233,
      "y": 0.026682603086302777
    },
    {
      "residuals": -48.46202836605871,
      "x": 0.234242,
      "y": 0.017911884923038544
    },
    {
      "residuals": -39.40014436006562,
      "x": 0.243612,
      "y": 0.019076455196023627
    },
    {
      "residuals": -27.928703972009654,
      "x": 0.251694,
      "y": 0.014018198100829875
    }
  ]
};
