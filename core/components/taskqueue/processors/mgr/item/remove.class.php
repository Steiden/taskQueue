<?php

class taskQueueItemRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'taskQueueItem';
    public $classKey = 'taskQueueItem';
    public $languageTopics = ['taskqueue'];
    //public $permission = 'remove';


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('taskqueue_queue_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var taskQueueItem $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('taskqueue_queue_err_nf'));
            }

            $object->remove();
        }

        return $this->success();
    }

}

return 'taskQueueItemRemoveProcessor';