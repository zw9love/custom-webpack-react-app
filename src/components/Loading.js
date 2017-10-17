/**
 * Created by zengwei on 2017/9/9
 */

import React, {Component, PropTypes} from 'react'
import '../assets/stylus/Loading.styl'

export default class Loading extends Component {

    // 构造器
    constructor(props) {
        super(props)
        this.state = {
            loadingActive: true
        }
        this.renderLoading = this.renderLoading.bind(this)
    }

    // 组件加载完成事件
    componentDidMount() {
        this.context.store.dispatch({type: 'setLoading', value: this})
    }

    // 渲染loading
    renderLoading() {
        if (this.state.loadingActive) {
            return (
                <div className="loading-container">
                    <div className="">
                        <img src={require('../assets/img/loading.svg')} alt="Loading icon" width="64"/>
                        <p>加载中...</p>
                    </div>
                </div>
            )
        }

        return null

    }

    // 主渲染方法
    render() {
        return this.renderLoading()
    }
}

Loading.contextTypes = {
    store: PropTypes.object.isRequired
}