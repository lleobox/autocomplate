"use strict"

;
(function ($) {
    var autoComplete = function (elems, source) {
        elems = elems || '';
        if (!elems) {
            return;
        }

        var ac = this;
        ac.match_str = source;

        elems.each(function (key, elem) {
            if ($(elem).parent('div.autocomplete-box')[0]) {
                return;
            }

            $(elem).wrap($('<div class="autocomplete-box"></div>')).after($('<div class="autocomplete-changes"></div>').append($('<ul></ul>')));
            ac.bind(elem);
        });

    };
    autoComplete.prototype = {
        bind: function (elem) {
            var ac = this,
                self = $(elem);

            self.keydown(function (event) {
                var keycode = (event.keyCode ? event.keyCode : event.which );

                // enter keycode => 13
                // 取消输入框默认回车提交事件
                if (keycode == '13') {
                    event.preventDefault();
                }

            });

            self.keyup(function (event) {
                var query = self.val(), matchArr;
                matchArr = ac.makeArr(query);
                ac.source(query, matchArr, ac.showItem);
            });
        },

        source: function (q, matchArr, cb) {
            var qRegex, result, ac = this;
            if (q.length > 0) {
                qRegex = new RegExp(q, "i");
                result = matchArr.map(function (str) {
                    if (qRegex.test(str)) {
                        return str;
                    } else {
                        return null;
                    }
                }).filter(function (value) {
                    return !!value;
                });
                return cb.call(this, result);
            } else {
                return cb.call(this, null);
            }
        },

        showItem: function (result) {
            var $ul = $('.autocomplete-changes ul');

            if (!result || result.length == 0) {
                $ul.empty().css({
                    display: 'none'
                });
            } else {
                $ul.empty().css({
                    display: 'block'
                });
                result.forEach(function (val) {
                    var $item = $('<li></li>').append($('<a href="javascript: void(0)"></a>').text(val));
                    $item.on('click', function() {
                        $('.autocomplete-box').children('input').val(val);
                    });
                    $ul.append($item);
                });
            }
        },

        makeArr: function (query) {
            var self = this, url, result;
            if (self.match_str instanceof Array) {
                return self.match_str;
            } else {
                //url = self.match_str + "data.json";
                $.ajax({
                    // 测试代码， 实际使用时需修改
                    url: self.match_str + "data.json",
                    type: 'get',
                    data: query,
                    async: false,
                    dataType: 'json',
                    success: function(data) {
                        result = data['data'];
                        console.log(result);
                    }
                });
                return result;
            }
        }
    };

    $.fn.autocomplete = function (source) {
        var ato = new autoComplete(this, source);
        return this;
    }
})(jQuery);