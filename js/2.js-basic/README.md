- [Introduction](#introduction)
- [Vai trò trong web](#vai-tr%c3%b2-trong-web)
- [Một số cú pháp cơ bản](#m%e1%bb%99t-s%e1%bb%91-c%c3%ba-ph%c3%a1p-c%c6%a1-b%e1%ba%a3n)
  - [Variable](#variable)
  - [Functions](#functions)
  - [Arrays](#arrays)
  - [Objects](#objects)
  - [Loop](#loop)

## Introduction

Các cách để chạy js:

- Cách 1: Để trong file html với tag **<script> </script>**
- Cách 2: Tạo một file riêng rồi dẫn đường dẫn trong file html đến file đó.
Ví dụ: Có một file "script.js". Khai báo trong index.html:

```html
<script src = "script.js"></script>
```

## Vai trò trong web

- HTML: thể hiện nội dung web (danh từ)
- CSS: thể hiện cách trình bày (tính từ)
- JS: thể hiện các hiệu ứng và phản hồi web (động từ)

**Các phiên bản JS**

ES5 -> ES6(2015) -> ES7(2016) -> ES8(2017)

## Một số cú pháp cơ bản

### [Variable](https://www.w3schools.com/js/js_variables.asp)

Lưu ý cách đặt tên biến:

- Tên các biến là duy nhất, không được đặt trùng
- Tên có thể bao gồm chữ cái, số, dấu gạch dưới, kí hiệu $
- Tên phải bắt đầu bằng chữ cái
- Tên cũng có thể bắt đầu bằng $ hay _, nhưng không khuyến khích điều này
- Có phân biệt chữ hoa thường
- Không được đặt tên biến là JavaScript

Một số lưu ý về cách sử dụng:

**- Có thể khai báo 1 lúc nhiều biến:**

```javascript
var person = "John Doe", carName = "Volvo", price = 200;

hoặc

var person = "John Doe",
carName = "Volvo",
price = 200;
```

**- Khai báo lại biến**

Khi khai báo lại biến thì giá trị được gán trước đó không bị mất đi.

Ví dụ:

```javascript
var carName = "Volvo";
var carName;
```

Giá trị carName lúc này vẫn là "Volvo".

**- Chuỗi và số**

Nếu khai báo một số trong cặp dấu nháy kép, thì các số còn lại cũng sẽ được xem như là chuỗi.

Ví dụ:

```javascript
var x = "5" + 2 + 3;
// Output = 523
```

```javascript
var x = 2 + 3 + "5";
// Output = 55
```

Một số câu lệnh tương tác:

```javascript
// In câu statement ra console
console.log(statement)
// Thông báo lên màn hình
alert(statement)
// Nhập input bằng prompt
input_value = prompt(statemnt)
```

### Functions

- Function declaration
  
```js
function name(param1, param2, param3, ...)
{
    // code to be executed
}
```

- Function expression

```js
var name = function(param1, param2, ...)
{
    //code to be executed
}
```

### Arrays

- Khởi tạo

```js
var array_name = [item1, item2, ...];
```

Ví dụ:

```js
var cars = ["Saab", "Volvo", "BMW"];
```

- Một số phương thức:

1. push and pop: để thêm phần tử và xóa phần tử
2. length: lấy độ dài
3. indexOf: lấy index của một giá trị
   
### Objects

- Giống map trong c++, dict trong python.
-Khởi tạo:

```js
var object_name =
{
    key1 : 'value1',
    key2 : 'value2',
    ...
}
```

- Các cách để lấy giá trị

```js
object_name.key1
object_name['key1']
```

- Viết method cho object

Ví dụ viết một method để tính tuổi

```js
var person =
{
    name: 'John',
    birthYear: 1990,
    family : ['father', 'mother']
    job: 'teacher'
    calAge: function()
    {
        this.age = 2018 - this.birthYears
    }
}
```

### Loop

- Có for và while

```js
for (var i = 0; i <= 10; i++)
{
    // code
}
```

- while: giống c++
