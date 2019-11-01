function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import styles from './index.module.css';
console.log(styles);

var Draggable =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Draggable, _Component);

  function Draggable(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      uId: _this.guid()
    };
    return _this;
  }

  var _proto = Draggable.prototype;

  _proto.S4 = function S4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  };

  _proto.guid = function guid() {
    return this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4();
  } // 拖动事件
  ;

  _proto.domdrugstart = function domdrugstart(sort, code, uId, item, ee) {
    console.log('ee', ee);
    ee.dataTransfer.setData("sort", sort);
    ee.dataTransfer.setData("code", code);
    ee.dataTransfer.setData("uId", uId);
    ee.dataTransfer.setData("item", item);
  } // 拖动后鼠标进入另一个可接受区域
  ;

  _proto.dragenter = function dragenter(ee) {
    console.log('dragenter');

    if (ee.target.className.indexOf('droppedcontent') !== -1) {
      ee.target.className = styles.droppingContent;
    }
  } // a拖到b，离开b的时候触发
  ;

  _proto.dragleave = function dragleave(ee) {
    console.log('drageleave');

    if (ee.target.className.indexOf('droppingContent') !== -1) {
      ee.target.className = styles.droppedcontent;
    }
  } // 对象排序
  ;

  _proto.compare = function compare(key) {
    return function (obj1, obj2) {
      if (obj1[key] < obj2[key]) {
        return -1;
      } else if (obj1[key] > obj2[key]) {
        return 1;
      }

      return 0;
    };
  } // 当一个元素或是选中的文字被拖拽释放到一个有效的释放目标位置时
  ;

  _proto.drop = function drop(dropedSort, data, sortKey, dropedUid, codeKey, ee) {
    console.log('释放的时候', dropedSort, data, sortKey, dropedUid, codeKey);
    ee.preventDefault();
    var code = parseInt(ee.dataTransfer.getData("code"));
    var uId = ee.dataTransfer.getData("uId");
    var dragedItem = ee.dataTransfer.getData("item");
    var sort = parseInt(ee.dataTransfer.getData("sort"));

    if (uId === dropedUid) {
      if (sort < dropedSort) {
        data.map(function (item) {
          if (item[codeKey] === code) {
            item[sortKey] = dropedSort;
          } else if (item[sortKey] > sort && item[sortKey] < dropedSort + 1) {
            item[sortKey]--;
          }

          return item;
        }); // ee.target.before(document.getElementById(code))
      } else {
        data.map(function (item) {
          if (item[codeKey] === code) {
            item[sortKey] = dropedSort;
          } else if (item[sortKey] > dropedSort - 1 && item[sortKey] < sort) {
            item[sortKey]++;
          }

          return item;
        }); // ee.target.after(document.getElementById(code))
      }

      console.log(data);
    }

    if (this.props.onChange) {
      this.props.onChange(data);
    }

    this.setState({
      uId: this.guid()
    });

    if (ee.target.className.indexOf('droppingContent') !== -1) {
      ee.target.className = styles.droppedcontent;
    }
  };

  _proto.allowDrop = function allowDrop(ee) {
    if (ee.target.draggable) {
      ee.target.className = styles.droppingContent;
    }

    ee.preventDefault();
  } // 生成拖拽组件
  ;

  _proto.createDraggleComponent = function createDraggleComponent(data, sortKey, style, uId, render, codeKey) {
    var _this2 = this;

    var arr = data.sort(this.compare(sortKey));
    console.log(arr);
    return arr.map(function (item) {
      return React.createElement("div", {
        className: styles.droppedcontent,
        key: item[codeKey],
        draggable: true,
        onDragEnter: _this2.dragenter.bind(_this2),
        onDragLeave: _this2.dragleave.bind(_this2),
        onDragStart: _this2.domdrugstart.bind(_this2, item[sortKey], item[codeKey], uId, item),
        onDrop: _this2.drop.bind(_this2, item[sortKey], data, sortKey, uId, codeKey),
        onDragOver: _this2.allowDrop.bind(_this2),
        style: _objectSpread({}, style)
      }, render(item.node));
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        value = _this$props.value,
        sortKey = _this$props.sortKey,
        codeKey = _this$props.codeKey,
        style = _this$props.style,
        render = _this$props.render;
    var uId = this.state.uId;
    return React.createElement("div", null, React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }
    }, this.createDraggleComponent(value, sortKey, style, uId, render, codeKey)));
  };

  return Draggable;
}(Component);

export { Draggable as default };