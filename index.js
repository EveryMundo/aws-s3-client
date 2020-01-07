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

module.exports = { S3, get etags() {return JSON.parse(JSON.stringify(etags))} }
