/**
 * Created by zengwei on 2017/9/8
 */

import React, {Component} from 'react'
import Grid from '../components/Grid'
import EditButton from '../components/EditButton'
import {fetchData} from '../utils/Fetch'


export default class KeyUser extends Component {

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
                    label: "用户名",
                    prop: "username",
                    align: 'center'
                },
                {
                    label: "登录名",
                    prop: "login_name",
                    align: 'center'
                },
                {
                    label: "部门",
                    prop: "dept",
                    align: 'center'
                },
                {
                    label: "联系方式",
                    prop: "contact",
                    align: 'center'
                },
                {
                    label: "邮箱",
                    prop: "mail",
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
                username: val.username,
                login_name: val.login_name,
                dept: val.dept,
                contact: val.contact,
                mail: val.mail,
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