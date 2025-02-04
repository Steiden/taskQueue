taskQueue.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'taskqueue-panel-home',
            renderTo: 'taskqueue-panel-home-div'
        }]
    });
    taskQueue.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(taskQueue.page.Home, MODx.Component);
Ext.reg('taskqueue-page-home', taskQueue.page.Home);