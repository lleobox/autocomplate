"use strict"

;
(function ($) {
    var autoComplete = function (elems, source) {
        elems = elems || '';
        if (!elems) {
            return;
        }

        var autocomplete = this;
        autocomplete.match_str = source;

        elems.each(function (key, elem) {
            if ($(elem).parent('div.autocomplete-box')[0]) {
                return;
            }

            $(elem).wrap($('<div class="autocomplete-box"></div>')).after($('<ul class="suggest-list" tabindex="0"></ul>'));
            autocomplete.bind_input(elem);
            autocomplete.bind_ul($(elem).next());
        });

    };
    autoComplete.prototype = {
        // 给 input 绑定键盘事件
        bind_input: function (elem) {
            var autocomplete = this,
                self = $(elem);

            self.keydown(function (event) {
                event = event || window.event;
                var keycode = (event.keyCode ? event.keyCode : event.which );

                // enter keycode => 13
                // 取消输入框默认回车提交事件
                if (keycode == '13') {
                    event.preventDefault();
                }

                // down keycode 40
                // 焦点跳转
                if (keycode == '40') {
                    self.next().children().first().focus();
                }
            });

            self.keyup(function (event) {
                event = event || window.event;
                var keycode = (event.keyCode ? event.keyCode : event.which ),
                    query = self.val(), matchArr;

                matchArr = autocomplete.makeArr(query);
                autocomplete.source(query, matchArr, autocomplete.showItem);
            });
        },

        // 给 ul 绑定键盘事件
        bind_ul: function (elem) {
            var $input = elem.prev();

            elem.on('click', function (event) {
                event = event || window.event;
                var srcElem = event.target || event.srcElement;

                $input.val($(srcElem).text());
                elem.fadeOut(0);
            }).on('keydown', function (event) {
                event = event || window.event;
                var srcElem = event.target || event.srcElement,
                    keycode = event.keyCode || event.which;

                // up keycode 38, down keycode 40, enten keycode 13
                switch (keycode) {
                    case 13:
                        // 取消回车键触发的表单提交事件
                        event.preventDefault();
                        $input.val($(srcElem).text()).focus();
                        elem.fadeOut(0);
                        break;
                    case 38:
                        // 如果前面一个元素是 li
                        if ($(srcElem).prev()[0]) {
                            $(srcElem).prev().focus();
                        } else {
                            // 清除 input 中按 上方向键导致光标位于最前面的影响
                            event.preventDefault();
                            $input.val($input.val()).focus();
                        }
                        break;
                    case 40:
                        $(srcElem).next().focus();
                        break;
                }
            });
        },

        // 帅选匹配元素
        source: function (query, matchArr, callback) {
            var qRegex, result, ac = this;
            if (query.length > 0) {
                qRegex = new RegExp(query, "i");
                result = matchArr.map(function (str) {
                    if (qRegex.test(str)) {
                        return str;
                    } else {
                        return null;
                    }
                }).filter(function (value) {
                    return !!value;
                });
                return callback.call(this, result);
            } else {
                return callback.call(this, null);
            }
        },

        // 创建待匹配数组
        makeArr: function (query) {
            var autocomplete = this, url, result;

            // 匹配传入的数组
            if (autocomplete.match_str instanceof Array) {
                return autocomplete.match_str;
            } else {
                // 通过 ajax 传入匹配数组
                //url = self.match_str + "data.json";
                $.ajax({
                    // 测试代码， 实际使用时需修改
                    url: self.match_str + "data.json",
                    type: 'get',
                    data: query,
                    async: false,
                    dataType: 'json',
                    success: function (data) {
                        result = data['data'];
                    }
                });
                return result;
            }
        },

        // 插入匹配到的元素
        showItem: function (result) {
            var $ul = $('.suggest-list');

            // 传入的匹配内容为空
            if (!result || result.length == 0) {
                $ul.empty().css({
                    display: 'none'
                });
            } else {
                $ul.empty().css({
                    display: 'block'
                });
                result.forEach(function (val) {
                    var $item = $('<li tabindex="-1"></li>').text(val);
                    $ul.append($item);
                });
            }
        }
    };

    $.fn.autocomplete = function (source) {
        var ato = new autoComplete(this, source);
        return this;
    }
})(jQuery);