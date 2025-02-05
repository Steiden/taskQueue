taskQueue.grid.Queue = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'taskqueue-grid-queue';
    }

    Ext.applyIf(config, {
        baseParams: {
            action: 'mgr/queue/getlist',
            sort: 'id',
            dir: 'desc'
        },
        stateful: true
    });
    taskQueue.grid.Queue.superclass.constructor.call(this, config);
};
Ext.extend(taskQueue.grid.Queue, taskQueue.grid.Default, {

    getFields: function () {
        return ['id', 'action', 'slaction', 'fixed', 'description', 'createdon', 'startedon', 'finishedon', 'createdby', 'processing', 'processed', 'response', 'properties', 'actions'];
    },

    getColumns: function () {
        return [
            {
                header: _('taskqueue_id'),
                dataIndex: 'id',
                width: 20
            },
            {
                header: _('taskqueue_queue_action'),
                width: 50,
                dataIndex: 'slaction'
            },
            {
                header: _('taskqueue_createdon'),
                dataIndex: 'createdon',
                sortable: true,
                width: 100,
            },
            {
                header: _('taskqueue_queue_processing'),
                dataIndex: 'processing',
                sortable: true,
                width: 100,
                renderer: taskQueue.utils.renderBoolean,
            },
            {
                header: _('taskqueue_queue_processed'),
                dataIndex: 'processed',
                sortable: true,
                width: 100,
                renderer: taskQueue.utils.renderBoolean,
            },
            {
                header: _('taskqueue_queue_fixed'),
                dataIndex: 'fixed',
                sortable: true,
                width: 100,
                renderer: taskQueue.utils.renderBoolean,
            },
            {
                header: _('ms2_actions'),
                dataIndex: 'actions',
                id: 'actions',
                width: 50,
                renderer: taskQueue.utils.renderActions
            }
        ];
    },

    getTopBar: function () {
        return [{
            text: '<i class="icon icon-plus"></i> ' + _('taskqueue_queue_create'),
            handler: this.createQueue,
            scope: this
        }];
    },

    getListeners: function () {
        return {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateQueue(grid, e, row);
            },
        };
    },

    createQueue: function (btn, e) {
        var w = Ext.getCmp('taskqueue-window-queue-create');
        if (w) {
            w.hide().getEl().remove();
        }

        w = MODx.load({
            xtype: 'taskqueue-window-queue-create',
            id: 'taskqueue-window-queue-create',
            record: this.menu.record,
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.fp.getForm().reset();
        w.fp.getForm().setValues({});
        w.show(e.target);
    },

    updateQueue: function (btn, e, row) {
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }

        var w = Ext.getCmp('taskqueue-window-queue-updater');
        if (w) {
            w.close();
        }
        w = MODx.load({
            xtype: 'taskqueue-window-queue-update',
            id: 'taskqueue-window-queue-updater',
            record: this.menu.record,
            title: this.menu.record['action'],
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.fp.getForm().reset();
        w.fp.getForm().setValues(this.menu.record);
        w.show(e.target);
    },

    removeQueue: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('taskqueue_queues_remove')
                : _('taskqueue_queue_remove'),
            text: ids.length > 1
                ? _('taskqueue_queues_remove_confirm')
                : _('taskqueue_queue_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/queue/remove',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
    },
});
Ext.reg('taskqueue-grid-queue', taskQueue.grid.Queue);