/**
 * Created by zengwei on 2017/9/9
 */


export default function loading(self, val, fn){
    if(fn){
        setTimeout(()=>{
            fn()
            self.context.store.dispatch({type: 'setLoadingActive', value: val})
        },300)
    }else{
        self.context.store.dispatch({type: 'setLoadingActive', value: val})
    }
}