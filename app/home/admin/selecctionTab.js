const selectionTab = pathName => {
    let data = 0;
    switch (pathName) {
      case "/home/admin/product":
        data = 0;
        break;
      case "/home/admin/service":
        data = 1;
        break;
      case "/home/admin/inventory":
        data = 2;
        break;
      case "/home/admin/category":
        data = 3;
        break;
      case "/home/admin/provider":
        data = 4;
        break;
  
      default:
        data = 0;
        break;
    }
    return data;
  };
  
  export default selectionTab;
  