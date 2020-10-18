/* eslint-disable no-magic-numbers */
export enum STATUS {
  NOT_FOUND = 404,
  INVALID = 400,
  SERVER_ERROR = 503,
  INTERNAL_SERVER_ERROR = 500,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,
}

export enum PERMISSIONS {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  SHARE = 'SHARE',
  UPLOAD_IMAGES = 'UPLOAD_IMAGES',
}
