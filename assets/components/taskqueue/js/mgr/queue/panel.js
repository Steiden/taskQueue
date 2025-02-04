taskQueue.panel.Queue = function (config) {
    config = config || {};

    Ext.apply(config, {
        cls: 'container',
        items: [{
            xtype: 'modx-tabs',
            id: 'taskqueue-queue-tabs',
            stateful: true,
            stateId: 'taskqueue-queue-tabs',
            stateEvents: ['tabchange'],
            getState: function () {
                return {
                    activeTab: this.items.indexOf(this.getActiveTab())
                };
            },
            deferredRender: false,
            items: [{
                title: _('taskqueue_queue'),
                layout: 'anchor',
                items: [{
                    xtype: 'taskqueue-grid-queue',
                    id: 'taskqueue-grid-queue',
                }]
            }]
        }]
    });
    taskQueue.panel.Queue.superclass.constructor.call(this, config);
};
Ext.extend(taskQueue.panel.Queue, MODx.Panel);
Ext.reg('taskqueue-panel-queue', taskQueue.panel.Queue);