/**
 * Created by zengwei on 2017/9/1
 */

import React, {Component, PropTypes} from 'react'
import '../assets/stylus/Side.styl'
import {fetchData} from '../utils/Fetch'


export default class Side extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuData: []
        }

        this.renderMenuData = this.renderMenuData.bind(this)
        this.renderMenu = this.renderMenu.bind(this)
        this.menuClick = this.menuClick.bind(this)
    }

    // static contextTypes = {
    //     router: PropTypes.object.isRequired
    // }

    componentDidMount() {
        fetchData('menu/get', {}, (res) => {
            this.renderMenuData(res)
        })
    }

    // 渲染menu数据
    renderMenuData(data) {

        let level1 = []
        let level2 = []
        let menu = []

        data.forEach((val, index) => {
            if (val.level == 1) {
                level1.push(val)
            } else {
                level2.push(val)
            }
        })

        level1.forEach((val1, index1) => {
            let temp = []
            level2.forEach((val2, index2) => {
                if (val1.ids == val2.parent_ids) {
                    temp.push(val2)
                }
            })
            menu.push({
                name: val1.names,
                level: val1.level,
                icon: val1.icon,
                url: temp[0] ? temp[0].url : val1.url || '',
                menu: temp
            })
        })

        this.setState({menuData: menu})
        // console.log(data)
        // console.log(menu)

    }

    // 渲染一级菜单
    renderMenu() {
        let data = this.state.menuData
        let arr = []
        data.map((val, index) => {
            let iconClass = 'fa-' + val.icon
            let secondMenu = val.menu
            arr.push(
                <li key={index}>
                    {/*<i className={fa('fa', iconClass)} aria-hidden="true"/>*/}
                    <i className={'fa ' + iconClass} aria-hidden="true"/>
                    <ul>
                        <li onClick={() => {this.menuClick(val)}}><span>{val.name}</span></li>
                        {this.renderSecondMenu(secondMenu)}
                    </ul>
                </li>
            )
        })

        return arr
    }

    // 渲染二级菜单
    renderSecondMenu(data) {
        let arr = []
        data.map((val, index) => {
            arr.push(
                <li key={index} onClick={() => {this.menuClick(val)}}>
                    <span>{val.names}</span>
                </li>
            )
        })
        return arr
    }

    // 菜单点击事件
    menuClick(data) {

        let {history} = this.context.router

        history.push({
            pathname: '/' + data.url,
            // state: {
            //     data: this.props.data
            // }
        })
        console.log(data)
        console.log('pathname = /' + data.url)
    }

    render() {
        return (
            <div className="side">
                <ul>
                    {this.renderMenu()}
                </ul>
            </div>
        )
    }
}

Side.contextTypes = {
    router: PropTypes.object.isRequired
}

