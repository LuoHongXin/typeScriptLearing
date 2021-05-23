// 原始类型
let bool: boolean = true
let num: number = 123
let str: string = 'abc'

// 数组
let arr1:number[] = [1,2,3]
let arr2:Array<number | string> = [1,2,3,'12']

// 元祖 限定元素的类型和个数
let tuple:[number,string] = [0,'1']

// 函数
let add = (x:number,y:number):number => x+y
let compite: (x:number,y:number) => number

// 对象
let obj:{x:number,y:number} = {x:1,y:2}
obj.x

// symbol 唯一
let s1:symbol = Symbol()
let s2 = Symbol()
console.log(s1 === s2)
