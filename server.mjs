import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
const root=process.cwd(), port=Number(process.env.PORT||4173);
const types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".png":"image/png"};
createServer(async(req,res)=>{
  try{
    const raw=decodeURIComponent((req.url||"/").split("?")[0]);
    const rel=raw==="/"?"index.html":raw.replace(/^\/+/, "");
    const path=normalize(join(root,rel));
    if(!path.startsWith(root)){res.writeHead(403);res.end("Forbidden");return}
    const info=await stat(path);
    const file=info.isDirectory()?join(path,"index.html"):path;
    const data=await readFile(file);
    res.writeHead(200,{"content-type":types[extname(file)]||"application/octet-stream","cache-control":"no-store"});
    res.end(data);
  }catch{res.writeHead(404,{"content-type":"text/plain; charset=utf-8"});res.end("Not found")}
}).listen(port,"0.0.0.0",()=>console.log(`Frame8 preview on ${port}`));
