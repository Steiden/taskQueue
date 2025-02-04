shopLogistic.panel.Queue = function (config) {
    config = config || {};

    Ext.apply(config, {
        cls: 'container',
        items: [{
            xtype: 'modx-tabs',
            id: 'shoplogistic-queue-tabs',
            stateful: true,
            stateId: 'shoplogistic-queue-tabs',
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
                    xtype: 'shoplogistic-grid-queue',
                    id: 'shoplogistic-grid-queue',
                }]
            }]
        }]
    });
    shopLogistic.panel.Queue.superclass.constructor.call(this, config);
};
Ext.extend(shopLogistic.panel.Queue, MODx.Panel);
Ext.reg('shoplogistic-panel-queue', shopLogistic.panel.Queue);