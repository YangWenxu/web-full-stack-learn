const moreTableData = [];
for (let i = 0; i < 10; i++) {
  moreTableData.push({
    id: i,
    name: '名字' + i,
    age: i,
    city: '城市' + i,
  });
}
function searchMoreData(name) {
  const res = [];
  for (let i = 0; i < 10; i++) {
    if (moreTableData[i].name.indexOf(name) > -1) {
      res.push(moreTableData[i]);
    }
  }
  return res;
}
export default {
  // 支持值为 Object 和 Array
  'GET /api/getMoreDataOfTable': {
    data: [...moreTableData],
  },
  'POST /api/getMoreDataBySearch': (req, res) => {
    res.send({
      status: 'ok',
      data: searchMoreData(req.body.name),
    });
  },
};
