var map = {
    init : function () {
        map.getMapData();
    },

    getMapData : function () {
        $.getJSON("./mapdata/china.json", function (data) {
            if(data != null) {
                echarts.registerMap("china", data);// 注册地图
                var mapData = [];
                var features = data.features;
                $.each(features, function(i, item) {
                    mapData.push({id : i+1, name: item.properties.name});
                })
                map.renderMap(mapData);
            }
        })
    },

    renderMap : function (data) {
        var chart =  echarts.init(document.getElementById("map"));
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b}'
            },
            series: [
                {
                    name: '中国',
                    type: 'map',
                    mapType: 'china',
                    selectedMode : 'multiple',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data : data
                }
            ]
        }
        chart.setOption(option);
    }
}

$(function () {
    map.init();
})