/**
 * Daruma4 functions core plugin javascript
 *
 * @author   Danier Rivas G. <drivas@tiqal.com>
 * @since    2013-08-01
 * @version  1.0.0
 */
/*jshint eqeqeq:false */
(function (window, document, $) {
  'use strict';

  if (!String.prototype.padEnd) {
    String.prototype.padEnd = function padEnd(targetLength, padString) {
      targetLength = targetLength >> 0; /* floor if number or convert non-number to 0; */
      padString = String(typeof padString !== 'undefined' ? padString : ' ');
      if (this.length > targetLength) {
        return String(this);
      } else {
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength / padString.length); /* append to original to ensure we are longer than needed */
        }
        return String(this) + padString.slice(0, targetLength);
      }
    };
  }

  if (!String.prototype.repeat) {
    String.prototype.repeat = function(count) {
      'use strict';
      if (this == null) {
        throw new TypeError("can't convert " + this + ' to object');
      }
      var str = '' + this;
      count = +count;
      if (count != count) {
        count = 0;
      }
      if (count < 0) {
        throw new RangeError('repeat count must be non-negative');
      }
      if (count == Infinity) {
        throw new RangeError('repeat count must be less than infinity');
      }
      count = Math.floor(count);
      if (str.length == 0 || count == 0) {
        return '';
      }
      if (str.length * count >= 1 << 28) {
        throw new RangeError(
          'repeat count must not overflow maximum string size'
        );
      }
      var rpt = '';
      for (;;) {
        if ((count & 1) == 1) {
          rpt += str;
        }
        count >>>= 1;
        if (count == 0) {
          break;
        }
        str += str;
      }
      return rpt;
    };
  }


  $.fn.bindFirst = function(name, fn) {
        var elem, handlers, i, _len;
        this.bind(name, fn);
        for (i = 0, _len = this.length; i < _len; i++) {
            elem = this[i];
            handlers = jQuery._data(elem).events[name.split('.')[0]];
            handlers.unshift(handlers.pop());
        }
    };

  /**
   * Creates a new Core instance.
   *
   * @constructor
   * @param {object} container A reference to the container class
   */
  function Core(container, targetSubmit) {
    targetSubmit = targetSubmit === void 0 ? '.content-section' : targetSubmit;
    this.container = container;
    this.targetSubmit = targetSubmit;
  }

  Core.prototype.getContentSection = function () {
    return $(this.container);
  };

  Core.prototype.getSisyphusForms = function () {
    return this.sisyphusForms;
  };

  Core.prototype.loadModalContent = function (url, triggerChange) {
    triggerChange = triggerChange === void 0 ? false : triggerChange;

    History.pushState({origin: 'link'}, null, url);

    if (triggerChange) {
      History.Adapter.trigger(window, 'statechange');
    }
  };

  Core.prototype.displayContent = function (content, $contentSection, onlySlots) {
    var $content = $(document.createElement('div')).html(content);

    $contentSection = $contentSection === void 0 ? this.getContentSection() : $contentSection;
    onlySlots = onlySlots === void 0 ? false : onlySlots;

    if ($content.length) {
      /*  Update header title */
      var $headerTitleSlot = $content.find('#header-title-slot');
      if ($headerTitleSlot.length) {
        $('.header-title').html($headerTitleSlot.val());
      }

      /*  Update content header */
      var $contentHeaderSlot = $content.find('#content-header-slot');
      if ($contentHeaderSlot.length) {
        $('.content-header', $contentSection).html($contentHeaderSlot.val());
      }

      /*  Update modal filter */
      var $contentFilterSlot = $content.find('#content-filter-slot');
      if ($contentFilterSlot.length) {
        $('.content-filter .btn-filter-fixed').show();
        $('.content-filter .modal-content').html($contentFilterSlot.val());
      } else {
        $('.content-filter .btn-filter-fixed').hide();
        $('.content-filter .modal-content').empty();
      }

      if (!onlySlots) {
        var $container = $(this.targetSubmit, $contentSection);
        $container.html($content.html());
        if (daruma.editorCore) {
          daruma.editorCore.init();
        }

        if (daruma.editorUI) {
          daruma.editorUI.init();
        }
      } else {
        var $relatedModuleSlot = $content.find('#related-module-slot');
        if ($relatedModuleSlot.length) {
          $(this.targetSubmit).append($relatedModuleSlot);
        }
      }
    }
  };

  Core.prototype.activateLinks = function (className, urlTemplate, titleTemplate, $contentSection) {
    var that = this;

    $contentSection = $contentSection === void 0 ? this.getContentSection() : $contentSection;
    var $check_data_input = $(".check_data_input", $contentSection);
    var popupWidth = 1100;
    var popupHeight = 768;

    if (className.search('srs_sticker') > 0) {
      popupWidth = 600;
      popupHeight = 600;
    }
    if (className.search('cancel') > 0) {
	  $('.tipsy').remove();
      return false;
    }
    if (className.search('report') > 0) {
      daruma.utils.popupCenter(urlTemplate, 'Daruma Software', popupWidth, popupHeight);
      return false;
    }
    if (className.search('more') > 0) {
      return false;
    }
    if (className.search('mailto') > 0) {
      window.location.href = urlTemplate;
      return false;
    }
    if (className.search('module-link') > 0) {
      History.pushState({origin: 'link', module: titleTemplate}, null, urlTemplate);
      $('.modal-module-list .btn-module-link').addClass('disabled');
      return false;
    }

    if (className.search('confirm') > 0) {
      var titleConfirm = '';
      if (className.search('confirm_standar') > 0) {
        titleConfirm = daruma.i18n.__('Are you sure?');
      } else if (typeof titleTemplate !== "undefined" && titleTemplate !== "") {
        titleConfirm = titleTemplate;
      } else {
        titleConfirm = daruma.i18n.__('Are you sure?');
      }

      if (!window.confirm(titleConfirm)) {
        return false;
      }
    }

    if (className.search('submit') > 0) {
      if (typeof tinyMCE !== "undefined" && tinyMCE !== null) {
        tinyMCE.triggerSave();
      }
      daruma.core.triggerSaveJsonForms($contentSection);
      daruma.core.triggerRemoveRiskControlsRelated($contentSection);
      daruma.core.triggerRiskControlHasModelForms($contentSection);
      $("#tq_form", $contentSection).ajaxSubmit({
		target: that.targetSubmit,
        success: function (data, status, xhr, form) {
          var url = xhr.getResponseHeader('X-Final-Location');
          History.pushState({origin: 'form'}, null, url);

          that.displayContent(data, $contentSection, true);

          that.bindAfterLoad($contentSection);
        }
      });
      return false;
    }
    if (className.search('delete') > 0) {
      var csrfToken = $("#csrf_token_delete", $contentSection).val();

      var $deleteForm = $('<form/>', {'action': urlTemplate, 'method': 'POST'}).append(
        $('<input/>', {'name': 'sf_method', 'value': 'delete', 'type': 'hidden'}),
        $('<input/>', {'name': '_csrf_token', 'value': csrfToken, 'type': 'hidden'})
      ).hide().appendTo('body');

      $deleteForm.ajaxSubmit({
		target: that.targetSubmit,
        success: function (data, status, xhr) {
          var url = xhr.getResponseHeader('X-Final-Location');
          History.pushState({origin: 'form'}, null, url);

          that.displayContent(data, $contentSection, true);

          that.bindAfterLoad($contentSection);

          $deleteForm.remove();
        }
      });

      return false;
    }
    if (className.search('various') > 0) { /*  Link with data */

      /* Serialice the items */
      var itemStrs = $check_data_input.map(function () {
        if (this.checked) {
          return $(this).val();
        }
      }).get().join("_");

      if (itemStrs == "" || itemStrs == null) {
        swal({
          title: daruma.i18n.__('Info!'),
          text: daruma.i18n.__('You must at least select one item.'),
          animation: false,
          confirmButtonColor: daruma.utils.rgba2hex($('.header-title h1').css('color'))
        });
        return false;
      }

      if (className.search('new') == -1 && className.search('report') == -1) {
        this.loadModalContent(urlTemplate.replace('_#ids#_', itemStrs));
      } else {
        if (className.search('window') >= 0) { /*  Let to open a new window */
          daruma.utils.popupCenter(urlTemplate.replace('_#ids#_', itemStrs), 'Daruma Software', popupWidth, popupHeight);
          return false;
        } else {
          this.loadModalContent(urlTemplate.replace('_#ids#_', itemStrs));
        }
      }
    } else if (className.search('none') == -1 && className != "") { /*  Link with data */
      var success = false;
      var count_active_items = 0;
      var EvHasPermission = true;
      /*  Iterate for each item and follow the ajax link */
      $.each($check_data_input, function (itemIndex, item) {
        if (item.checked) {
          success = true;
          count_active_items++;
          /*  Validate the permissions of user for to use tqevaluator how evaluator */
          if (className.search('new') == -1 || count_active_items == 1) {
            if(className.search('evaluator') >=0) {
              var ev_access = $("#ev_access_"+ item.value +"", $contentSection).val();
              if(ev_access == 0) {
                EvHasPermission = false;
                return false;
              }
            }
            /*  Let to open a new window each link */
            if (className.search('window') >= 0) {

              daruma.utils.popupCenter(urlTemplate.replace('_#id#_', item.value), 'Daruma Software', popupWidth, popupHeight);
            } else {
              that.loadModalContent(urlTemplate.replace('_#id#_', item.value));
            }
          } else {
            /*  Let to open a new window */
            if (className.search('window') >= 0) {

              daruma.utils.popupCenter(urlTemplate.replace('_#id#_', item.value), 'Daruma Software', popupWidth, popupHeight);
            } else {
              that.loadModalContent(urlTemplate.replace('_#id#_', item.value));
            }
          }
          if (className.search('multiple') == -1) {
            return false;
          }
        }
      });
      if (!success) {
        if (className.search('ignore_checklist') > 0) {
          this.loadModalContent(urlTemplate.replace('_#id#_', 'false'));
        } else {
          if(typeof swal !== 'undefined') {
            swal({
              title: daruma.i18n.__('Info!'),
              text: daruma.i18n.__('You must at least select one item.'),
              animation: false,
              confirmButtonColor: daruma.utils.rgba2hex($('.header-title h1').css('color'))
            });
          }
        }
      }
      if(!EvHasPermission) {
        if (typeof swal !== 'undefined') {
          swal({
            title: daruma.i18n.__('Info!'),
            text: daruma.i18n.__('You do not have the permissions to enter as an evaluator.'),
            animation: false,
            confirmButtonColor: daruma.utils.rgba2hex($('.header-title h1').css('color'))
          });
        }
      }
      return false;
    } else { /*  Basic link */
      if (className.search('new') == -1) {
        this.loadModalContent(urlTemplate);
      } else {
        if (className.search('window') >= 0) { /* Let to open a new window */

          var myWindow = daruma.utils.popupCenter(urlTemplate, 'Daruma Software', popupWidth, popupHeight);
          var opener = myWindow.opener;
          var url = opener.location.href;

          if (url.search('document/build/id') >= 0) {
            var timer = setInterval(function() {
              if(myWindow.closed) {
                clearInterval(timer);
                opener.daruma.core.loadModalContent(url, true);
              }
            }, 1000);
          }

          return false;
        } else {
          this.loadModalContent(urlTemplate);
        }
      }
    }
  };

  Core.prototype.bindContentLinks = function ($contentSection) {
    var that = this;
    $contentSection = $contentSection === void 0 ? this.getContentSection() : $contentSection;

    try {
      $($contentSection).trigger( "enhance.tablesaw" );
    } catch (error) {}

    $('a[class][href][href!=""]:not([href^="#"], [onclick], .dui-modal-form, dui-modal-show, .modal_ajax_form, .disabled, .ignore-activate, .dui-modal-assistant, .profile-checker, .dui-popover), ' +
      'area[class][href][href!=""]', $contentSection).click(function (e) {
      e.preventDefault();

      that.activateLinks(this.className, this.href, this.getAttribute('data-original-title'));
    });
  };

  Core.prototype.activateModalWidgets = function (modal) {

    if ($.fn.autoNumeric) {
      $('.format_currency', modal).autoNumeric('init', {
        aSep: ',', /*  thousand separator */
        aDec: '.', /*  decimal point */
        aSign: '$ ', /*  currency symbol */
        pSign: 'p', /*  prefix (p), or sufix (s) */
        vMax: '9999999999999999.99',
        vMin: '-9999999999999999.99'
      });
    }

    $(modal).trigger( "enhance.tablesaw" );
    modal = modal === void 0 ? null : modal;
    var modalAjaxForm = $('#modal_ajax_form' + (modal ? ', #' + modal.attr('id') + ' .modal-body' : ''));

    this.configureTinyMce(modal);

    $(".flash-close", modalAjaxForm).click(function () {
      $(this).parent().fadeOut("slow", function () {
        $(this).remove();
      });
      return false;
    });

    $("select.select_filter", modalAjaxForm).select2({
      placeholder: daruma.i18n.__("Select a record"),
      allowClear: true,
      formatNoMatches: function () {
        return daruma.i18n.__("No results found");
      },
      formatInputTooShort: function (input, min) {
        var n = min - input.length;
        return daruma.i18n.__("Please, enter to %%n%% character(s)", {'%%n%%': n});
      },
      formatInputTooLong: function (input, max) {
        var n = input.length - max;
        return daruma.i18n.__("Please, delete to %%n%% character(s)", {'%%n%%': n});
      },
      formatSelectionTooBig: function (limit) {
        return daruma.i18n.__("You can only select %%limit%% element(s)", {'%%limit%%': limit});
      },
      formatLoadMore: function () {
        return daruma.i18n.__("Loading more results...");
      },
      formatSearching: function () {
        return daruma.i18n.__("Searching...");
      }
    });

    this.bindAjaxSelect2(modalAjaxForm);

    this.bindLSearch(modalAjaxForm);

    this.bindDropZone(modalAjaxForm);
    /*  Bind modal assistant */
    this.bindAssistantModal();

    $("select.multiselect_filter", modalAjaxForm).multiSelect({
      listWidth: 290,
      searchBoxText: daruma.i18n.__('Type here to start your search...'),
      selectAllText: daruma.i18n.__('Select all'),
      deselectAllText: daruma.i18n.__('Deselect all'),
      invertText: daruma.i18n.__('Invert'),
    });

    $('button[data-widget="close"]', modalAjaxForm).on('click', function (e) {
      e.preventDefault();
      var $this = $(this), target = $this.attr('data-target');

      swal({
          title: daruma.i18n.__('Info'),
          text: daruma.i18n.__('Are you sure you want to delete this item?'),
          confirmButtonText: daruma.i18n.__('Accept'),
          cancelButtonText: daruma.i18n.__('Cancel'),
          animation: false,
          type: 'info',
          showCancelButton: true,
          confirmButtonColor: daruma.utils.rgba2hex($('.header-title h1').css('color')),
          closeOnCancel: true,
          closeOnConfirm: true
        },
        function (isConfirm) {
          if (isConfirm) {
            $(target).remove();
          }
        });
    });

    if (window.bindJsonableDepsOnFields) {
      window.bindJsonableDepsOnFields($(modal)); /* Bind DepsOnFields when is used through AJAX */
    }
  };

  Core.prototype.createParagraphs = function ($contentSection) {
    $(".paragraphs-empty", $contentSection).append('<div class="paragraph"></div><div class="paragraph"></div><div class="paragraph"></div>');
  };
  Core.prototype.configureTinyMce = function ($contentSection) {
    if (!$.fn.tinymce) {
      return false;
    }

    var tinyPluginCode = ('tiny_plugin' in daruma.config) ? daruma.config.tiny_plugin : '';

    var diagramInDocument = ('diagram_in_document' in daruma.config) ? daruma.config.diagram_in_document : false,
      diagramInProcess = ('diagram_in_process' in daruma.config) ? daruma.config.diagram_in_process : false;

    /*  Clean editors before create instances. */

    if (typeof tinyMCE !== "undefined" && tinyMCE !== null) {
      tinyMCE.triggerSave();

      for (var editor of tinyMCE.editors) {
        var editorId = editor.id;

        if ($('[id="' + editorId + '"]', $contentSection).length === 0) {
          continue;
        }

        tinyMCE.execCommand('mceRemoveEditor', false, editorId);
      }
    }

    /*  Clean extra float toolbars */
    $('.mce-floatpanel').remove();

    var fixedToolbar = function($mceToolbar) {
      $mceToolbar.parent().css({position: 'relative'});
      $mceToolbar.css({
        'display': 'block',
        'border': '1px solid rgba(0, 0, 0, .2)',
        'position': 'absolute',
        'top': -$mceToolbar.outerHeight(),
        'left': -1,
        'right': -1
      });
    };

    $("textarea.tinymce", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small'
    });

    $("textarea.tinymce_smartcode", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      content_css: "/plugins/darumacore/css/tinymce/content.css",
      toolbar_items_size: 'small',
      plugins: [
        "advlist autolink link image lists charmap preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars fullscreen insertdatetime media nonbreaking " + tinyPluginCode,
        "table contextmenu directionality emoticons template textcolor paste textcolor colorpicker imagetools " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")
      ],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar1: "reporttable reportchart smartcode | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
      toolbar2: "cut copy paste pastetext | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media | inserttime preview | forecolor backcolor",
      toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft " + tinyPluginCode,
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url,
      setup: function (editor) {
        editor.addButton('smartcode', {
          title: daruma.i18n.__('Smart-code helper'),
          image: '/images/icons/tools/smartcode.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, daruma.i18n.__('Smart-code helper'), 'report/help/app/fr/edit_content/' + encodeURIComponent(editor.selection.getContent()), 800, 350, 'returnContent');
          }
        });
        editor.addButton('reporttable', {
          title: daruma.i18n.__('Table insertion wizard'),
          image: '/images/icons/tools/table-button.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, daruma.i18n.__('Table insertion wizard'), 'report/wizard?t=table', 800, 350, 'returnContent');
          }
        });
        editor.addButton('reportchart', {
          title: daruma.i18n.__('Chart insertion wizard'),
          image: '/images/icons/tools/chart-button.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, daruma.i18n.__('Chart insertion wizard'), 'report/wizard?t=chart', 800, 350, 'returnContent');
          }
        });

        editor.on('click', function (e) {
          var $target = $(e.target),
            $macro = $target.parent(),
            $data = $macro.data();
          if ($target.hasClass('macro-delete')) {
            $target.parent().remove();
          }
          if ($target.hasClass('macro-edit')) {
            var type, title;
            if ($macro.hasClass('mceMacroChart')) {
              type = 'chart';
              title = daruma.i18n.__('Chart insertion wizard')
            }
            else if ($macro.hasClass('mceMacroTable')) {
              type = 'table';
              title = daruma.i18n.__('Table insertion wizard');
            }

            var url = 'report/wizard?' + $.param({'t': type, 'macro': $data});
            openWindowManager(editor, title, url, 800, 350, 'replaceElementWith', $macro.attr('id'));
          }
          if ($target.hasClass('macro-preview')) {
            $target.toggleClass('active');

            var $tableInfo = $macro.find('.table-report'),
              $tableReport = $macro.find('.table-report-style'),
              isActive = $target.hasClass('active');

            $.get(daruma.config.relative_url + '/report/getRawTablePreview', {'macro': $data}, function (tableReport) {
              if ($tableReport.length) {
                $tableReport.replaceWith(tableReport);
              } else {
                $(tableReport).insertAfter($tableInfo);
              }

              $macro.find('.table-report-style').toggle(isActive);
              $tableInfo.toggle(!isActive);
            });
          }
        });
      }
    });

    $("textarea.tinymce_smartcode_without_code", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: [
        "advlist autolink link image lists charmap preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars fullscreen insertdatetime media nonbreaking",
        "table contextmenu directionality emoticons template textcolor paste textcolor colorpicker " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")
      ],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar1: "mybutton | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
      toolbar2: "cut copy paste pastetext | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media | inserttime preview | forecolor backcolor",
      toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft",
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url,
      setup: function (editor) {
        editor.addButton('mybutton', {
          title: daruma.i18n.__('Smart-code helper'),
          image: '/images/icons/tools/smartcode.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, daruma.i18n.__('Smart-code helper'), 'report/help/app/fr/edit_content/' + encodeURIComponent(editor.selection.getContent()), 800, 350, 'returnContent');
          }
        });
      }
    });

    $("textarea.tinymce_smartcode_single", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      toolbar: "mybutton",
      setup: function (editor) {
        editor.addButton('mybutton', {
          title: daruma.i18n.__('Smart-code helper'),
          image: '/images/icons/tools/smartcode.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, daruma.i18n.__('Smart-code helper'), 'report/help/app/fr/query_var/1/edit_content/' + encodeURIComponent(editor.selection.getContent()), 800, 350, 'returnContent');
          }
        });
      }
    });

    $("textarea.tinymce_indicator", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      toolbar: "mybutton",
      setup: function (editor) {
        editor.on('init', function () {
          renderFormula(editor);
        });
        editor.on('click', function () {
          renderFormula(editor);
        });
        editor.on('keyUp', function () {
          renderFormula(editor);
        });
        editor.on('setContent', function () {
          renderFormula(editor);
        });
        editor.addButton('mybutton', {
          title: daruma.i18n.__('Smart-code helper'),
          image: '/images/icons/tools/smartcode.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, daruma.i18n.__('Smart-code helper'), 'indicator/help/app/fr/edit_content/' + encodeURIComponent(editor.selection.getContent()), 500, 250, 'returnContent');
          }
        });
      }
    });

    $("textarea.tinymce_priorization_criteria", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      toolbar: "mybutton",
      setup: function (editor) {
        formulaEditorEvents(editor, 'priorization_criteria/help/app/fr/edit_content/');
      }
    });

    $("textarea.tinymce_risk_criteria_type", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      toolbar: "mybutton",
      setup: function (editor) {
        formulaEditorEvents(editor, 'risk_criteria_type/help/app/fr/edit_content/', 'risk');
      }
    });

    function formulaEditorEvents(editor, url, module) {
      editor.on('init', function () {
        renderFormula(editor, module);
      });
      editor.on('click', function () {
        renderFormula(editor, module);
      });
      editor.on('keyUp', function () {
        renderFormula(editor, module);
      });
      editor.on('setContent', function () {
        renderFormula(editor, module);
      });
      editor.addButton('mybutton', {
        title: daruma.i18n.__('Smart-code helper'),
        image: '/images/icons/tools/smartcode.png',
        onclick: function () {
          editor.focus();
          openWindowManager(editor, daruma.i18n.__('Smart-code helper'), url + encodeURIComponent(editor.selection.getContent()), 500, 250, 'returnContent');
        }
      });
    }

    $("textarea.tinymce_advanced_without_code", $contentSection).tinymce({

      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: [
        "advlist autolink link image lists charmap preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars fullscreen insertdatetime media nonbreaking",
        "table contextmenu directionality emoticons template textcolor paste textcolor colorpicker imagetools " + (daruma.config.use_flash_filemanager ? 'moxiemanager' : 'elfinder')
      ],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar1: "mybutton glossary | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
      toolbar2: "cut copy paste pastetext | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media | inserttime preview | forecolor backcolor",
      toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft",
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url,
      setup: function (editor) {
        editor.addButton('mybutton', {
          title: daruma.i18n.__('Links'),
          image: '/images/icons/tools/documentlink.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, 'Links', 'framework/links', 500, 300, 'returnContent');
          }
        });


        editor.addButton('glossary', {
          title: daruma.i18n.__('Glossary'),
          image: '/images/icons/tools/glossary.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, 'Glossary', 'framework/terms', 500, 200, 'returnContent');
          }
        });
      }
    });

    $("textarea.tinymce_advanced", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      content_css: "/plugins/darumacore/css/tinymce/content.css",
      font_formats: "Andale Mono=andale mono,times;" +
        "Arial=arial,helvetica,sans-serif;" +
        "Arial Black=arial black,avant garde;" +
        "Book Antiqua=book antiqua,palatino;" +
        "Bookman Old Style='Bookman Old Style',arial,helvetica,sans-serif;" +
        "Comic Sans MS=comic sans ms,sans-serif;" +
        "Courier New=courier new,courier;" +
        "Futura Bk Bt='FuturaBT-Book',arial,helvetica,sans-serif;" +
        "Georgia=georgia,palatino;" +
        "Helvetica=helvetica;" +
        "Impact=impact,chicago;" +
        "Symbol=symbol;" +
        "Tahoma=tahoma,arial,helvetica,sans-serif;" +
        "Terminal=terminal,monaco;" +
        "Times New Roman=times new roman,times;" +
        "Trebuchet MS=trebuchet ms,geneva;" +
        "Verdana=verdana,geneva;" +
        "Webdings=webdings;" +
        "Wingdings=wingdings,zapf dingbats",
      plugins: [
        "advlist autolink link image lists charmap preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars fullscreen insertdatetime media nonbreaking " + tinyPluginCode,
        "table contextmenu directionality emoticons template textcolor paste textcolor moxiemanager colorpicker imagetools " + (daruma.config.use_flash_filemanager ? 'moxiemanager' : 'elfinder')
      ],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar1: "mybutton glossary | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
      toolbar2: "cut copy paste pastetext | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media | inserttime preview | forecolor backcolor",
      toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft " + tinyPluginCode,
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url,
      setup: function (editor) {
        editor.addButton('mybutton', {
          title: daruma.i18n.__('Links'),
          image: '/images/icons/tools/documentlink.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, 'Links', 'framework/links', 500, 300, 'returnContent');
          }
        });

        editor.addButton('glossary', {
          title: daruma.i18n.__('Glossary'),
          image: '/images/icons/tools/glossary.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, 'Glossary', 'framework/terms', 500, 200, 'returnContent');
          }
        });

      }
    });

    $("textarea.tinymce_advanced_context_type", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: [
        "advlist autolink link image lists charmap preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars fullscreen insertdatetime media nonbreaking " + tinyPluginCode,
        "table contextmenu directionality emoticons template textcolor paste textcolor moxiemanager colorpicker imagetools " + (daruma.config.use_flash_filemanager ? 'moxiemanager' : 'elfinder')
      ],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar1: "mybutton glossary riskAssistant | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
      toolbar2: "cut copy paste pastetext | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media | inserttime preview | forecolor backcolor",
      toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft " + tinyPluginCode,
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url,
      setup: function (editor) {
        editor.addButton('mybutton', {
          title: daruma.i18n.__('Links'),
          image: '/images/icons/tools/documentlink.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, 'Links', 'framework/links', 500, 300, 'returnContent');
          }
        });

          editor.addButton("riskAssistant", {
              title: daruma.i18n.__('risk.label.assistant'),
              image: '/images/icons/tools/exclamation-triangle.png',
              onclick: function () {
                  editor.focus();
                  var node = editor.selection.getNode();
                  openWindowManager(editor, daruma.i18n.__('risk.label.assistant'), 'framework/riskAssistant', 1000, 500, 'returnContent');
              }
          });

        editor.addButton('glossary', {
          title: daruma.i18n.__('Glossary'),
          image: '/images/icons/tools/glossary.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, 'Glossary', 'framework/terms', 500, 200, 'returnContent');
          }
        });
        editor.addButton("riskAssistant", {
          title: daruma.i18n.__('risk.label.assistant'),
          image: '/images/icons/tools/exclamation-triangle.png',
          onclick: function () {
            editor.focus();
            var node = editor.selection.getNode();
            openWindowManager(editor, daruma.i18n.__('risk.label.assistant'), 'framework/riskAssistant', 1000, 500, 'returnContent');
          }
        });
      }
    });

    $("textarea.tinymce_document", $contentSection).tinymce({
      valid_children: "+body[style]",
      relative_urls: false,
      height: 400,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      content_css: "/plugins/darumacore/css/tinymce/content.css",
      plugins: [
        "advlist autolink link image lists charmap preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        "table contextmenu directionality emoticons autoshapes template textcolor powerpaste textcolor diagrams colorpicker imagetools " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")
      ],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar1: "mybutton glossary " + (diagramInDocument ? 'diagrams ' : '') + "| bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
      toolbar2: "cut copy paste pastetext | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | inserttime preview | forecolor backcolor",
      toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons autoshapes | fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak | restoredraft",
      save_enablewhendirty: true,
      save_onsavecallback: function () {
        $('#tq_form_submit', $contentSection).click();
      },
      daruma_base_url: daruma.config.relative_url,
      powerpaste_allow_local_images: true,
      images_upload_url: daruma.config.relative_url + '/tinymce/uploadImages',
      images_upload_base_path: '',
      images_upload_credentials: true,
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url,
      font_formats: "Andale Mono=andale mono,times;" +
      "Arial=arial,helvetica,sans-serif;" +
      "Arial Black=arial black,avant garde;" +
      "Book Antiqua=book antiqua,palatino;" +
      "Comic Sans MS=comic sans ms,sans-serif;" +
      "Courier New=courier new,courier;" +
      "Futura Bk Bt='FuturaBT-Book',arial,helvetica,sans-serif;" +
      "Georgia=georgia,palatino;" +
      "Helvetica=helvetica;" +
      "Impact=impact,chicago;" +
      "Symbol=symbol;" +
      "Tahoma=tahoma,arial,helvetica,sans-serif;" +
      "Terminal=terminal,monaco;" +
      "Times New Roman=times new roman,times;" +
      "Trebuchet MS=trebuchet ms,geneva;" +
      "Verdana=verdana,geneva;" +
      "Webdings=webdings;" +
      "Wingdings=wingdings,zapf dingbats",
      setup: function (editor) {
        editor.addButton('mybutton', {
          title: daruma.i18n.__('Links'),
          image: '/images/icons/tools/documentlink.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, 'Links', 'framework/links', 500, 300, 'returnContent');
          }
        });

        editor.addButton('glossary', {
          title: daruma.i18n.__('Glossary'),
          image: '/images/icons/tools/glossary.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, 'Glossary', 'framework/terms', 500, 200, 'returnContent');
          }
        });

        var state;
        editor.on('NodeChange', function () {
          var sc, ec;

          /*  Block if start or end is inside a non editable element */
          sc = editor.dom.getParent(editor.selection.getStart(), function (n) {
            return editor.dom.hasClass(n, "mceNonEditable");
          });
          if (sc) {
            $(sc).attr("contenteditable", "false").css({"outline": "none"});
          }

          ec = editor.dom.getParent(editor.selection.getEnd(), function (n) {
            return editor.dom.hasClass(n, "mceNonEditable");
          });
          if (ec) {
            $(ec).attr("contenteditable", "false").css({"outline": "none"});
          }

          var _block = function (e) {
            var k = e.keyCode;

            /*  Don't block arrow keys, pg up/down, and F1-F12 */
            if ((k > 32 && k < 41) || (k > 111 && k < 124)) {
              return;
            }

            return false;
          };

          var _setDisabled = function (s) {
            /*  Disabled / Enabled buttons */
            editor.theme.panel.find('toolbar *').disabled(s);

            if (s !== window.disabled) {
              if (s) {
                editor.on("keydown keypress keyup paste contextmenu drop", _block, true);
              } else {
                editor.off("keydown keypress keyup paste contextmenu drop");
                var t, n = editor.settings.contextmenu_never_use_native;
                editor.on("contextmenu", function (o) {
                  var i, c = editor.getDoc();
                  if (!o.ctrlKey || n) {
                    if (o.preventDefault(), tinymce.Env.mac && tinymce.Env.webkit && 2 == o.button && c.caretRangeFromPoint && editor.selection.setRng(c.caretRangeFromPoint(o.x, o.y)), i = editor.settings.contextmenu || "link image inserttable | cell row column deletetable", t)
                      t.show();
                    else {
                      var a = [];
                      tinymce.each(i.split(/[ ,]/), function (t) {
                        var n = editor.menuItems[t];
                        "|" == t && (n = {text: t}), n && (n.shortcut = "", a.push(n))
                      });
                      for (var r = 0; r < a.length; r++)
                        "|" == a[r].text && (0 === r || r == a.length - 1) && a.splice(r, 1);
                      t = new tinymce.ui.Menu({
                        items: a,
                        context: "contextmenu"
                      }).addClass("contextmenu").renderTo(), editor.on("remove", function () {
                        t.remove(), t = null
                      })
                    }
                    var m = {x: o.pageX, y: o.pageY};
                    editor.inline || (m = tinymce.DOM.getPos(editor.getContentAreaContainer()), m.x += o.clientX, m.y += o.clientY), t.moveTo(m.x, m.y)
                  }
                })
              }

              window.disabled = s;
            }
          };

          /*  Block or unblock */
          if (sc || ec) {
            state = 1;
            _setDisabled(1);
            return false;
          } else if (state == 1) {
            _setDisabled(0);
            state = 0;
          }
        });
        editor.on('init', function () {
          editor.focus();
        });
      }
    });

    $("textarea.tinymce_document_without_code", $contentSection).tinymce({
      valid_children: "+body[style]",

      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      content_css: "/plugins/darumacore/css/tinymce/content.css",
      plugins: [
        "advlist autolink jsave save link image lists charmap preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars fullscreen insertdatetime media nonbreaking",
        "table contextmenu directionality emoticons autoshapes template textcolor paste textcolor diagrams colorpicker " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")
      ],

      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar1: "mybutton glossary " + (diagramInDocument ? 'diagrams ' : '') + "| bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
      toolbar2: "cut copy paste pastetext | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media | inserttime preview | forecolor backcolor",
      toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons autoshapes | fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak | restoredraft",
      save_enablewhendirty: true,
      save_onsavecallback: function () {
        $('#tq_form_submit', $contentSection).click();
      },
      jsave_seconds: 600000, /*  10 seconds */
      daruma_base_url: daruma.config.relative_url,

      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url,

      font_formats: "Andale Mono=andale mono,times;" +
      "Arial=arial,helvetica,sans-serif;" +
      "Arial Black=arial black,avant garde;" +
      "Book Antiqua=book antiqua,palatino;" +
      "Comic Sans MS=comic sans ms,sans-serif;" +
      "Courier New=courier new,courier;" +
      "Futura Bk Bt='FuturaBT-Book',arial,helvetica,sans-serif;" +
      "Georgia=georgia,palatino;" +
      "Helvetica=helvetica;" +
      "Impact=impact,chicago;" +
      "Symbol=symbol;" +
      "Tahoma=tahoma,arial,helvetica,sans-serif;" +
      "Terminal=terminal,monaco;" +
      "Times New Roman=times new roman,times;" +
      "Trebuchet MS=trebuchet ms,geneva;" +
      "Verdana=verdana,geneva;" +
      "Webdings=webdings;" +
      "Wingdings=wingdings,zapf dingbats",
      setup: function (editor) {
        editor.addButton('mybutton', {
          title: daruma.i18n.__('Links'),
          image: '/images/icons/tools/documentlink.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, 'Links', 'framework/links', 500, 300, 'returnContent');
          }
        });

        editor.addButton('glossary', {
          title: daruma.i18n.__('Glossary'),
          image: '/images/icons/tools/glossary.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, 'Glossary', 'framework/terms', 500, 200, 'returnContent');
          }
        });
        var state;
        editor.on('NodeChange', function () {
          var sc, ec;

          /*  Block if start or end is inside a non editable element */
          sc = editor.dom.getParent(editor.selection.getStart(), function (n) {
            return editor.dom.hasClass(n, "mceNonEditable");
          });
          if (sc) {
            $(sc).attr("contenteditable", "false").css({"outline": "none"});
          }
          ec = editor.dom.getParent(editor.selection.getEnd(), function (n) {
            return editor.dom.hasClass(n, "mceNonEditable");
          });
          if (ec) {
            $(ec).attr("contenteditable", "false").css({"outline": "none"});
          }
          var _block = function (e) {
            var k = e.keyCode;

            /*  Don't block arrow keys, pg up/down, and F1-F12 */
            if ((k > 32 && k < 41) || (k > 111 && k < 124)) {
              return;
            }

            return false;
          };
          var _setDisabled = function (s) {
            /*  Disabled / Enabled buttons */
            editor.theme.panel.find('toolbar *').disabled(s);

            if (s !== window.disabled) {
              if (s) {
                editor.on("keydown keypress keyup paste contextmenu drop", _block, true);
              } else {
                editor.off("keydown keypress keyup paste contextmenu drop");
                var t, n = editor.settings.contextmenu_never_use_native;
                editor.on("contextmenu", function (o) {
                  var i, c = editor.getDoc();
                  if (!o.ctrlKey || n) {
                    if (o.preventDefault(), tinymce.Env.mac && tinymce.Env.webkit && 2 == o.button && c.caretRangeFromPoint && editor.selection.setRng(c.caretRangeFromPoint(o.x, o.y)), i = editor.settings.contextmenu || "link image inserttable | cell row column deletetable", t)
                      t.show();
                    else {
                      var a = [];
                      tinymce.each(i.split(/[ ,]/), function (t) {
                        var n = editor.menuItems[t];
                        "|" == t && (n = {text: t}), n && (n.shortcut = "", a.push(n))
                      });
                      for (var r = 0; r < a.length; r++)
                        "|" == a[r].text && (0 === r || r == a.length - 1) && a.splice(r, 1);
                      t = new tinymce.ui.Menu({
                        items: a,
                        context: "contextmenu"
                      }).addClass("contextmenu").renderTo(), editor.on("remove", function () {
                        t.remove(), t = null
                      })
                    }
                    var m = {x: o.pageX, y: o.pageY};
                    editor.inline || (m = tinymce.DOM.getPos(editor.getContentAreaContainer()), m.x += o.clientX, m.y += o.clientY), t.moveTo(m.x, m.y)
                  }
                })
              }
              window.disabled = s;
            }
          };

          /*  Block or unblock */
          if (sc || ec) {
            state = 1;
            _setDisabled(1);
            return false;
          } else if (state == 1) {
            _setDisabled(0);
            state = 0;
          }
        });
        editor.on('init', function () {
          editor.focus();
        });
      }
    });

    $("textarea.tinymce_media", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: ["advlist autolink lists link image anchor searchreplace media table contextmenu paste colorpicker imagetools " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar: "undo redo | bold italic underline | alignleft aligncenter bullist numlist | outdent indent link unlink | anchor image table",
      moxiemanager_title: daruma.i18n.__("Filemanager"),

      filemanager_absolute_path: daruma.config.absolute_url
    });

    $("textarea.tinymce_media_disabled", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: ["advlist autolink lists link image anchor searchreplace media table contextmenu paste colorpicker imagetools " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar: "undo redo | bold italic underline | alignleft aligncenter bullist numlist | outdent indent link unlink | anchor image table",
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      readonly: true,
      filemanager_absolute_path: daruma.config.absolute_url
    });

    $("textarea.tinymce_analysis", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: ["advlist autolink lists link image anchor searchreplace media table contextmenu paste colorpicker imagetools improvementTools " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar: "undo redo | bold italic underline | alignleft aligncenter bullist numlist | outdent indent link unlink | anchor image table | 5w2h 5w 5m",
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url,
      improvement_tools: daruma.config.improvement_tools
    });

    $("textarea.tinymce_media_readonly", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      readonly: 1,
      menubar: false,
      toolbar_items_size: 'small',
      plugins: ["advlist autolink lists link image anchor searchreplace media table contextmenu paste colorpicker imagetools " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar: "undo redo | bold italic underline | alignleft aligncenter bullist numlist | outdent indent link unlink | anchor image table",
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url
    });

    $("textarea.tinymce_process", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: ["advlist autolink lists link image anchor searchreplace media table contextmenu paste diagrams colorpicker imagetools " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar: "undo redo " + (diagramInProcess ? 'diagrams ' : '') + "| bold italic underline | alignleft aligncenter bullist numlist | outdent indent link unlink | anchor image table",
      daruma_base_url: daruma.config.relative_url,
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url
    });

    $("textarea.tinymce_portal", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: [
        "advlist autolink link image lists charmap preview hr anchor pagebreak",
        "advlist autolink lists link image anchor searchreplace media table contextmenu paste diagrams colorpicker",
        "searchreplace wordcount visualblocks visualchars fullscreen insertdatetime media nonbreaking " + tinyPluginCode,
        "table contextmenu directionality emoticons template textcolor paste textcolor colorpicker " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")
      ],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar1: "cut copy paste pastetext | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media | inserttime preview | forecolor backcolor",
      toolbar2: "table | hr removeformat | subscript superscript | charmap emoticons | fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft",
      toolbar3: " imagmap | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect | undo redo " + tinyPluginCode,
      daruma_base_url: daruma.config.relative_url,
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url,
      setup: function (editor) {
        editor.addButton("imagmap", {
          title: daruma.i18n.__('Image Map'),
          image: '/images/icons/tools/image_map.png',
          onclick: function () {
            editor.focus();
            var uri, img = editor.selection.getNode();
            if (img.src) {
              var imgUrl = (location.protocol === 'http:') ? 'http://' : 'https://';
              uri = "framework/imagMap/?img=" + encodeURIComponent(img.src.replace(imgUrl, ''));
            } else {
              uri = "framework/imagMap";
            }

            openWindowManager(editor, daruma.i18n.__('Image Map'), uri, 1200, 600, 'returnContentImgMap');
          }
        });
      }
    });

    $("textarea.tinymce_portal_without_code", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: [
        "advlist autolink link image lists charmap preview hr anchor pagebreak",
        "advlist autolink lists link image anchor searchreplace media table contextmenu paste diagrams colorpicker",
        "searchreplace wordcount visualblocks visualchars fullscreen insertdatetime media nonbreaking",
        "table contextmenu directionality emoticons template textcolor paste textcolor colorpicker " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")
      ],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar1: "cut copy paste pastetext | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media | inserttime preview | forecolor backcolor",
      toolbar2: "table | hr removeformat | subscript superscript | charmap emoticons | fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft",
      toolbar3: " imagmap | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect | undo redo",
      daruma_base_url: daruma.config.relative_url,
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url,
      setup: function (editor) {
        editor.addButton("imagmap", {
          title: daruma.i18n.__('Image Map'),
          image: '/images/icons/tools/image_map.png',
          onclick: function () {
            editor.focus();
            var uri, img;
            img = editor.selection.getNode();
            if (img.src) {
              uri = "framework/imagMap/?img=" + encodeURIComponent(img.src);
            } else {
              uri = "framework/imagMap";
            }

            openWindowManager(editor, 'Image Map', uri, 1200, 600, 'returnContentImgMap');
          }
        });
      }
    });

    $("textarea.tinymce_basic", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: ["advlist lists contextmenu paste"],
      toolbar: "undo redo | bold italic underline strikethrough | bullist numlist | removeformat"
    });

    $("textarea.tinymce_basic_hidden", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: ["advlist lists contextmenu paste"],
      toolbar: "undo redo | bold italic underline strikethrough | bullist numlist | removeformat",
      setup: function (editor) {

        var $textArea = $('#' + editor.id), nonhideable = $textArea.data('non-hideable');

        if (nonhideable) return;

        editor.on('focus', function () {
          fixedToolbar($(this.contentAreaContainer.parentElement).find('.mce-toolbar-grp'));
        });
        editor.on('blur', function () {
          $(this.contentAreaContainer.parentElement).find('.mce-toolbar-grp').hide();
        });
        editor.on("init", function () {
          $(this.contentAreaContainer.parentElement).find('.mce-toolbar-grp').hide();
        });
        $(window).on('resize', function() {
          var $mceToolbar = $('#' + editor.id + '_ifr').closest('.mce-container-body').find('.mce-toolbar-grp');
          if (!$mceToolbar.is(':hidden')) {
            fixedToolbar($mceToolbar);
          }
        });
      }
    });

    $("textarea.tinymce_basic_live", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: ["advlist lists contextmenu paste"],
      toolbar: "undo redo | bold italic underline strikethrough | bullist numlist | removeformat",
      setup: function (editor) {
        editor.on('change', function () {
          if ($.inArray(editor.id, tinyMCE.editors) === -1) {
            /* tinyMCE.editors.push(editor); */
            tinyMCE.editors[editor.id] = editor;
          }
        });
      }
    });

    $("textarea.tinymce_toolbar_2row", $contentSection).tinymce({
      valid_children: "+body[style]",
      relative_urls: false,
      language: 'es',
      menubar: false,
      /* statusbar: false, */
      toolbar_items_size: 'small',
      plugins: ["advlist autolink lists link image anchor searchreplace media table contextmenu paste colorpicker imagetools " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar1: "mybutton | undo redo | bold italic underline | alignleft aligncenter bullist numlist",
      toolbar2: "outdent indent link unlink | anchor image table",
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url,
      setup: function (editor) {

        var $textArea = $('#' + editor.id), nonhideable = $textArea.data('non-hideable');

        if (nonhideable) return;

        editor.on('focus', function () {
          fixedToolbar($(this.contentAreaContainer.parentElement).find('.mce-toolbar-grp'));
        });
        editor.on('blur', function () {
          $(this.contentAreaContainer.parentElement).find('.mce-toolbar-grp').hide();
        });
        editor.on("init", function () {
          $(this.contentAreaContainer.parentElement).find('.mce-toolbar-grp').hide();
        });
        $(window).on('resize', function() {
          var $mceToolbar = $('#' + editor.id + '_ifr').closest('.mce-container-body').find('.mce-toolbar-grp');
          if (!$mceToolbar.is(':hidden')) {
            fixedToolbar($mceToolbar);
          }
        });
      }
    });

    $("textarea.tinymce_toolbar_2row_hidden", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      statusbar: false,
      toolbar_items_size: 'small',
      plugins: ["advlist autolink lists link image anchor searchreplace table contextmenu paste colorpicker imagetools " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar1: "mybutton | undo redo | bold italic underline | alignleft aligncenter bullist numlist",
      toolbar2: "outdent indent link unlink | anchor image table",
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url,
      setup: function (editor) {
        var $textArea = $('#' + editor.id), nonhideable = $textArea.data('non-hideable');
        if (nonhideable) return;
        editor.on('focus', function () {
          fixedToolbar($(this.contentAreaContainer.parentElement).find('.mce-toolbar-grp'));
        });
        editor.on('blur', function () {
          $(this.contentAreaContainer.parentElement).find('.mce-toolbar-grp').hide();
        });
        editor.on('init', function () {
          $(this.contentAreaContainer.parentElement).find('.mce-toolbar-grp').hide();
        });
        $(window).on('resize', function() {
          var $mceToolbar = $('#' + editor.id + '_ifr').closest('.mce-container-body').find('.mce-toolbar-grp');
          if (!$mceToolbar.is(':hidden')) {
            fixedToolbar($mceToolbar);
          }
        });
      }
    });

    $('div.mceEditable:not(:has(div.mceMacro))', $contentSection).tinymce({
      inline: true,
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: ['advlist autolink lists link image anchor searchreplace media table contextmenu paste colorpicker imagetools ' + (daruma.config.use_flash_filemanager ? 'moxiemanager' : 'elfinder')],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url
    });

    $("textarea.tinymce_2row_links", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: ["advlist autolink lists link image anchor searchreplace media table contextmenu paste colorpicker imagetools " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar1: "mybutton | undo redo | bold italic underline | alignleft aligncenter alignjustify bullist numlist",
      toolbar2: "outdent indent link unlink | anchor image table",
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url,
      setup: function (editor) {
        editor.addButton('mybutton', {
          title: daruma.i18n.__('Links'),
          image: '/images/icons/tools/documentlink.png',
          onclick: function () {
            editor.focus();
            openWindowManager(editor, 'Links', 'framework/links', 500, 300, 'returnContent');
          }
        });

        var $textArea = $('#' + editor.id), nonhideable = $textArea.data('non-hideable');

        if (nonhideable) return;

        editor.on('focus', function () {
          fixedToolbar($(this.contentAreaContainer.parentElement).find('.mce-toolbar-grp'));
        });
        editor.on('blur', function () {
          $(this.contentAreaContainer.parentElement).find('.mce-toolbar-grp').hide();
        });
        editor.on('init', function () {
          $(this.contentAreaContainer.parentElement).find('.mce-toolbar-grp').hide();
        });
        $(window).on('resize', function() {
          var $mceToolbar = $('#' + editor.id + '_ifr').closest('.mce-container-body').find('.mce-toolbar-grp');
          if (!$mceToolbar.is(':hidden')) {
            fixedToolbar($mceToolbar);
          }
        });
      }
    });

    $("textarea.tinymce_modal_form", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: ["advlist autolink lists link image anchor searchreplace media table contextmenu paste colorpicker fullscreen " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar: "undo redo | bold italic underline | alignleft aligncenter bullist numlist | outdent indent link unlink | anchor image table fullscreen",
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url
    });

    $("textarea.tinymce_risk_dimensions", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: ["advlist autolink lists link image anchor searchreplace media table contextmenu paste colorpicker imagetools improvementTools " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar: "undo redo | bold italic underline | alignleft aligncenter bullist numlist | outdent indent link unlink | anchor image table | 5w2h 5w 5m fishboneAssistant",
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url,
      improvement_tools: daruma.config.improvement_tools,
      setup: function (editor) {
        editor.addButton("fishboneAssistant", {
          title: daruma.i18n.__('improvement_tools.title.fishboneAssistant'),
          icon: false,
          text: daruma.i18n.__('improvement_tools.title.fishboneAssistant'),
          onclick: function () {
            editor.focus();
            openWindowManager(editor, daruma.i18n.__('improvement_tools.title.fishboneAssistant'), 'actionplan/fishboneAssistant', 1000, 500, 'returnContent');
          }
        });
      }
    });

    $("textarea.tinymce_fishbone", $contentSection).tinymce({
      relative_urls: false,
      language: 'es',
      menubar: false,
      toolbar_items_size: 'small',
      plugins: ["advlist autolink lists link image anchor searchreplace media table contextmenu paste colorpicker imagetools improvementTools " + (daruma.config.use_flash_filemanager ? "moxiemanager" : "elfinder")],
      link_class_list: [
        {title: 'Nueva ventana', value: 'tq_new_window_none'},
        {title: 'Misma ventana', value: 'tq_self_none'}
      ],
      toolbar: "undo redo | bold italic underline | alignleft aligncenter bullist numlist | outdent indent link unlink | anchor image table | " + daruma.config.improvement_tools.toolbarFishbone,
      moxiemanager_title: daruma.i18n.__("Filemanager"),
      filemanager_absolute_path: daruma.config.absolute_url,
      improvement_tools: daruma.config.improvement_tools,
      setup: function (editor) {
        editor.addButton("fishboneAssistant", {
          title: daruma.i18n.__('improvement_tools.title.fishboneAssistant'),
          icon: false,
          text: daruma.i18n.__('improvement_tools.title.fishboneAssistant'),
          onclick: function () {
            editor.focus();
            openWindowManager(editor, daruma.i18n.__('improvement_tools.title.fishboneAssistant'), 'actionplan/fishboneAssistant', 1000, 500, 'returnContent');
          }
        });

        editor.addButton("brainstormingAssistant", {
          title: daruma.i18n.__('improvement_tools.title.brainstormingAssistant'),
          icon: false,
          text: daruma.i18n.__('improvement_tools.title.brainstormingAssistant'),
          onclick: function () {
            editor.focus();
            openWindowManager(editor, daruma.i18n.__('improvement_tools.title.brainstormingAssistant'), 'actionplan/brainstormingAssistant', 1000, 500, 'returnContent');
          }
        });

        editor.addButton("treeAssistant", {
          title: daruma.i18n.__('improvement_tools.title.treeAssistant'),
          icon: false,
          text: daruma.i18n.__('improvement_tools.title.treeAssistant'),
          onclick: function () {
            editor.focus();
            openWindowManager(editor, daruma.i18n.__('improvement_tools.title.treeAssistant'), 'actionplan/treeAssistant', 1000, 500, 'returnContent');
          }
        });

        editor.addButton("paretoAssistant", {
          title: daruma.i18n.__('improvement_tools.title.paretoAssistant'),
          icon: false,
          text: daruma.i18n.__('improvement_tools.title.paretoAssistant'),
          onclick: function () {
            editor.focus();
            openWindowManager(editor, daruma.i18n.__('improvement_tools.title.paretoAssistant'), 'actionplan/paretoAssistant', 1000, 500, 'returnContent');
          }
        });
      }
    });
  };


  Core.prototype.tqInfintiScroll = function($contentSection) {

    if ($.fn.infinitescroll) {
      $contentSection.infinitescroll({
        loading: {
          finishedMsg: '<div class="text-muted">Felicitaciones, has llegado al final de todas las pestañas.</div>',
          msgText: '<div class="text-muted">Cargando el siguiente conjunto de pestañas...</div>',
          img: '/images/ajax_loader_big.gif'
        },

        state: {
          currPage: 0
        },

        navSelector: '#next:last',
        nextSelector: 'a#next:last',
        itemSelector: '.tab-title, .row',
        prefill: true
      }, function (newElements, data, url) {
          var $elements = $(newElements).css('opacity', 0);
          $elements.animate({opacity: 1});
          $contentSection.append($elements);
      });
    }

  };

  Core.prototype.bindAfterLoad = function ($contentSection, onlyCore) {
    var that = this;
    $contentSection = $contentSection === void 0 ? this.getContentSection() : $contentSection;
    onlyCore = onlyCore || false;

    var $linkContext = $contentSection.add('.sidebar, .modal-module-list, .breadcrumb');

    $(window).unbind('smartscroll');
    that.tqInfintiScroll($('.portal-content',$contentSection));

    /*  Bind links in tab panel */
    that.bindContentLinks($linkContext);

    $('.disabled:not(.query-builder label)', $linkContext).on('click', function(e) { e.preventDefault(); });

    /*  Bind modal ajax form */
    $('a.dui-modal-form, a.modal_ajax_form').each(function (_, object) {
      var $object = $(object);
      var useFormButtons = $object.attr('data-modal-use-form-buttons') || false;
      useFormButtons = (useFormButtons === 'true');

      $object.modalForm({
        beforeSubmit: function () {
          $('input:disabled, select:disabled').each(function () {
            $(this).removeAttr('disabled');
          });
        },
        activeSisyphus: daruma.config.sisyphus_awake,
        useFormButtons: useFormButtons
      });
    });


    // Bind modal assistant
    this.bindAssistantModal();
    //Name forms
    $($contentSection).find('form').each(function (i,e) {
        var action = $(e).prop('action').substr(8);
        if ( action.indexOf('sync') !== -1 ){
          var index = (action.indexOf('createTeam')) + 10;
          action = action.substr(0,index);
        }
        action = daruma.utils.base64.encode(action);
        if ($(e).attr('name') === undefined ) {
          $(e).attr('name', action);
        }
    });
    /*  Bind modal ajax show */
    $('a.dui-modal-show').modalShow();

    /*  Load TinyMCE Configurations and classes for active forms */
    this.configureTinyMce($contentSection);
    this.createParagraphs($contentSection);
    $('.jsonable form.json-form .form-actions input[type="submit"]').addClass('ignore-activate');
    var $clickedButton = null;
    var $buttons = $('input[type="submit"]:not(.ignore-activate)', $contentSection);
    daruma.core.triggerTinyMCEAttachmentValidate($buttons, $contentSection);
    $buttons.click(function () { $clickedButton = $(this); });

    /*  Handle the submit event of the form tags in the document */
    $('form:not("#tq_form_tabs, .form-classic, .json-form")', $contentSection).off('submit');
    $('form:not("#tq_form_tabs, .form-classic, .json-form")', $contentSection).on('submit', function (e) {
      e.preventDefault();

      if (typeof tinyMCE !== "undefined" && tinyMCE !== null) {
        tinyMCE.triggerSave();
      }

      daruma.core.triggerSaveJsonForms($contentSection);
      daruma.core.triggerRemoveRiskControlsRelated($contentSection);
      daruma.core.triggerRiskControlHasModelForms($contentSection);

      /*  Process all inputs with format currency and format number */
      $('.format_currency, .format_number', $contentSection).each(function () {
        var $self = $(this);
        $self.val($self.autoNumeric('get'));
      });

      /* Disable the submit button every time a form is saved */
      $buttons.prop('disabled', true);
      $(".document_state_buttom").css("pointer-events", "none");


      /*  If _save_and_add is pressed send hidden element */
      if (($clickedButton instanceof jQuery) && ($clickedButton.attr('name') == '_save_and_add')) {
        $(this).append('<input type="hidden" name="_save_and_add" value="1" />');
      }

      /*  If _approved is pressed send hidden element */
      if (($clickedButton instanceof jQuery) && ($clickedButton.attr('name') == '_approved')) {
        $(this).append('<input type="hidden" name="approved" value="1" />');
      }

      /* Fix bug to select by default the double list options in IE */
      $(".double_list_select-selected option", $contentSection).attr("selected", "selected");

      $(this).ajaxSubmit({
        target: that.targetSubmit,
        success: function (data, status, xhr, form) {
          var url = xhr.getResponseHeader('X-Final-Location');
          History.pushState({origin: 'form'}, null, url);

          that.displayContent(data, $contentSection, true);

          that.bindAfterLoad($contentSection);

          $buttons.prop('disabled', false);
          $(".document_state_buttom").css("pointer-events", "unset");

        }
      });
    });

    $('form.form-classic', $contentSection).submit(function () {
      if (typeof tinyMCE !== "undefined" && tinyMCE !== null) {
        tinyMCE.triggerSave();
      }
      daruma.core.triggerSaveJsonForms($contentSection);
      daruma.core.triggerRemoveRiskControlsRelated($contentSection);
      daruma.core.triggerRiskControlHasModelForms($contentSection);

      /*  Process all inputs with format currency and format number */
      $('.format_currency, .format_number', $contentSection).each(function () {
        var $self = $(this);
        $self.val($self.autoNumeric('get'));
      });

      return true;
    });

    $(".spinner_number", $contentSection).spinner({
      max: 1000,
      min: -1000,
      start: 0,
      spin: function (event, ui) {
          var $target = $(event.target);
          $target.val(ui.value);
          $target.trigger('change');
      }
    });

    $(".flash-box", $contentSection).animate({top: 0}, 6000).fadeOut("slow", function () {
      $(this).remove();
    });

    $(".flash-close", $contentSection).click(function () {
      $(this).parent().fadeOut("slow", function () {
        $(this).remove();
      });
      return false;
    });

    $("#form_query", $contentSection).focus();

    if ($.fn.horizontalMenu) {
      $('.module_nav ul li', $contentSection).horizontalMenu({
        autohide: 1,
        timeHide: 540
      });
    }

    $('.menu_sidebar li a', $contentSection).hover(
      function () {
        $('b', this).addClass("arrow_right");
        $('span', this).addClass("is_submodule_hover");
      },
      function () {
        if (!$(this).hasClass('selected_submodule')) {
          $('b', this).removeClass("arrow_right");
          $('span', this).removeClass("is_submodule_hover");
        }
      }
    );

    $('a.selected_submodule b', $contentSection).addClass("arrow_right");

    /*  Handle the check of the head items */
    $(".check_head_input", $contentSection).click(function () {
      if (this.checked) {
        $(".check_data_input", $contentSection).attr('checked', true);
      } else {
        $(".check_data_input", $contentSection).attr('checked', false);
      }
    });

    /*  Accordion efect, default active */
    $('table.tq_info_table:not(.hide) > caption', $contentSection).click(function () {
      $(this).next().toggle();
      if ($('span', this).hasClass('ui-icon-triangle-1-s')) {
        $('span', this).removeClass('ui-icon-triangle-1-s');
        $('span', this).addClass('ui-icon-triangle-1-e');
      } else if ($('span', this).hasClass('ui-icon-triangle-1-e')) {
        $('span', this).removeClass('ui-icon-triangle-1-e');
        $('span', this).addClass('ui-icon-triangle-1-s');
      }
      return false;
    }).next().show();

    /*  Accordion efect, default active */
    $('table.no_hide > caption', $contentSection).click(function () {
      $(this).next().toggle();
      if ($('span', this).hasClass('ui-icon-triangle-1-s')) {
        $('span', this).removeClass('ui-icon-triangle-1-s');
        $('span', this).addClass('ui-icon-triangle-1-e');
      } else if ($('span', this).hasClass('ui-icon-triangle-1-e')) {
        $('span', this).removeClass('ui-icon-triangle-1-e');
        $('span', this).addClass('ui-icon-triangle-1-s');
      }
      return false;
    }).next().show();

    /*  Accordion efect, default inactive */
    $('table.hide > caption', $contentSection).click(function () {
      $(this).next().toggle();
      if ($('span', this).hasClass('ui-icon-triangle-1-s')) {
        $('span', this).removeClass('ui-icon-triangle-1-s');
        $('span', this).addClass('ui-icon-triangle-1-e');
      } else if ($('span', this).hasClass('ui-icon-triangle-1-e')) {
        $('span', this).removeClass('ui-icon-triangle-1-e');
        $('span', this).addClass('ui-icon-triangle-1-s');
      }
      return false;
    }).next().hide();

    tippy('.with-tipsy, [title]:not(.no-tipsy)', daruma.config.tooltip_options);

    $('body').popover({selector: '.dui-popover', trigger: "click"});

    $("select.select_filter", $contentSection).select2({
      placeholder: daruma.i18n.__("Select a record"),
      allowClear: true,
      formatNoMatches: function () {
        return daruma.i18n.__("No results found");
      },
      formatInputTooShort: function (input, min) {
        var n = min - input.length;
        return daruma.i18n.__("Please, enter to %%n%% character(s)", {'%%n%%': n});
      },
      formatInputTooLong: function (input, max) {
        var n = input.length - max;
        return daruma.i18n.__("Please, delete to %%n%% character(s)", {'%%n%%': n});
      },
      formatSelectionTooBig: function (limit) {
        return daruma.i18n.__("You can only select %%limit%% element(s)", {'%%limit%%': limit});
      },
      formatLoadMore: function () {
        return daruma.i18n.__("Loading more results...");
      },
      formatSearching: function () {
        return daruma.i18n.__("Searching...");
      }
    });

    this.bindSelect2($contentSection);

    this.bindAjaxSelect2($contentSection);

    this.bindDropZone($contentSection);

    this.bindLSearch($contentSection);

    this.bindTaskTabs($contentSection);

    $("select.multiselect_filter", $contentSection).multiSelect({
      listWidth: 290,
      searchBoxText: daruma.i18n.__('Type here to start your search...'),
      selectAllText: daruma.i18n.__('Select all'),
      deselectAllText: daruma.i18n.__('Deselect all'),
      invertText: daruma.i18n.__('Invert'),
    });

    $("select.multiselect_filter").multiSelect({
      listWidth: 290,
      searchBoxText: daruma.i18n.__('Type here to start your search...'),
      selectAllText: daruma.i18n.__('Select all'),
      deselectAllText: daruma.i18n.__('Deselect all'),
      invertText: daruma.i18n.__('Invert'),
    });

    $('.list_card_scroll, .deskfilter_form', $contentSection).perfectScrollbar({
      wheelSpeed: 4,
      wheelPropagation: false,
      minScrollbarLength: 20
    });

    $('.infinite-scroll-y', $contentSection).perfectScrollbar({
      wheelSpeed: 4,
      wheelPropagation: false,
      suppressScrollX: true,
      minScrollbarLength: 20
    });

    /*  Init perfectScroll configurable */
      var $containers = $('[data-perfect-scrollbar]', this.getContainer);

      $containers.each(function (index, container) {
          var $container = $(container),
              psHeight = $container.attr('data-ps-height') === void 0 ? '400px' : $container.attr('data-ps-height'),
              psWheelSpeed = $container.attr('data-ps-wheelSpeed') === void 0 ? 4 : $container.attr('data-ps-wheelSpeed'),
              psSuppressScrollX = $container.attr('data-ps-suppressScrollX') === void 0 ? false : $container.attr('data-ps-suppressScrollX'),
              psPadding = $container.attr('data-ps-padding') === void 0 ? '10px' : $container.attr('data-ps-padding');

          $container.css({position: "relative", height: psHeight, padding: psPadding});

          $container.perfectScrollbar({
              wheelSpeed: psWheelSpeed,
              wheelPropagation: false,
              suppressScrollX: psSuppressScrollX,
              minScrollbarLength: 20
          });
      });
    $("select option", $contentSection).attr("title", "");
    $("select option", $contentSection).each(function () {
      this.title = this.text;
      if (this.text.length > 60) {
        this.text = this.text.substring(0, 60);
      }
    });

    /*  Fix Bug IE7/8 doesn't seem to perform the onchange event on radio an check */
    /* if($.browser.msie) => This property was removed in jQuery 1.9 */
    if (navigator.userAgent.indexOf('MSIE') >= 0) {
      $("label img", $contentSection).click(function () {
        $("#" + $(this).parent().attr("for"), $contentSection).change().click();
      });
    }

    /*  Fix auto load charts in ui tabs */
    var tabsLeft = $("#tabs-left", $contentSection).tabs().addClass('ui-tabs-vertical ui-helper-clearfix');
    tabsLeft.find("li").removeClass('ui-corner-top').addClass('ui-corner-left');

    tabsLeft.bind('tabsshow', function () {
      that.replotActiveCharts($contentSection);
    });

    setTimeout(function () {
      that.replotActiveCharts($contentSection);
    }, 1000);

    this.initCryptTimer();

    $('.format_currency', $contentSection).autoNumeric('init', {
      aSep: ',', /*  thousand separator */
      aDec: '.', /*  decimal point */
      aSign: '$ ', /*  currency symbol */
      pSign: 'p', /*  prefix (p), or sufix (s) */
      vMax: '9999999999999999.99',
      vMin: '-9999999999999999.99'
    });

    /* Calculate numbers after decimal point */
    var precision = daruma.config.precision, vBase = "9999999999999999", vMin = "-9999999999999999.99", vMax = "9999999999999999.99",
      baseLength = 0, desiredLength = 0;

    if (precision !== 0)
    {
      baseLength = vBase.length;
      desiredLength = (baseLength + precision) + 1;
      vBase = vBase + ".";
      vMax = vBase.padEnd(desiredLength, "9");
      vMin = "-" + vBase.padEnd(desiredLength, "9");
    }
    else
    {
      vMax = vBase;
      vMin = "-" + vBase;
    }

    /* Format specific number with decimal point */
    $('.format_number', $contentSection).autoNumeric('init', {
      aSep: daruma.config.thousands_sep,
      aDec: daruma.config.dec_point,
      altDec: ',',
      vMax: vMax,
      vMin: vMin,
    });

    var menuMore = '<div class="dropdown btn-group">' +
        '<a href="#" class="dropdown-toggle btn btn-more btn-circle btn-sm" data-toggle="dropdown">' +
        '<span class="option_more"></span><i class="fa fa-ellipsis-h"></i>' +
        '</a>' +
        '<ul class="dropdown-menu dropdown-menu-right"></ul>' +
        '</div>',
      $linkOptions = $('.link-options'),
      $menuLinks = $('.menuspace').find('a[href][href!=""]');

    if ($linkOptions.length && $menuLinks.length) {
      $menuLinks = $menuLinks.filter(function() {
        /*  remove duplicates links */
        return $linkOptions.find('a[href="' + $(this).attr('href') + '"]').length === 0;
      }).each(function () {
        var $self = $(this),
          option = $self.data('option-class');
        $self.prepend('<i class="fa fa-option-' + (option ? option : 'control') + '"></i>');
      });
      if (!$linkOptions.find('.dropdown').length) {
        var lengthOptions = $linkOptions.find('> a').length,
          lengthLinks = $menuLinks.length,
          diffOptions = 4 - lengthOptions;

        $menuLinks
          .slice(0, diffOptions)
          .attr('title', function () {
            if (this.childNodes.length > 1) {
              var text = this.childNodes[1].nodeValue;
              this.childNodes[1].nodeValue = '';
              return text;
            }
          })
          .addClass('btn btn-primary btn-circle btn-sm')
          .appendTo($linkOptions);

        if ((lengthOptions + lengthLinks) > 4) {
          $linkOptions.append(menuMore);
        }

        $menuLinks
          .slice(diffOptions)
          .wrap('<li></li>')
          .parent()
          .appendTo($linkOptions.find('.dropdown .dropdown-menu'));
      } else {
        $menuLinks
          .wrap('<li></li>')
          .parent()
          .appendTo($linkOptions.find('.dropdown .dropdown-menu'));
      }
      tippy('.with-tipsy, [title]:not(.no-tipsy)', daruma.config.tooltip_options);
    }

    var options = [];
    $('.dropdown-menu-filters a').on('click', function () {
      var $self = $(this),
        val = $self.data('value'),
        $inp = $self.find('input'),
        idx;

      if ((idx = options.indexOf(val)) > -1) {
        options.splice(idx, 1);
        $inp.prop('checked', false);
        /* setTimeout(function() {  }, 0); */
      } else {
        options.push(val);
        $inp.prop('checked', true);
        /* setTimeout( function() {  }, 0); */
      }

      if ($inp.is(':checked')) {
        $('.filter-form .' + val).show();
      } else {
        $('.filter-form .' + val).hide();
      }

      return false;
    });

    $('.input_colorpicker', $contentSection).colorpicker({
      displayIndicator: false,
      strings: 'Colores del tema, Colores Estándar, Más Colores, Menos Colores, Volver a la Paleta, Historico, Sin historico aun.',
      history: false
    });

    if ($.fn.knob) {
      /* jQueryKnob */
      $('.knob', $contentSection).knob();
    }

    /*  Jquery draggable */
    $('.modal-dialog').draggable({
      handle: '.modal-header'
    });

    var $pace = $('body > .pace');
    if ($pace.hasClass('pace-inactive')){
      $pace.removeClass('pace-inactive').addClass('pace-inactive');
    }
    if ($pace.parent().hasClass('pace-done')){
      $pace.parent().removeClass('pace-done').addClass('pace-done');
    }

    $('.info-box-tasks', $contentSection).on('click', '.tasks-prog-arrow', function () {
      var $self = $(this),
        $boxInfo = $self.closest('.info-box-tasks'),
        $listCtn = $($self.data('target')),
        $list = $($self.data('list')),
        template = $boxInfo.find('script[type="x-tmpl-mustache"]').html(),
        totalPages = $boxInfo.data('total-pages'),
        maxPerPage = $boxInfo.data('max-per-page');
      if ($self.hasClass('collapsed') && !$list.find('li').length) {
        $.getJSON($self.data('href'), function(data) {
          var items = [];
          Mustache.parse(template);
          $.each(data, function(i, obj) {
            var rendered = Mustache.render(template, obj);
            items.push(rendered);
          });
          $list.empty().append(items);
          that.bindContentLinks();
          if (totalPages > 1) {
            $listCtn.find('.info-box-footer').bootpag({
              wrapClass: 'pagination pagination-sm no-margin pull-right',
              total: totalPages,
              page: 1,
              maxVisible: maxPerPage
            }).on('page', function (event, num) {
              $.getJSON($self.data('href') + '&p=' + num, function (data) {
                var items = [];
                $.each(data, function (i, obj) {
                  var rendered = Mustache.render(template, obj);
                  items.push(rendered);
                });
                $list.empty().append(items);
                that.bindContentLinks();
              });
            });
          }
        });
      }
    });

    var $taskContainers = $('.task-container', $contentSection);
    if ($taskContainers.length) {
      $.each($taskContainers, function () {
        var $ctn = $(this),
          $taskInputs = $('.task-state-input', $ctn);

        var $arrowToggle = $('.task-toggle', $ctn);
        $arrowToggle.off('click');
        $arrowToggle.on('click', function () {
          var $taskRow = $(this).closest('li');
          $taskRow.toggleClass('task-expanded');
        });

        $taskInputs.off('change');
        $taskInputs.on('change', function() {
          var $self = $(this),
            total = $taskInputs.length,
            closed = $taskInputs.filter(':checked').length,
            progress = (total > 0) ? (closed / total) * 100 : 0,
            dataParams = $.extend($self.data(), {taskState: this.checked ? 2 : 1, sourceProgress: progress});

          $.getJSON($ctn.data('url-change-state'), dataParams, function (data) {
            if(data.success) {
              $('.progress-number', $ctn).html('<b>' + closed + '</b>/' + total);
              $('.progress-bar', $ctn).css('width', progress + '%').attr('aria-valuenow', closed);
              if (progress >= 100) {
                $('.task-form', $ctn).remove();
              }

              if (data.list_progress !== undefined && data.list_progress >= 1) {
                if (triggerCloseAction !== undefined) {
                  triggerCloseAction(data.list_progress);
                }
              }

              /*  refresh partial */
              var $invoker = $('#' + dataParams.invoker);
              $invoker.html(data.__html);
              that.bindAfterLoad();

            }
          });
        });

        $('div.task-input input').on('keydown', function (e) {
          var $input = $(this);
          var $form = $input.closest('form.task-inline');
          var $inputCtn = $form.find('.task-input');
          var $more = $form.find('.task-more');

          var keycode = ((typeof e.keyCode !== undefined && e.keyCode) ? e.keyCode : e.which), ENTER_KEY_CODE = 13, ESC_KEY_CODE = 27;
          if (e.keyCode === ENTER_KEY_CODE && $input.val() != null) {
            $inputCtn.hide();
            $more.hide();
            $form.submit();
            e.preventDefault();
          }
          if (keycode === ESC_KEY_CODE) {
            $input.val('');
            $inputCtn.hide();
            $more.hide();
          }
        });

        $('a:not([href]).task-add', $ctn).on('click', function (e) {
          e.preventDefault();
          var $self = $(this),
            $inputCtn = $self.parent().find('.task-input'),
            $input = $inputCtn.find('input'),
            $more = $self.parent().find('.task-more');
          $inputCtn.show();
          $more.show();
          $input.focus();
        });

        $('a.task-more').on('click', function (e) {
          e.preventDefault();
          var $self = $(this),
            sourceNotes = $self.parent().find('input').val(),
            newUrl = $self.attr('data-url') + '&source_notes=' + encodeURIComponent(sourceNotes);
            $self.data('url', newUrl);

          $self.modalForm('lazyLoadEvent');
        });

        $('.task-state-input[type="checkbox"]').click(function () {$('.popover.fade').remove()});
      });
    }

    $('button[data-widget="toggle"]', $contentSection).on('click', function (e) {
      e.preventDefault();
      var $this = $(this), $icon = $(this).find('i'), target = $this.attr('data-target');
      $(target).toggle('show');

      if ($icon.hasClass('ion-ios-arrow-down')) {
        $icon.removeClass('ion-ios-arrow-down');
        $icon.addClass('ion-ios-arrow-up');
      } else {
        $icon.removeClass('ion-ios-arrow-up');
        $icon.addClass('ion-ios-arrow-down');
      }
    });
    $('button[data-widget="close"]', $contentSection).on('click', function (e) {
      e.preventDefault();
      var $this = $(this), target = $this.attr('data-target'), functionName = $this.attr('data-callback'), functionParameters = $this.attr('data-callback-params') || '[]';

      swal({
          title: daruma.i18n.__('Info'),
          text: daruma.i18n.__('Are you sure you want to delete this item?'),
          confirmButtonText: daruma.i18n.__('Accept'),
          cancelButtonText: daruma.i18n.__('Cancel'),
          animation: false,
          type: 'info',
          showCancelButton: true,
          confirmButtonColor: daruma.utils.rgba2hex($('.header-title h1').css('color')),
          closeOnCancel: true,
          closeOnConfirm: true
        },
        function (isConfirm) {
          if (isConfirm) {
            if (functionName !== undefined) {
              functionParameters = $.parseJSON(functionParameters);
              window[functionName].apply(window, functionParameters)
            }
            $(target).remove();
          }
        });
    });

    if ( daruma.config.sisyphus_awake ){
      var reload = true;
      this.initSisyphus(reload, $contentSection);
    }

    $('.select_filter').removeClass('form-control');

    this.initProfileChecker($contentSection);

    if (daruma.editorCore && !onlyCore) {
          daruma.editorCore.init();
      }

      if (daruma.editorUI && !onlyCore) {
          daruma.editorUI.init();
      }

    var $listToggle = $('i.list-toggle', $contentSection);
    $listToggle.off('click');
    $listToggle.on('click', function () {
      var suffix = $(this).attr("suffix");
      var $listRow = $('ul.cllp_content_' + suffix, 'ul.list-toggle');
      $listRow.toggleClass('ul-expanded');
      $listRow.toggleClass('ul-collapsed');
      $('li > i.ion.ion-arrow-right-b[suffix="' + suffix + '"]').toggleClass('list-toggle');
    });

    $(".time_widget_monitor").click(function(){
      $(".time_widget_monitor").each(function(i) {
        if( $(this).attr("curtype") == "value" ) {
          $(this).attr("curtype", "percent");
          $(this).attr("title", $(this).attr("value")+' d');
          $(this).html($(this).attr("percent")+"% <span class='label'>"+$(this).attr("time_label")+"</span>");
        }
        else {
          $(this).attr("curtype", "value" );
          $(this).attr("title", $(this).attr("percent")+'%');
          $(this).html($(this).attr("value")+"d <span class='label'>"+$(this).attr("time_label")+"</span>");
        }
      });
    });

    $("[data-tq-title]").each(function(index){
      var title = $(this).attr('data-tq-title');
      $(this).attr('title', title);
    });

    if (window.bindJsonableDepsOnFields) {
      window.bindJsonableDepsOnFields($contentSection); /* Bind DepsOnFields when is used through AJAX */
    }

    this.operateNumbers($contentSection);
    this.humanizeHours($contentSection);
    this.initDestroyTimeOutPace();
    this.bindImageToolsPopover();
  };

  Core.prototype.bindSideBar = function () {
    $( '#signout-btn' ).on( 'click', function (e) {
        e.preventDefault();
        var link = $(this).attr('href');
        swal({
              title: daruma.i18n.__('Info'),
              text: daruma.i18n.__('Are you sure to close Daruma?'),
              confirmButtonText: daruma.i18n.__('Accept'),
              cancelButtonText: daruma.i18n.__('Cancel'),
              animation: false,
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: daruma.utils.rgba2hex($('.header-title h1').css('color')),
              closeOnCancel: true,
              closeOnConfirm: true
            },
            function (isConfirm) {
              if (isConfirm) {
                window.location.href = link;
                if ( localStorage.length ){
                  localStorage.clear();
                }
              }
            });
    });

    $(".time_widget_monitor").click(function(){
      $(".time_widget_monitor").each(function(i) {
          if( $(this).attr("curtype") == "value" ) {
              $(this).attr("curtype", "percent");
              $(this).attr("title", $(this).attr("value")+' d');
              $(this).html($(this).attr("percent")+"% <span class='label'>"+$(this).attr("time_label")+"</span>");
          }
          else {
              $(this).attr("curtype", "value" );
              $(this).attr("title", $(this).attr("percent")+'%');
              $(this).html($(this).attr("value")+"d <span class='label'>"+$(this).attr("time_label")+"</span>");
          }
      });
    });
  };

  Core.prototype.initSisyphus = function ( reload, $contentSection, selector ) {
    if (typeof $.fn.sisyphus !== 'function') {
      return false;
    }
    selector = selector || 'form';

    var hideNotification = function () {
      $('.sisyphus-bar').remove();
    };

    hideNotification();

    var $forms = $( selector, $contentSection ), that = this, sf_method = ($('[name=sf_method]').length != 0), data_non_exclude = $('[data-non-exclude]').length != 0;

    if ( daruma.config.exclude_forms ) {
      $forms = $forms.not( daruma.config.exclude_forms );
    }

    this.sisyphusForms = $forms.sisyphus({
      excludeFields: $( daruma.config.exclude_fields ),
      customKeySuffix: daruma.config.user,
      locationBased: false,
      timeout: daruma.config.time_out,
      autoRelease: true,
      autoStopAfterRelease: true,
      cipher: daruma.config.cipher,
      onBeforeRestore: function () {
        var self = this, confirmed = false;

        if ($forms.length > 0) {
          if (!sf_method || data_non_exclude) {
            if (!$('div.has-error').length) {
              if (self.hasDataToRestore($forms)) {
                confirmed = confirm(daruma.i18n.__('An unsaved draft with information in it has been found') + '. ' + daruma.i18n.__('Would you like to restore it'));
                if (!confirmed) {
                  this.manuallyReleaseData();
                } else {
                    var template = '<div class="sisyphus-bar discard">{{message}} <a id="discard-btn">{{anchor}}</a><span class="closebtn" onclick="this.parentElement.style.display=\'none\'"><i class="fa fa-times"></i></span></div>';
                    Mustache.parse(template);   /* optional, speeds up future uses */
                    var rendered = Mustache.render(
                        template,
                        {
                            message: daruma.i18n.__('Restored draft, if you want to delete it'),
                            anchor: daruma.i18n.__('Click here')
                        }
                    );
                    $('body')
                        .prepend($.parseHTML(rendered))
                        .find('#discard-btn')
                        .on('click', function () {
                            $forms.trigger('reset');
                            hideNotification();
                        });
                }
                return confirmed;
              } else {
                  return confirmed;
              }
            } else {
                return confirmed;
            }
          } else {
              return confirmed;
          }
        } else {
            return confirmed;
        }
      }
    }, reload);

    if( $forms.length > 0 ) {
      if (!sf_method || data_non_exclude) {
        $forms.on('DOMNodeInserted', function (e) {
          var $target = $(e.target), $fields = that.sisyphusForms.findFieldsToProtect($target);
          $fields.each(function (index, field) {
            var $field = $(field);
            that.sisyphusForms.bindSaveDataOnChange($field);
            that.sisyphusForms.manuallyRestoreField($field);
          });
          if (that.sisyphusForms.autoRelease) {
            that.bindReleaseData();
          }
        });


        $forms.on('DOMNodeRemoved', function (e) {
          var $target = $(e.target), $fields = that.sisyphusForms.findFieldsToProtect($target);

          if (daruma.sisyphusCollection) {
            var callback = function (object) {
              $fields.each(function () {
                object.releaseFieldData(this);
              });
            };

            daruma.sisyphusCollection.executeBatchFunction(callback);
          }
        });
      }
    }
  };

  Core.prototype.initProfileChecker = function ($contentSection) {
    $contentSection = $contentSection === void 0 ? this.getContentSection() : $contentSection;

    var $triggerButton = $('.profile-checker', $contentSection);
    var module = $triggerButton.attr('data-module');

    $triggerButton.bindFirst('click', function (e){
      var name = $('#tq_' + module + '_name', $contentSection).val();
      var nb_id = (module == 'supplier') ? $('#tq_' + module + '_card_number', $contentSection).val() : (module == 'profile') ? $('#tq_' + module + '_card', $contentSection).val() : '';

      $.ajax({
        method: 'POST',
        url: daruma.config.absolute_url + '/risk/checkCoincidences',
        data: {name: name, nb_id: nb_id},
        dataType: 'json',
        async: false,
        success: function (result) {
          if (result['total'] != 0){
            var totalCoincidences = parseInt(result['total']),
              percentage = parseFloat(result['percentage']),
              moduleName = module,
              i18nText = 'This %%module%% have a coincidence of %%percentage%% %. Also have %%coincidences%% greater than defined threshold. Do you want to continue register?',
              i18nParams = {'%%module%%': moduleName, '%%percentage%%': percentage, '%%coincidences%%': totalCoincidences-1};

            if (!isNaN(totalCoincidences) || totalCoincidences !== 0){
              if (!confirm(daruma.i18n.__(i18nText, i18nParams))){
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
              }else{
                var alerts = JSON.stringify({data: result['data'], moduleName: moduleName, registerName: name, registerId: nb_id});
                var alert_code = daruma.utils.base64.encode(alerts);

                $('<input>').attr({
                  type: 'hidden',
                  name: '_alerts_data',
                  value: alert_code,
                }).appendTo('form');

                $('form').attr('action', function(i, value) {
                  return value + "?_alerts_data=" + alert_code;
                });
              }
            }
          }
        }
      });
    });
  };

  Core.prototype.bindSelect2 = function ($contentSection) {
    $("select.select_filter").select2({
      placeholder: daruma.i18n.__("Select a record"),
      allowClear: true,
      formatNoMatches: function () {
        return daruma.i18n.__("No results found");
      },
      formatInputTooShort: function (input, min) {
        var n = min - input.length;
        return daruma.i18n.__("Please, enter to %%n%% character(s)", {'%%n%%': n});
      },
      formatInputTooLong: function (input, max) {
        var n = input.length - max;
        return daruma.i18n.__("Please, delete to %%n%% character(s)", {'%%n%%': n});
      },
      formatSelectionTooBig: function (limit) {
        return daruma.i18n.__("You can only select %%limit%% element(s)", {'%%limit%%': limit});
      },
      formatLoadMore: function () {
        return daruma.i18n.__("Loading more results...");
      },
      formatSearching: function () {
        return daruma.i18n.__("Searching...");
      }
    });

    $("select.multiselect2_filter", $contentSection).select2({
      placeholder: daruma.i18n.__("Select a record"),
      allowClear: true,
      width: 'resolve',
      allowSelectAllNone: true,
      formatNoMatches: function () {
        return daruma.i18n.__("No results found");
      },
      formatInputTooShort: function (input, min) {
        var n = min - input.length;
        return daruma.i18n.__("Please, enter to %%n%% character(s)", {'%%n%%': n});
      },
      formatInputTooLong: function (input, max) {
        var n = input.length - max;
        return daruma.i18n.__("Please, delete to %%n%% character(s)", {'%%n%%': n});
      },
      formatSelectionTooBig: function (limit) {
        return daruma.i18n.__("You can only select %%limit%% element(s)", {'%%limit%%': limit});
      },
      formatLoadMore: function () {
        return daruma.i18n.__("Loading more results...");
      },
      formatSearching: function () {
        return daruma.i18n.__("Searching...");
      },
      formatDropdownHeader: function () {
        return '<ul class="select2-all-none">' +
          '<li class="select2-all">' + daruma.i18n.__('Select all') + '</li>' +
          '<li class="select2-none">' + daruma.i18n.__('Remove selection') + '</li>' +
          '</ul>';
      }
    });
  };

  Core.prototype.assistant = function ($contentSection) {
      if($('.show-filter-assistant', $contentSection).length === 0){
        $('.modal-title', $contentSection).before('<button type="button" class="close show-filter-assistant" style="font-size: 18px;padding: 8px;">' +
          '<i class="fa fa-filter"></i>' + '</button>');

        $('.show-filter-assistant', $contentSection).on('click', function (event) {
          $('.form-assistant').toggle('show');
          $('.list-assistant').toggle('show');
        });
      } else {
        $('.show-filter-assistant', $contentSection).replaceWith('<button type="button" class="close show-filter-assistant" style="font-size: 18px;padding: 8px;">' +
          '<i class="fa fa-filter"></i>' + '</button>');

        $('.show-filter-assistant', $contentSection).on('click', function (event) {
          $('.form-assistant').toggle('show');
          $('.list-assistant').toggle('show');
        });
      }


    $(".ignore-assistant", $contentSection).click(function (ev) {
      ev.preventDefault();
      var target = $(this).attr("href");

      /*  load the url and show modal on success */
      $(".modal-body", $contentSection).load(target, function () {
        $(".modal-form").modal("show");
        $(".modal-form").trigger( "enhance.tablesaw" );
      });
    });
      $('#form-filter-assistant', $contentSection).on('submit', function (event) {
        var $form = $(this);

        $.ajax({
          type: 'post',
          url: $form.attr('action'),
          data: $form.serialize(),

          success: function (data, status) {
            // load the url and show modal on success
            $(".modal-body",$contentSection).load($form.attr('action'), function () {
              $(".modal-form").modal("show");
              $(".modal-form").trigger( "enhance.tablesaw" );
            });
          }
        });

        event.preventDefault();
      });

      // Pagination anchors
      var $paginationContainer = $('.pagination ', $contentSection), $paginationAnchor = $('a', $paginationContainer);

      $paginationAnchor.off('click');
      $paginationAnchor.css({pointerEvents: "inherit", cursor: "pointer"});
      $paginationAnchor.addClass('ignore-activate');
      $paginationAnchor.on('click', function (e) {
        e.preventDefault();
        var $anchor = $(this);
        $(".modal-body", $contentSection).load($anchor.attr("href"), function () {
          $(".modal-form").modal("show");
          $(".modal-form").trigger( "enhance.tablesaw" );
        });
      });

      $('.table-responsive',$contentSection).removeClass('table-responsive');

  };

  Core.prototype.bindLSearch = function ($contentSection) {
    $contentSection = $contentSection === void 0 ? this.getContentSection() : $contentSection;
    $.get('/plugins/darumacore/templates/lsearch_form.mst?_=' + daruma.config.cache_version, function (template) {
      $('ul.js-lSearch', $contentSection).each(function () {
        var $item = $(this),
          target = daruma.utils.uniqid('lsearch_'),
          rendered = Mustache.render(template, {target: target, placeholder: daruma.i18n.__('Search')}),
          $lsearch = $.parseHTML(rendered);

        $item.before($lsearch);

        $('input', $lsearch).bind('keyup', function () {
          var searchString = $(this).val();

          $("> li", $item).each(function (index, item) {
            var currentText = $(item).text();

            if (currentText.toUpperCase().indexOf(searchString.toUpperCase()) > -1) {
              $(item).show();
            } else {
              $(item).hide();
            }
          });
        });
      });
    });
  };

  Core.prototype.bindDropZone = function ($contentSection) {

    if (!$.fn.dropzone) {
      return false;
    }

    function dragin() { //function for drag into element, just turns the bix X white
      $(this).addClass('hover');
    }

    function dragout() { //function for dragging out of element
      $(this).removeClass('hover');
    }

    function showfile(file, element) {
      var $reader = new FileReader(file);
      var $validFileExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
      var $ext = file.name.split('.').pop();
      var $blnValid = false;
      for (var $i = 0; $i < $validFileExtensions.length; $i++) {
        var $sCurExtension = $validFileExtensions[$i];
        if ($ext.toLowerCase() == $sCurExtension.toLowerCase()) {
          $blnValid = true;
          break;
        }
      }
      var $t = element.closest('div.drop-zone', $contentSection);
      if ($blnValid) {
        $reader.readAsDataURL(file);
        $reader.onload = function (e) {
          $($t).find('div').html($('<img />').attr('src', e.target.result).fadeIn());
        }
      } else {
        $($t).find('div').html("<span class='fa fa-file-text'></span> " + file.name);
      }

    }

    var $dropzone = $(".drop-zone", $contentSection);
    $dropzone.on({
      dragenter: dragin,
      dragleave: dragout
    });
    $('.drop_zone', $contentSection).on('change', function () {
      var $file = this.files[0];
      $(this).closest('div.drop-zone').removeClass('hover').addClass('dropped').find('img').remove();

      /*  upload file here */
      showfile($file, this); /*  showing file for demonstration ... */
    });

    Dropzone.prototype.defaultOptions.dictDefaultMessage = daruma.i18n.__('Drop files here to upload');
    Dropzone.prototype.defaultOptions.dictRemoveFile = daruma.i18n.__('Remove file');
    Dropzone.prototype.defaultOptions.dictCancelUpload = daruma.i18n.__('Cancel upload');
    Dropzone.prototype.defaultOptions.dictCancelUploadConfirmation = daruma.i18n.__('Are you sure you want to cancel this upload?');
  };

  Core.prototype.bindAjaxSelect2 = function ($contentSection) {

    var buildDataParams = function (data) {
      var params = {};
      $.each(data, function(param, value) {
        if (!value) {
          return;
        }

        var goToParams = ['join_condition','join_model','condition', 'initial_condition', 'method', 'perms', 'source', 'column_id', 'column_desc', 'column_aux', 'order_by', 'operator', 'processes'].indexOf(param);
        if (goToParams >= 0) {
          var needSplit = ['join_condition','condition', 'initial_condition', 'perms', 'processes'].indexOf(param);
          params[param] = needSplit >= 0 ? value.split('|') : value;
        }
      });

      return params;
    };

    var buildCryptedDataParams = function(data) {
      var params = {};
      $.each(data, function(param, value) {
        if (!value || param == 'select2') {
          return;
        }

        params[param] = value;
      });

      return params;
    };

    $(".ajax_select_filter", $contentSection).select2({
      width: 'resolve',
      placeholder: daruma.i18n.__("Select a record"),
      allowClear: true,
      ajax: {
        url: daruma.config.relative_url + '/framework/data_widget',
        dataType: 'json',
        quietMillis: 100,
        data: function (term, page) {
          return {
            q: term,
            limit: 10,
            page: page,
            params: buildDataParams($(this).data())
          };
        },
        results: function (data, page) {
          var more = (page * 10) < data.total;
          return {results: data.results, more: more};
        }
      },
      initSelection: function (element, callback) {
        var ids = element.val();
        if (ids !== "") {
          $.ajax(daruma.config.relative_url + '/framework/data_widget', {
            data: {
              ids: ids,
              params: buildDataParams($(element).data())
            },
            dataType: "json"
          }).done(function (data) {
            callback(data);
          });
        }
      },
      escapeMarkup: function (m) {
        return m;
      },
      formatNoMatches: function () {
        return daruma.i18n.__("No results found");
      },
      formatInputTooShort: function (input, min) {
        var n = min - input.length;
        return daruma.i18n.__("Please, enter to %%n%% character(s)", {'%%n%%': n});
      },
      formatInputTooLong: function (input, max) {
        var n = input.length - max;
        return daruma.i18n.__("Please, delete to %%n%% character(s)", {'%%n%%': n});
      },
      formatSelectionTooBig: function (limit) {
        return daruma.i18n.__("You can only select %%limit%% element(s)", {'%%limit%%': limit});
      },
      formatLoadMore: function () {
        return daruma.i18n.__("Loading more results...");
      },
      formatSearching: function () {
        return daruma.i18n.__("Searching...");
      }
    });

    $(".ajax_multiselect_filter", $contentSection).select2({
      multiple: true,
      allowSelectAllNone: true,
      width: 'resolve',
      ajax: {
        url: daruma.config.relative_url + '/framework/data_widget',
        dataType: 'json',
        quietMillis: 100,
        method: 'POST',
        data: function (term, page) {
          return {
            q: term,
            limit: 10,
            page: page,
            params: buildDataParams($(this).data())
          };
        },
        results: function (data, page) {
          var more = (page * 10) < data.total;
          return {results: data.results, more: more};
        },
        dropdownCssClass: "bigdrop"
      },
      initSelection: function (element, callback) {
        var ids = element.val();
        if (ids !== "") {
          $.ajax(daruma.config.relative_url + '/framework/data_widget', {
            method: 'POST',
            data: {
              ids: ids.split(","),
              params: buildDataParams($(element).data())
            },
            dataType: "json"
          }).done(function (data) {
            callback(data);
          });
        }
      },
      escapeMarkup: function (m) {
        return m;
      },
      formatNoMatches: function () {
        return daruma.i18n.__("No results found");
      },
      formatInputTooShort: function (input, min) {
        var n = min - input.length;
        return daruma.i18n.__("Please, enter to %%n%% character(s)", {'%%n%%': n});
      },
      formatInputTooLong: function (input, max) {
        var n = input.length - max;
        return daruma.i18n.__("Please, delete to %%n%% character(s)", {'%%n%%': n});
      },
      formatSelectionTooBig: function (limit) {
        return daruma.i18n.__("You can only select %%limit%% element(s)", {'%%limit%%': limit});
      },
      formatLoadMore: function () {
        return daruma.i18n.__("Loading more results...");
      },
      formatSearching: function () {
        return daruma.i18n.__("Searching...");
      },
      formatDropdownHeader: function () {
        return '<ul class="select2-all-none">' +
          '<li class="select2-all">' + daruma.i18n.__('Select all') + '</li>' +
          '<li class="select2-none">' + daruma.i18n.__('Remove selection') + '</li>' +
          '</ul>';
      }
    });

    $(".crypted_ajax_select_filter", $contentSection).select2({
      width: 'resolve',
      placeholder: daruma.i18n.__("Select a record"),
      allowClear: true,
      ajax: {
        url: daruma.config.relative_url + '/select2/search/ajax',
        dataType: 'json',
        quietMillis: 100,
        data: function (term, page) {
          return {
            q: term,
            limit: 10,
            page: page,
            strategy: $(this).data('strategy'),
            params: buildCryptedDataParams($(this).data())
          };
        },
        results: function (data, page) {
          var more = (page * 10) < data.total;
          return {results: data.results, more: more};
        }
      },
      initSelection: function (element, callback) {
        var ids = element.val();
        if (ids !== "") {
          $.ajax(daruma.config.relative_url + '/select2/search/ajax', {
            data: {
              ids: ids,
              strategy: $(element).data('strategy'),
              params: buildCryptedDataParams($(element).data())
            },
            dataType: "json"
          }).done(function (data) {
            callback(data);
          });
        }
      },
      escapeMarkup: function (m) {
        return m;
      },
      formatNoMatches: function () {
        return daruma.i18n.__("No results found");
      },
      formatInputTooShort: function (input, min) {
        var n = min - input.length;
        return daruma.i18n.__("Please, enter to %%n%% character(s)", {'%%n%%': n});
      },
      formatInputTooLong: function (input, max) {
        var n = input.length - max;
        return daruma.i18n.__("Please, delete to %%n%% character(s)", {'%%n%%': n});
      },
      formatSelectionTooBig: function (limit) {
        return daruma.i18n.__("You can only select %%limit%% element(s)", {'%%limit%%': limit});
      },
      formatLoadMore: function () {
        return daruma.i18n.__("Loading more results...");
      },
      formatSearching: function () {
        return daruma.i18n.__("Searching...");
      }
    });

    $(".crypted_ajax_multiselect_filter", $contentSection).select2({
      multiple: true,
      allowSelectAllNone: true,
      width: 'resolve',
      ajax: {
        url: daruma.config.relative_url + '/select2/search/ajax',
        dataType: 'json',
        quietMillis: 100,
        method: 'POST',
        data: function (term, page) {
          return {
            q: term,
            limit: 10,
            page: page,
            strategy: $(this).data('strategy'),
            params: buildCryptedDataParams($(this).data())
          };
        },
        results: function (data, page) {
          var more = (page * 10) < data.total;
          return {results: data.results, more: more};
        },
        dropdownCssClass: "bigdrop"
      },
      initSelection: function (element, callback) {
        var ids = element.val();
        if (ids !== "") {
          $.ajax(daruma.config.relative_url + '/select2/search/ajax', {
            method: 'POST',
            data: {
              ids: ids.split(","),
              strategy: $(element).data('strategy'),
              params: buildCryptedDataParams($(element).data())
            },
            dataType: "json"
          }).done(function (data) {
            callback(data);
          });
        }
      },
      escapeMarkup: function (m) {
        return m;
      },
      formatNoMatches: function () {
        return daruma.i18n.__("No results found");
      },
      formatInputTooShort: function (input, min) {
        var n = min - input.length;
        return daruma.i18n.__("Please, enter to %%n%% character(s)", {'%%n%%': n});
      },
      formatInputTooLong: function (input, max) {
        var n = input.length - max;
        return daruma.i18n.__("Please, delete to %%n%% character(s)", {'%%n%%': n});
      },
      formatSelectionTooBig: function (limit) {
        return daruma.i18n.__("You can only select %%limit%% element(s)", {'%%limit%%': limit});
      },
      formatLoadMore: function () {
        return daruma.i18n.__("Loading more results...");
      },
      formatSearching: function () {
        return daruma.i18n.__("Searching...");
      },
      formatDropdownHeader: function () {
        return '<ul class="select2-all-none">' +
          '<li class="select2-all">' + daruma.i18n.__('Select all') + '</li>' +
          '<li class="select2-none">' + daruma.i18n.__('Remove selection') + '</li>' +
          '</ul>';
      }
    });
  };

  Core.prototype.bindAssistantModal = function () {
    // Bind modal assistant
    $('a.dui-modal-assistant').modalForm({
      submit: function (modal, element, submitAdd) {
        var widgetId = element.data('widget'), selector = element.data('selector'),
          multi = (element.data('widget-multiple') !== undefined),
          values = $('.check_data_input', modal).map(function () {
            if (this.checked) return $(this).val();
          }).get().join(',');
        var $widget = $('#' + widgetId);

        if (!widgetId) {
          $widget = $('[name*="[' + selector + ']"]');
        }

        $widget.val(function () {
          var new_values;
          if (multi) {
            new_values = ($(this).val() !== "") ? $(this).val() + ',' + values : values;
          } else  {
            new_values = values.split(',')[0];
          }
          return new_values;
        }).trigger('change');
        modal.modal('hide');
      }
    });
  };

  Core.prototype.initCryptTimer = function () {
    var moduleCrypt = $.cookie('daruma_module_crypt'),
      $cryptTimer = $('#crypt-timer'),
      $container = $('.content-wrapper');
    if (moduleCrypt) {
      var parseData = $.parseJSON(daruma.utils.base64.urlDecode(moduleCrypt));

      $container.on("idle.idleTimer", function (event) {
        event.stopPropagation();

        var eDate = new Date();
        eDate.setSeconds(eDate.getSeconds() + parseData.expiration);

        clearInterval(window.crypt_timer);

        $cryptTimer.css({color: '#F00000'}).show();

        window.crypt_timer = daruma.utils.countDownTimer(eDate, "crypt-timer-inner", function () {
          $.removeCookie('daruma_module_crypt', {path: '/'});
          $cryptTimer.hide();
          $container.idleTimer("destroy");
        });
      });
      $container.on("active.idleTimer", function (event) {
        event.stopPropagation();
        clearInterval(window.crypt_timer);
        $cryptTimer.css({color: '#999999'}).delay(5000).fadeOut('fast');
      });
      $container.idleTimer(parseData.expiration * 1000);
    } else {
      $cryptTimer.hide();
    }
  };

  Core.prototype.updateMenuState = function (data) {
    var that = this;
    var moduleUrl = data.u;

    $.ajax({
      type: 'GET',
      data: data,
      url: daruma.config.relative_url + '/sidebar/menuUpd',
      success: function (data, status, xhr) {
        var $sidebarMenu = $('.sidebar-menu');

        /*  Add portal and task items to the menu, so this items are always present in such menu */
        data.modules.unshift('portal');
        data.modules.unshift('task');
        data.modules.unshift('reminder');

        /*  Clean others current active modules */
        $.each($sidebarMenu.find('> li'), function () {
          var $this = $(this),
            index = data.modules.indexOf($this.data('name'));
          if (index === -1) {
            $this.remove();
          } else {
            $this.insertAfter('.sidebar-menu > li:nth-child(' + index + ')');
          }
        });

        $sidebarMenu.find('li.active').removeClass('active');
        if ('menu' in data) {
          $sidebarMenu.find('> li[data-name="' + data.module + '"]').remove();
          $sidebarMenu.find('> li[data-name="portal"]').after(data.menu);
        } else if ('route' in data) {
          var $sidebarMenuItems = $sidebarMenu.find('li[data-route="' + data.route + '"]');

          if (data.route === 'portal_dashboard' || data.route === 'portal_tab') {
            var portalUrl = daruma.utils.getUrlParameter('u', xhr.getResponseHeader('X-Final-Location')).replace(History.getRootUrl(), '/');
            $sidebarMenuItems = $sidebarMenu.find('li[data-route="' + data.route + '"]:has(a[href="' + portalUrl + '"])');
          }

          $sidebarMenuItems.addClass('active')
            .closest('li.treeview')
            .addClass('active');
        }

        /*  Ensure that any sub-menu is closed making its display as none */
        var submenusOpened = $sidebarMenu.find('> li:not(.active) > .treeview-menu.menu-open');

        if (submenusOpened.length)
        {
          for (var i = 0; i < submenusOpened.length; i++)
          {
            if ($(submenusOpened[i]).css('display') == 'block')
            {
              /*  The submenu still showing, lets hide it */
              $(submenusOpened[i]).css('display', 'none');
            }
          }
        }

        that.bindContentLinks($sidebarMenu);
      },
      complete: function () {
        var $moduleList = $('.modal-module-list');
        var $buttons = $moduleList.find('.btn-module-link');
        $moduleList.modal('hide');
        $buttons.removeClass('disabled');
        var isDisabled = false;
        moduleUrl = moduleUrl.split('?');
        moduleUrl = moduleUrl[0];

        $buttons.each(function () {
          var $button = $(this), moduleName = $button.data('moduleName');

          if (moduleUrl.match(new RegExp('/(' + moduleName + ')[^\\w]')) && !isDisabled) {
            $button.addClass('disabled');
            isDisabled = true;
          }

          if (moduleUrl.match(new RegExp('/(' + moduleName + ')$')) && !isDisabled) {
            $button.addClass('disabled');
            isDisabled = true;
          }
        });
      }
    });
  };

  Core.prototype.replotActiveCharts = function ($contentSection) {
    var _sel_charts = $('.bsc_thermometergauge_inner, .bsc_thermometer1_inner, .bsc_thermometer2_inner, .bsc_thermometer3_inner, .bsc_adjustwidthchart_inner', $contentSection);
    $.each(_sel_charts, function (key, _chart) {
      var _plot = window[_chart.id];
      if (_plot._drawCount == 0) {
        _plot.replot();
      }
    });
  };

  Core.prototype.triggerSaveJsonForms = function ($contentSection) {
    $contentSection = $contentSection === void 0 ? this.getContentSection() : $contentSection;

    var $submitButtons = $('.jsonable form.json-form .form-actions input[type="submit"]', $contentSection);
    $submitButtons.trigger('click');
  };

  Core.prototype.loadPartialFn = function ($element) {
    var appendOverlayFn = function ($element) {
      var $overlayIcon = $(document.createElement('i')).addClass('fa fa-spinner fa-spin overlay-icon');
      var $overlaySpan = $(document.createElement('p')).text(daruma.i18n.__('Loading...'));
      var $overlay = $(document.createElement('div')).addClass('overlay-lp').prepend($overlaySpan).prepend($overlayIcon);
      $element.prepend($overlay);
    };

    var deleteOverlayFn = function ($element) {
      $('div.overlay-lp', $element).fadeOut(800, function () {
        $(this).remove();
      });
    };

    appendOverlayFn($element);

    $.ajax({
      url: daruma.config.absolute_url + '/framework/getPartial',
      data: $element.data(),
      method: 'GET',
      cache: false,
      async: true,
      success: function (content) {
        deleteOverlayFn($element);
        $element.css({display: 'none'});
        $element.prepend($.parseHTML(content, document, true));
        daruma.core.bindAfterLoad($element);
        $element.fadeIn(2500);
      }
    });
  };

  Core.prototype.loadComponentFn = function ($element) {
    var appendOverlayFn = function ($element) {
      var $overlayIcon = $(document.createElement('i')).addClass('fa fa-spinner fa-spin overlay-icon');
      var $overlaySpan = $(document.createElement('p')).text(daruma.i18n.__('Loading...'));
      var $overlay = $(document.createElement('div')).addClass('overlay-lp').prepend($overlaySpan).prepend($overlayIcon);
      $element.prepend($overlay);
    };

    var deleteOverlayFn = function ($element) {
      $('div.overlay-lp', $element).fadeOut(800, function () {
        $(this).remove();
      });
    };

    appendOverlayFn($element);

    window.ajaxQueueManager.addRequest({
      url: daruma.config.absolute_url + '/framework/getComponent',
      data: $element.data(),
      method: 'GET',
      cache: false,
      async: true,
      success: function (content) {
        deleteOverlayFn($element);
        $element.css({display: 'none'});
        $element.prepend($.parseHTML(content, document, true));
        daruma.core.bindAfterLoad($element);
        $element.fadeIn(2500);
      }
    });
  };

  Core.prototype.triggerRemoveRiskControlsRelated = function ($contentSection) {
    $contentSection = $contentSection === void 0 ? this.getContentSection() : $contentSection;
    var inputRelatedRisks = $contentSection.find('*[data-selector="related_risks"]');
    if(inputRelatedRisks.length > 0)
    {
      $.ajax({
        async: false,
        type: 'POST',
        url: daruma.config.absolute_url + '/risk/removeRiskControlsRelated',
        data: {
          related_risks: inputRelatedRisks.val(),
          model_name: inputRelatedRisks.data('model-name'),
          model_id: inputRelatedRisks.data('model-id')
        }
      });
    }
  };

  Core.prototype.triggerRiskControlHasModelForms = function ($contentSection) {
      $contentSection = $contentSection === void 0 ? this.getContentSection() : $contentSection;

      var $submitButtons = $('form.risk-control-form input[type="submit"]', $contentSection);
      $submitButtons.trigger('click');
  };

  Core.prototype.triggerTinyMCEAttachmentValidate = function ($buttons, $contentSection) {
    $contentSection = $contentSection === void 0 ? this.getContentSection() : $contentSection;

    var wordBank = daruma.config.word_bank,
      enableValidation = daruma.config.enable_attachment_tiny_validation,
      textBuffer = '';

    if (!enableValidation) {
      return;
    }

    $buttons.bindFirst('click', function (e) {

      if (typeof tinyMCE !== "undefined" && tinyMCE !== null) {
        for (var editor of tinyMCE.editors) {
          textBuffer += editor.getContent();
        }
      }

      var hasKeyAttachWord = false;
      var textBufferLowerNonSpaces = textBuffer.toLowerCase().replace(/\s+/g, '');

      for (var word of wordBank) {
        if (textBufferLowerNonSpaces.indexOf(word) >= 0) {
          hasKeyAttachWord = true;
        }
      }

      if (!hasKeyAttachWord) {
        return;
      }

      if (textBuffer.indexOf('elfinder/show') >= 0 || textBuffer.indexOf('assets/') >= 0) {
        return;
      }

      var i18nText = 'Are you sure to save without an attachment?';

      if (!confirm(daruma.i18n.__(i18nText))) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    });
  };

  Core.prototype.initSentry = function () {
    if (daruma.config.sentry_enabled && typeof Sentry !== 'undefined') {
      Sentry.init({
        dsn: daruma.config.sentry_dsn,
        integrations: [
          new Sentry.Integrations.BrowserTracing(),
          new Sentry.Integrations.CaptureConsole({ levels: ['error'] }),
        ]
      });
    }
  };

  Core.prototype.init = function () {
    var that = this,
      rootUrl = History.getRootUrl();

    this.initSentry();

    /*  Bind to StateChange Event */
    History.Adapter.bind(window, 'statechange', function () {
      var State = History.getState(),
        url = State.url,
        relativeUrl = url.replace(rootUrl, '/');

      if ('origin' in State.data && State.data.origin === 'link') {

        /*  Load and display content */
        $.ajax({
          url: url,
          success: function (data, status, xhr) {
            var finalLocation = xhr.getResponseHeader('X-Final-Location');
            if (finalLocation !== null && relativeUrl !== finalLocation) {
              url = rootUrl.replace(/\/+$/, '') + finalLocation;
              History.pushState({origin: 'fix'}, null, url);
            }

            that.displayContent(data);

            that.bindAfterLoad();

            that.updateMenuState({'m': ('module' in State.data) ? State.data.module : null, 'u': relativeUrl});

            $(document).trigger('spa.content.loaded', [data, url]);
          },
          error: function () {
            document.location.href = url;

            return false;
          }
        });
      }
    });

    this.bindAfterLoad();
    this.bindSideBar();
  };

  function renderFormula(editor, module) {
    var formula = editor.getContent(),
      renderedFormula = $('#rendered_formula'),
      indicatorList = $("input[name='strategy_objective[indicators_list][]']"),
      url = daruma.config.relative_url + '/indicator/parseFormula';
    $.ajax({
      url: url,
      type: 'post',
      dataType: 'html',
      data: {'formula': formula, 'byModule': module},
      success: function (data) {
        renderedFormula.html(data);
        indicatorList.closest('li').removeClass('checked');
        indicatorList.prop('checked', false);
        selectIndicator(formula);
      }
    });
  }

  function selectIndicator(formula) {
    var url = daruma.config.relative_url + '/indicator/getParsedIndicator';
    $.ajax({
      url: url,
      type: 'post',
      dataType: 'json',
      data: {'formula': formula},
      success: function (data) {
        data.indicator_ids = (data.indicator_ids instanceof Array) ? data.indicator_ids : [];
        for (const indicator_id of data.indicator_ids) {
          let $indicatorCheckbox = $("input[name='strategy_objective[indicators_list][]'][value=" + indicator_id + "]");
          $indicatorCheckbox.closest('li').addClass('checked');
          $indicatorCheckbox.prop('checked', true);
        }
      }
    });
  }

  function openWindowManager(editor, title, url, width, height, callback, callbackParams) {
    callbackParams = callbackParams === void 0 ? {} : callbackParams;
    var win = editor.windowManager.open({
      title: title,
      url: daruma.config.relative_url + '/' + url,
      width: width,
      height: height,
      inline: 1,
      resizable: true,
      maximizable: true,
      buttons: [{
        text: 'Ok',
        subtype: 'primary',
        id: 'wizard_smart_code',
        onclick: function () {
          win[callback](callbackParams);
          win.close();
        }
      },
        {
          text: 'Cancel',
          onclick: function () {
            win.close();
          }
        }]
    });
  }

  Core.prototype.setCookie = function (key, value, namespace) {
      namespace = namespace || '';
      var userKey = (daruma.config.user || ''), absoluteName = userKey + '_' + namespace + '_' + key;
      $.cookie(absoluteName, value, {path: '/'});
  };

  Core.prototype.getCookie = function (key, namespace) {
    namespace = namespace || '';
    var userKey = (daruma.config.user || ''), absoluteName = userKey + '_' + namespace + '_' + key;

    return $.cookie(absoluteName);
  };


  Core.prototype.bindTaskTabs = function ($contentSection) {
    var that = this;
    var $taskTabs = $('li.js-tasks-tab', $contentSection);

    if( $taskTabs.length > 0) {
        $.each($taskTabs, function() {
            $taskTabs.off('click');
            $taskTabs.on('click', function (e) {
                e.preventDefault();

                var $self = $(this), $ctn = $($self.data('target')),
                     dataParams = $.extend($ctn.data(), {invoker: this.invoker});
                if ($self.data('read') !== 1 && $ctn.data('url')) {
                    $.ajax({
                        url: $ctn.data('url'),
                        data: dataParams,
                        success: function (data) {
                            $self.data('read', 1);
                            $ctn.html(data);
                            that.bindAfterLoad($ctn);
                        }
                    });
                }

                $taskTabs.removeClass('active');
                $self.addClass('active');
                $('.tab-pane').removeClass('active');
                $ctn.closest('.tab-pane').addClass('active');
                that.setCookie('active_tab', $self.data('tab'), 'indexTasks')
            });
        });
    }

    var $firstTab = $('li.js-tasks-tab').first();
    /*  Tab into cookie */
    var savedTab = that.getCookie('active_tab', 'indexTasks'),
        $activeTabCookie = $('li[data-tab="' + savedTab + '"]');

    if (savedTab && $activeTabCookie.length > 0) {
        $activeTabCookie.trigger('click');
    } else {
        if ($firstTab) {
            $firstTab.addClass('active').click();
        }
    }
  };

  Core.prototype.operateNumbers = function($container) {
    /* addend+addend=sum */
    var total = 0, $sum = $('[data-sum]', $container), $addend = $('[data-addend]', $container);

    $addend.on("change",function() {
      total = 0;

      $addend.each(function() {
        var value = $(this).val();

        total += value ? parseFloat(value) : 0;
        $sum.val(total);
        $sum.trigger("change");
      });
    });

    $sum.val(total);
  };

  Core.prototype.humanizeHours = function($container) {
    var value = 0, $hoursInput = $('[data-converted-hours]', $container);
    var units = {
      /*  "year": 24*365, */
      "month": 24*30,
      "week": 24*7,
      "day": 24,
      /*  "hour": 1 */
    };

    $hoursInput.on("change",function() {
      var result = [];
      value = $(this).val();

      for(var name in units) {
        var p =  Math.floor(parseFloat(value)/units[name]);

        if(p >= 0) {
          result.push(p + " " + daruma.i18n.__(name) + " ");
        }

        value %= units[name]
      }

      var $helpBlock = $(this).siblings('p.help-block');

      $helpBlock.html(result);
    });
  };

  Core.prototype.initDestroyTimeOutPace  = function() {
    var counter = 0;

    var refreshIntervalId = setInterval( function() {
      var progress;

      if(typeof $('.pace-progress').attr( 'data-progress-text' ) !== 'undefined') {
        progress = Number($('.pace-progress').attr('data-progress-text').replace("%" ,''));
      }

      if(progress === 99) {
        counter++;
      }

      if(counter > 50) {
        clearInterval(refreshIntervalId);
        Pace.stop();
      }
    }, 100);
  }

  Core.prototype.bindImageToolsPopover = function ($container)
  {
    $container = $container === void 0 ? this.getContentSection() : $container;
    var selector = 'div.box-comments img';

    $('div.popover.fade').remove();

    var $popover = $(selector, $container).popover({
      trigger: 'click',
      placement: 'top auto',
      html: true,
      container: 'body',
      content: function () {
        return '<div class="btn-group" role="group" >' +
          '  <div class="btn-group" role="group">' +
          '    <a type="button" class="btn btn-default js-popover-preview"><i class="fa fa-arrows-alt"></i></a>' +
          '  </div>' +
          '  <div class="btn-group" role="group">' +
          '    <a type="button" class="btn btn-default js-popover-download"><i class="fa fa-download"></i></a>' +
          '  </div>' +
          '</div>';
      },
    });

    $popover.on('inserted.bs.popover', function () {
      var $element = $(this),
        describedBy = $element.attr('aria-describedby'),
        $popoverElement = $('div#' + describedBy),
        $previewBtn = $('a.js-popover-preview', $popoverElement),
        $downloadBtn = $('a.js-popover-download', $popoverElement),
        imageSource = $element.attr('src'),
        imageAlt =  $element.attr('alt'),
        params = "scrollbars=1,resizable=1,status=0,location=0,toolbar=0,menubar=0";

      $previewBtn.off('click');
      $downloadBtn.off('click');

      $previewBtn.on('click', function (e) {
        e.preventDefault();
        window.open(imageSource, imageAlt, params);
      });

      $downloadBtn.on('click', function (e) {
        e.preventDefault();
        var link = document.createElement("a");
        var name = (imageSource?.split("/") || [])
        name = name[name?.length - 1]
        link.setAttribute('download', name);
        link.href = imageSource;
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    });
  }

  /*  Export to window */
  window.Daruma = window.Daruma || {};
  window.Daruma.Core = Core;
  window.openWindowManager = openWindowManager;
  window.renderFormula = renderFormula;
})(window, document, jQuery);
