## Asynchronous with Callbacks Hell

- Các webAPI thường dùng cơ chế bất đồng bộ (asynchronous): DOM event, settimeout, ...

**Ví dụ: Bất đồng bộ với callback**

```js
function getRecipe(){
    setTimeout(() => {
        const recipeID = [100, 200, 300];
        console.log(recipeID);
        setTimeout((id)=>{
            const recipe = {
                title: 'Abc',
                publisher : 'A'
            };
            console.log(`${id}: ${recipe.title}`);

            setTimeout((publisher) => {
                console.log(publisher);
            }, 1500, recipe.publisher);
        }, 1500, recipeID[2])
    }, 1500)
}
```

## From Callback Hell to Promise

**Định nghĩa Promise**

- Promise là object để lưu thông tin của một event để xem event đó đã xảy ra hay chưa.
- Promise sẽ quyết định chuyện gì xảy ra tiếp theo sau khi event được kích hoạt.
- Thực hiện công việc được chỉ định, sau khi event được kích hoạt.

**Các trạng thái của Promise**

- Pending: khi new Promise().
- Settled/ Resolved: khi event xảy ra.
- Fullfilled: Kết qủa trả về thành công.
- Rejected: Kết quả trả về thất bại.

**Template Promise**

```js
let promise_object = new Promise((resolve, reject) => {
    resolve(
        //The results returned when promise sucessfull
    )
    reject(
        //The results returned when promise failed
    )
})

promise_object.then( results_from_promise => {
    // Do something
}
)
```

**Ví dụ**

```js
const getIDs = new Promise((resolve, reject)=>{
    setTimeout(() => {
        const recipeID = [100, 200, 300];
        resolve(recipeID);
    }, 1500);
})

const getRecipe = recID => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const recipe = {
                title: 'Abc',
                publisher : 'A'
            };
            resolve(`${recID}: ${recipe.title}`);
        }, 1500, recID)
    })
}

const getPublisher = publisher=> {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(publisher);
        }, 1500, publisher)
    })
}

getIDs
.then(IDs=>{
    console.log(IDs);
    return getRecipe(IDs[2]);
})
.then(recipe => {
    console.log(recipe);
    return getPublisher('A');
})
.then(pub=>console.log(pub))
.catch(err=>console.log(err))
```

Ưu điểm của promise: Các chức callback lồng nhau được tách ra thành các phần riêng => dễ dàng hơn trong việc bảo trì và debug.

## async/ await

- Dùng để xử lý một promise thay vì dùng then.
- Kết quả của một async function là một promise mới.

** Ví dụ **

```js
async function recipeAW(){
    const IDs = await getIDs;
    console.log(IDs);
    const recipe = await getRecipe(IDs[2]);
    console.log(recipe);
    return 'A';
}

recipeAW().then(pub=>console.log(pub));
```

**Giải thích ví dụ**

- Khai báo **async function**: hàm này sẽ được chạy ở background.
- Dùng **await** để lấy kết quả của một promise.
- Vì kết quả trả về của hàm **recipeAW()** là một promise nên ta có thể dùng **then** để lấy kết quả promise thông thường.

## AJAX (Asynchronous Javascript And XML)

- Là cách mà front end và server gửi/nhận Http request.
- Sử dụng qua hàm **fetch**: hàm này sẽ trả về một promise.
- Để lấy kết quả từ **fetch** có thể dùng **then** hoặc **aynce/await**.