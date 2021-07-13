import fileApiClient from '@/api/file'
import Vue from 'vue'

type FileInfo = {
  id: string | number
  name: string
  type: string
  docByte: string
}
const defaultImageValue =
  'https://i.picsum.photos/id/787/536/354.jpg?hmac=APK6IGer-u0j2OFGpYg7FUGww7EdD4p8KpcpnQFqh2k'

export const fileHanldeMixin = Vue.extend({
  methods: {
    async getFileById(fileId: string): Promise<FileInfo> {
      let fileInfo = {} as FileInfo
      try {
        fileInfo = (await (fileApiClient.getFileById(
          fileId
        ) as unknown)) as FileInfo
      } catch (error) {
        console.log(`An error when get file from server: ${error}`)
      }
      return fileInfo
    },
    async buildImageUrl(
      source: any,
      base64PropertyName?: string,
      imageProperty?: string
    ) {
      if (base64PropertyName && source[base64PropertyName]) {
        const fileInformation = await this.getFileById(
          source[base64PropertyName]
        )
        if (fileInformation.type && fileInformation.docByte) {
          return `data:${fileInformation.type};base64,${fileInformation.docByte}`
        }
      }

      return imageProperty && source[imageProperty]
        ? source[imageProperty]
        : defaultImageValue
    }
  }
})
