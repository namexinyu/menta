import Qs from 'qs'
import { axios, apiUrl, imgUrl, uploadPath } from "./axios";

/**
 * 判断参数是否为空
 * @param data
 * @returns {boolean}
 */
function isEmpty(data) {
  if (data === '' || data === undefined || data === null) {
    return true;
  } else if (typeof data === 'object' && Object.keys(data).length === 0) {
    return true;
  } else {
    return Array.isArray(data) && data.length === 0;
  }
}

/**
 * 随机生成指定长度的字符加数字组合(商品规格SKU)
 * @param length
 * @returns {string}
 */
function randomString(length) {
  let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    let randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

/**
 * 后去当前时间
 * @returns {string}
 */
function getCurrentTime() {
  let date = new Date();
  let month = date.getMonth() + 1;
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  let day = date.getDate();
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  let hours = date.getHours();
  if (hours >= 0 && hours <= 9) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  let seconds = date.getSeconds();
  if (seconds >= 0 && seconds <= 9) {
    seconds = "0" + seconds;
  }
  return date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}

/**
 * get请求方式
 * @param url 请求的url，与全局属性的apiUrl拼接成完整的访问url
 * @param params 请求的额外参数
 * @param success 请求成功的回调方法
 * @param error 请求失败的回调方法
 */
function get(url, params, success, error) {
  if (isEmpty(params)) {
    params = {};
  }
  if (!/^(0|[1-9][0-9]*|-[1-9][0-9]*)$/.test(params.sort) && !isEmpty(params.sort)) {
    this.$message.error('权重非法!');
    return;
  }
  let config = {

    headers: {
      UserId: this.$store.getters.systemAccount.id,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
  };
  url = apiUrl + url;
  let i = 0;
  for (let key in params) {
    if (i === 0) {
      url += '?' + key + '=' + params[key];
    } else {
      url += '&' + key + '=' + params[key];
    }
    i++;
  }
  axios.get(url, config).then((response) => {
    this.loadingClose();
    let data = response.data;
    if (data.code === 200) {
      if (success) {
        success(data.data);
      } else {
        this.doSuccess(data.data);
      }
    } else if (data.code === 401) {
      this.$router.push('/login');
    } else {
      if (error) {
        error(data);
      } else {
        this.doError(data.message)
      }
    }
  }).catch((error) => {
    this.loadingClose();
    console.log(error);
    if (isEmpty(error.response)) {
      this.$message.error('服务器未响应');
    } else if (error.response.status === 400) {
      this.$message.error('请求异常');
    } else if (error.response.status === 401) {
      this.$message.error('未授权，请登录');
    } else if (error.response.status === 403) {
      this.$message.error('无权限');
    } else if (error.response.status === 404) {
      this.$message.error('未知的请求');
    } else if (error.response.status === 500) {
      this.$message.error('服务器错误');
    } else if (error.response.status === 502) {
      this.$message.error('网关异常');
    } else if (error.response.status === 504) {
      this.$message.error('服务器没有响应');
    } else {
      this.$message.error('未知的错误');
    }
  });
}

/**
 * post方式请求数据
 * @param url 请求的url，与全局属性的apiUrl拼接成完整的访问url
 * @param params 请求的额外参数
 * @param success 请求成功的回调方法
 * @param error 请求失败的回调方法
 */
function post(url, params, success, error) {
  if (isEmpty(params)) {
    params = {};
  }
  if (!/^(0|[1-9][0-9]*|-[1-9][0-9]*)$/.test(params.sort) && !isEmpty(params.sort)) {
    this.$message.error('权重非法!');
    return;
  }
  let config = {
    headers: {
      UserId: this.$store.getters.systemAccount.id,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
  };
  axios.post(apiUrl + url, Qs.stringify(params), config).then((response) => {
    this.loadingClose();
    let data = response.data;
    if (data.code === 200) {
      if (success) {
        success(data.data);
      } else {
        this.doSuccess(data.data);
      }
    } else if (data.code === 401) {
      this.$router.push('/login');
    } else {
      if (error) {
        error(data);
      } else {
        this.doError(data.message)
      }
    }
  }).catch((error) => {
    this.loadingClose();
    console.log(error);
    if (isEmpty(error.response)) {
      this.$message.error('服务器未响应');
    } else if (error.response.status === 400) {
      this.$message.error('请求异常');
    } else if (error.response.status === 401) {
      this.$message.error('未授权，请登录');
    } else if (error.response.status === 403) {
      this.$message.error('无权限');
    } else if (error.response.status === 404) {
      this.$message.error('未知的请求');
    } else if (error.response.status === 500) {
      this.$message.error('服务器错误');
    } else if (error.response.status === 502) {
      this.$message.error('网关异常');
    } else if (error.response.status === 504) {
      this.$message.error('服务器没有响应');
    } else {
      this.$message.error('未知的错误');
    }
  });
}

/**
 * post方式下载文件
 * @param url 接口路径
 * @param params 请求参数
 * @param success 请求成功回调
 * @param error 请求失败回调
 * @param fileName 文件名
 */
function postStream(url, params, success, error, fileName) {
  if (isEmpty(params)) {
    params = {};
  }
  axios({
    method: 'post',
    url: apiUrl + url,
    data: Qs.stringify(params),
    responseType: 'blob'
  }).then((response) => {
    this.loadingClose();
    if (success) {
      success(response);
    } else {
      let data = response.data;
      let url = window.URL.createObjectURL(new Blob([data]))
      let upload = document.getElementById('upload');
      if (isEmpty(upload)) {
        upload = document.createElement('a');
        upload.id = 'upload';
        upload.style.display = 'none';
        upload.href = url;
        document.body.appendChild(upload);
      }
      if (isEmpty(fileName)) {
        fileName = decodeURIComponent(response.headers['content-disposition'].split(";")[1].split("filename=")[1]);
      }
      upload.setAttribute('download', fileName);
      upload.href = url;
      upload.click();
    }
  }).catch((error) => {
    this.loadingClose();
    console.log(error);
    if (isEmpty(error.response)) {
      this.$message.error('程序错误,请查看控制台');
    } else if (error.response.status === 500) {
      this.$message.error('服务器错误');
    } else if (error.response.status === 400) {
      this.$message.error('请求异常');
    } else if (error.response.status === 404) {
      this.$message.error('未知的请求');
    } else if (error.response.status === 504) {
      this.$message.error('服务器没有响应');
    } else if (error.response.status === 502) {
      this.$message.error('服务器未启动');
    } else {
      this.$message.error('未知的错误');
    }
  });
}

/**
 * ajax文件上传函数，参数同上
 * @param params 请求参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
function ajaxFileUpload(params, success, error) {
  let config = {
    timeout: 30000,
    headers: {
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryA6FNOAaDnOdIigs4',
      'AUTHORIZATION': isEmpty(this.$store.getters.systemAccount) ? '' : this.$store.getters.systemAccount.token
    }
  };
  axios.post(uploadPath, params, config).then((response) => {
    let data = response.data;
    if (data.code === 200) {
      if (success) {
        success(data)
      } else {
        this.doSuccess(data.data);
      }
    } else if (data.code === 401) {
      this.$route.push('/login');
    } else {
      if (error) {
        error(data);
      } else {
        this.doError(data.message);
      }
    }
  }).catch((error) => {
    console.log(error);
    this.$message.error('上传失败');
  });
}

/**
 * 绑定ajax请求处理函数到vue全局对象中，实际会使用子组件中的doSuccess方法覆盖掉全局的方法
 * @param index
 * @param data
 */

function doSuccess(data) {
  if (!isEmpty(data)) {
    this.$message.success(data)
  }
}

/**
 * 请求失败处理
 * @param index
 * @param error
 */
function doError(error) {
  if (!isEmpty(error)) {
    this.$message.error(error);
  } else {
    this.$message.error('未知的请求错误!');
  }
}

/**
 * 开启遮罩
 * @param text 遮罩文字
 */
function loading(text) {
  let load = this.$loading({
    lock: true,
    text: this.isEmpty(text) ? '正在努力加载中。。。。。。' : text,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.5)'
  });
  this.$store.commit('load', load);
}

/**
 * 关闭遮罩
 */
function loadingClose() {
  if (!isEmpty(this.$store.getters.load)) {
    this.$store.getters.load.close();
  }
}

/**
 * 弹出输入框
 */
function prompt(title, message, callBack, pattern, errorMessage) {
  this.$prompt(message, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: pattern,
    inputErrorMessage: errorMessage,
    center: true
  }).then(({ value }) => {
    callBack(true, value);
  }).catch((e) => {
    callBack(false);
  });
}

/**
 * 确认框
 */
function confirm(title, message, callBack, type) {
  this.$confirm(message, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type,
    center: true,
    roundButton: true
  }).then(() => {
    callBack(true);
  }).catch(() => {
    callBack(false);
  });
}

/**
 * 表单验证
 * @param base
 * @param data
 * @returns {boolean}
 */
function validate(base, data) {
  try {
    for (let i = 0; i < base.length; i++) {
      let item = base[i];
      if (!this.isEmpty(item.validate)) {
        if (item.validate.indexOf('null') !== -1 && this.isEmpty(data[item.key])) {
          this.$message.error(item.name + '不允许为空');
          return false;
        }
        if (!/^[0-9]*$/.test(data[item.key]) && item.validate.indexOf('int') !== -1) {
          this.$message.error(item.name + '只能是正整数');
          return false;
        }
        if (item.validate.indexOf('length') !== -1) {
          let validate;
          item.validate.split(',').forEach((child) => {
            if (child.indexOf('length') !== -1) {
              validate = child;
            }
          })
          let length = item.validate.substring(item.validate.indexOf('(') + 1, item.validate.indexOf(')'));
          let start, end = 0;
          if (length.indexOf('-') !== -1) {
            start = length.split('-')[0];
            end = length.split('-')[1];
          } else {
            start = end = length;
          }
          let test = new RegExp('^.{' + start + ',' + end + '}$');
          if (!test.test(data[item.key])) {
            if (start === end) {
              this.$message.error(item.name + '长度为【' + start + '】');
            } else {
              this.$message.error(item.name + '长度为【' + start + '-' + end + '】');
            }
            return false;
          }
        }
        if (!/^[0-9.]*$/.test(data[item.key]) && item.validate.indexOf('number') !== -1) {
          this.$message.error(item.name + '只能是数字');
          return false;
        }
      }
    }
  } catch (error) {
    this.$message.error('正则格式错误');
    return false;
  }
  return true;
}

/**
 * 图片压缩
 * @param file
 * @param w
 * @param objDiv
 */
function photoCompress(file, w, objDiv) {
  let ready = new FileReader();
  ready.readAsDataURL(file);
  ready.onload = function () {
    let re = this.result;
    canvasDataURL(re, w, objDiv)
  }
}

/**
 * 将图片绘制成convas进行压缩
 * @param path
 * @param obj
 * @param callback
 */
function canvasDataURL(path, obj, callback) {
  let img = new Image();
  img.src = path;
  img.onload = function () {
    let that = this;
    // 默认按比例压缩
    let w = that.width,
      h = that.height,
      scale = w / h;
    w = obj.width || w;
    h = obj.height || (w / scale);
    let quality = 0.7;  // 默认图片质量为0.7
    //生成canvas
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    // 创建属性节点
    let anw = document.createAttribute("width");
    anw.nodeValue = w;
    let anh = document.createAttribute("height");
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    ctx.drawImage(that, 0, 0, w, h);
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality;
    }
    // quality值越小，所绘制出的图像越模糊
    let base64 = canvas.toDataURL('image/jpeg', quality);
    // 回调函数返回base64的值
    callback(convertBase64UrlToBlob(base64));
  }
}

/**
 * 将convas图像转成blob对象
 * @param urlData
 * @returns {Blob}
 */
function convertBase64UrlToBlob(urlData) {
  let arr = urlData.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let str = atob(arr[1]);
  let n = str.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = str.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}


export const functions = {
  isEmpty,
  randomString,
  getCurrentTime,
  post,
  postStream,
  ajaxFileUpload,
  doSuccess,
  doError,
  loading,
  loadingClose,
  prompt,
  confirm,
  validate,
  photoCompress,
  apiUrl,
  imgUrl,
  uploadPath
};