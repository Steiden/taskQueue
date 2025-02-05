<?php

/**
 * The home manager controller for taskQueue.
 *
 */
class taskQueueHomeManagerController extends modExtraManagerController
{
    /** @var taskQueue $taskQueue */
    public $taskQueue;


    /**
     *
     */
    public function initialize()
    {
        $this->taskQueue = $this->modx->getService('taskQueue', 'taskQueue', MODX_CORE_PATH . 'components/taskqueue/model/');
        parent::initialize();
    }


    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return ['taskqueue:default'];
    }


    /**
     * @return bool
     */
    public function checkPermissions()
    {
        return true;
    }


    /**
     * @return null|string
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('taskqueue');
    }


    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
        $this->addCss($this->taskQueue->config['cssUrl'] . 'mgr/main.css');
        $this->addJavascript($this->taskQueue->config['jsUrl'] . 'mgr/taskqueue.js');

        $this->addJavascript($this->taskQueue->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->taskQueue->config['jsUrl'] . 'mgr/misc/combo.js');
        $this->addJavascript($this->taskQueue->config['jsUrl'] . 'mgr/misc/default.grid.js');
        $this->addJavascript($this->taskQueue->config['jsUrl'] . 'mgr/misc/default.window.js');

        $this->addJavascript($this->taskQueue->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->taskQueue->config['jsUrl'] . 'mgr/sections/home.js');

        $this->addJavascript($this->taskQueue->config['jsUrl'] . 'mgr/queue/grid.js');
        $this->addJavascript($this->taskQueue->config['jsUrl'] . 'mgr/queue/queue.js');
        $this->addJavascript($this->taskQueue->config['jsUrl'] . 'mgr/queue/windows.js');

        $this->addHtml('<script type="text/javascript">
        taskQueue.config = ' . json_encode($this->taskQueue->config) . ';
        taskQueue.config.connector_url = "' . $this->taskQueue->config['connectorUrl'] . '";
        Ext.onReady(function() {MODx.load({ xtype: "taskqueue-page-home"});});
        </script>');
    }


    /**
     * @return string
     */
    public function getTemplateFile()
    {
        $this->content .= '<div id="taskqueue-panel-home-div"></div>';

        return '';
    }
}