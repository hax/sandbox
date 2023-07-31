import {fromURL} from "../lib/index.js"

const blob = fromURL("https://babelcloud.ai/Logo.png", {
    size: 2267, path: "./test/assets/babelcloud-ai-logo.png"
})

console.log(await blob.arrayBuffer())