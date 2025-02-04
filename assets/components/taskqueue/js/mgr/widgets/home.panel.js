taskQueue.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        /*
         stateful: true,
         stateId: 'taskqueue-panel-home',
         stateEvents: ['tabchange'],
         getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
         */
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('taskqueue') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('taskqueue_items'),
                layout: 'anchor',
                items: [{
                    html: _('taskqueue_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'taskqueue-grid-items',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    taskQueue.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(taskQueue.panel.Home, MODx.Panel);
Ext.reg('taskqueue-panel-home', taskQueue.panel.Home);
