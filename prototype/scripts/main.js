/*jslint regexp: true, nomen: true, sloppy: true */
/*global require, applicationConfig, window, applicationConfig */
require.config({
    baseUrl: '/',
    paths: {
        jquery: '/scripts/libs/jquery1.8.3.min',
        timeTrack: '/scripts/modules/site',
        dbModal: '/scripts/plugins/jquery.modal',
        validation: '/scripts/plugins/jquery.validate',
        datepick: '/scripts/plugins/jquery.datepick',
        mockflax: '/scripts/plugins/jquery.mockjax',
        autocomplete: '/scripts/plugins/jquery.autocomplete',
    },
    shim: {
        timeTrack: {
            deps: ['jquery', 'validation', 'mockflax', 'datepick', 'autocomplete']
        },
        dbModal:{
            deps: ['jquery', 'timeTrack', 'validation']
        },
        validation: {
            deps: ['jquery']
        },
        datepick: {
            deps: ['jquery']
        },
        mockflax: {
            deps: ['jquery']
        },
        autocomplete: {
            deps: ['jquery']
        },
    }
});
require(['jquery', 'timeTrack', 'datepick', 'validation', 'mockflax', 'autocomplete'], function ($, site) {
    var console = window.console || { log: $.noop, error: $.noop },
        maxData = [];
    if (typeof applicationConfig != 'undefined') {
        var config = applicationConfig;
    }

    if (typeof site != 'undefined') {
        site.init();
        $(function() {
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
            $(".projects-dropdown a").on('click', function (e) {
                $(this).toggleClass("active");
                if($(this).find("active")) {
                    $(this).parent().parent().parent().addClass("selected-options");
                }
                else {
                    $(this).parent().parent().parent().removeClass("selected-options");
                }
                e.preventDefault();
            });
            $("a.expandable i").on('click', function (e) {
                $(this).parentsUntil("selected-options").removeClass("selected-options");
                $(".projects-dropdown").parent().find('a').removeClass("active");
                e.preventDefault();
            });

        });
    }
});
