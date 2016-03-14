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
                var query = self.val();
                ac.source(query, ac.showItem);
            });
        },

        source: function (q, cb) {
            var qRegex, result, ac = this;
            if (q.length > 0) {
                qRegex = new RegExp(q, "i");
                result = ac.match_str.map(function (str) {
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
                    var $item = $('<li></li>').append($('<a></a>').text(val));
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