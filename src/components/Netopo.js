/**
 * Created by zengwei on 2017/9/8
 */

import React, {Component} from 'react'
import {renderColor, renderHostCell, renderBgLine, draw, drawMany} from '../utils/Draw'
import '../assets/stylus/Netopo.styl'

export default class Netopo extends Component {

    // 构造器
    constructor(props) {
        super(props)
        this.state = {
            hostData: []
        }
        this.renderHost = this.renderHost.bind(this)
    }

    // 组件加载完成事件
    componentDidMount() {

    }

    // 在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用。
    componentWillReceiveProps(res) {

        this.renderHost(res.data)
    }

    // 渲染主机Netopo图
    renderHost(data,) {


        let gridNum = 20
        let myCanvas = this.refs.myCanvas

        // 画node
        data.length > 50 ? drawMany(this) : draw(this, data)
        // 不开延时器画线会有问题，由于表单的加载顺序会导致线画不整齐
        setTimeout(() => {
            renderBgLine(myCanvas, gridNum)

        }, 0)

        // let hoverTitle = this.refs.hoverTitle
        // let data = this.hosts
        // data.length > 50 ? drawMany(this) : draw(this, data)
        // data.length > 50 ? drawMany(this, hoverTitle) : draw(this)

    }

    // 主渲染方法
    render() {
        return (
            <div className="netopo-container">
                <div className="netopo-shadow">
                    <canvas ref="myCanvas"/>
                </div>
                <div id="mynetwork" ref="mynetwork"/>
            </div>
        )
    }
}