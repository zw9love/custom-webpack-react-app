/**
 * Created by zengwei on 2017/9/2
 */

import swal from 'sweetalert2'
import '../assets/stylus/Swal.styl'

let bgColor = '#282828'
let btnBgColor = '#4a4a4a'

export function success(title, text, sureFn, cancelFn) {
    swal({
        type: 'success',
        title: title,
        text: text,
        showCancelButton: false,
        confirmButtonText: '确定',
        confirmButtonColor: btnBgColor,
        allowOutsideClick: false,
        confirmButtonClass: 'confirmButtonClass',
        background: bgColor,
        customClass: 'customClass'
    }).then(function () {
        if (sureFn) {
            sureFn()
        }
    }, function (dismiss) {
        if (cancelFn) {
            cancelFn()
        }
    })
}

export function confirm(title, text, sureFn, cancelFn) {
    swal({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonColor: btnBgColor,
        cancelButtonColor: btnBgColor,
        confirmButtonClass: 'confirmButtonClass',
        cancelButtonClass: 'confirmButtonClass',
        background: bgColor,
        customClass: 'customClass',
        allowOutsideClick: false
    }).then(function () {
        if (sureFn) {
            sureFn()
        }
    }, function (dismiss) {
        if (cancelFn) {
            cancelFn()
        }
    })
}
