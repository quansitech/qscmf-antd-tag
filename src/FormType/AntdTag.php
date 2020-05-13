<?php
namespace AntdTag\FormType;

use Illuminate\Support\Str;
use Qscmf\Builder\FormType\FormType;
use Think\View;

class AntdTag implements FormType {

    public function build(array $form_type){
        $opt = array_merge([
            'name' => $form_type['name'],
            'tags' => $form_type['value'] ?: []
        ], $form_type['options'] ?: []);

        $view = new View();
        $view->assign('form', $form_type);
        $view->assign('gid', Str::uuid());
        $view->assign('opt', $opt);
        return $view->fetch(__DIR__ . '/antdtag.html');
    }
}