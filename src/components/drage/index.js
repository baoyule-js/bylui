import React, { Component } from 'react';
import styles from './index.module.css';
export default class Draggable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uId: this.guid()
        };
        this.items = props.value.map((each,index)=>{
            return{
                sortKey:index+1,
                codeKey:index+1,
                node:each
            }
        })
    }
    S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    guid() {
        return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
    }
    // 拖动事件
    domdrugstart(sort, code, uId, item, ee) {
        ee.dataTransfer.setData("sort", sort);
        ee.dataTransfer.setData("code", code);
        ee.dataTransfer.setData("uId", uId);
        ee.dataTransfer.setData("item", item);    
    }
    // 拖动后鼠标进入另一个可接受区域
    dragenter(ee) {
        if (ee.target.className.indexOf('droppedcontent') !== -1) {
            ee.target.className = styles.droppingContent;
        }
    }
    // a拖到b，离开b的时候触发
    dragleave(ee) {
        if (ee.target.className.indexOf('droppingContent') !== -1) {
            ee.target.className = styles.droppedcontent;
        }
    }
    // 对象排序
    compare(key) {
        return (obj1, obj2) => {
            if (obj1[key] < obj2[key]) {
                return -1;
            } else if (obj1[key] > obj2[key]) {
                return 1;
            }
            return 0
        }
    }
    // 当一个元素或是选中的文字被拖拽释放到一个有效的释放目标位置时
    drop(dropedSort, data, sortKey, dropedUid, codeKey, ee) {
        ee.preventDefault();
        const code = parseInt(ee.dataTransfer.getData("code"));
        const uId = ee.dataTransfer.getData("uId");
        const dragedItem = ee.dataTransfer.getData("item");
        const sort = parseInt(ee.dataTransfer.getData("sort"));
        if (uId === dropedUid) {
            if (sort < dropedSort) {
                data.map(item => {
                    if (item[codeKey] === code) {
                        item[sortKey] = dropedSort;
                    } else if (item[sortKey] > sort && item[sortKey] < dropedSort + 1) {
                        item[sortKey]--;
                    }
                    return item;
                });
            } else {
                data.map(item => {
                    if (item[codeKey] === code) {
                        item[sortKey] = dropedSort;
                    } else if (item[sortKey] > dropedSort - 1 && item[sortKey] < sort) {
                        item[sortKey]++; 
                    }
                    return item;
                });
            }
        }
        this.setState({uId: this.guid()});
        if (ee.target.className.indexOf('droppingContent') !== -1) {
            ee.target.className = styles.droppedcontent;
        }
        let arr = data.sort(this.compare('sortKey'));
        if(this.props.onChange){
            this.props.onChange(arr.map(each=>{
                return each.codeKey
            }))
        }

    }
    allowDrop(ee) {
        if(ee.target.draggable){
            ee.target.className = styles.droppingContent;    
        }
        ee.preventDefault();
       
    }
    // 生成拖拽组件
    createDraggleComponent(data, sortKey, style, uId, render, codeKey ) {   
        return data.map((item) => {
            return (
                <div
                    className={styles.droppedcontent}
                    key={item[codeKey]}
                    draggable={true}
                    onDragEnter={this.dragenter.bind(this)}
                    onDragLeave={this.dragleave.bind(this)}
                    onDragStart={this.domdrugstart.bind(this, item[sortKey], item[codeKey], uId, item)}
                    onDrop={this.drop.bind(this, item[sortKey], data, sortKey, uId,codeKey)}
                    onDragOver={this.allowDrop.bind(this)}
                    style={{ ...style }}>{render(item.node)}</div>
            )
        })
    }

    render() {
        const { style, render } = this.props;
        const { uId } = this.state;
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this.createDraggleComponent(this.items, 'sortKey', style, uId, render, 'codeKey')}
                </div>
            </div>
        )
    }
}

