/*
// Function constructor

// var john = {
//     name: 'John',
//     yearOrBirth: 1990,
//     job: 'teacher'
// };

var Person = function(name, yearOfBirth, job)
{
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}
// prototype 
Person.prototype.caculateAge = function()
{
    console.log(2016 - this.yearOfBirth);
}

// instance
var john = new Person('John', 1990, 'teacher');

john.caculateAge();

var personProto = {
    caculateAge: function()
    {
        console.log(2016 - this.yearOfBirth);
    }
}

var john = Object.create(personProto);
*/

// Primitives and Objects 


// Primitive
// var a = 46;
// var b = a;
// a = 23;
// console.log('a = ' + a)
// console.log('b = ' + b)

// Object
// var obj1 = {
//     name : 'John',
//     age: 26
// };
// var obj2 = obj1;
// obj1.age = 30;
// console.log(obj1.age)
// console.log(obj2.age)

// Function
// var age = 27;
// var obj = {
//     name: 'Jonas',
//     city: 'ST'
// };

// function change(a, b)
// {
//     a = 30;
//     b.city = 'San'
// }

// change(age, obj);

// console.log(age) //27
// console.log(obj.city) //'San'


// Passing Function as argument
// Function are object in js

// var years = [1990, 1965, 1937, 2005, 1998];

// function arrayCalc(arr, fn)
// {
//     var arrRes = [];
//     for (var i = 0; i < arr.length; i++)
//     {
//         arrRes.push(fn(arr[i]))
//     }
//     return arrRes;
// }

// function caculateAge(year)
// {
//     return 2019 - year;
// }

// var ages = arrayCalc(years, caculateAge);

// console.log(ages);

// IIFEs 

// function say()
// {
//     console.log('Hello');
// }

// var f = (function testIIFE(name){
//     console.log('Hello! ' + name);
// }())

// Closures

// function retirement(retirementAge)
// {
//     a = ' years left until retirement';
//     return function(yearOfBirth){
//         var age = 2016 - yearOfBirth;
//         console.log((retirementAge - age) + a);
//     }
// }

// var retirementUS = retirement(66)

// retirementUS(1990);

// Coding challenge

// (function()
// {
//     function Question(question, answers, correct)
// {
//     this.question = question;
//     this.answers = answers;
//     this.correct = correct;
// }

// Question.prototype.displayQuestion = (function()
// {
//     console.log(this.question);

//     for (var i = 0; i < this.answers.length; i++)
//     {
//         console.log(i + ':' + this.answers[i])
//     }
// });

// Question.prototype.checkAnswer = (function(ans, callback)
// {
//     var sc;
//     if (this.correct == ans)
//     {
//         console.log('Correct!');
//         // This is score() function
//         sc = callback(true);
//     }
//     else
//     {
//         console.log('Failed!');
//         sc = callback(false);
//     }
//     this.displayScore(sc);
// }
// )

// Question.prototype.displayScore = (function(score)
// {
//     console.log('Current score: ' + score);
//     console.log('----------------------------');
// })

// var q1 = new Question('Who am I?', ['Nu', 'Nu1'], 0)
// var q2 = new Question('1 + 1 = ?', [2, 3, 4], 0)
// questionCollection = [q1, q2]

// function score()
// {
//     var sc = 0;
//     return function(correct)
//     {
//         if (correct)
//             sc++;
//         return sc;
//     }
// }

// var keepScore = score();

// function nextQuestion()
    // {
    //     randomNumber = Math.floor(Math.random() * questionCollection.length);
    //     randomQuestion = questionCollection[randomNumber];
    //     randomQuestion.displayQuestion();

    //     var userAnswer = prompt('Enter your answer?');

    //     console.log('User answers: ' + userAnswer);
    //     if (userAnswer != "exit")
    //     {
    //         randomQuestion.checkAnswer(parseInt(userAnswer), keepScore);
    //         nextQuestion();
    //     }
    //     else
    //     {
    //         console.log('Total score :' + keepScore(false));
    //     }
    // }

    // nextQuestion();
    // }())

