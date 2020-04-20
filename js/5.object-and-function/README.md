# OOP in JS

- Function constructor

```js
var Object = function(param1, param2, ..)
{
    this.att1 = param1;
    this.att2 = param2;
    ...
    this.method1 = function(...)
    {
        ....
    }
}
```

- Tạo một instance:

```
var instance = new Object(...);
```

- Có thể sử dụng **prototype** để thêm method vào object constructor.

```js
Object.prototype.method = function()
{
    // Do something
}
```

- Phân biệt Object.create và Function Constructor: cả 2 cách đều tạo mới một object.
    - Object.create: tạo ra một instance của một object với prototype được định nghĩa sẵn được đưa vào như một tham số. Trả về một object mới.
    - Function constructor: Trả về một constructor của một object. Nếu muốn truy cập prototype của object thì phải thông qua Class.prototype.
  
## Primitives vs Objects

- Primitives(number, undefined, string, ...) để lưu giá trị
- Object (array, date, function...): là con trỏ trỏ đến giá trị của object. Nên khi copy hay gán bằng thì chỉ là việc gán một con trỏ khác trỏ vào object.

## First class functions:

- Function có thể được truyền vào như một tham số. Ví dụ: tham số gồm 1 array + function f, f sẽ được apply cho từng phần tử cho array tạo ra một mảng kết quả cùng độ dài với mảng ban đầu.
- Kết quả trả về của function có thể là một function khác.

## Imediately Ivoked Function Expressions (IFFE)

Có thể thực thi hàm ngay sau phần định nghĩa hàm, sau khi thực thi, hàm đó sẽ biến mất. Tức là ta không thể sử dụng lại hàm đó.

Ví dụ:

```js
(function testIIFE(name){
    console.log('Hello! ' + name);
}())
```

## Closures

```
Những hàm con nằm bên trong đều có quyền truy cấp vào các biên (variables) và tham số (paramters) của hàm bao bên ngoài nó, ngay cả khi hàm bên ngoài đã return.
```

Cơ chế: các thông tin về biến và các tham số của hàm được lưu vào stack và không bị lấy ra khi hàm return. Do vậy hàm bên trong vẫn có thể truy cập vào tài nguyên của các hàm bao bên ngoài.

### Js Toolbox: bind, call and aplly

**1. Call**: gán lại giá trị this trong một method bằng tham số đầu tiên

Ví dụ:

- John là object có method presentation.
- Emily là một object thường, chưa có method presentation.
- Khi đó, ta có thể dùng method presentation của John cho Emily như sau:

```js
john.presentation.call(emily, parameters[0], parameters[1], ...)
```

**2. Apply**: giống với call nhưng các tham số truyền dưới dạng mảng.

**3. Bind**: giống với call nhưng lúc này method sẽ không được thực thi ngay. Hệ thống sẽ tạo ra một bản sao của method và lưu trữ nó.
