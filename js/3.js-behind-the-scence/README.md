# Hoisting, Variable Object (VO)

- Là việc sử dụng hàm trước khi khai báo.
- Hoisting không áp dụng cho function variable

Code bên dưới sẽ bị báo lỗi

```js
retirement(1990)
var retirement = function(year)
{
    // bla bla bla
}
```

Code chạy thành công

```js 
calAge(1990)

function calAge(year)
{
    console.log(2019 - year)
}
```

- Khi một file js khởi tạo sẽ trải qua 2 pha: pha khởi tạo và pha chạy code.
  - Ở pha khởi tạo: các hàm sẽ được duyệt qua và được lưu thông tin vào variable object bao gồm (pointer trỏ đến hàm, các tham số); các biến chỉ được lướt qua và được gán giá trị là 'undefined'.

# Scope chain

- Mỗi hàm được xem như 1 scope
- Scope chain: là khi các hàm được viết lồng vào nhau, do vậy các hàm con nằm trong hàm cha có thể sử dụng các biến trong hàm cha.

Ví dụ:

```js
function parent()
{
    var b = 'Hi';
    subfuncion();

    function subfunction()
    {
        c = 'Hello'
        console.log(b + c); //Result: HiHello
    }
}
```