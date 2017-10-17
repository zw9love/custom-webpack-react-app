/**
 * Created by zengwei on 2017/9/8
 */

import React, {Component} from 'react'
import Grid from '../components/Grid'
import EditButton from '../components/EditButton'
import {fetchData} from '../utils/Fetch'

export default class BlackWhite extends Component {

    // 构造器
    constructor(props) {
        super(props)
        this.state = {
            gridData:[],
            columns: [
                {
                    type: 'selection'
                },
                {
                    label: "文件名",
                    prop: "file_short_name",
                    align: 'center'
                },
                {
                    label: "原文件名",
                    prop: "original_name",
                    align: 'center'
                },
                {
                    label: "文件大小",
                    prop: "size",
                    align: 'center'
                },
                {
                    label: "版本号",
                    prop: "version",
                    align: 'center'
                },
                {
                    label: "公司",
                    prop: "company",
                    align: 'center'
                },
                {
                    label: "全路径",
                    prop: "full_path",
                    align: 'center'
                },
                {
                    label: "创建时间",
                    prop: "c_time",
                    align: 'center'
                },
                {
                    label: "修改时间",
                    prop: "m_time",
                    align: 'center'
                },
                {
                    label: "打开时间",
                    prop: "v_time",
                    align: 'center'
                },
                {
                    label: "操作",
                    prop: "handle",
                    align: 'center',
                    render: (data, column)=>{
                        return <EditButton name="删除"/>
                    }
                }
            ]
        }
    }

    // 组件加载完成事件
    componentDidMount() {
        fetchData('/BeeneedleUserSubject/get', {}, (res) => {
            this.renderGridData(res)
        })
    }

    // 渲染表单数据
    renderGridData(data) {
        console.log(data)
        let arr = []
        data.forEach((val, index) => {
            let obj = {
                file_short_name: val.file_short_name,
                original_name: val.original_name,
                size: val.size,
                version: val.version,
                company: val.company,
                full_path: val.full_path,
                c_time: val.c_time,
                m_time: val.m_time,
                v_time: val.v_time,
            }

            arr.push(obj)
        })

        this.setState({gridData: arr})
    }

    // 主渲染方法
    render() {
        return (
            <div>
                <Grid data={this.state.gridData} columns={this.state.columns}/>
            </div>
        )
    }
}