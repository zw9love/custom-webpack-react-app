/**
 * Created by zengwei on 2017/9/5
 */

import React, {Component} from 'react'
import {Table} from 'element-react'

export default class Grid extends Component {

    constructor(props) {
        super(props)
        this.renderClass = this.renderClass.bind(this)
    }

    // 渲染table row 的自定义className
    renderClass(row, index) {
        return 'rowClass'
    }

    render() {
        return (
            <Table
                // style={{width: '100%'}}
                columns={this.props.columns}
                rowClassName={this.renderClass}
                // maxHeight={200}
                data={this.props.data}
                // stripe={true}
                border={true}
            />
        )
    }
}