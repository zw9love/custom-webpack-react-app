/**
 * Created by zw9love on 2017/8/21.
 */

import vis from 'vis'

// 画背景线
export function renderBgLine(myCanvas, num) {
    // 线的数量
    let gridNum = num
    // let myCanvas = this.$refs.myCanvas
    let width = myCanvas.parentNode.clientWidth
    let height = myCanvas.parentNode.clientHeight
    myCanvas.width = width
    myCanvas.height = height
    // console.log(width, height)
    let ctx = myCanvas.getContext('2d')

    // 背景线的颜色准备
    let gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop("0", "#e45753")
    gradient.addColorStop("0.25", "#20a0ff")
    // gradient.addColorStop("0.25", "#ffd700")
    gradient.addColorStop("0.5", "#9bbb59")
    gradient.addColorStop("0.75", "#20a0ff")
    gradient.addColorStop("1.0", "#956dc5")
    ctx.strokeStyle = gradient

    // 根据canvas的宽度和高度, 线的数量算出每个格子的width,height
    let width_avg = width / gridNum
    let height_avg = height / gridNum

    // 画横线 (0,0  700,0)  (0,70  700,70)   (0,140  700,140)
    for (let i = 0; i <= gridNum; i++) {
        ctx.beginPath()
        ctx.moveTo(0, i * height_avg)
        ctx.lineTo(width, i * height_avg)
        ctx.closePath()
        ctx.stroke()
    }

    // 画竖线 (0,0 0,700) (70,0  70,700) (140,0  140,700)
    for (let i = 0; i <= gridNum; i++) {
        ctx.beginPath()
        ctx.moveTo(i * width_avg, 0)
        ctx.lineTo(i * width_avg, height)
        ctx.closePath()
        ctx.stroke()
    }
}


// 颜色的一个计算方法
export function renderColor(val) {
    let scale = val / 100
    let r = (scale < 0.5 ? Math.floor(255 * scale * 2) : 255)
    let g = (scale > 0.5 ? Math.floor(255 - 255 * (scale - 0.5) * 2) : 255)
    let b = 30
    return 'rgba(' + r + ',' + g + ',' + b + ',1)'
}


// 渲染每个主机的方法
export function renderHostCell(network, ctx, id, data) {
    // console.log(1)
    let nodeId = id
    let img_src = require('../assets/img/host.png')
    let nodePosition = network.getPositions([nodeId])
    let x = nodePosition[nodeId].x
    let y = nodePosition[nodeId].y
    //  主机图片的初始化数据
    let img = new Image()
    let img_width = 60
    let img_height = 60
    // 空间
    let img_space = 5
    // img.src = img_src
    // rect的初始化数据
    // let rect_width = 140
    let rect_width = 200
    // let rect_height = 74
    let rect_height = 100
    // let center_x = x - rect_width / 2 + ( img_width + img_space ) / 2
    let center_x = x - rect_width / 2
    let center_y = y - rect_height / 2
    let height_space = 23
    let width_space = 4
    let rect_cell_height = 10

//            img.onload = function () {
//     ctx.drawImage(img, center_x - img_width - img_space, center_y + (rect_height - img_height) / 2, img_width, img_height)
//            }

    ctx.strokeStyle = '#A6D5F7'
    ctx.fillStyle = '#fff'
    // ctx.rect(center_x, center_y, rect_width, rect_height)
    ctx.rect(center_x, center_y - 5, rect_width, rect_height)
    ctx.font = "14px Georgia"
    ctx.textBaseline = "top"


    let cpu_val = 0, mem_val = 0, disk_val = 0


    // 判断资源数据是否存在
    if (data.res) {
        cpu_val = data.res.cpu_usage
        mem_val = data.res.mem_usage
        disk_val = data.res.disk_usage
    }

    // 根据主机威胁前5的安全算法
    let safe_val = data ? (data.pelfBlack * 0.8 + data.pelfGray * 0.2) * 0.45 + (data.processCount) * 0.35 : 0

    if (safe_val > 100) {
        safe_val = 100
    }

    // 第1个reactCell
    ctx.fillText("CPU", center_x + width_space, center_y)
    ctx.rect(center_x + 35, center_y + width_space, rect_width - 40, rect_cell_height)

    // 第1个reactCell的值 (CPU)
    ctx.save()
    // let cpu_val = data.res.cpu_usage ? data.res.cpu_usage : 0
    ctx.fillStyle = renderColor(cpu_val)
    ctx.fillRect(center_x + 35, center_y + width_space, cpu_val, rect_cell_height)
    ctx.restore()

    // 第2个reactCell
    ctx.fillText("内存", center_x + width_space, center_y + height_space * 1)
    ctx.rect(center_x + 35, center_y + width_space + height_space * 1, rect_width - 40, rect_cell_height)

    // 第2个reactCell的值 (内存)
    ctx.save()
    // let mem_val = data.res.mem_usage ? data.res.mem_usage / data.res.mem_total : 0
    ctx.fillStyle = renderColor(mem_val)
    ctx.fillRect(center_x + 35, center_y + width_space + height_space * 1, mem_val * 100, rect_cell_height)
    ctx.restore()

    // 第3个reactCell
    ctx.fillText("磁盘", center_x + width_space, center_y + height_space * 2)
    ctx.rect(center_x + 35, center_y + width_space + height_space * 2, rect_width - 40, rect_cell_height)

    // 第3个reactCell的值 (磁盘)
    ctx.save()
    // let disk_val = data.res.disk_usage ? data.res.disk_usage / data.res.disk_total : 0
    ctx.fillStyle = renderColor(disk_val)
    ctx.fillRect(center_x + 35, center_y + width_space + height_space * 2, disk_val * 100, rect_cell_height)
    ctx.restore()

    // 第4个reactCell
    ctx.fillText("安全", center_x + width_space, center_y + height_space * 3)
    ctx.rect(center_x + 35, center_y + width_space + height_space * 3, rect_width - 40, rect_cell_height)

    // 第4个reactCell的值 (安全)
    ctx.save()

    ctx.fillStyle = renderColor(safe_val)
    ctx.fillRect(center_x + 35, center_y + width_space + height_space * 3, safe_val, rect_cell_height)
    ctx.restore()

    // 主机名字
    if (data) {
        let {name, len} = renderName(data.host.name)
        let name_width = len * 7
        ctx.fillText(name, center_x + ( rect_width - name_width ) / 2, center_y + rect_height)
        ctx.stroke()
    }

}

// 渲染主机名字
export function renderName(name) {
    let myname = name
    let len = myname.length
    // 设置最大字符串长度是18
    let max_length = 18
    if (len > max_length) {
        myname = myname.slice(0, max_length - 3) + '...'
        len = max_length
    }

    return {
        name: myname,
        len: len
    }
}

// 渲染主机logo图
export function renderLogoNode(network, ctx) {
    let nodeId = 1
    let nodePosition = network.getPositions([nodeId])
    let x = nodePosition[nodeId].x
    let y = nodePosition[nodeId].y
    ctx.fillStyle = '#fff'
    ctx.font = "18px Georgia"
    ctx.fillText('蜂眼主机监控', x - 54, y + 80)
    ctx.stroke()
}


// 设置1-4个主机时候的hostCell的位置
export function setNodesPosition(temp_nodes, width, height) {
    if (temp_nodes.length <= 5) {
        let width_avg = (width / 2 - 120 )
        let height_avg = (height / 2 - 70 )
        switch (temp_nodes.length) {
            // 1个主机
            case 2:
                temp_nodes[1].x = 0
                temp_nodes[1].y = -height_avg
                break
            // 2个主机
            case 3:
                temp_nodes[1].x = 0
                temp_nodes[1].y = -height_avg

                temp_nodes[2].x = 0
                temp_nodes[2].y = height_avg
                break
            // 3个主机
            case 4:
                temp_nodes[1].x = 0
                temp_nodes[1].y = -height_avg

                temp_nodes[2].x = -width_avg
                temp_nodes[2].y = 0

                temp_nodes[3].x = width_avg
                temp_nodes[3].y = 0
                break
            // 4个主机
            case 5:
                temp_nodes[1].x = 0
                temp_nodes[1].y = -height_avg

                temp_nodes[2].x = 0
                temp_nodes[2].y = height_avg

                temp_nodes[3].x = -width_avg
                temp_nodes[3].y = 0

                temp_nodes[4].x = width_avg
                temp_nodes[4].y = 0
                break
        }

        // 要自定义node的位置，必须把physics设置成fasle
        temp_nodes.forEach((val) => {
            val.physics = false
        })
    }
}

//  主机数量比较少的时候的渲染主方法
export function draw(self, hostData) {
    // 初始化参数
    let temp_nodes = []
    let temp_edges = []

    let network = null

    let edge_length_main = 150
    let edge_length = 300
    let line_color = '#fff'
    let font_color = '#fff'

    let mynetwork = self.refs.mynetwork
    let width = mynetwork.clientWidth
    let height = mynetwork.clientHeight
    // console.log(width, height)

    // 分组
    temp_nodes.push({
        id: 1,
        label: '',
        // label: '蜂眼主机监控',
        image: require('../assets/img/logo.png'),
        shape: 'image',
        color: line_color,
        font: {
            color: font_color
        },
        fixed: true,
        physics: true,
        x: 0,
        y: 0,
        widthConstraint: {minimum: 130, maximum: 100},
        heightConstraint: {minimum: 130, maximum: 100},
        size: 50
//            chosen:false
    });
//          nodes.push({
//            id: 2,
//            label: 'Group2',
//            image: require('../assets/img/logo.png'),
//            shape: 'image',
//            color: line_color,
//            font:{
//              color:font_color
//            }
//          });
//          nodes.push({
//            id: 3,
//            label: 'Group3',
//            image: require('../assets/img/logo.png'),
//            shape: 'image',
//            color: line_color,
//            font:{
//              color:font_color
//            }
//          });
//          edges.push({from: 1, to: 2, length: EDGE_LENGTH_MAIN, color: line_color});
//          edges.push({from: 1, to: 3, length: EDGE_LENGTH_MAIN, color: line_color});


    hostData.forEach((val, index) => {
        let cpu_val = 0, mem_val = 0, disk_val = 0, safe_val = 0
        if (val.res) {
            cpu_val = val.res.cpu_usage
            mem_val = val.res.mem_usage
            disk_val = val.res.disk_usage
        }

        if (val) {
            safe_val = (val.pelfBlack * 0.8 + val.pelfGray * 0.2) * 0.45 + (val.processCount) * 0.35
            if (safe_val > 100) {
                safe_val = 100
            } else if (safe_val > 0) {
                safe_val = safe_val.toFixed(2)
            }
        }

        //class="hover_defaultTitle"
        let title = `<div class="hover_defaultTitle">主机名：${val.host.name}<br><span>CPU：${cpu_val}</span><br><span>内存：${mem_val}</span><br><span>磁盘：${disk_val}</span><br><span>安全：${safe_val}</span></div>`

        // node参数
        temp_nodes.push({
            id: 2 + index,
//                label: val.host.name,
            label: '',
//                image: require('../assets/img/Hardware-Laptop-1-icon.png'),
            shape: 'text',
//                shape: 'circle',
            font: {
                color: font_color,
                size: 18
            },
            title: title,
            data: val.host,
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.5)',
                size: 10,
                x: 5,
                y: 5
            },
            widthConstraint: {minimum: 200, maximum: 360},
            heightConstraint: {minimum: 100, maximum: 140},
            // physics:false
        })

        // 连线
        temp_edges.push({
            from: 1,
            to: 2 + index,
            length: edge_length,
            title: title,
            label: ''
        })
    })

    // 设置主机数量1-4个时候的position
    setNodesPosition(temp_nodes, width, height)

    let nodes = new vis.DataSet(temp_nodes)
    let edges = new vis.DataSet(temp_edges)

    // create a network
//          var container = document.getElementById('mynetwork');
//   var container = self.$refs.mynetwork;
    var data = {
        nodes: nodes,
        edges: edges
    }

    // 设置 network 的option
    var options = {
        configure: {
            enabled: false,
            filter: 'physics',
            showButton: true
        },
        // nodes:{
        //   scaling: {
        //     min: 1,
        //     max: 30
        //   }
        // },
        edges: {
            arrowStrikethrough: false,
            chosen: true,
            hidden: false,
            hoverWidth: 3,
            // 线的平滑程度
            smooth: {
                enabled: false,
                type: 'discrete', // discrete 离散的  dynamic 动态的
//                forceDirection:'vertical'
            },
//              physics:false
        },
        // 相互作用
        interaction: {
            dragView: false,
            zoomView: false,
//              dragNodes:false,
            hover: true,
            hoverConnectedEdges: true
            // 键盘
            // keyboard: {
            //   enabled: true,
            //   speed: {x: 10, y: 10, zoom: 0.02},
            //   bindToWindow: true
            // },
//              zoomable:true,
//              dragable:false
        },
        physics: {
            enabled: true,
            // stabilization: false,
            // 稳定
            // stabilization: {
            //   enabled: false,
            //   // 迭代次数
            //   iterations: 100,
            //   updateInterval: 10000,
            //   onlyDynamicEdges: false,
            //   fit: false
            // },
            solver: 'barnesHut',
            hierarchicalRepulsion: {
                centralGravity: 0.0,
                springLength: 100,
                springConstant: 0.01,
                nodeDistance: 120,
                damping: 0.09
            },
            barnesHut: {
                // 引力常数，我们喜欢排斥。所以这个值是负值。如果你想排斥越强，降低值（- 10000，- 50000）。
                gravitationalConstant: -20000,
                // 中心的重力
                centralGravity: 0.3,
                // 跳跃的长度
                springLength: 0,
                // 跳跃的常数
                springConstant: 0.1,
                // 减震比例 0 - 1
                damping: 1,
                // 避开重叠 0 - 1
                avoidOverlap: 1
            },
            maxVelocity: 50,
            minVelocity: 0.1,
            timestep: 0.1
        },
        // physics: true,
        // 物理现象
        // 布局
        layout: {
            // 随机的种子数
            randomSeed: 0,
            // 改良布局
            improvedLayout: false,
            // 分层
            hierarchical: {
                enabled: false
            }
        },
        // 操作，操控
        // manipulation: {
        //   enabled: false,
        //   initiallyActive: false,
        //   addNode: true,
        //   addEdge: true,
        //   editNode: (a, b) => {
        //     console.log(a, b)
        //   },
        //   editEdge: true,
        //   deleteNode: true,
        //   deleteEdge: true,
        //   controlNodeStyle: {
        //     // all node options are valid.
        //   }
        // },
        // 分组
        // groups: {
        //   useDefaultGroups: true,
        //   myGroup: {color:{background:'red'}, borderWidth:3}
        // }
    }
    network = new vis.Network(mynetwork, data, options)

    // 监听node双击事件
    network.on("doubleClick", function (properties) {
//            console.log(properties)
        var ids = properties.nodes;
        if (ids[0] == 1) return
        var clickedNodes = nodes.get(ids)

        if(clickedNodes[0].data){
            let host_ids = clickedNodes[0].data.host_ids
            console.log(clickedNodes[0])
            // self.$router.push('/HostDetail/' + host_ids)
        }

    })

    // 在画每个node之前自定义点东西
    network.on("beforeDrawing", function (ctx) {
        // 如果this.hosts不是空数组
        //   console.log(data)
        if (hostData.length > 0) {
            temp_nodes.forEach((val, index) => {
                if (index == 0) {
                    // renderGridLine(ctx, width, height, 20)
                    renderLogoNode(network, ctx)
                } else {
                    renderHostCell(network, ctx, val.id, hostData[index - 1])
                }
            })
        } else {
            renderLogoNode(network, ctx)
            // renderGridLine(ctx, width, height, 20)
        }
    })

}

//  主机数量比较多的时候的渲染主方法
export function drawMany(self, hoverDom) {

    let temp_nodes = []
    let temp_edges = []

    let network = null

    let EDGE_LENGTH_MAIN = 150
    let EDGE_LENGTH_SUB = 300
    let line_color = '#fff'
    let font_color = '#fff'

    let mynetwork = self.$refs.mynetwork
    let width = mynetwork.clientWidth
    let height = mynetwork.clientHeight

    // 分组
    temp_nodes.push({
        id: 1,
        label: '',
        // label: '蜂眼主机监控',
        image: require('../assets/img/logo.png'),
        shape: 'image',
        color: line_color,
        font: {
            color: font_color
        },
        fixed: true,
        physics: true,
        x: 200,
        y: 200,
        widthConstraint: {minimum: 130, maximum: 100},
        heightConstraint: {minimum: 130, maximum: 100},
        size: 50
//            chosen:false
    });


    self.hosts.forEach((val, index) => {
        temp_nodes.push({
            id: 2 + index,
            label: renderName(val.host.name).name,
            image: require('../assets/img/host.png'),
            shape: 'image',
            // shape: 'circle',
            shapeProperties: {
                borderDashes: false, // only for borders
                borderRadius: 6,     // only for box shape
                interpolation: false,  // only for image and circularImage shapes
                useImageSize: false,  // only for image and circularImage shapes
                useBorderWithImage: false  // only for image shape
            },
            color: {
                border: '#fff',
                background: '#282828',
                hover: {
                    border: '#fff',
                    background: '#4a4a4a'
                }
            },
            font: {
                color: font_color,
                size: 18
            },
            // title: val.host.name,
            title: hoverDom || val.host.name,
            data: val,
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.5)',
                size: 10,
                x: 5,
                y: 5
            },
            size: 30
        })
        temp_edges.push({from: 1, to: 2 + index, length: EDGE_LENGTH_SUB})
    })

    let nodes = new vis.DataSet(temp_nodes)
    let edges = new vis.DataSet(temp_edges)

    var container = self.$refs.mynetwork
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        configure: {
            enabled: false,
            filter: 'physics',
            showButton: true
        },
        edges: {
            arrowStrikethrough: false,
            hidden: false,
            hoverWidth: 3,
            smooth: {
                enabled: false,
                type: 'discrete',
//                forceDirection:'vertical'
            },
//              physics:false
        },
        interaction: {
            dragView: true,
            zoomView: true,
//              dragNodes:false,
            hover: true,
//              zoomable:true,
//              dragable:false
        },
        physics: {
            enabled: true,
            solver: 'barnesHut',
            hierarchicalRepulsion: {
                centralGravity: 0.0,
                springLength: 100,
                springConstant: 0.01,
                nodeDistance: 120,
                damping: 0.09
            },
            barnesHut: {
                gravitationalConstant: -50000,
                centralGravity: 0.3,
                springLength: 95,
                springConstant: 0.04,
                damping: 0.09,
                avoidOverlap: 0
            },
            maxVelocity: 50,
            minVelocity: 0.1,
            timestep: 0.1
        },
        layout: {
            // randomSeed:34,
            hierarchical: {
                enabled: false,
            },
        }
    }
    network = new vis.Network(container, data, options)

    network.on("doubleClick", function (properties) {
        var ids = properties.nodes
        if (ids[0] == 1) return
        var clickedNodes = nodes.get(ids)
        let host_ids = clickedNodes[0].data.host.host_ids
        console.log(clickedNodes[0])
        self.$router.push('/HostDetail/' + host_ids)
    })

    // 移入node显示title的时候
    network.on("showPopup", function (ids) {
        let hoverNodes = nodes.get(ids)
        let data = hoverNodes.data
        let hoverData = self.hoverData
        hoverData.host_name = data.host.name

        // console.log(hoverDom.clientWidth)
        // console.log(hoverDom.clientHeight)
        // hoverDom.parentNode.style.padding = 0 + 'px'
        // hoverDom.parentNode.style.width = hoverDom.clientWidth + 'px'
        // hoverDom.parentNode.style.height = hoverDom.clientHeight + 'px'

        let cpu_val = data.res.cpu_usage ? data.res.cpu_usage : 0
        let mem_val = data.res.mem_usage ? data.res.mem_usage / data.res.mem_total : 0
        let disk_val = data.res.disk_usage ? data.res.disk_usage / data.res.disk_total : 0
        let safe_val = data ? (data.pelfBlack * 0.8 + data.pelfGray * 0.2) * 0.45 + (data.processCount) * 0.35 : 0
        if (safe_val > 100) {
            safe_val = 100
        }
        hoverData.cpu.val = cpu_val
        hoverData.cpu.bgColor = renderColor(cpu_val)
        hoverData.mem.val = mem_val
        hoverData.mem.bgColor = renderColor(mem_val)
        hoverData.disk.val = disk_val
        hoverData.disk.bgColor = renderColor(disk_val)
        hoverData.safe.val = safe_val
        hoverData.safe.bgColor = renderColor(safe_val)
    })


    network.on("beforeDrawing", function (ctx) {
        renderLogoNode(network, ctx)
    })

}

