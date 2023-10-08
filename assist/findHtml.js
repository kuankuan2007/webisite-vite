import fs from "node:fs"
import { resolve } from 'node:path'
const ignore=["node_modules",".git","dist","temp","public"]
export default function(){
    return dfsSearch(resolve('./'))
}
function dfsSearch(path) {
    const dirs = fs.readdirSync(path)
    let results = []
    for (const i of dirs) {
        if (ignore.includes(i)) continue
        const pathToNow = resolve(path, i)
        if (fs.lstatSync(pathToNow).isFile()) {
            if (i.endsWith(".html") || i.endsWith(".htm")) {
                results.push(pathToNow)
            }
        } else {
            results = results.concat(dfsSearch(pathToNow))
        }
    }
    return results
}