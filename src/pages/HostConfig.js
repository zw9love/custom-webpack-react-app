/**
 * Created by zengwei on 2017/9/6
 */

import React, {Component, PropTypes} from 'react'
import Grid from '../components/Grid'
import EditButton from '../components/EditButton'
import {fetchData} from '../utils/Fetch'
import {success, confirm} from "../utils/Swal";
import loading from "../utils/Loading";
import '../assets/stylus/HostConfig.styl'


export default class HostConfig extends Component {

    // 构造器
    constructor(props) {
        super(props)
        this.state = {
            gridData: [],
            columns: [
                {
                    type: 'selection'
                },
                {
                    label: "主机名",
                    prop: "hostName",
                    align: 'center'
                },
                {
                    label: "IP",
                    prop: "ip",
                    align: 'center'
                },
                {
                    label: "系统类型",
                    prop: "systemType",
                    align: 'center'
                },
                {
                    label: "操作",
                    prop: "handle",
                    align: 'center',
                    // filters: [{text: '家', value: '家'}, {text: '公司', value: '公司'}],
                    render: (data, column) => {
                        return <EditButton name="删除" click={() => {
                            this.delClick(data)
                        }}/>
                    }
                }
            ]
        }

        this.getData = this.getData.bind(this)
        this.delClick = this.delClick.bind(this)
    }

    // 组件加载完成事件
    componentDidMount() {
        this.getData()
    }

    // 利用fetch获取数据
    getData() {
        loading(this, true)
        fetchData('host/get', {}, (res) => {
            loading(this, false, ()=>{
                this.renderGridData(res)
            })
        })
    }

    // 渲染表单数据
    renderGridData(data) {
        let arr = []
        data.forEach((val, index) => {
            let obj = {
                hostName: val.name,
                ip: val.ip,
                systemType: `${val.os_type}_${val.os_version}_${val.os_arch}`,
                tag: '公司',
                id: val.host_ids
            }

            arr.push(obj)
        })
        console.log(data)

        this.setState({gridData: arr})
    }

    // 删除按钮点击事件
    delClick(data) {
        confirm('', '您确定要删除此主机吗？', () => {
            loading(this, true)
            fetchData(`host/delete/${data.id}`, {}, () => {
                loading(this, false)
                success('', '主机删除成功！', () => {
                    this.getData()
                })
            })
        })
    }

    // 主渲染方法
    render() {
        return (
            <div>
                {/*<h1>HostConfig Page</h1>*/}
                <Grid data={this.state.gridData} columns={this.state.columns}/>
            </div>
        )
    }
}

HostConfig.contextTypes = {
    store: React.PropTypes.object.isRequired
}