<?php
/** @var modX $modx */
/** @var $hook */

$modelPath = MODX_CORE_PATH . 'components/taskqueue/model/';
$success = $modx->addPackage('taskqueue', $modelPath);
if (!$success) {
    $modx->log(1, "Ошибка при подключении пакета taskqueue");
    return false;
}

$modx->log(1, "Сниппет очереди работает!");
$scriptProperties = $hook->formit->config;
if (!isset($scriptProperties)) {
    $modx->log(1, "Свойства формы еще не получены");
    return false;
}

// Получаем параметры из вызова сниппета
$snippet = $scriptProperties['snippet'];
$form = $scriptProperties['form'];
$hooks = $scriptProperties['hooks'];
$emailTpl = $scriptProperties['emailTpl'];
$emailSubject = $scriptProperties['emailSubject'];
$emailTo = $scriptProperties['emailTo'];
$emailFrom = $scriptProperties['emailFrom'];
$formName = $scriptProperties['formName'];
$validate = $scriptProperties['validate'];

$properties = $scriptProperties;
unset($properties['AjaxForm']);
unset($properties['hooks']);
unset($properties['validate']);

$hooksArray = explode(',', $hooks);
unset($hooksArray[array_search('FormHooksQueue', $hooksArray)]);

// Хуки на очередь
// toCRM,email,mailchimp
$hooksQueue = [
    'toCRM',
    'email',
    'mailchimp'
];

// Описания для хуков
$hooksDescription = [
    'toCRM' => 'Отправка в CRM',
    'email' => 'Отправка email',
    'mailchimp' => 'Отправка mailchimp'
];

// Добавление хуков в очередь
foreach ($hooksQueue as $hook) {
    $properties['hooks'] = $hook;

    $data = [
        'action' => 'hooks/' . $hook,
        'description' => $hooksDescription[$hook],
        'processing' => 0,
        'processed' => 0,
        'fixed' => 0,
        'properties' => json_encode($properties),
        'createdon' => date('Y-m-d H:i:s'),
        'createdby' => $modx->user->get('id'),
    ];

    if(!isset($properties['fields'])) continue;

    $queueItem = $modx->newObject('taskQueueItem', $data);

    if ($queueItem->save()) $modx->log(1, "Очередь на хук " . $hook . " добавлена!");
    else $modx->log(1, "Ошибка при добавлении очереди на хук " . $hook . ": " . $queueItem->getErrors());
}


// Преобразуем массив хуков в строку
$formItHooksString = implode(',', $hooksArray);
// Создаем массив параметров для FormIt
$formItProperties = [
    'form' => $form,
    'hooks' => $formItHooksString,
    'emailTpl' => $emailTpl,
    'emailSubject' => $emailSubject,
    'emailTo' => $emailTo,
    'emailFrom' => $emailFrom,
    'formName' => $formName,
    'validate' => $validate
];

// Вызываем FormIt с переданными параметрами
$output = $modx->runSnippet('FormIt', $formItProperties);

// Возвращаем результат работы FormIt
if ($output->success) return true;
else return false;