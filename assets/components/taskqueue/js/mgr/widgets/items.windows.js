taskQueue.window.CreateItem = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'taskqueue-item-window-create';
    }
    Ext.applyIf(config, {
        title: _('taskqueue_item_create'),
        width: 550,
        autoHeight: true,
        url: taskQueue.config.connector_url,
        action: 'mgr/item/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    taskQueue.window.CreateItem.superclass.constructor.call(this, config);
};
Ext.extend(taskQueue.window.CreateItem, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('taskqueue_item_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textarea',
            fieldLabel: _('taskqueue_item_description'),
            name: 'description',
            id: config.id + '-description',
            height: 150,
            anchor: '99%'
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('taskqueue_item_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('taskqueue-item-window-create', taskQueue.window.CreateItem);


taskQueue.window.UpdateItem = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'taskqueue-item-window-update';
    }
    Ext.applyIf(config, {
        title: _('taskqueue_item_update'),
        width: 550,
        autoHeight: true,
        url: taskQueue.config.connector_url,
        action: 'mgr/item/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    taskQueue.window.UpdateItem.superclass.constructor.call(this, config);
};
Ext.extend(taskQueue.window.UpdateItem, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: _('taskqueue_item_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textarea',
            fieldLabel: _('taskqueue_item_description'),
            name: 'description',
            id: config.id + '-description',
            anchor: '99%',
            height: 150,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('taskqueue_item_active'),
            name: 'active',
            id: config.id + '-active',
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('taskqueue-item-window-update', taskQueue.window.UpdateItem);