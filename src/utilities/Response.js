import HttpStatus from 'http-status-codes';
import _ from 'lodash';

import Config from '../config';

export class Response {
  /**
   * @example extra = {pagination: {offset: 10, limit: 50, rows: 1000}}
   *
   * @static
   * @param {*} res
   * @param {*} message
   * @param {*} [data=null]
   * @param {number} [code=200]
   * @param {*} [extra={}]
   * @memberof Response
   */
  static success(res, message, data = null, code = HttpStatus.OK, extra = {}) {
    const resObj = { success: true };

    if (_.isObjectLike(message)) {
      resObj.message = message.message || 'success';
      resObj.data = message.data || null;
      resObj.code = message.code || HttpStatus.OK;
      if (!_.isEmpty(message.extra) && _.isObjectLike(message.extra)) {
        resObj.extra = message.extra;
      }
    } else {
      resObj.message = message || 'success';
      resObj.data = data || null;
      resObj.code = code || HttpStatus.OK;
      if (!_.isEmpty(extra) && _.isObjectLike(extra)) {
        resObj.extra = extra;
      }
    }

    if (resObj.extra && resObj.extra.pagination) {
      resObj.extra.pagination.currentPage = resObj.extra.pagination.offset / resObj.extra.pagination.limit + 1;
      resObj.extra.pagination.nextPage =
        resObj.extra.pagination.rows > resObj.extra.pagination.offset + resObj.extra.pagination.limit
          ? resObj.extra.pagination.currentPage + 1
          : null;
      delete resObj.extra.pagination.offset;
    }

    if (res.req.headers.json) {
      res
        .status(resObj.code)
        .type('json')
        .send(`${JSON.stringify(resObj, null, 2)}\n`);
    } else {
      res.status(resObj.code).json(resObj);
    }
  }

  /**
   * @static
   * @param {*} res
   * @param {*} message
   * @param {number} [code=404]
   * @param {*} [resCode=null]
   * @param {*} [extra={}]
   * @memberof Response
   */
  static fail(res, message, code = HttpStatus.NOT_FOUND, resCode = HttpStatus.NOT_FOUND, extra = {}) {
    const resObj = { success: false };

    if (_.isObjectLike(message)) {
      resObj.message = message.message || 'failed';
      resObj.code = message.code || HttpStatus.NOT_FOUND;
      resObj.resCode = message.resCode || resObj.code;
      if (!_.isEmpty(message.extra) && _.isObjectLike(message.extra)) {
        resObj.extra = message.extra;
      }
    } else {
      resObj.message = message || 'failed';
      resObj.code = code || HttpStatus.NOT_FOUND;
      resObj.resCode = resCode || resObj.code;
      if (!_.isEmpty(extra) && _.isObjectLike(extra)) {
        resObj.extra = extra;
      }
    }

    if (res.req.headers.json) {
      res
        .status(resObj.code)
        .type('json')
        .send(`${JSON.stringify(resObj, null, 2)}\n`);
    } else {
      res.status(resObj.code).json(resObj);
    }
  }

  /**
   * @description adding stack trace in response if environment is not prod
   * @static
   * @param {*} obj => response object
   * @param {*} err => error object
   * @memberof Response
   */
  static addErrorStackTrace(obj, err) {
    if (!Config.IsProd && err && 'stack' in err) {
      if ('extra' in obj) {
        obj.extra.stack = err.stack.split('\n');
      } else {
        obj.extra = { stack: err.stack.split('\n') };
      }
    }
  }

  /**
   * @description create custom error object
   * @static
   * @param {*} type
   * @param {*} [err=null]
   * @returns
   * @memberof Response
   */
  static createError(type, err = null) {
    if (!_.isEmpty(err) && 'name' in err && err.name) {
      // If error is generated by this method then returning it immediately
      if (['CustomError'].includes(err.name)) {
        this.addErrorStackTrace(err, err);

        return err;
      }

      // It handles request package errors
      if (['StatusCodeError'].includes(err.name) && 'error' in err && _.isObjectLike(err.error)) {
        this.addErrorStackTrace(err.error, err);

        return this.createError(err.error);
      }
    }

    const e = new Error(type.message);
    e.code = type.code;

    e.name = type.name || 'CustomError';

    if (type.resCode) {
      e.resCode = type.resCode;
    } else {
      e.resCode = type.code;
    }

    if (!_.isEmpty(type.extra)) {
      e.extra = type.extra;
    } else {
      e.extra = {};
    }

    this.addErrorStackTrace(e, err);

    return e;
  }
}
