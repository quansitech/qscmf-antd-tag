# qscmf-antd-tag
antd tag 列表、表单组件

#### 安装

```php
composer require quansitech/qscmf-antd-tag
```

#### 截图
列表组件
<img src="https://user-images.githubusercontent.com/1665649/81764741-d4c04680-9504-11ea-8e79-96bc8c99db8f.png" />

表单组件
<img src="https://user-images.githubusercontent.com/1665649/81764842-0e914d00-9505-11ea-9365-2787282a7611.png" />

#### 用法
+ 组件基础
组件默认带hidden的input元素，input元素存着tag id序列，用逗号分隔。当使用列表保存或者表单提交，都会将这个隐藏input的数据提交到后端处理。

如果新增tag，tag id默认格式为 @ + tag名称， 如新增 test1，那么tag.id=@test1。 因此做业务处理时可判断有无@前缀来辨别是否新增的数据

+ 列表组件
```php
foreach($data_list as &$data){
    $ents = [
        [
          'openid' => 'openid1',
          'nickname' => '昵称1'
        ],
        [
          'openid' => 'openid2',
          'nickname' => '昵称2'
        ]
    ];
    $data['person'] = collect($ents)->map(function($item){
        return [
            'id' => $item['openid'],
            'text' => $item['nickname'],
            'deletable' => true, //是否可删除 默认为false 可省略
            'editable' => false //是否可修改 默认为false 可省略
        ];
    })->all();
}

$builder = new ListBuilder();
.
.
.
$builder->addTableColumn('person', '已绑定', 'antd_tags', ['createTag' => false])   //createTag 是否可新增tag 默认为false 可省略
->setTableDataList($data_list)
```

可配合listBuilder的保存功能，直接在表单去增删改tag，显著提高操作效率。

+ 表单组件
```php
$info['person'] = [
    [
        'id' => 1,
        'text' => '测试1',
        'deletable' => true, //是否可删除 默认为false 可省略
        'editable' => true //是否可修改 默认为false 可省略
    ],
    [
        'id' => 2,
        'text' => '测试2',
        'deletable' => true,
        'editable' => true
    ]
];

$builder = new FormBuilder();
$builder->addFormItem('person', 'antd_tags', '绑定用户', '', ['createTag' => true]) //createTag 是否可新增tag 默认为false 可省略
->setFormData($info);
```

