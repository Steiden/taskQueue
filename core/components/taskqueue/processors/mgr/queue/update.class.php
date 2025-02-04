<?php

class slQueueUpdateProcessor extends modObjectUpdateProcessor
{
    public $objectType = 'slQueue';
    public $classKey = 'slQueue';
    public $languageTopics = ['taskqueue'];
    //public $permission = 'save';


    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return bool|string
     */
    public function beforeSave()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        if($this->object->get('properties')){
            // $this->modx->log(1, print_r($this->object->get('properties'), 1));
            $props = $this->object->get('properties');
            $this->object->set('properties', json_encode($props));
        }

        if($this->object->get('slaction')){
            $this->object->set('action', $this->object->get('slaction'));
        }

        return true;
    }


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $id = (int)$this->getProperty('id');
        if (empty($id)) {
            return $this->modx->lexicon('taskqueue_export_file_status_err_ns');
        }

        return parent::beforeSet();
    }
}

return 'slQueueUpdateProcessor';
