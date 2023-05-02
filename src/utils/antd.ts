export const addKeyOfData = (data: any[]) => {
  return data.map(item => ({
    ...item,
    key: item.id
  }))
}
