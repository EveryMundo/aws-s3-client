const S3 = require('./lib/clients/s3')

const etags = {}

S3.prototype.getObjectIfContentHasChanged = async function(params) {
  const s3Uri = `s3://${params.Bucket}/${params.Key}`

  if (etags[s3Uri]) {
    try {
      const { ETag } = await this.headObject(params).promise()

      if (ETag === etags[s3Uri]) return false
    } catch (e) {
      console.error(e.message)
    }
  }

  const res = await this.getObject(params).promise()

  console.log({Etag: res.ETag, s3Uri})
  etags[s3Uri] = res.ETag

  return res
}

const exportObject = {
  S3,
  get s3Client() {
    console.log('creating s3Client')

    const s3Client = new S3({ httpOptions: { agent: new https.Agent({ keepAlive: true }) } })

    return Object.defineProperty(this, 's3Client', { value: s3Client, maxSockets: 50, timeout: 100_000_000 })
  },
  get etags() {return JSON.parse(JSON.stringify(etags))}
}

module.exports = exportObject
