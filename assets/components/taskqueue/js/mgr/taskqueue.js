var taskQueue = function (config) {
    config = config || {};
    taskQueue.superclass.constructor.call(this, config);
};
Ext.extend(taskQueue, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('taskqueue', taskQueue);

taskQueue = new taskQueue();