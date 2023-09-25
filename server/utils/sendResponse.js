// 自訂 api 統一回傳格式
function sendResponse({ res, status = 200, data = {}, message = '' }) {
  const success = status >= 400 && status < 600 ? false : true;

  res.status(status).json({
    success,
    data,
    message,
  });
}

export default sendResponse;
