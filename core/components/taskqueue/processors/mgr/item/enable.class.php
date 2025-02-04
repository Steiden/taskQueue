<?php

class taskQueueItemEnableProcessor extends modObjectProcessor
{
    public $objectType = 'taskQueueItem';
    public $classKey = 'taskQueueItem';
    public $languageTopics = ['taskqueue'];
    //public $permission = 'save';


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
            return $this->failure($this->modx->lexicon('taskqueue_item_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var taskQueueItem $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('taskqueue_item_err_nf'));
            }

            $object->set('active', true);
            $object->save();
        }

        return $this->success();
    }

}

return 'taskQueueItemEnableProcessor';
