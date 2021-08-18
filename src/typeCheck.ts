// 类型检查机制
/**
 * Typescript 编译器在做类型检查时，所秉承的一些原则，以及表现出的一些行为。
 * 作用：辅助开发，提高开发效率
 * - 类型推断
 * - 类型兼容性
 * - 类型保护
*/

// 类型推断
/**
 * 不需要指定变量的类型（函数的返回值类型），Typescript 可以根据某些规则自动地为其推断出一个类型。
 * - 基础类型推断（从右到左推断）
 *   不设默认值则为 any 类型，设默认值时就推断为默认值类型
 * - 最佳通用类型推断
 * - 上下文类型推断
*/
// 上下文类型推断
window.onkeydown = (event:KeyboardEvent) => {
    console.log(event)
}

// 类型兼容性
/**
 * 当一个类型 Y 可以被赋值给另一个类型 X 时，我们就可以说类型 X 兼容类型 Y
 * X 兼容 Y:X（目标类型）= Y（源类型）
*/
enum Type {Strong, Week}
class Java {
    helloJava() {
        console.log('Hello Java')
    }
    java:any=1
}

class JavaScript {
    helloJavaScript() {
        console.log('Hello JavaScript')
    }
    JavasScript:any='1'
}

function getLanguage(type: Type, x:string | number) {
    let lang = type === Type.Strong ? new Java() : new JavaScript()
    // if(lang.helloJava) { // 报错，因为是两个类的联合类型
    //    lang.helloJava
    // }
    if((lang as Java).helloJava) { // 用类型断言解决报错，但是麻烦
        (lang as Java).helloJava()
     }
     // 用类型断言解决报错，但是麻烦
     if((lang as Java).helloJava) { 
        (lang as Java).helloJava
     }
     // 类型保护
     //1) instanceof
     if(lang instanceof Java) {
         lang.helloJava()
     } else {
         lang.helloJavaScript()
     }
     // 2) in 判断某个属性是不是在对象中
     if ('java' in lang) {
         lang.helloJava()
     } else {
         lang.helloJavaScript()
     }
     // 3) typeof
     if (typeof x === 'string') {
         x.length
     } else { // 为number类型
         x.toFixed(2)
     }
     console.log(isJava(lang),999)
}
function isJava(lang:Java | JavaScript):lang is Java {
    return (lang as Java).helloJava !== undefined
}
getLanguage(Type.Week,1)
getLanguage(Type.Strong,1)