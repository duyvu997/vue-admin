import request from '@/utils/request'

const getFileById = (fileId: string) =>
  request({
    url: `/storage/document/${fileId}`,
    method: 'get'
  })

export default {
  getFileById
}
