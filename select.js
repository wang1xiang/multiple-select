const options = [{
  label: '121321321313131312312312321321',
  value: '1'
}, {
  label: '2',
  value: '12'
}, {
  label: '3',
  value: '123'
}]
const closeTag =
  '<svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>';
const selectShowClass = 'multiple-select__show';
const selectedClass = ' multiple-select__li--selected';
const selectedLiClass = 'multiple-select__li';
const content = document.querySelector('.multiple-select__ul');
const showDiv = document.querySelector(`.${selectShowClass}`);

const handleClick = e => {
  if (e.target.className.includes(selectShowClass) || e.target.parentElement?.className?.includes(selectShowClass)) return;
  if (!e.target.className.includes(selectedLiClass)) {
    content.style.display = 'none';
  }
}
window.addEventListener('click', handleClick);

// 点击删除 移除展示部分的html片段
const closeItem = (e, node) => {
  const value = e.parentElement.dataset.value;
  showDiv.innerHTML = showDiv.innerHTML.replace(e.parentElement.outerHTML, '');
  const selectValue = getValue();
  setValue(selectValue)
}

showDiv.onclick = e => {
  // 点击x号时 不执行打开操作
  if (typeof e.target.className === 'object') return;
  const display = window.getComputedStyle(content).display;
  content.style.display = display === 'none' ? 'block' : 'none';
}
const renderItem = (value, label) =>
  `<div class="multiple-select__show--item" data-value="${value}"><span>${label}</span><span onclick="closeItem(this)">${closeTag}</span></div>`;
document.querySelectorAll(`.${selectedLiClass}`).forEach(node => {
  node.onclick = e => {
    const classes = e.target.className;
    const item = renderItem(e.target.dataset.value, e.target.innerText);
    if (classes.includes(selectedClass)) {
      e.target.className = classes.replace(selectedClass, '');
      showDiv.innerHTML = showDiv.innerHTML.replace(item, '');
    } else {
      e.target.className = classes + selectedClass;
      showDiv.innerHTML = showDiv.innerHTML + item;
    }
  }
})
// 设置值 同时将div和下拉框中的已选属性样式更改
const setValue = (selectValue) => {
  document.querySelectorAll(`.${selectedLiClass}`).forEach(node => {
    const classes = node.className;
    if (selectValue.includes(node.dataset.value)) {
      // 重复打开时只要已选中状态 不执行下面的赋值操作
      if (classes.includes(selectedClass)) return;
      const item = options.find(o => o.value === node.dataset.value);
      const html = renderItem(item.value, item.label);
      node.className = classes + selectedClass;
      showDiv.innerHTML = showDiv.innerHTML + html;
    } else {
      node.className = classes.replace(selectedClass, '');
    }
  })
}
// 获取值
const getValue = () => {
  const selectValue = [];
  showDiv.childNodes.forEach(node => selectValue.push(node.dataset.value));
  return selectValue;
}