/**
 * multiSelect plugin (requires jQuery 1.9.x)
 * @author Scott Horlbeck <me@scotthorlbeck.com>
 * @url http://www.scotthorlbeck.com/code/multiSelect/
 * @version 1.5.0
 * @date 2013-04-15
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details (LICENSE.txt or
 * http://www.gnu.org/copyleft/gpl.html)
 *
 * Thanks to the UNM Health Sciences Library and Informatics Center
 * (http://hsc.unm.edu/library/) for funding the initial creation
 * of this plugin and allowing me to license it as open source software.
 */
(function ($) {

    jQuery.fn.multiSelect = function (o) { // "o" stands for options

        // Since o can be a string instead of an object, we need a function that
        // will handle the action requested when o is a string (e.g. 'clearAll')
        var updateChecklist = function (action, checklistElem) {

            // Before we operate on all checkboxes, we need to make sure that
            // showSelectedItems is disabled, at least temporarily. Otherwise,
            // this process will be REALLY slow because it tries to update the
            // DOM a thousand times unnecessarily.
            // (We will only do this if the list is greater than 3 items.)

            var showSelectedItemsSetting;

            var disableDynamicList = function (checklistLength) {
                if (checklistLength > 3) {
                    showSelectedItemsSetting = $(checklistElem).attr('showSelectedItems');
                    $(checklistElem).attr('showSelectedItems', 'false');
                }
            };

            var enableDynamicList = function () {
                $(checklistElem).attr('showSelectedItems', showSelectedItemsSetting);
            };

            switch (action) {

                case 'clearAll' :
                    var selector = 'li:has(input:checked):not(:hidden)';
                    break;

                case 'checkAll' :
                    var selector = 'li:has(input):not(.checked,:disabled,:hidden)';
                    break;

                case 'invert' :
                    var selector = 'li:has(input):not(:hidden)';
                    break;

                default :
                    alert("multiSelect Plugin says:\n\nWarning - Invalid action requested on checklist.\nThe action requested was: " + action);
                    break;

            }

            var checklistLength = $(selector, checklistElem).length;
            disableDynamicList(checklistLength);
            // If it's checked, force the click event handler to run.
            $(selector, checklistElem).each(function (i) {
                // Before we check/uncheck the penultimate item in the list, we need to restore
                // the showSelectedItems setting to its original setting, so that we update the
                // list of selected items appropriately on the last item we check/uncheck.
                if (i == checklistLength - 2 && checklistLength > 3)
                    enableDynamicList();
                $(this).trigger('click');
            });


        };

        // If o is a simple string, then we're updating an existing checklist
        // (i.e. 'checkAll') instead of converting a regular multi-SELECT box.
        if (typeof o == 'string') {
            this.each(function () {
                if (!$(this).isChecklist()) {
                    return true; // return true is same as 'continue'
                }
                updateChecklist(o, this);
            });
            return $;
        }

        // Provide default settings, which may be overridden if necessary.
        o = jQuery.extend({

            "addScrollBar": true,
            "addSearchBox": true,
            "addActionBox": true,
            "searchBoxText": 'Type here to start your search...',
            "selectAllText": 'Select all',
            "deselectAllText": 'Deselect all',
            "invertText": 'Invert',
            "showCheckboxes": true,
            "showSelectedItems": true,
            "overwriteName": false, // Use false when you need to use original name attribute, or use
                                    // true if you want to overwrite original name attribute with id; Very
                                    // important for Ruby on Rails support to use original name attribute!
            "submitDataAsArray": false,  // This one allows compatibility with languages that use arrays
            // to process the form data, such as PHP. Set to false if using
            // ColdFusion or anything else with a list-based approach.
            "preferIdOverName": false,  // When this is true (default) the ID of the select box is
            // submitted to the server as the variable containing the checked
            // items. Set to false to use the "name" attribute instead (this makes
            // it compatible with Drupal's Views module and Ruby on Rails.)
            "maxNumOfSelections": -1,    // If you want to limit the number of items a user can select in a
                                         // checklist, set this to a positive integer.

            // This function gets executed whenever you go over the max number of allowable selections.
            "onMaxNumExceeded": function () {
                alert('You cannot select more than ' + this.maxNumOfSelections + ' items in this list.');
            },

            // In case of name conflicts, you can change the class names to whatever you want to use.
            "cssChecklist": 'checklist',
            "cssChecklistHighlighted": 'checklistHighlighted',
            "cssLeaveRoomForCheckbox": 'leaveRoomForCheckbox', // For label elements
            "cssEven": 'even',
            "cssOdd": 'odd',
            "cssChecked": 'checked',
            "cssDisabled": 'disabled',
            "cssShowSelectedItems": 'showSelectedItems',
            "cssFocused": 'focused', // This cssFocused is for the li's in the checklist
            "cssFindInList": 'findInList',
            "cssBlurred": 'blurred', // This cssBlurred is for the findInList divs.
            "cssOptgroup": 'optgroup',

            "listWidth": 0,  // force the list width, if 0 the original SELECT width is used
            "itemWidth": 0,  // 0   : each item will be large as the list (single column)
                             // > 0 : each item will have a fixed size, so we could split
                             //       list into more than one column
                             // WARNING: vertical scroll bar width must be taken into account
                             // listWidth=200, itemWidth=50 DOES NOT GIVE a 4 columns list
                             // if list scroll bar is visible
            "isReadOnly": false
        }, o);

        var error = function (msg) {
            alert("jQuery Plugin Error (Plugin: multiSelect)\n\n" + msg);
        };

        var addSearchBox = function (jSelectElem, checklistDivId, w) {

            // Poorly named function... It's really onFocusSearchBox.
            var focusSearchBox = function () {
                // Remove placeholder text when focusing search box.
                $(this).val('');
                $(this).removeClass(o.cssBlurred);
            };

            var showAllSelectOptions = function () {
                $('label', checklistDivId).each(function () {
                    $(this).parent('li').show();
                    // Also show optgroup options
                    $(this).parent('li').prev('.optgroup').show();
                });
            };

            var blurSearchBox = function () {
                // Restore default text on blur.
                $(this).val(o.searchBoxText);
                $(this).addClass(o.cssBlurred);
                setTimeout(showAllSelectOptions, 250);
            };

            var initSearchBox = function () {

                $(checklistDivId).before('<div class="findInList" id="' + jSelectElem.attr('id') + '_findInListDiv">'
                    + '<input type="text" value="' + o.searchBoxText + '" id="'
                    + jSelectElem.attr('id') + '_findInList" class="' + o.cssBlurred + '" /></div>');

                // Set up label elements to restore the default text to the search box
                // when you navigate away from a list item that is focused.
                $('label', checklistDivId).each(function () {
                    $(this).parent().on('blur.restoreDefaultText', function () {
                        $('#' + jSelectElem.attr('id') + '_findInList').val(o.searchBoxText)
                            .addClass(o.cssBlurred).on('blur.blurSearchBox', blurSearchBox);
                    });
                });

                var searchBoxId = '#' + jSelectElem.attr('id') + '_findInList';

                // We want to be able to simply press tab to move the focus from the
                // search text box to the item in the list that we found with it.
                $(searchBoxId).on('keydown.tabToFocus', function (event) {
                    if (event.keyCode == 9) {
                        // event.preventDefault(); // No double tabs, please...
                        $('label:first:visible', checklistDivId).parent().on('keydown.tabBack', function (event) {
                            // This function lets you shift-tab to get back to the search box easily.
                            if (event.keyCode == 9 && event.shiftKey) {
                                event.preventDefault(); // No double tabs, please...
                                $(searchBoxId).on('blur.blurSearchBox', blurSearchBox).focus();
                                $(this).off('keydown.tabBack');
                            }
                        }).focus(); // Focuses the actual list item found by the search box
                    } else {
                        $(this).off('blur.blurSearchBox');
                    }
                })

                // Set up keydown and keyup event handlers, etc. on searchbox
                    .on('focus.focusSearchBox', focusSearchBox)
                    .on('blur.blurSearchBox', blurSearchBox)
                    .on('keyup', function (event) {
                        // Search for the actual text.
                        var textbox = this; // holder
                        if ($(this).val() == '') {
                            showAllSelectOptions();
                            //$(this).off('keydown.tabToFocus');
                            return false;
                        }

                        $('label', checklistDivId).each(function () {
                            var $curLabel = $(this);
                            if (!$curLabel.is(':disabled')) {
                                var curItem = $curLabel.text().toLowerCase();
                                var typedText = textbox.value.toLowerCase();

                                if (curItem.indexOf(typedText) == -1) {
                                    $curLabel.parent('li').hide();
                                    // Also hide optgroup options
                                    $curLabel.parent('li').prev('.optgroup').hide();
                                } else {
                                    $curLabel.parent('li').show();
                                    // Also show optgroup options
                                    $curLabel.parent('li').prev('.optgroup').show();
                                }
                            }

                        });

                        return;
                    });

                // Compensate for the extra space the search box takes up by shortening the
                // height of the checklist div. Also account for margin below the search box.
                findInListDivHeight = $('#' + jSelectElem.attr('id') + '_findInListDiv').height() + 3;
            };

            initSearchBox();
        };

        var addActionBox = function (jSelectElem, checklistDivId, w) {

            var initActionBox = function () {

                $(checklistDivId).after('<div class="actionButtons" id="' + jSelectElem.attr('id') + '_actionButtons">'
                    + '<span data-action="checkAll" >' + o.selectAllText + '</span> | '
                    + '<span data-action="clearAll" >' + o.deselectAllText + '</span> | '
                    + '<span data-action="invert" >' + o.invertText + '</span></div>'
                );

                var actionBoxId = '#' + jSelectElem.attr('id') + '_actionButtons';

                $(actionBoxId).on('click', 'span', function () {
                    $('#' + jSelectElem.attr('id')).multiSelect(this.getAttribute("data-action"));
                });

            };

            initActionBox();
        };

        var preventClick = function () {
            $('div.checklistContainer li [type="checkbox"][readonly="readonly"]').closest('li').off('click keydown').on('click', function(e) {
                e.preventDefault();
                return false;
            });
        };

        var overflowProperty = (o.addScrollBar) ? 'overflow-y: auto; overflow-x: hidden;' : '';
        var leaveRoomForCheckbox = (o.showCheckboxes) ? 'padding-left: 25px' : 'padding-left: 3px';

        // Here, THIS refers to the jQuery stack object that contains all the target elements that
        // are going to be converted to checklists. Let's loop over them and do the conversion.
        this.each(function () {
            var numOfCheckedBoxesSoFar = 0;

            // Hang on to the important information about this <select> element.
            var jSelectElem = $(this);
            var jSelectElemId = jSelectElem.attr('id');
            var jSelectElemName = jSelectElem.attr('name');
            if (jSelectElemId == '' || !o.preferIdOverName) {
                // Regardless of whether this is a PHP environment, we need an id
                // for the element, and it shouldn't have brackets [] in it.
                // jSelectElemId = jSelectElemName.replace(/\[|\]/g,'');
                if (jSelectElemId == '') {
                    error('Can\'t convert element to checklist.\nYour SELECT element must'
                        + ' have a "name" attribute and/or an "id" attribute specified.');
                    return $;
                }
            }

            var h = jSelectElem.outerHeight();
            /* : '100%'; */
            var w = o.listWidth ? o.listWidth : jSelectElem.outerWidth();
            // We have to account for the extra thick left border.
            w -= 2;

            // Make sure it's a SELECT element, and that it's a multiple one.
            if (this.type != 'select-multiple' && this.type != 'select-one') {
                error("Can't convert element to checklist.\n"
                    + "Expecting SELECT element with \"multiple\" attribute.");
                return $;
            } else if (this.type == 'select-one') {
                return $;
            }

            var convertListItemsToCheckboxes = function () {
                var checkboxValue = $(this).val();
                // The option tag may not have had a "value" attribute set. In this case,
                // Firefox automatically uses the innerHTML instead, but we need to set it
                // manually for IE.
                if (checkboxValue == '') {
                    checkboxValue = $(this).html();
                }
                checkboxValue = checkboxValue.replace(/ /g, '_');

                var checkboxId = jSelectElemId + '_' + checkboxValue;
                // escape bad values for checkboxId
                checkboxId = checkboxId.replace(/[^A-Z0-9]+/ig, "_"); //.replace(/(\.|\/|\,|\%|\<|\>|\=)/g, '\\$1');

                var labelText = $(this).text(); // Change for .html()
                var selected = '';
                var disabled = '';
                var disabledClass = '';
                var readOnly = 'wey';
                var readOnlyClass = 'weyclass';

                if ($(this).attr('disabled')) {
                    disabled = ' disabled="disabled"';
                    disabledClass = ' class="disabled"';
                } else if($(this).attr('readonly')) {
                    readOnly = ' readonly="readonly"';
                    readOnlyClass = ' class="readonly"';

                    if ($(this).attr('selected')) {
                        if (o.maxNumOfSelections != -1 && numOfCheckedBoxesSoFar <= o.maxNumOfSelections) {
                            selected += 'checked="checked"';
                            numOfCheckedBoxesSoFar++;
                        } else if (o.maxNumOfSelections == -1) {
                            selected += 'checked="checked"';
                        }
                    }
                } else {
                    var disabled = '';
                    var disabledClass = '';
                    var selected = '';
                    if ($(this).attr('selected')) {
                        if (o.maxNumOfSelections != -1 && numOfCheckedBoxesSoFar <= o.maxNumOfSelections) {
                            selected += 'checked="checked"';
                            numOfCheckedBoxesSoFar++;
                        } else if (o.maxNumOfSelections == -1) {
                            selected += 'checked="checked"';
                        }
                    }
                }

                var arrayBrackets = (o.submitDataAsArray) ? '[]' : '';
                var checkboxName = (o.preferIdOverName) ? jSelectElemId + arrayBrackets : jSelectElemName + arrayBrackets;
                // avoid trailing double [][]
                checkboxName = checkboxName.replace(/\[\]\[\]$/, '[]');

                var show_text = (labelText.length > 100) ? labelText.substring(0, 100) + "..." : labelText;
                $(this).replaceWith('<li tabindex="0"><input type="checkbox" value="' + checkboxValue
                    + '" name="' + checkboxName + '" id="' + checkboxId + '" ' + selected + disabled + readOnly
                    + ' /><label for="' + checkboxId + '"' + disabledClass + readOnlyClass + ' title="' + labelText.htmlentities() + '">' + show_text + '</label></li>');
                // Hide the checkboxes.
                if (o.showCheckboxes === false) {
                    // We could use display:none here, but IE can't handle it. Better
                    // to hide the checkboxes off screen to the left.
                    $('#' + checkboxId).css('position', 'absolute').css('left', '-50000px');
                } else {
                    $('label[for=' + checkboxId + ']').addClass(o.cssLeaveRoomForCheckbox);
                }

                if ($(this).attr('readonly')) {
                    o.isReadOnly = true;
                }
            };

            // Loop through optgroup elements (if any) and turn them into headings
            $('optgroup', jSelectElem).each(function () {
                $('option', this).each(convertListItemsToCheckboxes);
                $(this).replaceWith('<li class="' + o.cssOptgroup + '" title="' + $(this).attr('label').htmlentities() + '">' + $(this).attr('label') + '</li>' + $(this).html());
            });

            // Loop through all remaining options (not in optgroups) and convert them to li's
            // with checkboxes and labels.
            $('option', jSelectElem).each(convertListItemsToCheckboxes);

            // If the first list item in the checklist is an optgroup label, we want
            // to remove the top border so it doesn't look ugly.
            $('li:first', jSelectElem).each(function () {
                if ($(this).hasClass('optgroup'))
                    $(this).css('border-top', 'none');
            });


            var checklistId = jSelectElemId + '_' + 'checklist';
            var oldAttributes = jSelectElem.get(0).attributes;

            // Convert the outer SELECT elem to a <div>
            // Also, enclose it inside another div that has the original id, so developers
            // can access it as before. Also, this allows the search box to be inside
            // the div as well.
            jSelectElem.replaceWith('<div id="' + jSelectElemId + '" class="checklistContainer"><div id="' + checklistId + '">'
                + '<ul>' + jSelectElem.html() + '</ul></div></div>');
            var checklistDivId = '#' + checklistId;

            $.each(oldAttributes, function () {
                if (this.name.indexOf('data') >= 0 || this.name == 'name') {
                    $('#' + jSelectElemId).attr(this.name, this.value);
                }
            });

            // We're going to create a custom HTML attribute in the main div box (the one
            // that contains the checklist) to store our value for the showSelectedItems
            // setting. This is necessary because we may need to change this value dynamically
            // after the initial conversion in order to make it faster to check/uncheck every
            // item in the list.
            $('#' + jSelectElemId).attr('showSelectedItems', o.showSelectedItems.toString());

            $('#' + jSelectElemId).css('width', w + 2);

            // We MUST set the checklist div's position to either 'relative' or 'absolute'
            // (default is 'static'), or else Firefox will think the offsetParent of the inner
            // elements is BODY instead of DIV.
            $(checklistDivId).css('position', 'relative');

            // Add the findInList div, if settings call for it.
            var findInListDivHeight = 0;
            if (o.addSearchBox) {
                addSearchBox(jSelectElem, checklistDivId, w);
            }

            if (o.isReadOnly) {
                preventClick();
            }

            if (o.addActionBox) {
                addActionBox(jSelectElem, checklistDivId, w);
            }

            // ============ Add styles =============
            var items = $('li', checklistDivId);

            $(checklistDivId).addClass(o.cssChecklist);
            if (o.addScrollBar) {
                $(checklistDivId).height(h - findInListDivHeight);
            } else {
                $(checklistDivId).height('100%');
            }
            $('ul', checklistDivId).addClass(o.cssChecklist);

            // Stripe the li's
            $('li:even', checklistDivId).addClass(o.cssEven);
            $('li:odd', checklistDivId).addClass(o.cssOdd);
            // Emulate the :hover effect for keyboard navigation.
            items.focus(function () {
                $(this).addClass(o.cssFocused);
            }).blur(function (event) {
                $(this).removeClass(o.cssFocused);
            });
            /*.mouseout(function() {
             $(this).removeClass(o.cssFocused);
             });*/

            // =================== multicolumn items ===================
            // patch by Claudio Nicora (http://coolsoft.altervista.org)
            // make items float:left if itemWidth option is set
            // =========================================================
            if (o.itemWidth > 0) {
                var colW = o.itemWidth + 'px';
                items.each(function () {
                    $(this).css({
                        'float': 'left',
                        'width': colW
                    });
                });
            }

            // Highlight preselected ones.
            items.each(function () {
                if ($('input', this).attr('checked')) {
                    $(this).addClass(o.cssChecked);
                }
            });

            // ============ Event handlers ===========

            var toggleDivGlow = function () {
                // Make sure the div is glowing if something is checked in it.
                if (items.hasClass(o.cssChecked)) {
                    $('#' + jSelectElemId).addClass(o.cssChecklistHighlighted);
                } else {
                    $('#' + jSelectElemId).removeClass(o.cssChecklistHighlighted);
                }
            };

            var moveToNextLi = function () {
                // Make sure that the next LI has a checkbox (some LIs don't, because
                // they came from <optgroup> tags.
                if ($(this).prop('tagName').toLowerCase() != 'li')
                    return;
                if ($(this).is('li:has(input)'))
                    $(this).focus();
                else
                    $(this).next().each(moveToNextLi);
            };

            // Check/uncheck boxes
            var check = function (event) {

                // This needs to be keyboard accessible too. Only check the box if the user
                // presses space (enter typically submits a form, so is not safe).
                if (event.type == 'keydown') {
                    // Pressing spacebar in IE and Opera triggers a Page Down. We don't want that
                    // to happen in this case. Opera doesn't respond to this, unfortunately...
                    // We also want to prevent form submission with enter key.
                    if (event.keyCode == 32 || event.keyCode == 13) event.preventDefault();
                    // Tab keys need to move to the next item in IE, Opera, Safari, Chrome, etc.
                    if (event.keyCode == 9 && !event.shiftKey) {
                        event.preventDefault();
                        // Move to the next LI
                        $(this).off('keydown.tabBack').blur().next().each(moveToNextLi);
                    } else if (event.keyCode == 9 && event.shiftKey) {
                        // Move to the previous LI
                        //$(this).prev(':has(input)').focus();
                    }

                    if (event.keyCode != 32) return;
                }


                // If we go over the maxNumOfSelections limit, trigger our custom
                // event onMaxNumExceeded.
                var numOfItemsChecked = $('input:checked', checklistDivId).length;
                if (o.maxNumOfSelections != -1 && numOfItemsChecked > o.maxNumOfSelections
                    && !$('input', this).attr('checked')) {

                    o.onMaxNumExceeded();

                    event.preventDefault();
                    return;
                }

                // Not sure if unbind() here removes default action, but that's what I want.
                $('label', this).off();
                // Make sure that the event handler isn't triggered twice (thus preventing the user
                // from actually checking the box) if clicking directly on checkbox or label.
                // Note: the && is not a mistake here. It should not be ||
                if (event.target.tagName.toLowerCase() != 'input' && event.target.tagName.toLowerCase() != 'label') {
                    $('input', this).trigger('click');
                }

                // Change the styling of the row to be checked or unchecked.
                var checkbox = $('input', this).get(0);
                updateLIStyleToMatchCheckedStatus(checkbox);

                // The showSelectedItems setting can change after the initial conversion to
                // a checklist, so rather than checking o.showSelectedItems, we check the
                // value of the custom HTML attribute on the main containing div.
                if ($('#' + jSelectElemId).attr('showSelectedItems') === 'true') showSelectedItems();

            };

            var updateLIStyleToMatchCheckedStatus = function (checkbox) {
                if (checkbox.checked) {
                    $(checkbox).parent().addClass(o.cssChecked);
                } else {
                    $(checkbox).parent().removeClass(o.cssChecked);
                }
                toggleDivGlow();
            };

            // Accessibility, primarily for IE
            var handFocusToLI = function () {
                // Make sure that labels and checkboxes that receive
                // focus divert the focus to the LI itself.
                $(this).parent().focus();
            };

            $('li:has(input)', checklistDivId).click(check).keydown(check);
            $('label', checklistDivId).focus(handFocusToLI);
            $('input', checklistDivId).focus(handFocusToLI);
            toggleDivGlow();

            // Make sure that resetting the form doesn't leave highlighted divs where
            // they shouldn't be and vice versa.
            var fixFormElems = function (event) {
                $('input', this).each(function () {
                    this.checked = this.defaultChecked;
                    updateLIStyleToMatchCheckedStatus(this);
                    if (o.showSelectedItems) showSelectedItems();
                }).parent();
            };
            $('form:has(div.' + o.cssChecklist + ')').on('reset.fixFormElems', fixFormElems);

            // ================== List the selected items in a UL ==========================

            var selectedItemsListId = '#' + jSelectElemId + '_selectedItems';
            if (o.showSelectedItems) {
                $(selectedItemsListId).addClass(o.cssShowSelectedItems);
            }

            var showSelectedItems = function () {
                // Clear the innerHTML of the list and then add every item to it
                // that is highlighted in the checklist.
                $(selectedItemsListId).html('');
                $('label', checklistDivId).each(function () {
                    var vcontext = $(this).parent();
                    if ($(this).parent().hasClass(o.cssChecked)) {
                        var labelText = jQuery.trim($(this).html());
                        $('<li class="" title="' + labelText.htmlentities() + '">' + labelText + '</li>')
                            .on('click.remove', function () {
                                vcontext.trigger('click');
                            }).appendTo(selectedItemsListId);
                    }
                });
            };

            // We have to run showSelectedItems() once here too, upon initial conversion.
            if (o.showSelectedItems) showSelectedItems();

        });

    };

    // Returns boolean value for the first matched element.
    jQuery.fn.isChecklist = function () {
        var isChecklist = false; // Innocent until proven guilty...
        this.each(function () {
            var divContainsChecklist = $('#' + this.id + '_checklist', this).get();
            isChecklist = ($(this).prop('tagName').toLowerCase() == 'div' && divContainsChecklist);
            return false; // same as "break"
        });
        // isChecklist will either be an HTML object here or undefined,
        // and we want to specifically return true or false.
        return (isChecklist) ? true : false;
    };
})(jQuery);

String.prototype.htmlentities = function () {
  return this
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
