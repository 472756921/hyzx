/**
 * Created by Benson on 2017/11/29.
 */

const host = 'http://116.62.201.135:8080';

export const login = function () {
  const URL = '/app/api/user/login';
  const API = host + URL;
  return API;
};

//----------------------------------------------------------------------------------------
//员工列表
export const e_list = function () {
  const URL = '/app/api/user/findUserList';
  const API = host + URL;
  return API;
};
//员工列表
export const e_Alllist = function () {
  const URL = '/app/api/user/findAllUser';
  const API = host + URL;
  return API;
};
//根据Id查询员工
export const e_list_byID = function () {
  const URL = '/app/api/user/findById';
  const API = host + URL;
  return API;
};
//编辑员工
export const e_edit = function () {
  const URL = '/app/api/user/edit';
  const API = host + URL;
  return API;
};
//新增员工
export const e_save = function () {
  const URL = '/app/api/user/save';
  const API = host + URL;
  return API;
};
//离职员工
export const e_outList = function () {
  const URL = '/app/api/user/findQuitList';
  const API = host + URL;
  return API;
};
//离职员工
export const e_out = function () {
  const URL = '/app/api/user/quit';
  const API = host + URL;
  return API;
};
//----------------------------------------------------------------------------------------
//顾客列表
export const u_list = function () {
  const URL = '/app/api/customer/findCustomerList';
  const API = host + URL;
  return API;
};
//顾客列表
export const u_Alllist = function () {
  const URL = '/app/api/customer/findAllCustomer';
  const API = host + URL;
  return API;
};
//新增顾客
export const u_new = function () {
  const URL = '/app/api/customer/save';
  const API = host + URL;
  return API;
};
//修改顾客
export const u_edit = function () {
  const URL = '/app/api/customer/edit';
  const API = host + URL;
  return API;
};
//----------------------------------------------------------------------------------------
//服务单列表
export const ser_list = function () {
  const URL = '/app/api/service/findServiceOrder';
  const API = host + URL;
  return API;
};
export const ser_save = function () {
  const URL = '/app/api/service/save';
  const API = host + URL;
  return API;
};
//----------------------------------------------------------------------------------------
//投诉列表
export const c_list = function () {
  const URL = '/app/api/complaints/findComplaintsList';
  const API = host + URL;
  return API;
};
//新增投诉
export const c_save = function () {
  const URL = '/app/api/complaints/save';
  const API = host + URL;
  return API;
};
//----------------------------------------------------------------------------------------
//库存盘点
export const s_List = function () {
  const URL = '/app/api/warehousing/findList';
  const API = host + URL;
  return API;
};
//库存盘点
export const s_AllList = function () {
  const URL = '/app/api/warehousing/findAllList';
  const API = host + URL;
  return API;
};
//入库记录
export const s_inStock = function () {
  const URL = '/app/api/warehousing/findWarehousingList';
  const API = host + URL;
  return API;
};
//出库记录
export const s_outStock = function () {
  const URL = '/app/api/warehousing/findWarehousinOutgList';
  const API = host + URL;
  return API;
};
//新增库存
export const s_save = function () {
  const URL = '/app/api/warehousing/save';
  const API = host + URL;
  return API;
};
//出库
export const s_out = function () {
  const URL = '/app/api/warehousing/warehousingOut';
  const API = host + URL;
  return API;
};
//----------------------------------------------------------------------------------------
//产品列表
export const p_list = function () {
  const URL = '/app/api/project/findProjectList';
  const API = host + URL;
  return API;
};
//产品列表
export const p_Alllist = function () {
  const URL = '/app/api/project/findAllProjectt';
  const API = host + URL;
  return API;
};

//------------------------------------------------------------------------
//房间列表
export const r_list = function () {
  const URL = '/app/api/room/findRoomList';
  const API = host + URL;
  return API;
};
//所有房间列表
export const r_Alllist = function () {
  const URL = '/app/api/room/findAllRoom';
  const API = host + URL;
  return API;
};
//------------------------------------------------------------------------
export const re_Alllist = function () {
  const URL = '/app/api/schedule/findScheduleList';
  const API = host + URL;
  return API;
};
