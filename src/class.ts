// 抽象类 
abstract class Animal {
    eat() {
        console.log('eat')
    }
    abstract sleep():void // 抽象方法，不具体实现
}
// let animal = new Animal() 报错 只能被继承，而不能被实例化
class Dog extends Animal{
    constructor(name:string) { // 原型自带的方法
        super()
        this.name = name
    }
    name:string // 公有成员
   sleep() {
       console.log("dog sleep")
   } // 具体实现继承的抽象方法，没有则会报错
}

let dog = new Dog("wangcai");
dog.eat()

class Cat extends Animal {
    sleep() {
        console.log('Cat sleep')
    }
}
let cat = new Cat();
let animals:Animal[] = [dog,cat]
// 根据不同的类去调用同一个方法达到不同的实现效果
animals.forEach(i=>{
    i.sleep()
})

// 实现链式调用
class WorkFlow{
    step1() {
        return this;
    }
    step2() {
        return this;
    }
}
new WorkFlow().step1().step2()


interface Human {
    // 声明构造函数
    // new (name:string):void //报错，接口只能声明类的公有成员
    name: string;
    eat():void;
}

// 用关键字 implements 使类实现这个接口，
class Asian implements Human {
    constructor(name:string) {
        this.name = name;
    }
    // 必须实现接口声明的所有属性
    name:string
    // private name:string // 报错，因为接口声明的属性都是类的公有成员
    eat() {}
}

// 接口继承接口
interface Man extends Human {
    run():void
}

interface Child {
    cry():void
}

interface Boy extends Man,Child {}

let boy:Boy = {
    name:"",
    run() {},
    eat() {},
    cry() {}
}


// 接口继承类
class Auto {
    state = 1
    // private state2 = 0 // 类 C 将会报错，因为类 C 不是 Auto 的子类
}

// AutoInterface 继承 Auto 的所有属性，包括公有成员、私有成员、保护成员
interface AutoInterface extends Auto { 

}
// 类 C 必须声明 state 属性
class C implements AutoInterface {
    state = 1
}

// 类 Bus 不需声明 sate 因为继承了 Auto
class Bus extends Auto implements AutoInterface {

}