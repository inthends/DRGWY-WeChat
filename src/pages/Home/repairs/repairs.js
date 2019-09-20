import React from 'react';
import './repairs.css';
import { ImagePicker, WingBlank, SegmentedControl,List, Checkbox, Flex ,TextareaItem} from 'antd-mobile';
const data = [];
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
class Repairs extends React.Component {
    state = {
        files: data,
        multiple: false,
    };
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    };
    onChange2 = (val) => {
        console.log(val);
    }

    onChange3 = (val) => {
        console.log(val);
    }
    render() {
        const { files } = this.state;
        const data = [
            { value: 0, label: '报修' },
            { value: 1, label: '报事' },
            { value: 2, label: '投诉' },
            { value: 3, label: '建议' },
            { value: 4, label: '表扬' },
            { value: 5, label: '咨询' },
        ];
        return (
            <div className='repairs'>
                <List className='list'>
                    {data.map(i => (
                        <CheckboxItem key={i.value} onChange={() => this.onChange2(i.value)}>
                            {i.label}
                        </CheckboxItem>
                    ))}
                </List>

                <div className='TextareaItem'>
                    <TextareaItem
                        placeholder='请输入'
                        rows={5}
                        count={100}
                        onChange={this.onChange3}
                    />
                </div>
                <WingBlank>
                    <ImagePicker
                        files={files}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 7}
                        multiple={this.state.multiple}
                    />
                </WingBlank>

                <div className='btn-repa-cint'>
                    <button className='btn-repa' onClick={this.go}>设为默认</button>
                </div>
            </div>
        );
    }
}

export default Repairs;
