/**
 * Created by zengwei on 2017/9/6
 */

import React, {Component} from 'react'
import '../assets/stylus/EditButton.styl'

export default class EditButton extends Component {

    // 构造器
    constructor(props) {
        super(props)
        this.state = {}
    }

    // 组件加载完成事件
    componentDidMount() {

    }

    // 主渲染方法
    render() {
        return (
            <button className='edit-btn' onClick={this.props.click}>{this.props.name}</button>
        )
    }
}