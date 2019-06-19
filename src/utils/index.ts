export function getUrlQueryString(field: string) {
    const reg = new RegExp(`(^|&)${field}=([^&]+)(&|$)`, 'i');
  
    const match = window.location.search.substr(1).match(reg);
  
    if (match) {
      return decodeURIComponent(match[2]);
    }
  }