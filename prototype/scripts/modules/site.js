/* jslint regexp: true, nomen: true, sloppy: true */
/* global require, define, alert, applicationConfig, location, document, window,  setTimeout, console, Countable */

define(['jquery'], function ($) {

    var module = {};
    module.validateForms = function () {
        $('form').each(function () {
            $(this).validate({
                errorElement: "span",
                errorClass: "input-validation-error",
                errorPlacement: function (error, element) {
                    $('<span class="field-validation-error"></span>').append(error).insertAfter(element);
                },
                success: function (label) {
                    label.parent().remove();
                }
            });
        });
    };

    module.progressBars = function () {
        var progressBars = $('.js-progress'),
            totalEstimate,
            currentEst,
            self;
        progressBars.each(function () {
            self = $(this);
            totalEstimate = self.data('total');
            currentEst = self.data('logged');
            if (totalEstimate >= currentEst) {
                self.css('width', 100 / totalEstimate * self.data('logged') + '%');
            }
            else {
                self.closest('.progress-bar').addClass('progress-exceeded');
                self.css('width', 100 - (100 - (totalEstimate * 100 / currentEst)) + '%');
            }
        });
    };

    module.popupCall = function () {
        $(document).on('click', '[data-modal]', function (e) {
            e.preventDefault();
            $(this).openModal({
                onLoad: function () {
                    module.autocomplete();
                    $('.datepicker').datepick({
                        rangeSelect: true,
                        monthsToShow: 2,
                        todayText: '',
                        todayStatus: '',
                        prevText: 'Previous',
                        nextText: 'Next',
                        changeMonth: false,
                        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        firstDay: 1
                    });
                    module.calendar();
                    module.calendarMenu($('.menu-wrapper'), 'active-menu');
//                    module.calendarMenu($('.personal-calendar'), 'active-box');
                },
                onClose: function () {

                }
            });
        });
    };

    module.showRow = function () {
        var tableRows = $('.loadable-table').find('tbody').find('tr');
        tableRows.filter(':first-child').find('td').on('click touchstart', function () {
            var selfRoot = $(this).closest('tr');
            if (!selfRoot.closest('tbody').hasClass('cell-loaded')) {
                selfRoot.next('tr').find('td').stop(true, true).show();
                selfRoot.closest('tbody').addClass('cell-loaded');
            } else {
                selfRoot.next('tr').find('td').stop(true, true).hide();
                selfRoot.closest('tbody').removeClass('cell-loaded');
            }
        });
    };

    module.autocomplete = function () {
        // Load countries then initialize plugin:
        var navItems = $('.navigation-filter').children('ul').children('li');
        navItems.on('hover', function () {
            if (!$(this).hasClass('active-menu')) {
                navItems.removeClass('active-menu');
                $('.js-autocomplete').blur();
            }
        });

        $.ajax({
            url: '/scripts/countries.txt',
            dataType: 'json'
        }).done(function (source) {

                var countriesArray = $.map(source, function (value, key) {
                        return { value: value, data: key };
                    }),
                    countries = $.map(source, function (value) {
                        return value;
                    });

                // Setup jQuery ajax mock:
                /* $.mockjax({
                 url: '*',
                 responseTime: 2000,
                 response: function (settings) {
                 var query = settings.data.query,
                 queryLowerCase = query.toLowerCase(),
                 re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi'),
                 suggestions = $.grep(countriesArray, function (country) {
                 // return country.value.toLowerCase().indexOf(queryLowerCase) === 0;
                 return re.test(country.value);
                 }),
                 response = {
                 query: query,
                 suggestions: suggestions
                 };

                 this.responseText = JSON.stringify(response);
                 }
                 });    */

                // Initialize ajax autocomplete:
                var autocompleteItem = $('.js-autocomplete');
                if (autocompleteItem.length) {
                    autocompleteItem.on('focus', function () {
                        $(this).closest('.expandable-block').parent('li').addClass('active-menu');
                    });
                    autocompleteItem.on('blur', function () {
                        $(this).closest('.expandable-block').parent('li').removeClass('active-menu');
                    });
                    $('.js-autocomplete').autocomplete({
                        // serviceUrl: '/autosuggest/service/url',
                        lookup: countriesArray,
                        lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
                            return re.test(suggestion.value);
                        },
                        onSelect: function (suggestion) {
                            $('.js-autocomplete').focus();
                            $('#selction-ajax').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
                        },
                        onHint: function (hint) {
                            $('#autocomplete-ajax-x').val(hint);
                        },
                        onInvalidateSelection: function () {
                            $('#selction-ajax').html('You selected: none');
                        }
                    });
                }
            });
    };

    module.showRows = function () {
        var tableRows = $('.by-project').find('tbody').find('tr');
        tableRows.filter(':first-child').find('td').on('click touchstart', function () {
            var selfRoot = $(this).closest('tr');
            if (!selfRoot.closest('tbody').hasClass('cell-loaded')) {
                selfRoot.next('tr').find('td').stop(true, true).show();
                selfRoot.closest('tbody').addClass('cell-loaded');
            } else {
                selfRoot.next('tr').find('td').stop(true, true).hide();
                selfRoot.closest('tbody').removeClass('cell-loaded');
            }
        });
    };

    //Calendar popup dropdown
    module.calendar = function () {
        $('.js-open').click(function (e) {
            var width = $(this).width(),
                height = $(this).height(),
                left = $(this).position().left,
                top = $(this).position().top,
                defaultClass = 'datepicker-wrapper ',
                positionLeft,
                positionTop,
                className;

            //Calendar dropdown position
            if(left == 0 || left == 141){
                positionLeft = left;
                className = 'arrow-left';
            } else if( left == 705 || left == 846){
                positionLeft = left - width*4.4;
                className = 'arrow-right';
            } else if(left == 564){
                positionLeft = left - width*4.2;
                className = 'arrow-right';
            }
            else {
                positionLeft = left - (width * 2);
                className = 'arrow-center';
            }

            //Show calendar dropdown
            positionTop = top + height;
            $('.calendar-dropdown').show().css({top: positionTop, left: positionLeft});

            //Dropdown arrow position
            $('.datepicker-wrapper').attr('class', defaultClass + className);

            //Active calendar day
            $('a.js-open').removeClass('active-box');
            $(this).addClass('active-box');
        });
    };

    //Active calendar dropdown menu link
    module.calendarMenu = function (menuWrapper, activeClass) {
        $(menuWrapper).find('a').on('click', function () {
            $(this).toggleClass(activeClass).siblings().removeClass(activeClass);
        });
    };

    module.suggestions = function () {
        var hideFunc = function(e) {
            if (e.target.value) {
                $('.search__input').addClass('suggestions-visible');
                $('.suggestions').removeClass('hidden')
            } else {
                $('.search__input').removeClass('suggestions-visible');
                $('.suggestions').addClass('hidden')
            }
        };

        $('.search__input').on('input', hideFunc).focus(hideFunc).blur(function() {
            setTimeout(function () {$('.suggestions').addClass('hidden')}, 150);
        });
    };

    module.navigation = function () {
        $( document ).ready(function() {
            var locationParts = location.href.split('/');
            if (locationParts.length >= 4) {
              $('#' + locationParts[3]).addClass('active');
            }
        });
    };

    module.bookMock = function () {
        var titles = [
          'Mystery of the Quiet Inspector',
          'Pride of the Navy',
          'Sign of the Whispering Map',
          '2246: Annihilation',
          'The Winter of the Marked'
        ];

        var authors = [
          'Fletcher Bouvet, Bert Donald',
          'Isadora Crosby',
          'Isabelle Harwood',
          'Frederick Alston, Debra Tyson, Malika Barnett',
          'Kiefer Coleman'
        ];

        $( document ).ready(function() {
            var book = $('#copy-book');

            if (!book) {
                return;
            }

            book.detach();

            $('.book-grid').each(function(index, element) {
                var container = $(element);
                console.log(index, container, container.data('copies'))
                for (var i = 0; i < container.data('copies'); i++) {
                    var rand = Math.floor(Math.random() * 5) + 1;
                    var title = titles[rand -1];
                    var author = authors[rand -1];
                    var image = '/Content/Images/book_cover_' + rand + '.jpg'
                    var copy = book.clone();

                    copy.find('.book__title').append(title);
                    copy.find('.book__author').append(author);
                    copy.find('.book__image').append($('<img src="' + image + '" />"'));

                    container.append(copy)
                }
            });
        });
    };

    module.init = function () {
        module.validateForms();
        module.progressBars();
        module.popupCall();
        module.showRow();
        module.showRows();
        module.autocomplete();
        module.suggestions();
        module.navigation();
        module.bookMock();
    };

    return module;


});