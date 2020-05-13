<?php
namespace AntdTag\ColumnType;

use Illuminate\Support\Str;
use Qscmf\Builder\ColumnType\ColumnType;
use Think\View;

class AntdTag extends ColumnType {

    public function build(array &$option, array $data, $listBuilder){
        $opt = array_merge([
            'name' => $option['name'],
            'tags' => $data[$option['name']]
        ], $option['value']);

        $view = new View();
        $view->assign('gid', Str::uuid());
        $view->assign('opt', $opt);
        return $view->fetch(__DIR__ . '/antdtag.html');
    }
}