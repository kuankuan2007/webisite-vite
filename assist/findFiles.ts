import fs from "node:fs"
import { resolve } from 'node:path'
const ignore = ["node_modules", ".git", "dist", "temp", "public", "dev-only", "modifiedPackage"]

export function dfsSearch(path: string, isTarget: (args0: string) => boolean) {
    const dirs = fs.readdirSync(path)
    let results: Array<string> = []
    for (const i of dirs) {
        if (ignore.includes(i)) continue
        const pathToNow = resolve(path, i)
        if (fs.lstatSync(pathToNow).isFile()) {
            if (isTarget(pathToNow)) {
                results.push(pathToNow)
            }
        } else {
            results = results.concat(dfsSearch(pathToNow,isTarget))
        }
    }
    return results
}