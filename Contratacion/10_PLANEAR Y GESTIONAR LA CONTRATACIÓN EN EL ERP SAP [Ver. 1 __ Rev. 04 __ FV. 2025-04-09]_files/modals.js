/*
 *  jquery-modalForm - v1.0.0
 *  A bootstrap modalForm plugin.
 *
 *  Made by Danier Rivas
 *  Under MIT License
 */
;(function ($, window, document, undefined) {
  'use strict';

  // Create the defaults once
  var pluginName = 'modalForm',
    defaults = {
      destroy: true,
      hasValidation: false,
      useFormButtons: false,
      activeSisyphus: false, // (True|False)
      open: null, // function (modal) {},
      beforeSubmit: null, //function (modal, element, submitAdd) {},
      submit: null, //function (modal, element, submitAdd) {},
      afterSubmit: null, //function (modal, responseText) {},
      close: null, //function (modal, event) {},
      message: null //function (modal, message) {}
    };

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = element;

    // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
    if ( typeof options === 'string' && typeof this[options] === 'function') {
      // call the method
      return this[options](element);
    }
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function () {
      var self = this;

      // lazy load when clicked
      $(self.element).on('click', function (e) {
        e.preventDefault();

        var el = this,
          href = el.href;

        if ($(el).hasClass('ignore-activate')) {
          return;
        }

        if (href.search('_#loops#_') > 0) {
          swal({
            title: daruma.i18n.__('Number of actions!'),
            text: daruma.i18n.__('How many actions will you add?'),
            animation: false,
            type: 'input',
            showCancelButton: true,
            confirmButtonColor: daruma.utils.rgba2hex($('.header-title h1').css('color')),
            confirmButtonText: daruma.i18n.__('OK'),
            cancelButtonText: daruma.i18n.__('Cancel'),
            closeOnConfirm: true,
            closeOnCancel: true,
            inputPlaceholder: daruma.i18n.__('Write a value')
          }, function(inputValue) {
            if (inputValue === false) {
              return false;
            }

            if (inputValue === '') {
              swal.showInputError(daruma.i18n.__('Nothing Entered, Please try again'));
              preventDefault(e);
              return false
            }

            if (isNaN(inputValue)) {
              swal.showInputError(daruma.i18n.__('At least one number'));
              preventDefault(e);
              return false;
            }

            if (!isNaN(inputValue) && inputValue <= 0) {
              swal.showInputError(daruma.i18n.__('Must be one or higher'));
              preventDefault(e);
              return false;
            }

            $(el).attr('data-loops', inputValue).data('loops', inputValue);
            self.lazyLoadEvent(el);
          });
        } else {
          self.lazyLoadEvent(el);
        }
      });
    },
    lazyLoadEvent: function (el) {
      var self = this,
        element = $(el),
        modal = null,
        fragment = element.data('fragment') ? ' ' + element.data('fragment') : '',
        target = element.data('target'),
        title = element.data('title') ? element.data('title') : el.innerHTML,
        buttonText = element.data('button-text') ? element.data('button-text') : 'Save modal',
        loops = element.data('loops');

      $(el).keydown(function(event) {
        var key = event.keyCode || event.which;
        if (key === 13) {
          event.preventDefault();
        }
      });

      if (!target) {
        // create a modal with id and append it to the document
        target = 'modal-form-' + new Date().getTime();
        modal = self.createModal(target, title, buttonText);
      } else {
        modal = $(target);
      }

      // replace ids template
      var href = self.replaceHrefIds(element.data('url') || el.href);

      // replace loops template
      if (loops !== undefined) {
        href = href.replace('_#loops#_', loops);
      }

      // validate if has id template after parse url
      if (href.search('_#id#_') > 0 || href.search('_#ids#_') > 0) {
        swal({
          title: daruma.i18n.__('Info!'),
          text: daruma.i18n.__('You must at least select one item.'),
          animation: false,
          confirmButtonColor: daruma.utils.rgba2hex($('.header-title h1').css('color'))
        });

        return false;
      }

      // load the content into the scoped modal
      $.get(href + fragment, {is_modal_form: true}, function (data) {
        $('.modal-body', modal).html(data);

        var currentUrl = window.location.pathname + window.location.search;

        if ($.isPlainObject(data)) {
          if (data.hideModal === void 0 ? true : data.hideModal) {
            daruma.core.loadModalContent(data.redirect, (currentUrl === data.redirect));

            // close the modal
            modal.modal('hide');
          } else {
            // Init other modal
            var a = document.createElement('a');
            a.href = data.redirect;
            a.setAttribute('data-title', data.title);
            a.setAttribute('data-target', '#' + target);
            self.lazyLoadEvent(a);
          }
        }

        if (self.settings.useFormButtons) {
          // use the forms buttons rather that the default template
          var $footerButtons = $('.modal-footer .buttons', modal);
          var $bodyButtons = $('.modal-body .buttons', modal);

          if ($bodyButtons.length > 0) {
            $footerButtons.replaceWith($bodyButtons);
          }

          self.bindFooterButtons(modal, element);
        } else {
          self.hideFormButtons(modal);
        }

        // use if exist daruma modal title
        var $modalTitle = $('.modal-body #modal_title', modal);
        if ($modalTitle.length && $modalTitle.val()) {
          title = $modalTitle.val();
        }

        $('.modal-title', modal).html(title);

        if (self.settings.hasValidation) {
          // attach validation
          $.validator.unobtrusive.parse($('form', this));
        }

        // hook open. called after the modal is built and loaded
        if (typeof self.settings.open === 'function') {
          self.settings.open.call(null, modal, element);
        }

        if(daruma.core) {
          // activate widgets
          daruma.core.activateModalWidgets(modal);
        }


        /**
         * Disable enter key in inputs type text
         *
         * @deprecated
         */
        $('input[type="text"]', modal).on('keydown', function (event) {
          var key = event.keyCode || event.which;
          if (key == 13) {
            event.preventDefault();
          }
        });

        if ($.fn.autoNumeric) {
          $('.format_currency', modal).autoNumeric('init', {
            aSep: ',', // thousand separator
            aDec: '.', // decimal point
            aSign: '$ ', // currency symbol
            pSign: 'p', // prefix (p), or sufix (s)
            vMax: '9999999999999999.99',
            vMin: '-9999999999999999.99'
          });
        }
        $("[data-tq-title]").each(function(index){
          var title = $(this).attr('data-tq-title');
          $(this).attr('title', title);
        });
        if(self.settings.activeSisyphus) {
          if (daruma.core) {
            //Name forms
            $(modal).find('form').each(function (i,e) {
              var action = $(e).prop('action').substr(8);
              if ($(e).attr('name') === undefined ) {
                $(e).attr('name', action);
              }
            });
            daruma.core.initSisyphus(true, modal);
          }
        }
      });

      // change modal size and set draggable
      $('.modal-dialog', modal).attr('class', 'modal-dialog ' + (element.data('size') || 'modal-lg')).draggable({
        handle: '.modal-header'
      });

      // open the BS modal
      modal.modal({
        backdrop: 'static',
        keyboard: false
      });

      //Binding form buttons
      self.bindFooterButtons(modal, element);

      // hook close. to be called after the modal is closed and hidden
      if (typeof self.settings.close === 'function') {
        modal.on('hidden.bs.modal', function (event) {
          self.settings.close.call(null, modal, event, element);
        });
      }

      // see if we want to remove the item
      modal.on('hidden.bs.modal', function () {
        if (true === self.settings.destroy) {
          modal.data('bs.modal', null);
          modal.remove();
		  //Remove sisyphus-bar
          $('.sisyphus-bar').remove();
          if(self.settings.activeSisyphus) {
            if (daruma.core) {
              var callback = function (object) {
                object.targets = [];
                object.targets = $( object.targets );
                object.evaluateForm();
              };

              if (daruma.sisyphusCollection) {
                  daruma.sisyphusCollection.executeBatchFunction(callback, false);
              }
            }
          }
        }
      });
    },
    defaultSubmit: function (modal, element, submitAdd) {
      var self = this;
      if (self.settings.hasValidation) {
        // perform validation
        if (!$('form', modal).valid()) {
          return;
        }
      }

      if (typeof tinyMCE !== "undefined" && tinyMCE !== null) {
        tinyMCE.triggerSave();
      }

      daruma.core.triggerSaveJsonForms(modal);
      daruma.core.triggerRemoveRiskControlsRelated(modal);
      daruma.core.triggerRiskControlHasModelForms(modal);
      // modal-footer buttons (.button-submit, .button-cancel, .button-submit-add)
      var $buttons = $('.modal-footer button, .modal-footer a, .modal-footer input', modal);
      $buttons.prop('disabled', true);

      if ($.fn.autoNumeric) {
        $('.format_currency', modal).each(function () {
          var $self = $(this);
          $self.val($self.autoNumeric('get'));
        });
      }

	  var $submittedForm = $('form', modal);

      $submittedForm.ajaxSubmit({
        target: $('.modal-body', modal),
        data: {is_modal_form: true},
        success: function (responseText, statusText, xhr, $form) {

          if (daruma.sisyphusCollection) {
              daruma.sisyphusCollection.releaseData();
          }
          var currentUrl = window.location.pathname + window.location.search,
            finalLocation = xhr.getResponseHeader('X-Final-Location'),
            contentType = xhr.getResponseHeader('content-type') || '';

          if (contentType.indexOf('html') > -1) {
            // html response process the contents
            var $content = $(document.createElement('div')).html(responseText);

            if (responseText.match(/toastr\.success/g)) {
              var baseUrl = $content.find('#base_url').val() || finalLocation,
                openPopup = $content.find('#open_popup').val(),
                successUrl = $content.find('#success_url').val() || finalLocation;

              if (baseUrl !== 'false') {
                if (openPopup === 'true') {
                  daruma.utils.popupCenter(baseUrl, 'Daruma Software', 1024, 768);
                } else {
                  if (successUrl !== 'false') {
                    daruma.core.loadModalContent(successUrl, (currentUrl === successUrl));
                  } else {
                    daruma.core.loadModalContent(baseUrl, (currentUrl === baseUrl));
                  }
                }
              }

              if (submitAdd) {
                $form.clearForm();
              } else {
                // close the modal
                modal.modal('hide');
                if ($.fn.autoNumeric) {
                  $('.format_currency, .format_number', modal).each(function () {
                    var $self = $(this);
                    $self.autoNumeric('set', $self.val());
                  });
                }
              }
            }

            if (self.settings.hasValidation) {
              $.validator.unobtrusive.parse($('form', modal));
            }
          }

          if (contentType.indexOf('json') > -1) {
            // unsuccessful submission - show message
            if (false === responseText.success) {
              if (typeof self.settings.message === 'function') {
                self.settings.message.call(null, modal, responseText.message);
              } else {
                // this can be overwritten
                $('#' + modal.attr('id') + ' .modal-message-text').html(message);
                $('.modal-messages', modal).show();
              }
            }

            if (responseText.redirect) {
              var isDownloadXhr = (responseText.download === void 0) ? false : responseText.download;

              if (isDownloadXhr) {
                var filename = responseText.filename === void 0 ? true : responseText.filename;
                var downloadUrl = responseText.redirect;
                var downloadLink = document.createElement("a");
                downloadLink.download = filename;
                downloadLink.href = downloadUrl;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                modal.modal('hide');
                return;
              }

              if (responseText.hideModal === void 0 ? true : responseText.hideModal) {
                if (responseText.redirect && responseText.redirect !== 'none') {
                    daruma.core.loadModalContent(responseText.redirect, (currentUrl === responseText.redirect));
                }

                // close the modal
                modal.modal('hide');
              } else {
                // Init other modal.
                var a = document.createElement('a');
                a.href = responseText.redirect;
                a.setAttribute('data-title', responseText.title);
                a.setAttribute('data-target', '#' + modal.attr('id'));
                self.lazyLoadEvent(a);
              }
            }
          }

          // call hook submit
          if (typeof self.settings.afterSubmit === 'function') {
            self.settings.afterSubmit.call(null, modal, responseText, element);
          }

          $buttons.prop('disabled', false);
        },
        complete: function () {
          self.hideFormButtons(modal);
          daruma.core.activateModalWidgets(modal);
          if(self.settings.activeSisyphus) {
            if (daruma.core) {
              daruma.core.initSisyphus(true, modal);
            }
          }
        }
      });
    },
    hideFormButtons: function (modal) {
      // hide the form buttons
      $('.modal-body .buttons', modal).hide();

      // hide daruma buttons and enable submit add
      $('.modal-body .footer_link, .modal-body .modal-link-hide', modal).hide();

      var $submitAdd = $('.modal-body #save_and_add', modal);
      if ($submitAdd.length && $submitAdd.val() === 'true') {
        $('.modal-footer .button-submit-add', modal).show();
      }

      var $buttonDelete = $('.modal-body .tq_delete', modal);
      if ($buttonDelete.length && !$buttonDelete.hasClass('hide-modal-footer')) {
        var deleteHref = $buttonDelete.attr('href');
        $('.modal-footer .button-delete', modal)
          .attr('data-href', deleteHref)
          .data('href', deleteHref)
          .show();
      }
    },
    createModal: function (target, title, buttonText) {
      ;
      var dynamicModal = $(
        '<div class="modal-form modal fade" id="' + target + '" role="dialog" aria-labelledby="Modal dialog box" aria-hidden="true">' + // tabindex="-1"
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">' +
        '<i class="ion ion-ios-close-empty"></i>' +
        '</button>' +
        '<h3 class="modal-title">' + title + '</h3>' +
        '</div>' +
        '<div class="modal-messages" style="display:none;">' +
        '<div class="alert alert-error"><span class="modal-message-text"></span></div>' +
        '</div>' +
        '<div class="modal-body" style="background-color:#fff;"></div>' +
        '<div class="modal-footer">' +
        '<div class="buttons">' +
        '<button type="button" class="btn btn-primary btn-sm button-submit">' + daruma.i18n.__(buttonText) + '</button>' +
        '<button type="button" class="btn btn-primary btn-sm button-submit-add">' + daruma.i18n.__('Save and add modal') + '</button>' +
        '<button type="button" class="btn btn-danger btn-sm button-delete">' + daruma.i18n.__('Delete') + '</button>' +
        '<button type="button" class="btn btn-default btn-sm button-cancel" data-dismiss="modal">' + daruma.i18n.__('Close modal') + '</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');

      $('body').append(dynamicModal);
      $("<style>").prop("type", "text/css")
      .html('#' + target + ' .modal-body .footer_link, #' + target + ' .modal-body .modal-link-hide { display: none; }')
      .appendTo("head");

      return dynamicModal;
    },
    replaceHrefIds: function (href) {
      var $checkedInputs = $('.check_data_input:checked');
      if (href.search('_#id#_') > 0) {
        // get the first checked val
        var checkedItem = $checkedInputs.filter(':first').val();
        if (checkedItem) {
          href = href.replace('_#id#_', checkedItem);
        }
      } else if (href.search('_#ids#_') > 0) {
        // get all checked values ans join with _
        var checkedItems = $checkedInputs.map(function () {
          return $(this).val();
        }).get().join('_');
        if (checkedItems) {
          href = href.replace('_#ids#_', checkedItems);
        }
      }

      if (href.search('_#perm#_') > 0) {
        // get the first checked val
        var checkedItem = $checkedInputs.filter(':first').data('perm');
        if (checkedItem) {
          href = href.replace('_#perm#_', checkedItem);
          href = href.replace('&', '/');
          href = href.replace('=', '/');
        }
      } else if (href.search('_#perms#_') > 0) {
        // get all checked values ans join with _
        var items = [];

        href = href.replace('&', '/');
        href = href.replace('=', '/');

        $checkedInputs.map(function () {
          var data = $(this).data('perm');
          if (data != ''){
            items.push(data);
          }
        }).get();

        if (items.length > 0) {
          items = $.unique(items);
          checkedItems = items.join('_');
          if (checkedItems) {
            href = href.replace('_#perms#_', checkedItems);
          }
        }
      }

      if (href.search('_#mod#_') > 0) {
        // get the first checked val
        var checkedItem = $checkedInputs.filter(':first').val();
        if (checkedItem) {
          var module = $checkedInputs.filter(':first').data('mod');
          href = href.replace('&', '/');
          href = href.replace('=', '/');
          href = href.replace('_#mod#_', module);
        }
      }

      return href;
    },
    bindFooterButtons: function (modal, element) {
      // form submission event
      var self = this, $submitButtons = $('.button-submit, .button-submit-add, .button-submit-back', modal);
      $submitButtons.unbind('click');

      $submitButtons.click(function (e) {
        e.preventDefault();
        var $button = $(this);
        var submitAdd = $button.hasClass('.button-submit-add');
        var redirectUrl = $button.data('redirect-url');

        if (typeof self.settings.beforeSubmit === 'function') {
          self.settings.beforeSubmit.call(null, modal, element, submitAdd);
        }

        if (redirectUrl) {
          var $form = $('#tq_form'), action = $form.attr('action'), newAction = action + '&redirect_url=' + redirectUrl;
          $form.attr('action', newAction);
        }

        if (typeof self.settings.submit === 'function') {
          self.settings.submit.call(null, modal, element, submitAdd);
        } else {
          self.defaultSubmit(modal, element, submitAdd);
        }
      });

      if (daruma.core) {
        daruma.core.triggerTinyMCEAttachmentValidate($submitButtons, modal);
      }

      $('.button-delete', modal).click(function (e) {
        e.preventDefault();
        var $that = $(this);
        swal({
          title: daruma.i18n.__('Are you sure?'),
          text: daruma.i18n.__('You will not be able to recover this record!'),
          animation: false,
          showCancelButton: true,
          confirmButtonColor: "#dd6b55",
          confirmButtonText: daruma.i18n.__('Yes, delete it!'),
          cancelButtonText: daruma.i18n.__('Cancel'),
          closeOnConfirm: true,
          closeOnCancel: true
        }, function() {
          var csrfToken = $("#csrf_token_delete", modal).val(),
            deleteHref = $that.data('href');

          var $deleteForm = $('<form/>', {'action': deleteHref, 'method': 'POST'}).append(
            $('<input/>', {'name': 'sf_method', 'value': 'delete', 'type': 'hidden'}),
            $('<input/>', {'name': '_csrf_token', 'value': csrfToken, 'type': 'hidden'})
          ).hide().appendTo('body');

          $deleteForm.ajaxSubmit({
            target: $('.modal-body', modal),
            data: {is_modal_form: true},
            success: function (responseText, statusText, xhr, $form) {
              var currentUrl = window.location.pathname + window.location.search,
                finalLocation = xhr.getResponseHeader('X-Final-Location'),
                contentType = xhr.getResponseHeader('content-type') || '';

              if (contentType.indexOf('json') > -1) {
                // unsuccessful submission - show message
                if (false === responseText.success) {
                  if (typeof self.settings.message === 'function') {
                    self.settings.message.call(null, modal, responseText.message);
                  } else {
                    // this can be overwritten
                    $('#' + modal.attr('id') + ' .modal-message-text').html(message);
                    $('.modal-messages', modal).show();
                  }
                }

                if (responseText.redirect) {
                  if (responseText.hideModal === void 0 ? true : responseText.hideModal) {
                    if (responseText.redirect && responseText.redirect !== 'none') {
                      daruma.core.loadModalContent(responseText.redirect, (currentUrl === responseText.redirect));
                    }
                    // close the modal
                    modal.modal('hide');
                  } else {
                    // Init other modal.
                    var a = document.createElement('a');
                    a.href = responseText.redirect;
                    a.setAttribute('data-title', responseText.title);
                    a.setAttribute('data-target', '#' + modal.attr('id'));
                    self.lazyLoadEvent(a);
                  }
                }

                return;
              }

              if (responseText.match(/toastr\.success/g)) {
                daruma.core.loadModalContent(finalLocation, (currentUrl === finalLocation));

                // close the modal
                modal.modal('hide');
              }

              $deleteForm.remove();
            },
            complete: function () {
              self.hideFormButtons(modal);

              daruma.core.activateModalWidgets(modal);
              if(self.settings.activeSisyphus) {
                if (daruma.core) {
                  daruma.core.initSisyphus(true, modal);
                }
              }
            }
          });
        });
      });
    }
  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);

;(function ($, window, document, undefined) {
  'use strict';

  // Create the defaults once
  var pluginName = 'modalShow',
    defaults = {
      destroy: true,
      open: null, // function (modal) {},
      close: null, //function (modal, event) {},
      showButtons: false, // (True|False)
      closeButtonText: 'Close modal'
    };

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = element;

    // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function () {
      var self = this;

      // lazy load when clicked
      $(self.element).on('click', function (e) {
        e.preventDefault();

        // init
        var element = $(this);
        var modal = null;
        var fragment = element.data('fragment') ? ' ' + element.data('fragment') : '';
        var target = element.data('target');
        var title = element.data('title') ? element.data('title') : this.innerHTML;

        if (!target) {
          // create a modal with id and append it to the document
          target = 'modal-show-' + new Date().getTime();
          modal = self.createModal(target, title, self.settings.closeButtonText);
        } else {
          modal = $(target);
        }

        // replace ids template
        var href = element.data('url') || this.href;

        // validate if has id template after parse url
        if (href.search('_#id#_') > 0 || href.search('_#ids#_') > 0) {
          swal({
            title: daruma.i18n.__('Info!'),
            text: daruma.i18n.__('You must at least select one item.'),
            animation: false,
            confirmButtonColor: daruma.utils.rgba2hex($('.header-title h1').css('color'))
          });

          return false;
        }

        // load the content into the scoped modal
        $('.modal-body', modal).load(href + fragment, function () {

          // use if exist daruma modal title
          var $modalTitle = $('.modal-body #modal_title', modal);
          if ($modalTitle.length && $modalTitle.val()) {
            title = $modalTitle.val();
          }

          $('.modal-title', modal).html(title);


          // hook open. called afte the modal is built and loaded
          if (typeof self.settings.open === 'function') {
            self.settings.open.call(null, modal, element);
          }

          if (!self.settings.showButtons) {
            self.hideButtons(modal);
          }

          if(daruma.core) {
            // activate widgets
            daruma.core.bindAfterLoad(modal);
          }
        });

        // change modal size and set draggable
        $('.modal-dialog', modal).attr('class', 'modal-dialog ' + (element.data('size') || 'modal-lg')).draggable({
          handle: '.modal-header'
        });

        // open the BS modal
        modal.modal({
          backdrop: 'static',
          keyboard: false
        });

        // hook close. to be called after the modal is closed and hidden
        if (typeof self.settings.close === 'function') {
          modal.on('hidden.bs.modal', function (event) {
            self.settings.close.call(null, modal, event, element);
          });
        }

        // see if we want to remove the item
        modal.on('hidden.bs.modal', function (e) {
          if (true === self.settings.destroy) {
            modal.data('bs.modal', null);
            modal.remove();
          }
        });
      });
    },
    hideButtons: function (modal) {
      var $modalBody = $('.modal-body', modal);
      $('.footer_link, .buttons, .modal-link-hide', $modalBody).css({"display": "none"});
    },
    createModal: function (target, title, closeButtonText) {
      var dynamicModal = $(
        '<div class="modal-form modal fade" id="' + target + '" tabindex="-1" role="dialog" aria-labelledby="Modal dialog box" aria-hidden="true">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">' +
        '<i class="ion ion-ios-close-empty"></i>' +
        '</button>' +
        '<h3 class="modal-title">' + title + '</h3>' +
        '</div>' +
        '<div class="modal-messages" style="display:none;">' +
        '<div class="alert alert-error"><span class="modal-message-text"></span></div>' +
        '</div>' +
        '<div class="modal-body" style="background-color:#fff;"></div>' +
        '<div class="modal-footer">' +
        '<div class="buttons">' +
        '<button type="button" class="btn btn-default btn-sm button-cancel" data-dismiss="modal">' + daruma.i18n.__(closeButtonText) + '</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
      );

      $('body').append(dynamicModal);

      return dynamicModal;
    }
  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);
