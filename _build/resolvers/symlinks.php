<?php
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;

    $dev = MODX_BASE_PATH . 'Extras/taskQueue/';
    /** @var xPDOCacheManager $cache */
    $cache = $modx->getCacheManager();
    if (file_exists($dev) && $cache) {
        if (!is_link($dev . 'assets/components/taskqueue')) {
            $cache->deleteTree(
                $dev . 'assets/components/taskqueue/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_ASSETS_PATH . 'components/taskqueue/', $dev . 'assets/components/taskqueue');
        }
        if (!is_link($dev . 'core/components/taskqueue')) {
            $cache->deleteTree(
                $dev . 'core/components/taskqueue/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_CORE_PATH . 'components/taskqueue/', $dev . 'core/components/taskqueue');
        }
    }
}

return true;