Ext.onReady(function () {
    taskQueue.config.connector_url = OfficeConfig.actionUrl;

    var grid = new taskQueue.panel.Home();
    grid.render('office-taskqueue-wrapper');

    var preloader = document.getElementById('office-preloader');
    if (preloader) {
        preloader.parentNode.removeChild(preloader);
    }
});