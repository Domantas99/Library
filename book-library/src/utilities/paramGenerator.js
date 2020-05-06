const trim = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v.length));

// Ensures that any loose variables in parameters object are converted to 1-length arrays.
// Otherwise we get strings split into one-letter filters.
export const format = (params) => {
  const reducer = (paramObj, paramEntry) => {
    const [paramCategory, param] = paramEntry;
    const arrayParam = Array.isArray(param) ? param : [param];
    const newParamEntry = paramObj.paramCategory
      ? [...paramObj.paramCategory, ...arrayParam]
      : arrayParam;
    return trim({
      ...paramObj,
      [paramCategory]: newParamEntry,
    });
  };

  return Object.entries(params).reduce((obj, entry) => reducer(obj, entry), {});
};

export default (params) => {
  if (!Object.keys(params).length > 0) {
    return "";
  }
  return Object.entries(format(params))
    .map(([key, list]) => {
      return list
        .map((value) => {
          return value ? `${key}=${value}` : null;
        })
        .filter((value) => value !== null)
        .join("&");
    })
    .join("&");
};
