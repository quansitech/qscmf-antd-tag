import React, { useState, useEffect, useRef } from 'react';
import {Input, Tag, Tooltip} from "antd";
import 'antd/lib/tooltip/style/index.css';
import 'antd/lib/tag/style/index.css';
import ReactDOM from "react-dom";
import { PlusOutlined } from '@ant-design/icons';
import "./index.css"

function AntdTag(props){
    const input = useRef(null);
    const editInput = useRef(null);
    const inputHidden = useRef(null);

    const [tags, setTags] = useState(props.tags);
    useEffect(() => {
       inputHidden.current.value = tags.map( tag => tag.id).join();
    }, [tags]);

    const [inputVisible, setInputVisible] = useState(false);
    useEffect(() => {
        if(inputVisible === true){
            input.current.focus();
        }
    }, [inputVisible]);

    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    useEffect(() => {
        if(editInputIndex !== -1){
            editInput.current.focus();
        }
    }, [editInputIndex]);
    const [editInputValue, setEditInputValue] = useState('');

    const handleClose = removedTag => {
        setTags(tags.filter(tag => tag.id !== removedTag));
    }

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = e => {
        setInputValue(e.target.value);
    }

    const handleInputConfirm = () => {
        if(inputValue && tags.findIndex((tag) => tag.text == inputValue) === -1){
            let newTag = {
                id: '@' + inputValue,
                text: inputValue,
                editable: true,
                deletable: true
            };
            setTags([...tags, newTag]);
        }
        setInputVisible(false);
        setInputValue('');
    }

    const handleEditInputChange = e => {
        setEditInputValue(e.target.value);
    }

    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex].id = '@' + editInputValue;
        newTags[editInputIndex].text = editInputValue;

        setTags(newTags);
        setEditInputIndex(-1);
        setEditInputValue('');
    }

    return (
        <div className="ant-tag-container">
            <input className="save" name={props.name + '[]' } type="hidden" ref={inputHidden} />
            {tags.map((tag, index) => {
                if (editInputIndex === index && tag.editable) {
                    return (
                        <Input
                            ref={editInput}
                            key={tag.id}
                            size="small"
                            className="tag-input"
                            value={editInputValue}
                            onChange={handleEditInputChange}
                            onBlur={handleEditInputConfirm}
                            onPressEnter={handleEditInputConfirm}
                        />
                    );
                }

                const isLongTag = tag.text.length > 20;

                const tagElem = (
                    <Tag
                        color="#2db7f5"
                        className="edit-tag"
                        key={tag.id}
                        closable={ tag.deletable }
                        onClose={() => handleClose(tag.id)}
                    >
              <span
                  onDoubleClick={e => {
                      if(tag.editable === true){
                          setEditInputIndex(index);
                          setEditInputValue(tag.text);
                      }
                      e.preventDefault();
                  }}
              >
                {isLongTag ? `${tag.text.slice(0, 20)}...` : tag.text}
              </span>
                    </Tag>
                );
                return isLongTag ? (
                    <Tooltip title={tag.text} key={tag.id}>
                        {tagElem}
                    </Tooltip>
                ) : (
                    tagElem
                );
            })}
            {inputVisible && props.createTag && (
                <Input
                    ref={input}
                    type="text"
                    size="small"
                    className="tag-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && props.createTag && (
                <Tag color="#f50"  className="site-tag-plus" onClick={showInput}>
                    <PlusOutlined /> { props.createTagBtnText }
                </Tag>
            )}
        </div>
    );
}

function antdTag(id, opt){
    const defaultOpt = { name: '', tags: [], createTag: false, createTagBtnText: 'New Tag'};
    Object.assign(defaultOpt, opt);
    ReactDOM.render(<AntdTag name={ defaultOpt.name } tags={ defaultOpt.tags } createTag={ defaultOpt.createTag } createTagBtnText={ defaultOpt.createTagBtnText } />, document.getElementById(id));
}

window.antdTag = antdTag;