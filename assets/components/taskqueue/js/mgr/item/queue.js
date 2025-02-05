taskQueue.page.Queue = function (config) {
    config = config || {};
    Ext.apply(config, {
        formpanel: 'taskqueue-panel-queue',
        cls: 'container',
        buttons: this.getButtons(config),
        components: [{
            xtype: 'taskqueue-panel-queue'
        }]
    });
    taskQueue.page.Queue.superclass.constructor.call(this, config);
};
Ext.extend(taskQueue.page.Queue, MODx.Component, {
    getButtons: function (config) {
        var b = [];

        /*if (MODx.perm.mssetting_list) {
            b.push({
                text: _('ms2_settings')
                ,id: 'ms2-abtn-settings'
                ,handler: function () {
                    MODx.loadPage('?', 'a=mgr/settings&namespace=taskqueue');
                }
            });
        }*/

        return b;
    }
});
Ext.reg('taskqueue-page-queue', taskQueue.page.Queue);