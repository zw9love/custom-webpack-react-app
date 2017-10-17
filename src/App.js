/**
 * Created by zengwei on 2017/9/7
 */

import React, {Component, PropTypes} from 'react'
import Header from './components/Header'
import Side from './components/Side'
import Loading from './components/Loading'
import './assets/stylus/App.styl'
// import * as swal from "./utils/Swal"


export default class App extends Component {

    // 构造器
    constructor(props) {
        super(props)
        this.state = {}
    }

    // 组件加载完成事件
    componentDidMount() {
        // this.context.store.dispatch({type: 'setSwal', value: swal})
    }

    // 主渲染方法
    render() {
        const {children} = this.props
        return (

            <div className='app-container'>
                <Loading />
                <Header/>
                <Side/>
                {children}
                {/*<div className="loading-container">*/}
                    {/*<div className="el-loading-spinner">*/}
                        {/*<svg viewBox="25 25 50 50" className="circular">*/}
                            {/*<circle cx="50" cy="50" r="20" fill="none" className="path" />*/}
                        {/*</svg>*/}
                        {/*<p className="el-loading-text">加载中...</p>*/}
                    {/*</div>*/}
                {/*</div>*/}
                {/*<Header/>*/}
                {/*<Side/>*/}
                {/*{children}*/}
            </div>
        )
    }

}

// App.contextTypes = {
//     store: PropTypes.object.isRequired
// }