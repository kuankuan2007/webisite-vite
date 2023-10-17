import type { Plugin } from "vite"
import fs from "node:fs"
export default function (): Plugin{
    return {
        name: "ViteCustom404PagePlugin",
        configureServer(server){
            const BASEURL=server.config.base
            server.httpServer?.prependListener("request", (req, res) => {
                res._KKend=res.end
                res.end=(...args) =>{
                    if (res.statusCode === 404 && !/\.[^/]+/.test(res.req.url)){
                        res.setHeader("Content-Type", "text/html; charset=utf-8")
                        res.write(fs.readFileSync("./404.html", "utf-8"))
                    }
                    res._KKend(...args)
                }
            })
            return
        }
    }
}