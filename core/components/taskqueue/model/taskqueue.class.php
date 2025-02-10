<?php

class taskQueue
{
    /** @var modX $modx */
    public $modx;


    /**
     * @param modX $modx
     * @param array $config
     */
    function __construct(modX &$modx, array $config = [])
    {
        $this->modx =& $modx;
        $corePath = MODX_CORE_PATH . 'components/taskqueue/';
        $assetsUrl = MODX_ASSETS_URL . 'components/taskqueue/';

        $this->config = array_merge([
            'corePath' => $corePath,
            'modelPath' => $corePath . 'model/',
            'processorsPath' => $corePath . 'processors/',

            'connectorUrl' => $assetsUrl . 'connector.php',
            'assetsUrl' => $assetsUrl,
            'cssUrl' => $assetsUrl . 'css/',
            'jsUrl' => $assetsUrl . 'js/',
        ], $config);

        $this->modx->addPackage('taskqueue', $this->config['modelPath']);
        $this->modx->lexicon->load('taskqueue:default');
    }

    // Запуск обработки очереди
    public function processQueue() {
        $actions = $this->getQueue();
        if($actions){
            foreach($actions as $action){
                $this->modx->invokeEvent('OnTaskQueueItemProcess', array('item' => $action));
                $queue = $this->modx->getObject("taskQueueItem", $action['id']);
                $queue->set("processed", 1);
                $queue->set("startedon", time());
                $queue->set("processing", 1);
                $queue->save();
            }
        }
    }

    public function getQueue(){
        // берем все элементы очереди, которые нужно выполнить
        $query = $this->modx->newQuery("taskQueueItem");
        $query->where(array("processed:=" => 0, "AND:processing:=" => 0));
        $query->select(array("taskQueueItem.*"));
        $query->sortby('createdon','ASC');
        $query->limit(25);

        if ($query->prepare() && $query->stmt->execute()) {
            $actions = $query->stmt->fetchAll(PDO::FETCH_ASSOC);
            return $actions;
        }
        return false;
    }

    public function addTask($action, $properties){
        if($action){
            $queue = $this->modx->newObject("taskQueueItem");
            $queue->set("action", $action);
            $queue->set("createdon", time());
            $queue->set("properties", $properties);
            if($queue->save()){
                return true;
            }else{
                return false;
            }
        }
    }

    public function clearQueue(){
        // очищаем задачи, которые висят более 30 мин
        $diff = time() - 1800;
        $query = $this->modx->newQuery("taskQueueItem");
        $query->where(array("processing:=" => 1, "AND:startedon:<" => date('Y-m-d H:i:s', $diff)));
        $query->select(array("taskQueueItem.*"));
        $query->sortby('createdon','ASC');
        if ($query->prepare() && $query->stmt->execute()) {
            $actions = $query->stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach($actions as $action){
                $queue = $this->modx->getObject("taskQueueItem", $action["id"]);
                $queue->set("startedon", "");
                $queue->set("processing", 0);
                $queue->save();
                if($this->log){
                    $this->sl->darttelegram->sendMessage("ERROR", "Подвисла задача из очереди {$action['action']} ({$action['id']})");
                }
            }
        }
    }

    public function checkProccessing($id){
        $action = $this->modx->getObject("taskQueueItem", $id);
        if($action){
            return $action->get("processing");
        }
        return false;
    }

    public function setProccessing($id){
        $action = $this->modx->getObject("taskQueueItem", $id);
        if($action){
            $action->set("processing", 1);
            $action->set("startedon", time());
            $action->save();
            return true;
        }
        return false;
    }

    public function setProccessed($id, $response = array()): bool
    {
        $action = $this->modx->getObject("taskQueueItem", $id);
        $this->toLog($id, $response);
        if($action){
            // $action->set("response", $response);
            // $action->set("finishedon", time());
            $action->set("processing", 0);
            $action->set("processed", 1);
            $action->save();
            $this->toLog($id, "Сохранил!");
            return true;
        }else{
            $this->toLog($id, "Не найдено!");
        }
        return false;
    }

    public function tolog($id, $data) {
        $this->modx->log(xPDO::LOG_LEVEL_ERROR, print_r($data, 1), array(
            'target' => 'FILE',
            'options' => array(
                'filename' => 'queue_'.$id.'.log'
            )
        ));
    }


}