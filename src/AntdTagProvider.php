<?php
namespace AntdTag;

use AntdTag\ColumnType\AntdTag;
use Bootstrap\Provider;
use Bootstrap\RegisterContainer;

class AntdTagProvider implements Provider {

    public function register(){
        RegisterContainer::registerListColumnType('antd_tags', AntdTag::class);
        RegisterContainer::registerFormItem('antd_tags', \AntdTag\FormType\AntdTag::class);

        RegisterContainer::registerHeadJs(__ROOT__. '/Public/antd-tag-bundle.js', true);
        RegisterContainer::registerSymLink(WWW_DIR . '/Public/antd-tag-bundle.js', __DIR__ . '/../js/dist/antd-tag-bundle.js');
    }
}