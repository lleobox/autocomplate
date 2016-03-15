# 简便的自动补全插件

基于`jQuery`的自动补全插件，[github地址][1]
>这是一个很简便的插件，为了扩展方便，我没有添加很多多余的功能，这个可以根据实际项目或效果的需要进行更改。

![效果展示][2]

## 使用方法
1. 引入相关文件
    ```html
    <link rel="stylesheet" href="dist/autocomplete.min.css">
    <script src="dist/autocomplete.min.js"></script>
    ```

2. 调用`autocomplete`函数
    ```html
    <input type="text" autocomplete="off" class="autocomplete">
    ```

    ```javascript
    // 直接传入想要的匹配数组
    $('.autocomplete').autocomplete(['javascript', 'java']);
    ```

    ```javascript
    // 传入 url 通过 ajax 调用相关匹配数据
    $('.autocomplete').autocomplete("http://localhost:63342/autocomplete/test_data/");
    ```


  [1]: https://github.com/lleobox/autocomplete
  [2]: https://raw.githubusercontent.com/lleobox/autocomplete/master/autocomplete.gif