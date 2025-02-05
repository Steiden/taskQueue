<?php

class taskQueueItemGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'taskQueueItem';
    public $classKey = 'taskQueueItem';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    //public $permission = 'list';


    /**
     * We do a special check of permissions
     * because our objects is not an instances of modAccessibleObject
     *
     * @return boolean|string
     */
    public function beforeQuery()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @param xPDOQuery $c
     *
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $query = trim($this->getProperty('query'));
        if ($query) {
            $c->where([
                'action:LIKE' => "%{$query}%"
            ]);
        }

        return $c;
    }


    /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object)
    {
        $array = $object->toArray();
        $array['slaction'] = $array['action'];
        $array['properties'] = json_encode($array['properties']);
        $array['actions'] = [];

        // Edit
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-edit',
            'title' => $this->modx->lexicon('taskqueue_menu_update'),
            //'multiple' => $this->modx->lexicon('taskqueue_items_update'),
            'action' => 'updateQueue',
            'button' => true,
            'menu' => true,
        ];

        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('taskqueue_menu_remove'),
            'multiple' => $this->modx->lexicon('taskqueue_menu_remove'),
            'action' => 'removeQueue',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'taskQueueItemGetListProcessor';