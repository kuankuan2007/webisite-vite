import type { Plugin } from "vite"
import fs from "node:fs"
export default function (): Plugin{
    return {
        name: "ViteCustom404PagePlugin",
        configureServer(server){
            const BASEURL=server.config.base
            server.httpServer?.on("request", (req,res)=>{
                if (!("originalUrl" in req)){
                    return
                }if (typeof req.originalUrl !== "string"){
                    return
                }
                let path=req.originalUrl.split("?")[0]
                if (path.startsWith(BASEURL)){
                    path=path.slice(BASEURL.length)
                }
                if (path.startsWith("/")) {
                    path = "." + path
                }
                if (!path.startsWith("./")){
                    path="./"+path
                }
                if (!path.startsWith("./@") && req.url !== req.originalUrl && !(fs.existsSync(path) || fs.existsSync(path.replace('./','./public/')))){
                    console.info(`%c资源“${path}”(${req.originalUrl})不存在，将返回/404.html`,"color:yellow")
                    const data=fs.readFileSync("./404.html","utf-8")
                    res.statusCode = 404
                    try{
                        res.write(data)
                    }catch{
                        console.log("写入失败")
                    }
                }
            })
        }
    }
}