import {fs} from "node:fs/promises"


    const data= await fs.ReadFile("test.txt","utf-8")
    consol.log(data)
