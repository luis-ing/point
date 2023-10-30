const selectionButton = pathName => {
  let data = 0;
  switch (pathName) {
    case "/home":
      data = 0;
      break;
    case "/home/admin/product":
      data = 1;
      break;
    case "/home/admin/service":
      data = 1;
      break;
    case "/home/admin/inventory":
      data = 1;
      break;
    case "/home/admin/category":
      data = 1;
      break;
    case "/home/admin/provider":
      data = 1;
      break;
    case "/home/config":
      data = 2;
      break;

    default:
      data = 0;
      break;
  }
  return data;
};

export default selectionButton;
