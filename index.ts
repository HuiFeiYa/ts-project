// @ts-ignore
const classDec: ClassDecorator = (constructor) => {
    console.log(constructor, constructor.prototype, constructor.name)
    // @ts-ignore
    return class extends constructor {
        reportingUrl = 'http://www'
    }
}

const propertyDec: (type: string) => PropertyDecorator = (type) => {
    console.log(type + '*'.repeat(10))
    return (target: any, propertyKey: string|symbol) => {
        console.log('-'.repeat(10), target, propertyKey)
    }
}

const methodDec: (v: boolean) => MethodDecorator = (value) => {
    console.log('enumerable', value)
    return  (target, propertyKey,descriptor) => {
        console.log('methodDec', target, propertyKey, descriptor)
        descriptor.enumerable = false
    }
}

const paramDec: ParameterDecorator = (target, propertyKey, parameterIndex) => {
    console.log('param', target, propertyKey, parameterIndex)
}

@classDec
class Person {
    @propertyDec('top')
    person = {
        age: 12
    }
    constructor() {

    }
    @methodDec(false)
    toString() {
        return this.person.toString()
    }
    getAge(@paramDec name: string) {

    }
}
const p1 = new Person()
console.log(Object.getOwnPropertyNames(Person.prototype))
// console.log(p1.person)