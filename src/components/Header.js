/**
 * Created by zengwei on 2017/9/1
 */

import React, {Component} from 'react'
import '../assets/stylus/Header.styl'
import {confirm} from "../utils/Swal";


export default class Header extends Component {
    constructor(props) {
        super(props)
    }

    quit() {
        confirm('', '您确定要退出登录吗？', () => {

        })
    }

    render() {
        return (
            <header className='header'>
                <div className='left_header'>
                    <img src={require('../assets/img/logo.png')} alt=""/>
                    <h3>蜂眼主机计算环境安全监控平台</h3>
                </div>
                <div className='right_header'>
                    <ul>
                        <li title="权限">
                            <span>超级管理员</span>
                        </li>
                        <li title="全局设置">
                            <i className='fa fa-cogs' aria-hidden="true"/>
                        </li>
                        <li title="全屏">
                            <i className='fa fa-arrows-alt' aria-hidden="true"/>
                        </li>
                        <li title="退出" onClick={this.quit}>
                            <i className='fa fa-sign-out' aria-hidden="true"/>
                        </li>
                    </ul>
                </div>
            </header>

        )
    }
}