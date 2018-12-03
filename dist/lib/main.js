require.config({
    baseurl:'../lib',
    paths: {
        jquery: 'jquery-1.10.1.min',
        con:"../js/common",
        index:"../js/index"
    },
    shim: {
        index: ['jquery','con'],
    }
});
require(['jquery','con','index'], function ($) {
    // alert($().jquery);
});