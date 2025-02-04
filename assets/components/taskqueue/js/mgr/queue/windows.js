taskQueue.window.CreateQueue = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        title: _('taskqueue_queue_create'),
        width: 900,
        baseParams: {
            action: 'mgr/queue/create'
        },
    });
    taskQueue.window.CreateQueue.superclass.constructor.call(this, config);
};
Ext.extend(taskQueue.window.CreateQueue, taskQueue.window.Default, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('taskqueue_queue_action'),
            name: 'slaction',
            id: config.id + '-slaction',
            anchor: '99%'
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('taskqueue_queue_processed'),
            name: 'processed',
            id: config.id + '-processed',
            anchor: '99%'
        },{
            xtype: 'xcheckbox',
            boxLabel: _('taskqueue_queue_processing'),
            name: 'processing',
            id: config.id + '-processing',
            anchor: '99%'
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('taskqueue_queue_fixed'),
            name: 'fixed',
            id: config.id + '-fixed',
            anchor: '99%'
        },{
            xtype: 'textarea',
            fieldLabel: _('taskqueue_queue_description'),
            name: 'description',
            id: config.id + '-description',
            anchor: '99%'
        }, {
            xtype: 'textarea',
            fieldLabel: _('taskqueue_queue_properties'),
            name: 'properties',
            id: config.id + '-properties',
            anchor: '99%'
        }];
    }
});
Ext.reg('taskqueue-window-queue-create', taskQueue.window.CreateQueue);


taskQueue.window.UpdateQueue = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        title: _('taskqueue_parser_config_update'),
        width: 900,
        maxHeight: 400,
        baseParams: {
            action: 'mgr/queue/update'
        },
        bodyCssClass: 'tabs',
    });
    taskQueue.window.UpdateQueue.superclass.constructor.call(this, config);
};
Ext.extend(taskQueue.window.UpdateQueue, taskQueue.window.CreateQueue, {

    getFields: function (config) {
        return taskQueue.window.CreateQueue.prototype.getFields.call(this, config)
    }

});
Ext.reg('taskqueue-window-queue-update', taskQueue.window.UpdateQueue);