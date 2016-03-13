;(function ($) {
    var autoComplete = function (elems, source) {
        elems = elems || '';
        if (!elems) {
            return;
        }

        var ac = this;
        elems.each(function (key, elem) {
            if ($(elem).parent('div.autocomplete-box')[0]) {
                return;
            }

            $(elem).wrap($('<div class="autocomplete-box"></div>')).after($('<div class="autocomplete-changes"></div>'))
            ac.bind(elem);
        });

    };
    autoComplete.prototype = {
        bind: function (elem) {
            var ac = this;
            self = $(elem);

            self.keypress(function (event) {
                var keycode = (event.keyCode ? event.keyCode : event.which );


            });
        },

        source: function (q, cb) {
                var atpos, majorMailServices, result, serviceQuery, substrRegex, username;
                atpos = q.indexOf("@");
                if (atpos > 0 && q.length > atpos + 1) {
                    username = q.substr(0, atpos);
                    serviceQuery = q.substr(atpos + 1);
                    majorMailServices = ["qq.com", "gmail.com", "163.com", "126.com", "hotmail.com", "sina.com", "foxmail.com", "yeah.net", "outlook.com", "vip.qq.com", "yahoo.com", "sohu.com", "live.com", "139.com", "aliyun.com", "icloud.com", "me.com", "msn.com", "tom.com", "21cn.com", "yandex.ru", "mail.ru", "aol.com", "naver.com", "yahoo.co.jp"];
                    substrRegex = new RegExp(serviceQuery, "i");
                    result = majorMailServices.map(function (service) {
                        if (substrRegex.test(service)) {
                            return username + "@" + service;
                        } else {
                            return null;
                        }
                    }).filter(function (value) {
                        return !!value;
                    }).map(function (fix) {
                        return {
                            value: fix
                        };
                    });
                    return cb(result);
                } else {
                    return cb(null);
                }
        }
    };

    $.fn.autocomplete = function (source) {
        var ato = new autoComplete(this, source);
        return this;
    }
})(jQuery);