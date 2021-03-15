import { AbstractBlueTooth, errorMsg } from 'abstract-bluetooth';
const { errorCodeCallback, errorLogFunction } =  errorMsg;
// import {of, from } from "rxjs";
// import { concatMap, mergeMap, finalize } from "rxjs/operators";
const Rx = require('../utils/rxjs.umd.min.js');
const { of, from } = Rx;
const { concatMap, mergeMap, finalize, } = Rx.operators;
var subscribition = null;

export default class OpenLock extends AbstractBlueTooth{
    constructor(){
        super();
    }
    // 开锁
    openLock({ macId, keyData, timeout=5000 }, callback){
        const that = this;
        let currentDevice = null;
        subscribition = of(1)
            .pipe(
                concatMap(res=>{
                    return from(that.open());
                })
            )
            .pipe(
                concatMap(res=>{
                    return from(that.search(macId));
                })
            )
            .pipe(
                concatMap(res=>{
                    currentDevice = res;
                    that.status = 30;
                    return from(that.connect(currentDevice));
                })
            )
            .pipe(
                concatMap(res=>{
                    let key = [
                        {
                            k: '06',
                            l: 18,
                            v: keyData,
                        }
                    ];
                    console.log(key);
                    return from(that.sendData('02', key, timeout));
                })
            )
            .pipe(
                finalize(async (res) => {
                    await that.closeConnect();
                })
            )
            .subscribe(
                res=> {
                    if (res.id == "02" && res['02'] == "00") {
                        let callbackObj = errorCodeCallback(0);
                        callbackObj.deviceInfo = currentDevice;
                        callback(callbackObj);
                    }else {
                        callback(errorCodeCallback(1094));
                    }
                },
                code=> {
                    callback(errorCodeCallback(code));
                },
            )
    }

    async cancel(){
        if(subscribition){
            await this.finalize();
            subscribition.unsubscribe();
            subscribition = null;
        }
    }

    // openLock(macId, manage_id, filePath){
    //     const that = this;
    //     return new Promise((resolve, reject) => {
    //         let currentDevice = null, keyData = null, historyId = null;
    //         that.open()
    //             .then(res=> that.search(macId))
    //             .then(res=> {
    //                 currentDevice = res;
    //                 that.status = 30;
    //                 return that.getKey(res, macId, manage_id, filePath);
    //             })
    //             .then(res=> {
    //                 keyData = res.sendLockData;
    //                 historyId = res.historyId;
    //                 return that.connect(currentDevice);
    //             })
    //             .then(res=> that.sendData('02', keyData))
    //             .then( async res=>{
    //                 if (res.id == "02" && res['02'] == "00") {
    //                     resolve(errorCodeCallback(0));
    //                     // 开锁成功的回调
    //                     openCallBack({
    //                         macId,
    //                         historyId,
    //                         result: 1,
    //                         quantity: currentDevice.electricity/100,
    //                     }).catch(e=>{})
    //                 }else {
    //                     reject(errorCodeCallback(1094));
    //                     errorLog({ content: errorLogFunction(1094) }).catch(e=>{});
    //                 }
    //             })
    //             .catch(code=> {
    //                 reject(errorCodeCallback(code));
    //                 errorLog({ content: errorLogFunction(code) }).catch(e=>{});
    //             }).finally(async ()=>{
    //                 await that.finalize();
    //             })
    //     })
    // }
}
