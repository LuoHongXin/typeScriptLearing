// 四种定义函数类型的方式
// 直接在函数声明中定义函数类型
function add1 (x: number,y: number) {
    return x + y 
};
// 以下三种只是定义函数类型并没有声明实现
// 通过变量定义函数类型
let add2: (x:number, y:number) => number

// 类型别名定义函数类型
type add3 = (x:number,y:number) => number

// 接口定义函数类型
interface add4 {
    (x:number, y:number):number
}
// 函数调用时传参
// 可选传形参，必须在必选参数之后
function add5 (x:number,y?:number) {
    return y? x+y:x
}
// 默认初始值参数
function add6 (x:number,y=0,z:number,q=1) {
    return x + y + z + q
}
add6(1,undefined,3) // 必传参数前的默认参数必须要传一个值，后面的默认参数 q 可不传

// 不确定入参个数，剩余参数
function add7(x:number,...rest:number[]) {
    return x + rest.reduce((pre,cur) => pre + cur)
}
console.log(add7(1,2,3,4,5,6))

// 函数重载
// 函数重载，函数名称相同，但参数个数或类型不同
function add8(...rest:number[]):number;
function add8(...rest:string[]):string;
function add8(...rest:any[]):any {
    let first = rest[0];
    if (typeof first === 'string') {
        return rest.join('')
    }
    if (typeof first === 'number') {
        return rest.reduce((pre,cur) => pre + cur)
    }
}
console.log(add8(1,2,3))
console.log(add8('a','b','c'))

