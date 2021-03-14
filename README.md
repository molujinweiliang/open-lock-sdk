# 开始

## 原生小程序接入

1.安装sdk以及依赖：
> ps: <medium>如果在你的小程序根目录下面没有package.json文件，请先执行npm init或者npm init -y，然后一路回车即可。</medium>

```
npm i open-lock-sdk --save
```
2.小程序构建npm：
> ps: <medium>构建成功之后会在根目录生成miniprogram_npm文件夹，在具体的页面中根据对应的路径引入miniprogram_npm/fxl-mp-sdk/main.js </medium>

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
|keyData |否  |String | 开锁密钥  |
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
            mac_id，
            manage_id，
            filePath，
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


