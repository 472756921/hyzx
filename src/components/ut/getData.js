/**
 * Created by Benson on 2017/12/1.
 */

export const getAllClient = (type)=>{

  this.$ajax({
    method: 'GET',
    dataType: 'JSON',
    contentType: 'application/json;charset=UTF-8',
    headers: {
      "authToken": sessionStorage.getItem('authToken')
    },
    url: ser_list() + '?page='+page+'&pageSize=50',
  }).then((res) => {
    return res.data.results;
  }).catch((error) => {
  });
}
