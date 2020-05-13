import React from 'react';
import ReactDOM from 'react-dom';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class AntdTag extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            tags: props.tags,
            inputVisible: false,
            inputValue: '',
            editInputIndex: -1,
            editInputValue: '',
        };
    }

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag.id !== removedTag);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.findIndex((tag) => tag.text == inputValue) === -1) {
            let newTag = {
                id: '@' + inputValue,
                text: inputValue,
                editable: true,
                deletable: true
            };
            tags = [...tags, newTag];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    handleEditInputChange = e => {
        this.setState({ editInputValue: e.target.value });
    };

    handleEditInputConfirm = () => {
        this.setState(({ tags, editInputIndex, editInputValue }) => {
            const newTags = [...tags];
            newTags[editInputIndex].text = editInputValue;

            return {
                tags: newTags,
                editInputIndex: -1,
                editInputValue: '',
            };
        });
    };

    saveInputRef = input => (this.input = input);

    saveEditInputRef = input => (this.editInput = input);

    render() {
        const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
        return (
            <div>
                {tags.map((tag, index) => {
                    if (editInputIndex === index && tag.editable) {
                        return (
                            <Input
                                ref={this.saveEditInputRef}
                                key={tag.id}
                                size="small"
                                className="tag-input"
                                value={editInputValue}
                                onChange={this.handleEditInputChange}
                                onBlur={this.handleEditInputConfirm}
                                onPressEnter={this.handleEditInputConfirm}
                            />
                        );
                    }

                    const isLongTag = tag.text.length > 20;

                    const tagElem = (
                        <Tag
                            className="edit-tag"
                            key={tag.id}
                            closable={ tag.deletable }
                            onClose={() => this.handleClose(tag.id)}
                        >
              <span
                  onDoubleClick={e => {
                      if(tag.editable === true){
                          this.setState({ editInputIndex: index, editInputValue: tag.text }, () => {
                              this.editInput.focus();
                          });
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
                {inputVisible && this.props.createTag && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        className="tag-input"
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && this.props.createTag && (
                    <Tag className="site-tag-plus" onClick={this.showInput}>
                        <PlusOutlined /> New Tag
                    </Tag>
                )}
            </div>
        );
    }
}

function antdTag(id, opt){
    const defaultOpt = { tags: [], createTag: false};
    Object.assign(defaultOpt, opt);
    ReactDOM.render(<AntdTag tags={ defaultOpt.tags } createTag={ defaultOpt.createTag } />, document.getElementById(id));
}

window.antdTag = antdTag;