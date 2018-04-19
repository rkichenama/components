// Union creator
export default types => types.reduce((prev, type) => ({
  ...prev,
  [type]: (...data) => ({
    match: fns => fns[type](...data),
  })
}), {});
