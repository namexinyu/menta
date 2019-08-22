import request from '../utils/httpRequest';

export const login = param => request("admin/system/login", param);