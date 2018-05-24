function stringify(obj = {}) {
  let str = '';
  
  Object.entries(obj).map((item)=> str += `${item[0]}=${item[1]}&`);

  return str;
}

export default  stringify;
