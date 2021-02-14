export function parse(value ='') {
    console.log(value)
    if(value.startsWith('=')) {
        try {
            return eval(value.slice(1))//'+++++'
        } catch (e) {
            return value
            //console.log("Skipping parse error: ", e.message)
        }
    }
    return value
}