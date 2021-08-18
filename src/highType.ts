// 高级类型
// 1）交叉类型与联合类型
// 2）索引类型
// 3）映射类型
// 4）条件类型

// 交叉类型（将多个类型合并成一个类型,类型的并集）
interface Doginterface {
    run(): void
}
interface Catinterface {
    jump(): void
}
let pet: Doginterface & Catinterface = {
    run() { },
    jump() { }
}

// 联合类型（可能的多个类型中的一个）
let a: number | string = 'a'
// 限制取值范围
let b: 'a' | 'b' | 'c';

// 索引类型
// 引出问题：
let htobj = {
    a: 1,
    b: 2,
    c: 3
}
function getValues(obj: any, keys: string[]) {
    return keys.map(key => obj[key])
}
console.log(getValues(htobj, ['e', 'f'])) // obj明明没有e和f却没报错

// 改造后
function getValues2<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
    return keys.map(key => obj[key])
}
console.log(getValues2(htobj, ['e', 'f'])) // 报错:不能将类型“"e"”分配给类型“"a" | "b" | "c"”

// 条件类型
//  T extends U ? X:Y
type TypeName<T> = T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "Function" :
    "object"

type T1 = TypeName<string> // string
type T2 = TypeName<string[]> // object
type T3 = TypeName<string | string[]> // "string" | "object"

//  (A|B) extends U ? X:Y
type Diff<T, U> = T extends U ? never : T

type T4 = Diff<"a" | "b" | "c", "a" | "e"> // "b" | "c"