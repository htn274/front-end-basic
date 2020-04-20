## Sử dụng DOM (Document Object Manipulating)

Trong javascript, sử dung từ khoá **document**

- Đọc giá trị từ html object:

```js
var x = document.querySelector('id-in-html').textConent;
```

- Thay đổi giá trị text của một object:

```js
document.querySelector('id-in-html').textConent = value;
```

- Nếu muốn text đi kèm với định dạng html:
  - '#': id
  - '.': class

```js
document.querySelector('#id-in-html').innerHTML = '<b> html code </b>';
```

- Thay đổi CSS:

```js
document.querySelector('.class').style.property = value;
```

Example:

```js
document.querySelector('.dice').style.display = 'none';
```

## Xử lý sự kiện

- Callback function trong js: callback sẽ được gọi khi sự kiện xảy ra

```js
document.querySelector('object').addEventListener('event-name', call-back-function or anoymous-function);
```

- Anonymous function: không có tên hàm cho nên không thể dùng lại được.

```
document.querySelector('object').addEventListener('event-name', function(){
    // Do something here
});
```

Một cách khác để chọn element bằng id:

```js
document.getElementById('id');
```