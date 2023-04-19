const S3 = require('aws-sdk/clients/s3')

const etags = new Map()

S3.prototype.getObjectIfContentHasChanged = async function (params) {
  const s3Uri = `s3://${params.Bucket}/${params.Key}`

  if (etags.has(s3Uri)) {
    try {
      const { ETag } = await this.headObject(params).promise()

      if (ETag === etags.get(s3Uri)) {
        return false
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  const res = await this.getObject(params).promise()

  console.log({ Etag: res.ETag, s3Uri })
  etags.set(s3Uri, res.ETag)

  return res
}

function createS3Client ({ keepAlive = true } = {}) {
  return new S3({
    httpOptions: {
      agent: new (require('https')).Agent({ keepAlive })
    }
  })
}

const exportObject = {
  S3,
  createS3Client,
  get s3Client () {
    const s3Client = this.createS3Client({ keepAlive: true })

    return Object.defineProperty(this, 's3Client', { value: s3Client }).s3Client
  },
  get etags () {
    return new Map(etags)
  }
}

module.exports = exportObject
