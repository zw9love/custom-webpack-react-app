/**
 * Created by zengwei on 2017/9/1
 */

import React, {Component, PropTypes} from 'react'
import Grid from '../components/Grid'
import Netopo from '../components/Netopo'
import '../assets/stylus/Home.styl'
import {fetchData} from '../utils/Fetch'
import loading from "../utils/Loading";


export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            hostData: [],
            gridData: [],
            columns: [
                // {
                //     type: 'selection'
                // },
                {
                    label: "主机名",
                    prop: "hostName",
                    align: 'center'
                },
                {
                    label: "cpu",
                    prop: "cpu",
                    align: 'center'
                },
                {
                    label: "内存",
                    prop: "mem",
                    align: 'center'
                },
                {
                    label: "磁盘",
                    prop: "disk",
                    align: 'center'
                },
                {
                    label: "网络",
                    prop: "net",
                    align: 'center'
                },
                {
                    label: "pe(黑/白/灰)",
                    prop: "pelf",
                    align: 'center'
                },
                {
                    label: "会话(TCP/UDP)",
                    prop: "portCount",
                    align: 'center'
                },
                {
                    label: "进程",
                    prop: "processCount",
                    align: 'center'
                }, {
                    label: "安全",
                    prop: "safe",
                    align: 'center'
                }
            ]
        }

        this.getData = this.getData.bind(this)

    }

    // 组件加载完成事件
    componentDidMount() {
        loading(this, false)
        this.getData()
    }

    // fetch获取数据
    getData(){
        fetchData('count/get', {}, (res) => {
            // this.setState({hostData: res})
            this.renderGridData(res)
        })
    }

    // 渲染表单数据
    renderGridData(data) {
        // console.log(data)
        let arr = []
        let cpu_usage = 0, mem_usage = 0, disk_usage = 0, net_up = 0, net_down = 0
        data.forEach((val, index) => {

            if (val.res) {
                cpu_usage = val.res.cpu_usage
                mem_usage = val.res.mem_usage
                disk_usage = val.res.disk_usage
                net_up = val.res.net_up
                net_down = val.res.net_down
            }

            let obj = {
                hostName: val.host.name,
                cpu: cpu_usage,
                mem: mem_usage,
                disk: disk_usage,
                net: net_up + '/' + net_down,
                pelf: val.pelfBlack + '/' + val.pelfWhite + '/' + val.pelfGray,
                portCount: val.portCount.TCP + '/' + val.portCount.UDP,
                processCount: val.processCount,
                safe: val.vulCount
            }

            arr.push(obj)
        })

        this.setState({gridData: arr, hostData: data})
    }


    render() {
        return (
            <div className='home-container'>
                <div className='main'>
                    <div className='wrapper'>
                        <div className='left'>

                            <Netopo data={this.state.hostData}/>
                        </div>
                        <div className='right' />
                    </div>
                </div>
                <div className='table'>
                    <Grid data={this.state.gridData} columns={this.state.columns}/>
                </div>
            </div>
        )
    }
}

Home.contextTypes = {
    store: PropTypes.object.isRequired
}