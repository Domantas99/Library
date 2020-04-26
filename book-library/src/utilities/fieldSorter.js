const undefComp = (a, b, field) => {
  if ((field in a && field in b) || (!(field in a) && !(field in b))) {
    return 0;
  }
  return field in a ? 1 : -1;
};

const getFieldSorter = (sortField, sortDirection) => {
  return (a, b) => {
    const cmp = undefComp(a, b, sortField);
    if (cmp) {
      return cmp * sortDirection;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection;
    }
    if (a[sortField] < b[sortField]) {
      return -sortDirection;
    }
    return 0;
  };
};

export default getFieldSorter;
