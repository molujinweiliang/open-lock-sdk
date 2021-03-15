# 开始

## 原生小程序接入

1.安装sdk以及依赖：
> ps: <medium>如果在你的小程序根目录下面没有package.json文件，请先执行npm init或者npm init -y，然后一路回车即可。</medium>

```
npm i open-lock-sdk --save
```
2.小程序构建npm：
> ps: <medium>构建成功之后会在根目录生成miniprogram_npm文件夹，在具体的页面中根据对应的路径引入miniprogram_npm/open-lock-sdk/main.js </medium>

3.项目中引入使用
> ps: <medium>在具体的页面中根据对应的路径引入miniprogram_npm/open-lock-sdk/main.js </medium>

```
就初始化举例
import { Init } from './miniprogram_npm/open-lock-sdk/main'
const init = new Init();
init.init(params);
或者
const SDK = require('./miniprogram_npm/open-lock-sdk/main')
const init = new SDK.Init();
init.init(params);
```


## uniapp、mpvue、taro等小程序框架中接入
1.安装sdk以及依赖：

```
npm i open-lock-sdk --save
```

2.项目中引入使用
```
// 依赖加载
import { Init } from 'open-lock-sdk'
// 全局引入
import SDK from 'open-lock-sdk'
```

> ps: <medium>在后面的方法实例中就以小程序引入为例，如果您是使用第三方框架开发，更改一下引入方式，请注意！！！</medium>








# 初始化


## 实例化开锁类
OpenLock 实例，可通过 new OpenLock() 获取。
```
import { OpenLock } from './miniprogram_npm/open-lock-sdk/main'
const openLock = new OpenLock();
或
const SDK = require('./miniprogram_npm/open-lock-sdk/main')
const openLock = new SDK.OpenLock();
```

## openLock.openLock()
打开设备（开锁）
##### 参数

|参数名|必选|类型|说明|
|:---- |:---|:----- |-----   |
|mackId |是  |String | 设备的mac_id  |
|keyData |是  |String | 开锁密钥  |
|timeout |否  |String | 超时时间，默认5000（单位：ms）  |
|callback |是  |Function | 开锁回调  |

##### 返回说明

|参数名|说明|
|:---- |:--- |
|errno |结果编码 |
|errmsg | 提示信息 |

##### 示例：
```
   open(){
        openLock.openLock({
            macId，
            keyData，
            timeout，
        }, (res)=>{
            if(res.errno==0){
                console.log('开锁成功');
            }esle{
                console.log('开锁失败');
            }
        })
   }
```

## openLock.destroy()
取消开锁流程（开锁整个流程较长，为了防止调用开锁方法时快速返回上一界面，后台仍在进行开锁流程时出现各种意想不到的bug）
##### 示例：
```
    onHide(){
        openLock.cancel();
    },
    onUnload(){
        openLock.cancel();
    }
```





### SDK错误码
调用sdk里面的方法，要么会抛出promise，要么会抛出一个callback，具体的到对应方法里面会描述。这里先讲返回参数，callback有两个参数，errno,errmsg。可以依此判断调用结果。

##### errno的值：

|errno|说明|
|:----  |:-----|
|-1 |未知错误   |
|0 |未初始化蓝牙适配器   |
|1000 |成功   |
|1010 |当前应用未获得蓝牙权限或者未打开蓝牙   |
|1020 |未传设备的MAC地址   |
|1030 |请前往应用管理-权限控制打开地理位置权限   |
|1040 |搜索设备失败   |
|1050 | 未搜索到对应设备  |
|1051 |当前设备无管理员   |
|1060 |请求设备信息失败   |
|1070 |获取秘钥失败   |
|1071 |照片未通过对比   |
|1072 |未完成实名认证   |
|1073 |未到可以开锁时间   |
|1074 |已过有效期   |
|1080 |连接设备失败   |
|1081 |启用notifyBLECharacteristicValueChange失败   |
|1082 |连接设备出现10003或者10012错误,并且重连3次后失败   |
|1090 |向蓝牙数据失败   |
|1091 |发送数据失败： 数据格式不正确   |
|1092 |发送数据失败： 获取特征值失败   |
|1093 |蓝牙反馈超时或未反馈   |
|1094 |蓝牙反馈结果为操作失败   |
|1095 |设备读卡失败   |
|1096 |操作超时 （添加卡和添加指纹的时候，超出时间）  |
|1097 |此卡片已被添加   |
|1100 |添加锁回调时出现错误   |
|9999 |程序进入后台或者用户主动取消   |





