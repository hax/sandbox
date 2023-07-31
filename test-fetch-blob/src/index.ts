import {Blob} from "fetch-blob"
import {createReadStream, createWriteStream, existsSync} from "node:fs"
import {stat} from "node:fs/promises"
import {Readable} from "node:stream"

export function fromURL(
  url: string, 
  options: {
    size: number,
    type: string,
    path: string,
  },
) {
  return new Blob([new BlobDataItem(url, options) as any])
}

class BlobDataItem {
    size: number
    originalSize: number
    #url: string
    #path: string
    #start: number
  
    constructor (
      url: string, 
      options: {
        size: number, 
        path: string, 
        start?: number, 
        originalSize?: number,
      }
    ) {
      this.#url = url
      this.#path = options.path
      this.#start = options.start ?? 0
      this.size = options.size
      this.originalSize = options.originalSize ?? options.size
    }
  
    /**
     * Slicing arguments is first validated and formatted
     * to not be out of range by Blob.prototype.slice
     */
    slice (start: number, end: number) {
      return new BlobDataItem(this.#url, {
        path: this.#path,
        originalSize: this.originalSize,
        size: end - start,
        start: this.#start + start
      })
    }
  
    async * stream () {
      if (!existsSync(this.#path)) {
        const file = createWriteStream(this.#path)
        const downloaded = new Promise((resolve, reject) => {
          file.once("finish", resolve)
          file.once("error", reject)
        })
        const resp = await fetch(this.#url)
        Readable.fromWeb(resp.body as any).pipe(file)
        await downloaded
      }
      
      const { size } = await stat(this.#path)
  
      if (this.originalSize !== size) {
        throw new DOMException('The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.', 'NotReadableError')
      }
  
      yield * createReadStream(this.#path, {
        start: this.#start,
        end: this.#start + this.size - 1
      })
    }
  
    get [Symbol.toStringTag] () {
      return 'Blob'
    }
  }
