var counter = 0;
$(function () {
  var sidebar = $('#sidebar'),
    arrow = $('.arrow'),
    uncopy = $('#uncopy'),
    executeExportPdf = $('#execute-export-pdf')[0],
    executeExportWord = $('#execute-export-word')[0],
    executePrint = $('#execute-print')[0],
    sheetVertical = $('#document-sheet-vertical'),
    sheetHorizontal = $('#document-sheet-horizontal'),
    documentViewer = $('#document-viewer'),
    stickyNavigationWrapper = $('#sticky_navigation_wrapper'),
    stickyNavigation = $('#sticky_navigation'),
    behaviour_ccb = daruma.config.behaviour_ccb,
    labelControlled = daruma.i18n.__('Controlled'),
    labelUnControlled = daruma.i18n.__('unControlled'),
    titleControlled = $('#controlledCopyTitle');

  //ie 8 refuses to obey css 100% height, not worth investigating for a demo
  sidebar.height($(window).height());

  //initialize the scrollbar in the sidebar
  sidebar.tinyscrollbar();

  $(window).resize(function () {
    sidebar.height($(this).height());
    sidebar.tinyscrollbar_update();
  });

  arrow.click(function (e) {
    e.preventDefault();
    if (sidebar.css('right') == '-300px') {
      sidebar.animate({"right": "0"}, "2000");
      sidebar.find('.arrow_inner').css({backgroundPosition: 'right center'});
      $.cookie('document.view.panel', true, {path: '/'});
    } else {
      sidebar.animate({"right": "-300"}, "4000");
      sidebar.find('.arrow_inner').css({backgroundPosition: 'left center'});
      $.cookie('document.view.panel', false, {path: '/'});
    }
  });

  if ($.cookie('document.view.panel') == 'false') {
    // Hide panel in 2 seconds
    setTimeout(function () {
      arrow.click();
    }, 2000);
  }

  sheetVertical.click(function (e) {
    e.preventDefault();
    documentViewer.css({minWidth: ""});
    documentViewer.css({width: "880px"});
    // Add and remove class
    sheetHorizontal.removeClass('disposition-active');
    sheetVertical.addClass('disposition-active');

    stickyNavigation.find('ul').css({width: documentViewer.innerWidth() - 10});

    if ($(executeExportPdf).length > 0) {
      // Set page orientation to vertical
      executeExportPdf.href = executeExportPdf.href.replace('/o/1', '');
    }

    if ($(executeExportWord).length > 0) {
      // Set page orientation to vertical
      executeExportWord.href = executeExportWord.href.replace('/o/1', '');
    }
  });

  sheetHorizontal.click(function (e) {
    e.preventDefault();
    documentViewer.css({minWidth: "880px"});
    documentViewer.css({width: ""});
    // Add and remove class
    sheetVertical.removeClass('disposition-active');
    sheetHorizontal.addClass('disposition-active');

    stickyNavigation.find('ul').css({width: documentViewer.innerWidth() - 10});

    if ($(executeExportPdf).length > 0) {
      // Set page orientation to horizontal
      executeExportPdf.href = executeExportPdf.href + '/o/1';
    }

    if ($(executeExportWord).length > 0) {
      // Set page orientation to horizontal
      executeExportWord.href = executeExportWord.href + '/o/1';
    }
  });

  var activeOption = $('.active-option');

  if(activeOption) {
    if(activeOption.attr('data-orientation') == 'portrait'){
      sheetVertical.click();
    }else if (activeOption.attr('data-orientation') == 'landscape'){
      sheetHorizontal.click();
    }
  }else {
    sheetVertical.click();
  }


  if (uncopy.length > 0) {
    // Uncopy action
    uncopy.change(function () {
      var isFormat = $(this).data('isFormat');

      if (behaviour_ccb) {

        if ($(this).is(":checked") || isFormat === 1) {
          executeExportPdf.href = executeExportPdf.href + '?uncopy=1';

          if ($(executeExportWord).length > 0) {
          executeExportWord.href = executeExportWord.href.replace(/\bwordMain\b/g, 'word');
          executeExportWord.href = executeExportWord.href + '?uncopy=1';
          }
          executePrint.href = executePrint.href.replace(/\bprintMain\b/g, 'print');
          executePrint.href = executePrint.href + '?uncopy=1';

          $(document).unbind('click.fb-start');
          $('.modal_ajax_form').unbind('click');
        } else {
          executeExportPdf.href = executeExportPdf.href.replace('?uncopy=1', '');
          if ($(executeExportWord).length > 0) {
          executeExportWord.href = executeExportWord.href.replace(/\bword\b/g, 'wordMain');
          executeExportWord.href = executeExportWord.href.replace('?uncopy=1', '');
          }
          executePrint.href = executePrint.href.replace(/\bprint\b/g, 'printMain');
          executePrint.href = executePrint.href.replace('?uncopy=1', '');

          // Bind modal ajax form
          var $buttons = $('.modal_ajax_form').modalForm({
            submit: function (modal, element, submitAdd) {
              $('form', modal).ajaxSubmit({
                target: $('.modal-body', modal),
                success: function (responseText, statusText, xhr, $form) {
                  // html response process the contents
                  var $content = $(document.createElement('div')).html(responseText);

                  if (responseText.match(/toastr\.success/g)) {
                    var baseUrl = $content.find('#base_url').val(),
                      openPopup = $content.find('#open_popup').val();

                    if (baseUrl != 'false') {
                      if (openPopup == 'true') {
                        window.location = baseUrl;
                      }
                    }

                    // close the modal
                    modal.modal('hide');
                  }
                }
              });

              return false;
            }
          });

          if (counter > 0 && $buttons.length > 0) {
            $buttons.each(function () {
              var self = this, pluginObj = $.data(self, 'plugin_modalForm');
              pluginObj.init();
            });
          }

          counter++;
        }
      } else {

        if ($(this).is(":checked") || isFormat === 1) {

          executeExportPdf.href = executeExportPdf.href.replace('?uncopy=1', '');
          if ($(executeExportWord).length > 0) {
          executeExportWord.href = executeExportWord.href.replace(/\bword\b/g, 'wordMain');
          executeExportWord.href = executeExportWord.href.replace('?uncopy=1', '');
          }
          executePrint.href = executePrint.href.replace(/\bprint\b/g, 'printMain');
          executePrint.href = executePrint.href.replace('?uncopy=1', '?');
          titleControlled.val(labelControlled);

          // Bind modal ajax form
          var $buttons = $('.modal_ajax_form').modalForm({
            submit: function (modal, element, submitAdd) {
              $('form', modal).ajaxSubmit({
                target: $('.modal-body', modal),
                success: function (responseText, statusText, xhr, $form) {
                  // html response process the contents
                  var $content = $(document.createElement('div')).html(responseText);

                  if (responseText.match(/toastr\.success/g)) {
                    var baseUrl = $content.find('#base_url').val(),
                      openPopup = $content.find('#open_popup').val();

                    if (baseUrl != 'false') {
                      if (openPopup == 'true') {
                        window.location = baseUrl;
                      }
                    }

                    // close the modal
                    modal.modal('hide');
                  }
                }
              });

              return false;
            }
          });

          if (counter > 0 && $buttons.length > 0) {
            $buttons.each(function () {
              var self = this, pluginObj = $.data(self, 'plugin_modalForm');
              pluginObj.init();
            });
          }

          counter++;
        } else {
          executeExportPdf.href = executeExportPdf.href + '?uncopy=1';
          if ($(executeExportWord).length > 0) {
          executeExportWord.href = executeExportWord.href.replace(/\bwordMain\b/g, 'word');
          executeExportWord.href = executeExportWord.href + '?uncopy=1';
          }
          executePrint.href = executePrint.href.replace(/\bprintMain\b/g, 'print');
          executePrint.href = executePrint.href + '?uncopy=1';
          titleControlled.val(labelUnControlled);


          $(document).unbind('click.fb-start');
          $('.modal_ajax_form').unbind('click');

        }
      }
    });

    uncopy.change();
  } else {
    var isFormat = $(executeExportWord).data('isFormat');

    if (behaviour_ccb) {
    // Bind modal ajax form
    if (isFormat === 1) {
      executeExportPdf.href = executeExportPdf.href + '?uncopy=1';
        if ($(executeExportWord).length > 0) {
      executeExportWord.href = executeExportWord.href.replace(/\bwordMain\b/g, 'word');
      executeExportWord.href = executeExportWord.href + '?uncopy=1';
        }
      executePrint.href = executePrint.href.replace(/\bprintMain\b/g, 'print');
      executePrint.href = executePrint.href + '?uncopy=1';

      $(document).unbind('click.fb-start');
      $('.modal_ajax_form').unbind('click');
    } else {
      $('.modal_ajax_form').modalForm({
        submit: function (modal, element, submitAdd) {
          $('form', modal).ajaxSubmit({
            target: $('.modal-body', modal),
            success: function (responseText, statusText, xhr, $form) {
              // html response process the contents
              var $content = $(document.createElement('div')).html(responseText);

              if (responseText.match(/toastr\.success/g)) {
                var baseUrl = $content.find('#base_url').val(),
                  openPopup = $content.find('#open_popup').val();

                if (baseUrl != 'false') {
                  if (openPopup == 'true') {
                    window.location = baseUrl;
                  }
                }

                // close the modal
                modal.modal('hide');
              }
            }
          });

          return false;
        }
      });
     }
    }else {
      executeExportPdf.href = executeExportPdf.href + '?uncopy=1';
      if ($(executeExportWord).length > 0) {
      executeExportWord.href = executeExportWord.href.replace(/\bwordMain\b/g, 'word');
      executeExportWord.href = executeExportWord.href + '?uncopy=1';
      }
      executePrint.href = executePrint.href.replace(/\bprintMain\b/g, 'print');
      executePrint.href = executePrint.href + '?uncopy=1';

      $(document).unbind('click.fb-start');
      $('.modal_ajax_form').unbind('click');

    }
  }

  var sticky_navigation = function () {
    var scroll_top = $(window).scrollTop(),
      window_height = $(window).height(),
      document_height = $(document).height();

    if (scroll_top + window_height == document_height) {
      stickyNavigation.css({'position': 'relative'});
      stickyNavigation.find('ul').css({marginLeft: "0px"});
    } else {
      stickyNavigation.css({'position': 'fixed', 'bottom': 0, 'left': 0});
      stickyNavigation.find('ul').css({marginLeft: "21px"});
    }

    stickyNavigation.find('ul').css({width: documentViewer.innerWidth() - 10});
    stickyNavigationWrapper.css({height: stickyNavigation.innerHeight()});
  };

  // run function on load
  sticky_navigation();

  // run sticky_navigation again every time you scroll
  $(window).scroll(function () {
    sticky_navigation();
  });
});
