# Some note about ES6/ES2015


  - [let and const:](#let-and-const)
  - [String trong es6](#string-trong-es6)
  - [Arrow function](#arrow-function)
  - [Destructuring](#destructuring)
  - [Arrays](#arrays)
  - [Spread Operator](#spread-operator)
  - [Rest parameter](#rest-parameter)

## let and const:

- Sự khác biêt giữa var và let/const:
  - var: biến có hiệu lực trong function
  - let/const: có hiệu lực trong một block (giống với c++). const để khai báo hằng số.

## String trong es6

- Được hỗ trợ nhiều hàm hơn
- Cách để kết hợp nhiều string:
Ví dụ:

- Trong ES5:

```js
str = "This is " + name + ". He is " + old + " years old.";
```

- Trong ES6:

```js
str = `This is ${name}. He is ${old} years old.`;
```

## Arrow function

Các cách để thực hiên 1 hàm cho các phần tử trong mảng.

Ví dụ:

Ta có 1 mảng:

years = [1995, 1998, 1997, 2000]

- ES5:

```js
var ages = years.map(function(el){
    return 2019 - el;
})
// Trả về một mảng chứa các giá trị được tính như công thức
```

- ES6:

```js
// Cách 1:

let ages = years.map(el => 2019 - el);

// Cách 2:

ages = years.map((el, index) => `Age at ${index + 1} is ${2019 - el}`);

// Cách 3:
ages = years.map((el, index) => {
    // Do something
    return ...;
})
```

- Arrow function có thể share this với ngữ cảnh bao ngoài nó.

## Destructuring 

- Có thể phân rã cấu trúc của một object hoặc một mảng ra thành nhiều biến

Ví dụ:

```js
// Đối với mảng
const [name, age] = ['John', 26]

// Đối với **obj**
const obj = {
    name: 'John',
    age:26
};

const {name, age} = obj;
// name và age trùng với thuộc tính của object đó.
// Còn nếu muốn đổi tên thì có thể dùng cú pháp sau

const {name: a, age: b} = obj
// Khi này a = giá trị name, b = giá trị age
```

- Sử dụng: trong es5, khi muốn function trả về nhiều thông tin, ta thường gói nó trong 1 object. Còn đối với ES6 ta có thể dùng kĩ thuật destructuring.

```js
function calAge(year){
    const age = 2019 - year;
    return [age, 65 - age];
}

const [age, retiremnet] = calAge(1990);
```

## Arrays

- Chuyển một obj thành array:

```js
arrObj = Array.from(obj);
arrObj.forEach(el => {
    // Do something
})
```

- For từng phần tử trong array thay vì lấy chỉ số:

```js
for (const cur of ArrObj){
    // Do something
}
```

- findIndex(cur => condition): trả về các index thỏa mãn điều kiện nào đó.
- find(cur => condition): trả về giá trị của mảng thỏa mãn điều kiện nào đó.

## Spread Operator

- Kí hiệu: Dấu ba chấm "..." + array
- Ý nghĩa: sử dụng để nối các mảng vào 1 mảng lớn hơn. Cụ thể, chia mảng đi sau thành những phần tử riêng biệt rồi đưa nó vào 1 hàm.

## Rest parameter

- Ý nghĩa: ngược lại với spread operator; nó sẽ nhận vào các giá trị và trả về mảng chứa các giá trị đó khi ta gọi 1 function với nhiều parameter.
- Cách thực hiện: sử dụng spread operator trong khai báo argument để định nghĩa function.

Ví dụ:

```js
function calAge(...years)
{
    return years.map(el => 2019 - el);
}

calAge(1990, 2000, 1998);
```

## Default parameter

ES2015 cho phép khởi tạo các giá trị mặc định trong hàm.

Ví dụ:

```js
function Person(firstName, lastName = 'Smith', nationality = 'Vietnamese')
{
    this.firstname = firstName;
    this.lastname = lastName;
    this.nationality = nationality;
}
```

## Maps

### Init map

```js
map = new Map()
Map.set(key, value)
```

Key trong map có thể là bất cứ kiểu dữ liệu nào: number, string, boolean

### Lấy giá trị bằng key

```js
value = map.get(key)
```

### Loop through map

```js
// Cách 1
map.forEach((value, key) => {
    // Do something
})

// Cách 2

for (let [key, value] of map.entries())
{
    // Do something
}
```

**Một số ưu điểm của Maps so với Object**

- Kiểu dữ liệu của keys đã dạng.
- Có thể biết được kích thước của maps thông qua map.size().
- Có thể loop qua map.

## Class

### Constructor

```js
class Person(name, age, address)
{
    constructor (name, age, address)
    {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    printInfo()
    {
        // Do something
    }
}
```

### Static method

Khi thêm từ khóa **static** và trước các method, khi đó method đó không được kế thừa ở các class con.

### Inheritance

```js
class Dev extend Person {
    constructor (name, age, address, programming_language)
    {
        super(name, age, address);
        this.programming_language = this.programming_language;
    }
}
```