// 泛型：不预先确定的数据类型，具体的类型在使用的时候才能确定。 

// function log(value:string):string {
//     console.log(value);
//     return value;
// }
/**
 * 将以上打印函数兼容 string[] 可打印字符串数组
*/

// 方法一：函数重载
// function log(value:string):string;
// function log(value:string[]):string[];
// function log(value:any) {
//     console.log(value)
//     return value
// }

// 方法二：联合类型
// function log (value:string | string[]):string | string[] {
//     console.log(value);
//     return value;
// }

//方法三：泛型 在函数名称后加个 <> 动态定义类型
// 这个 T 类似一个变量，在调用函数时才传入类型
// function log<T>(value:T):T {
//     console.log(value)
//     return value
// }
// log<string[]>(["a","b"]) // 调用时可直接定义类型
// log(["1","2"]) // 或不声明类型，直接传入形参，以形参类型作为声明的类型，推荐


// 泛型不仅可以定义函数（如上），还可以定义函数类型
// type Log = <T>(value:T)=>T // 定义函数类型 Log 自定义 入参类型 T ,返参也是 类型T
// // 用函数类型 Log 声明函数
// let myLog:Log = <Number>(value:Number):Number=> {
//     console.log(value)
//     return value
// }
// myLog(123)

// 泛型约束接口中的一个函数
// interface InterLog {
//     <T>(value:T):T
// }
// // 泛型约束接口所有成员,并指定默认的类型为 string
// interface InterLog2<T = string> {
//     (value:T):T
// }
// let myLog2:InterLog2 = function(value:string):string {
//     console.log(value)
//     return value
// };
// myLog2("132")

// 泛型类 (泛型不能用于类的静态成员)
// class Log<T> {
//     run(value:T) {
//         console.log(value);
//         return value
//     }
//     // static run2(value:T) {console.log(value)} // 静态成员不能引用类类型参数
// }
// let log1 = new Log<number>()
// log1.run(123); // 只能输入number类型
// let log2 = new Log(); // 不指定类型的时候可以输入任意的值
// log2.run(111);
// log2.run("aaa");


// 泛型约束
// 若想打印输入值的某个属性，需要对泛型 T 进行约束
// function log<T>(value:T):T {
//     console.log(value.length) // 类型“T”上不存在属性“length”
//     return value;
// }
interface Length { 
    length:number
}
function log2<T extends Length>(value:T):T {
    console.log(value.length) // T 类型继承了接口 Length 后，约束必须有 length 属性
    return value;
}
log2([1]);
log2("123");
log2({length:1});