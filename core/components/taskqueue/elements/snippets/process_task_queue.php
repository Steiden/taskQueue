<?php
/** @var modx $modx */

try {
    $modelPath = MODX_CORE_PATH . 'components/taskqueue/model/';
    $success = $modx->addPackage('taskqueue', $modelPath);
    if (!$success) {
        $modx->log(1, "Не удалось загрузить пакет taskqueue.");
        return "Ошибка: Не удалось загрузить пакет taskqueue.";
    }

    // Получаем задачи из очереди
    $c = $modx->newQuery('taskQueueItem');
    $c->where([
        'processing' => 0,
        'processed' => 0,
        'fixed' => 0
    ]);
    $c->limit(25);

    $tasks = $modx->getCollection('taskQueueItem', $c);
    if (empty($tasks)) {
        $modx->log(1, "Нет задач для выполнения.");
        return "Нет задач для выполнения.";
    }
    $modx->log(1, "Количество задач: " . count($tasks));

    foreach ($tasks as $task) {
        $properties = $task->get('properties');
        $action = $task->get('action');
        $properties['successMessage'] = 'Форма успешно отправлена';

        // Логируем параметры задачи
        $modx->log(1, "Задача ID: " . $task->get('id') . ", Действие: " . $action);
        $modx->log(1, "Параметры: " . print_r($properties, 1));

        // Обновляем статус задачи на обработку
        $task->set('processing', 1);
        $task->set('startedon', date('Y-m-d H:i:s'));
        $task->save();


        try {
            $result = null;

            switch ($action) {
                case 'hooks/email':
                case 'hooks/spam':
                    $result = $modx->runSnippet('FormIt', $properties);
                    break;
                default:
                    $modx->log(1, "Неизвестное действие: " . $action);
                    $result = false;
                    break;
            }

            // Результат вызова сниппета
            $modx->log(1, "Результат вызова сниппета: " . print_r($result, 1));

            if ($result !== false) {
                // Обновляем статус задачи на завершённое
                $task->set('processing', 0);
                $task->set('processed', 1);
                $task->set('finishedon', date('Y-m-d H:i:s'));
                $task->set('response', $result);
                $task->save();
                $modx->log(1, "Задача " . $task->get('id') . " успешно выполнена.");
            } else {
                // Обновляем статус задачи на ошибку
                $task->set('processing', 0);
                $task->set('fixed', 1);
                $task->set('finishedon', date('Y-m-d H:i:s'));
                $task->set('response', "Ошибка выполнения задачи.");
                $task->save();
                $modx->log(1, "Ошибка выполнения задачи " . $task->get('id') . ": " . $result);
            }
        } catch (Exception $e) {
            // Обновляем статус задачи на ошибку
            $task->set('processing', 0);
            $task->set('fixed', 1);
            $task->set('finishedon', date('Y-m-d H:i:s'));
            $task->set('response', "Исключение: " . $e->getMessage());
            $task->save();
            $modx->log(1, "Исключение при выполнении задачи " . $task->get('id') . ": " . $e->getMessage());
        }
    }

    return "Задачи успешно обработаны.";
} catch (Exception $e) {
    return "Ошибка при обработке задач: " . $e->getMessage();
}