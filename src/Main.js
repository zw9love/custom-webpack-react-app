/**
 * Created by zengwei on 2017/9/1.
 */
//Main.js
import React from 'react';
import {render} from 'react-dom'
import Router from './router/index'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import '../node_modules/sweetalert2/dist/sweetalert2.min.css'
import "../node_modules/vis/dist/vis-network.min.css"
import 'element-theme-default'
import './assets/stylus/Global.styl'

render(<Router />, document.getElementById('root'))