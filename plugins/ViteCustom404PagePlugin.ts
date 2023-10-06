import type { Plugin } from "vite"
import fs from "node:fs"
export default function (): Plugin{
    return {
        name: "ViteCustom404PagePlugin",
        configureServer(server){
            server.httpServer?.on("request", (req,res)=>{
                if (!("originalUrl" in req)){
                    return
                }if (typeof req.originalUrl !== "string"){
                    return
                }
                if (req.url !== req.originalUrl && !fs.existsSync("." + req.originalUrl.split("?")[0])){
                    console.info(`%c资源“${req.originalUrl}”不存在，将返回/404.html`,"color:yellow")
                    const data=fs.readFileSync("./404.html","utf-8")
                    res.statusCode = 404
                    res.end(data)
                }
            })
        }
    }
}