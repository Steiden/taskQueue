<?php

class taskQueueOfficeItemCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'taskQueueItem';
    public $classKey = 'taskQueueItem';
    public $languageTopics = ['taskqueue'];
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('name'));
        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('taskqueue_item_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['name' => $name])) {
            $this->modx->error->addField('name', $this->modx->lexicon('taskqueue_item_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'taskQueueOfficeItemCreateProcessor';