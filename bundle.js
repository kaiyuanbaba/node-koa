(function(modules) {
    //module缓存对象
    var installedModules = {};
    //require函数
    function __webpack_require__(moduleId) {
        //检查module是否在cache中
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        //若不在cache中则新建module并放入cache中
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };
        //执行module函数
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        //标记module已经加载
        module.loaded = true;
        //返回module的导出模块
        return module.exports;
    }

    //暴露modules对象（__webpack_modules__）
    __webpack_require__.m = modules;
    //暴露modules缓存
    __webpack_require__.c = installedModules;
    //设置webpack公共路径__webpack_public_path__
    __webpack_require__.p = "";
    //读取入口模块并且返回exports导出
    return __webpack_require__(0);

})([function(module, exports, __webpack_require__) { /*模块Id为0*/
    var text = __webpack_require__(1);
    console.log(text);
}, function(module, exports) { /*模块Id为1*/
    module.exports = 'Hello world';
}]);