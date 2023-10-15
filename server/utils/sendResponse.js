// 自訂 api 統一回傳格式
// success: false，一定要帶 message
function sendResponse({ res, status = 200, value = {}, message = '' }) {
  const success = status >= 400 && status < 600 ? false : true;

  res.status(status).json({
    success,
    value,
    message,
  });
}

export default sendResponse;
