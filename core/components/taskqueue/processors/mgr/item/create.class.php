<?php

class taskQueueItemCreateProcessor extends modObjectCreateProcessor
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
        return parent::beforeSet();
    }

    /**
     * @return bool|string
     */
    public function beforeSave()
    {
        if($this->object->get('slaction')){
            $this->object->set('action', $this->object->get('slaction'));
        }
        if($this->object->get('properties')){
            // $this->modx->log(1, print_r($this->object->get('properties'), 1));
            $props = $this->object->get('properties');
            $this->object->set('properties', json_encode($props));
        }
        $this->object->set('createdby', $this->modx->user->get('id'));
        $this->object->set('createdon', time());

        return parent::beforeSave();
    }

}

return 'taskQueueItemCreateProcessor';