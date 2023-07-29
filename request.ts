import axios from 'axios'

function getData(url: string) {
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<(res: any)=> void>) => {
        console.log(target, propertyKey)
        const decoratedFnHandler = descriptor.value
        axios.get(url).then(res => {
            decoratedFnHandler?.({
                code: res.status,
                data: res.data,
            })
        }).catch(res => {
            decoratedFnHandler?.({
                code: res.status,
                data: res.data,
            })
        })
    }
}
class Request {
    @getData('https://www.typescriptlang.org/page-data/docs/handbook/utility-types.html/page-data.json')
    getList(res:any) {
        console.log(res)
    }
}