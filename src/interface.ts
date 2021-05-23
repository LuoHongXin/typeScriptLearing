interface List {
    id: number,
    name:string,
    [x:string]:any; // 可能有多一个参数,不确定接口是否有多的参数
    age?:number // 可选属性
}

interface Result {
    data:List[]
}

function render(result:Result) {
    result.data.forEach(value=>{
        console.log(value.id,value.name)
    })
}
// 假设从后端得到的数据
let result = {
    data:[
        {id:1,name:"A"},
        {id:2,name:"B"},
    ]
}
render(result)
interface aa {
    (a:number,b:number):number
}
let AA:aa = (a,b)=>{
    console.log(a+b)
    return a+b
}
AA(1,2)
// 混合类型接口
interface Lib {
    ():void;
    version:string;
    doSomething():void;
}
function getLib() {
    let lib:Lib = (()=>{}) as Lib;
    lib.version = '1.0';
    lib.doSomething=() => {}
    return lib
}