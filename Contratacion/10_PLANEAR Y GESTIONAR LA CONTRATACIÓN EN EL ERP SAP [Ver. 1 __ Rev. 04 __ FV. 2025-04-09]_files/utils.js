/*jshint eqeqeq:false */
(function (window, document, $) {
  'use strict';

  /**
   * Creates a new Utils instance.
   *
   * @constructor
   */
  function Utils() {
  }

  Utils.prototype.forEach = function (forEach) {
    if (forEach) {
      return function (arr, callback, self) {
        return forEach.call(arr, callback, self);
      };
    }
    else {
      return function (arr, callback, self) {
        for (var i = 0, len = arr.length; i < len; i++) {
          if (i in arr) {
            callback.call(self, arr[i], i, arr);
          }
        }
      };
    }
  }(Array.prototype.forEach);

  Utils.prototype.isArray = function (arr) {
    if (Array.isArray) {
      return Array.isArray(arr);
    }
    else {
      return Object.prototype.toString.call(arr) !== '[object Array]';
    }
  };

  Utils.prototype.log = function () {
    var msg = '[Daruma4 Core] ' + Array.prototype.join.call(arguments, '');
    if (window.console && window.console.log) {
      window.console.log(msg);
    }
    else if (window.opera && window.opera.postError) {
      window.opera.postError(msg);
    }
  };

  Utils.prototype.stripTags = function (input, allowed) {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
      commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
  };

  Utils.prototype.rgba2hex = function (color_value) {
    if (!color_value) return false;
    var parts = color_value.toLowerCase().match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/),
      length = color_value.indexOf('rgba') ? 3 : 2; // Fix for alpha values
    delete(parts[0]);
    for (var i = 1; i <= length; i++) {
      parts[i] = parseInt(parts[i]).toString(16);
      if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return '#' + parts.join('').toUpperCase();
  };

  String.prototype.strtr = function (from, to)
  {
    var i,
      _this = this.toString();
    from = (from + '').split('');
    to = (to + '').split('');
    i = from.length;

    while (i--)
    {
      if (_this.match(from[i])) {
        _this = _this.replace(new RegExp('\\' + from[i], 'ig'), (to[i] || ''));
      }
    }

    return _this;
  };

  Utils.prototype.base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    urlEncode: function (e) {
      return daruma.utils.base64.encode(e).strtr('+/=', '._-');
    },
    urlDecode: function (e) {
      return daruma.utils.base64.decode(e.strtr('._-', '+/='));
    },
    encode: function (e) {
      var t = "";
      var n, r, i, s, o, u, a;
      var f = 0;
      e = this._utf8_encode(e);
      while (f < e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        i = e.charCodeAt(f++);
        s = n >> 2;
        o = (n & 3) << 4 | r >> 4;
        u = (r & 15) << 2 | i >> 6;
        a = i & 63;
        if (isNaN(r)) {
          u = a = 64
        } else if (isNaN(i)) {
          a = 64
        }
        t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
      }
      return t
    },
    decode: function (e) {
      var t = "";
      var n, r, i;
      var s, o, u, a;
      var f = 0;
      e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (f < e.length) {
        s = this._keyStr.indexOf(e.charAt(f++));
        o = this._keyStr.indexOf(e.charAt(f++));
        u = this._keyStr.indexOf(e.charAt(f++));
        a = this._keyStr.indexOf(e.charAt(f++));
        n = s << 2 | o >> 4;
        r = (o & 15) << 4 | u >> 2;
        i = (u & 3) << 6 | a;
        t = t + String.fromCharCode(n);
        if (u != 64) {
          t = t + String.fromCharCode(r)
        }
        if (a != 64) {
          t = t + String.fromCharCode(i)
        }
      }
      t = this._utf8_decode(t);
      return t
    },
    _utf8_encode: function (e) {
      e = e.replace(/\r\n/g, "\n");
      var t = "";
      for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r)
        } else if (r > 127 && r < 2048) {
          t += String.fromCharCode(r >> 6 | 192);
          t += String.fromCharCode(r & 63 | 128)
        } else {
          t += String.fromCharCode(r >> 12 | 224);
          t += String.fromCharCode(r >> 6 & 63 | 128);
          t += String.fromCharCode(r & 63 | 128)
        }
      }
      return t
    },
    _utf8_decode: function (e) {
      var t = "";
      var n = 0;
      var c1, c2, c3;
      var r = c1 = c2 = 0;
      while (n < e.length) {
        r = e.charCodeAt(n);
        if (r < 128) {
          t += String.fromCharCode(r);
          n++
        } else if (r > 191 && r < 224) {
          c2 = e.charCodeAt(n + 1);
          t += String.fromCharCode((r & 31) << 6 | c2 & 63);
          n += 2
        } else {
          c2 = e.charCodeAt(n + 1);
          c3 = e.charCodeAt(n + 2);
          t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
          n += 3
        }
      }
      return t
    }
  };

  Utils.prototype.sha1 = function (msg) {
      function rotate_left(n, s) {
          var t4 = (n << s) | (n >>> (32 - s));
          return t4;
      };

      function lsb_hex(val) {
          var str = "";
          var i;
          var vh;
          var vl;
          for (i = 0; i <= 6; i += 2) {
              vh = (val >>> (i * 4 + 4)) & 0x0f;
              vl = (val >>> (i * 4)) & 0x0f;
              str += vh.toString(16) + vl.toString(16);
          }
          return str;
      };

      function cvt_hex(val) {
          var str = "";
          var i;
          var v;
          for (i = 7; i >= 0; i--) {
              v = (val >>> (i * 4)) & 0x0f;
              str += v.toString(16);
          }
          return str;
      };

      function Utf8Encode(string) {
          string = string.replace(/\r\n/g, "\n");
          var utftext = "";
          for (var n = 0; n < string.length; n++) {
              var c = string.charCodeAt(n);
              if (c < 128) {
                  utftext += String.fromCharCode(c);
              }
              else if ((c > 127) && (c < 2048)) {
                  utftext += String.fromCharCode((c >> 6) | 192);
                  utftext += String.fromCharCode((c & 63) | 128);
              }
              else {
                  utftext += String.fromCharCode((c >> 12) | 224);
                  utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                  utftext += String.fromCharCode((c & 63) | 128);
              }
          }
          return utftext;
      };
      var blockstart;
      var i, j;
      var W = new Array(80);
      var H0 = 0x67452301;
      var H1 = 0xEFCDAB89;
      var H2 = 0x98BADCFE;
      var H3 = 0x10325476;
      var H4 = 0xC3D2E1F0;
      var A, B, C, D, E;
      var temp;
      msg = Utf8Encode(msg);
      var msg_len = msg.length;
      var word_array = new Array();
      for (i = 0; i < msg_len - 3; i += 4) {
          j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
              msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
          word_array.push(j);
      }
      switch (msg_len % 4) {
          case 0:
              i = 0x080000000;
              break;
          case 1:
              i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
              break;
          case 2:
              i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
              break;
          case 3:
              i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
              break;
      }
      word_array.push(i);
      while ((word_array.length % 16) != 14) word_array.push(0);
      word_array.push(msg_len >>> 29);
      word_array.push((msg_len << 3) & 0x0ffffffff);
      for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
          for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
          for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
          A = H0;
          B = H1;
          C = H2;
          D = H3;
          E = H4;
          for (i = 0; i <= 19; i++) {
              temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B, 30);
              B = A;
              A = temp;
          }
          for (i = 20; i <= 39; i++) {
              temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B, 30);
              B = A;
              A = temp;
          }
          for (i = 40; i <= 59; i++) {
              temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B, 30);
              B = A;
              A = temp;
          }
          for (i = 60; i <= 79; i++) {
              temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B, 30);
              B = A;
              A = temp;
          }
          H0 = (H0 + A) & 0x0ffffffff;
          H1 = (H1 + B) & 0x0ffffffff;
          H2 = (H2 + C) & 0x0ffffffff;
          H3 = (H3 + D) & 0x0ffffffff;
          H4 = (H4 + E) & 0x0ffffffff;
      }
      var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
      return temp.toLowerCase();
  };

  Utils.prototype.countDownTimer = function (dt, id, callback) {
    var end = new Date(dt),
      _second = 1000,
      _minute = (_second * 60),
      _hour = (_minute * 60),
      _day = (_hour * 24),
      timer;

    function showRemaining() {
      var now = new Date(),
        distance = (end - now),
        element = document.getElementById(id);

      if (distance < 0) {
        clearInterval(timer);

        if (element) {
          element.innerHTML = '0 mins 0 segs';
        }

        callback();
        return;
      }

      var days = Math.floor(distance / _day),
        hours = Math.floor((distance % _day) / _hour),
        minutes = Math.floor((distance % _hour) / _minute),
        seconds = Math.floor((distance % _minute) / _second);

      if (element)
      {
        element.innerHTML = minutes + ' mins ';
        element.innerHTML += seconds + ' segs';
      }

    }

    timer = setInterval(showRemaining, 1000);

    return timer;
  };

  Utils.prototype.popupCenter = function (url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=1, resizable=1, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
      newWindow.focus();
    }

    return newWindow;
  };

  Utils.prototype.indexOfPosition = function (str, separator, limit) {
    return str.split(separator, limit).join(separator).length;
  };

  Utils.prototype.arrayUnique = function (list) {
    var result = [];
    $.each(list, function (i, e) {
      if ($.inArray(e, result) == -1) result.push(e);
    });

    return result;
  };

  Utils.prototype.disableEnterKeyEvent = function (event) {
    var key = event.keyCode || event.which;

    if (key == 13) {
      event.preventDefault();
    }
  };

  Utils.prototype.replaceStrIntoLink = function (link, search, replace) {
      var _href = link.getAttribute('href');

      if (_href !== null && _href.indexOf(search) !== -1) {
          _href = _href.replace(search, replace);
          link.setAttribute('href', _href);
      }
  };

  Utils.prototype.getUrlParameter = function (name, url) {
    if (!url) url = location.search;
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  Utils.prototype.mergeCommonRows = function (tableSelector) {
    var $tableCollection = $(tableSelector);

    $tableCollection.each(function () {
      var $table = $(this);
      var firstColumnBrakes = [];
      // iterate through the columns instead of passing each column as function parameter:
      for(var i = 1; i <= $table.find('th').length; i++) {
        var previous = null, cellToExtend = null, rowspan = 1;
        $table.find('td[data-combine-column="true"]:nth-child(' + i + ')').each(function(index, e) {
          var jthis = $(this), content = jthis.text();
          // check if current row "break" exist in the array. If not, then extend rowspan:
          if (previous == content && content !== "" && $.inArray(index, firstColumnBrakes) === -1) {
            // hide the row instead of remove(), so the DOM index won't "move" inside loop.
            jthis.addClass('hidden');
            cellToExtend.attr("rowspan", (rowspan = rowspan + 1));
          } else {
            // store row breaks only for the first column:
            if (i === 1) firstColumnBrakes.push(index);
            rowspan = 1;
            previous = content;
            cellToExtend = jthis;
          }
        });
      }
      // now remove hidden td's (or leave them hidden if you wish):
      $('td.hidden').remove();
    });
  };

  Utils.prototype.uniqid = function (prefix, moreEntropy) {
    var prefix = prefix || '', moreEntropy = moreEntropy || false, result;

    this.seed = function (s, w) {
      s = parseInt(s, 10).toString(16);
      return w < s.length ? s.slice(s.length - w) : (w > s.length) ? new Array(1 + (w - s.length)).join('0') + s : s;
    };

    result = prefix + this.seed(parseInt(new Date().getTime() / 1000, 10), 8) + this.seed(Math.floor(Math.random() * 0x75bcd15) + 1, 5);

    if (moreEntropy) result += (Math.random() * 10).toFixed(8).toString();

    return result;
  };

  /**
   * This method allow convert images to base64.
   *
   * @param selector
   */
  Utils.prototype.convertImagesToBase64 = function (selector) {
    selector = selector || 'document';
    var containers = document.querySelectorAll(selector);
    if (containers.length > 0) {
      [].forEach.call(containers, function (container) {
        var regularImages = container.querySelectorAll("img");
        if (regularImages.length) {
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          [].forEach.call(regularImages, function (imgElement) {
            try {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              canvas.width = imgElement.naturalWidth;
              canvas.height = imgElement.naturalHeight;
              ctx.drawImage(imgElement, 0, 0);
              var dataURL = canvas.toDataURL();
              imgElement.setAttribute('src', dataURL);
            } catch (exception) {
              console.log(exception);
            }
          });
          canvas.remove();
        }
      });
    }
  };

    Utils.prototype.convertHtmlToImage = function (content) {
        content = content || '';

        var canvas = document.createElement('canvas'), context = canvas.getContext('2d'),
            DOMUrl = window.URL || window.webkitURL || window, myImage = new Image(),
            myBlob = new Blob([content], {type: 'text/html;charset=utf-8'});

        var UrlBlob = DOMUrl.createObjectURL(myBlob);
        context.drawImage(myImage, 0, 0);

        myImage.onload = function () {
            context.drawImage(myImage, 0, 0);
            DOMURL.revokeObjectURL(UrlBlob);
        };

        myImage.src = UrlBlob;
        console.log(UrlBlob);

        return myImage;
    };

  Utils.prototype.compileStylesIntoTags = function () {
    for (var styleId = 0; styleId < document.styleSheets.length; styleId++) {
      var rules = document.styleSheets[styleId].cssRules;

      for (var idx = 0, len = rules.length; idx < len; idx++) {
        var collection = document.querySelectorAll(rules[idx].selectorText);
        var pointer = 0;

        for (pointer = 0; pointer < collection.length; pointer++) {
          collection[pointer].style.cssText += rules[idx].style.cssText;
        }
      }
    }
  };

  Utils.prototype.getBgColor = function (selector, property) {
    selector = selector || 'div#bg-color';
    property = property || 'background-color';

    return this.rgba2hex($(selector).css(property))
  };

  Utils.prototype.stringToSlug = function (str) {
    // Taken from: https://gist.github.com/codeguy/6684588

    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    // Remove accents, swap ñ for n, etc
    var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeiiiioooouuuunc------";

    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
  };

  window.displayValueByField = function (url, data) {
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: data,
      success: function (results) {
        $.each(results, function (name, value) {
          var $element = $('#' + name);

          if (name.indexOf('color') != -1) {
            $element.css('background-color', value);
          } else {
            $element.val(value);
            $element.html(value);

            $('input[name="' + name + '"][value="' + value + '"]').attr('checked', true);
          }

        });
      }
    });
  };

  window.replacePriorizationResult = function (url_action, param) {
    $.ajax({
      url: url_action,
      type: 'get',
      dataType: 'json',
      data: param,
      success: function (results) {
        $.each(results, function (id, value) {
          if (typeof value === 'string') {
            $('#' + id).text(value);
          } else if (typeof value === 'object') {
            $('#' + id).attr('style', value.style);
          }
        });
      }
    });
  };

  window.collapse = function (parent_id, child_id) {
    $(function () {
      var child = $('#' + child_id);
      var parent = $('#' + parent_id);
      if (parent != null) {
        if (parent.hasClass('hidden')) {
          parent.removeClass('hidden');
        }
        else {
          parent.addClass('hidden');
        }
      }
      if (child != null) {
        if (child.hasClass('hidden')) {
          child.removeClass('hidden');
        }
        else {
          child.addClass('hidden');
        }
      }
    });
  };

  window.collapseByClass = function (element_class) {
    $(function () {
      var elements = $('.' + element_class);
      if (elements != null) {
        $.each(elements, function () {
          if ($(this).hasClass('hidden')) {
            $(this).removeClass('hidden');
          }
          else {
            $(this).addClass('hidden');
          }
        });
      }
    });
  };

  window.disableSelection = function (target) {
    if (typeof target.onselectstart != "undefined") { //For IE
      target.onselectstart = function () {
        return false
      }
    }
    else if (typeof target.style.MozUserSelect != "undefined") { //For Firefox
      target.style.MozUserSelect = "none"
    }
    else { //All other route (For Opera)
      target.onmousedown = function () {
        return false
      }
    }
    target.style.cursor = "default"
  };

  window.tqOpenSelect = function (className, srcId, destId, jsonUrl, jsonUrlNew, jsonUrlDelete, config) {
    this.src = document.getElementById(srcId);
    this.dest = document.getElementById(destId);
    var instance = this;
    var OptionList = function (src, text, value) {
      var name = (src.name).replace('source_', '') + '[]';
      var hasDelete = (jsonUrlDelete !== '');
      return '<li class="' + className + '_selected">' +
        '<input class="' + className + '_selected" name="' + name + '" type="hidden" value="' + value + '" id="' + destId + '_' + value + '">&nbsp;' +
        '<label class="' + className + '_selected" for="' + destId + '_' + value + '">' + text + '</label>' +
        '<span class="' + className + '_selected_hidden_remove' + (hasDelete ? ' delete' : '') + '">&minus;&equiv;</span>' +
        (hasDelete ? '<span class="' + className + '_selected_hidden_delete">&times;</span>' : '') +
        '</li>';
    };

    this.add = function () {
      var text = this.src.value, value = null, src = this.src, dest = this.dest;

      var callback = function (text, value, src, dest) {
        src.value = '';
        src.setAttribute('optval', '');

        // exit if option already exists in list
        var options = $(dest).find('input');
        for (var i = 0; i < options.length; i++) {
          if (options[i].value === value) {
            return;
          }
        }

        $(dest).append(OptionList(src, text, value));
      }

      if (this.src.attributes['optval']) {
        value = this.src.attributes['optval'].value;
      }

      if (!value) {
        $.ajax({
          type: 'POST',
          dataType: 'json',
          url: jsonUrlNew,
          data: {'s': text},
          success: function (data) {
            if (typeof data.id !== "undefined" && data.id !== null) {
              value = data.id;
              $(src).attr('optval', value);
              callback(text, value, src, dest);
            }
          }
        });
      } else {
        callback(text, value, src);
      }
    };

    $('#' + srcId).autocomplete(jsonUrl, $.extend({}, {
      width: 288,
      dataType: 'json',
      matchCase: true,
      parse: function (data) {
        var parsed = [];
        for (var key in data) {
          parsed[parsed.length] = {data: [data[key], key], value: data[key], result: data[key]};
        }
        return parsed;
      }
    }, config)).bind('keypress', {instance: instance}, function (e) {
      // check return key
      if (e.keyCode === 13) {
        e.data.instance.add();
        return false;
      }
    }).bind('change', function (e) {
      $(this).removeAttr('optval');
    }).result(function (event, data) {
      $(this).attr('optval', data[1]);
    });

    $('#' + srcId).parents('.' + className).find('.' + className + '_add').bind('click', {handler: this}, function (e) {
      e.data.handler.add();
    });

    $('#' + srcId).parents('.' + className).on('click', '.' + className + '_selected_hidden_remove', function (e) {
      $(this).parent().remove();
      $('.tipsy').remove();
    });

    $('#' + srcId).parents('.' + className).on('click', '.' + className + '_selected_hidden_delete', function (e) {
      var msg = daruma.i18n.__('Are you sure?');
      if (jsonUrlDelete.search('meeting') >= 0) {
        msg = daruma.i18n.__('Deleting this record means stop viewing the reference in the committee and the minutes. Are you sure?');
      }
      if (!window.confirm(msg)) {
        return false;
      }
      var $that = $(this);
      var id = $that.parent().find('input').val();
      //var csrfToken =  $('#csrf_token_delete').val();
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: jsonUrlDelete,
        data: {'id': id},
        success: function (data) {
          if (data.status) {
            $that.parent().remove();
          }
        }
      });
    });
  };

  window.sfDoubleList = {
    init: function (id, className) {
      var currentForm = sfDoubleList.getCurrentForm(id);
      var callback = function () {
        sfDoubleList.submit(currentForm, className)
      };

      if (currentForm.addEventListener) {
        currentForm.addEventListener("submit", callback, false);
      }
      else if (currentForm.attachEvent) {
        currentForm.attachEvent("onsubmit", callback);
      }
    },

    move: function (srcId, destId) {
      var src = document.getElementById(srcId);
      var dest = document.getElementById(destId);
      for (var i = 0; i < src.options.length; i++) {
        if (src.options[i].selected) {
          dest.options[dest.length] = new Option(src.options[i].text, src.options[i].value);
          src.options[i] = null;
          --i;
        }
      }
    },
    submit: function (form, className) {
      var element;
      for (var i = 0; i < form.elements.length; i++) {
        element = form.elements[i];
        if (element.type == 'select-multiple') {
          if (element.className == className + '-selected') {
            for (var j = 0; j < element.options.length; j++) {
              element.options[j].selected = true;
            }
          }
        }
      }
    },
    getCurrentForm: function (el) {
      if ('form' != el.tagName.toLowerCase()) {
        return sfDoubleList.getCurrentForm(el.parentNode);
      }
      return el;
    }
  };

  $.fn.replaceOptions = function (options) {
    var self, $option;

    this.empty();
    self = this;

    $.each(options, function (index, option) {
      $option = $("<option></option>")
        .attr("value", option.value)
        .text(option.text);
      self.append($option);
    });
  };

  $.fn.replaceGroupedOptions = function (options) {
    var self, $option;

    this.empty();
    self = this;

    $.each(options, function (index, optgroups) {
      var $optgroup = $('<optgroup></optgroup>').attr('label', index);

      $.each(optgroups, function (index, option) {
        $option = $('<option></option>')
          .attr('value', option.value)
          .text(option.text);
        $optgroup.append($option);
      });

      self.append($optgroup);
    });
  };

  $.fn.clearForm = function () {
    return this.each(function () {
      var type = this.type, tag = this.tagName.toLowerCase();
      if (tag == 'form')
        return $(':input', this).clearForm();
      if (type == 'text' || type == 'password' || tag == 'textarea')
        this.value = '';
      else if (type == 'checkbox' || type == 'radio')
        this.checked = false;
      else if (tag == 'select')
        this.selectedIndex = -1;
    });
  };

  $.fn.getUrlArgs = function () {
    var search = location.search.substring(1);

    if (search && search.length) {
      return JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    }
  }

  // Fixed bug for select2 search input into Modals (see more: https://github.com/select2/select2/issues/1645).
  if ($.fn.modal !== undefined) {
    $.fn.modal.Constructor.prototype.enforceFocus = function () {};
  }

  // Code to remove the Gantt diagram tooltip in the Action Plan module
  // DARUMA-5764
  $(document).click(function() {
    $(".fn-gantt-hint").remove();
  });
  $(".fn-gantt-hint").click(function(event) {
    event.stopPropagation();
  });

  // Export to window
  window.Daruma = window.Daruma || {};
  window.Daruma.Utils = Utils;
})(window, document, jQuery);
