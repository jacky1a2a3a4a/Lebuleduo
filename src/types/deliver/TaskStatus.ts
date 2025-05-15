//後端回傳 為中文

//前端轉換 為英文
export type TaskStatus =
  | 'abnormal' //異常
  | 'unscheduled' //未排定(外送員通常不會拿到未排定任務)
  | 'scheduled' //已排定
  | 'ongoing' //前往中
  | 'arrived' //已抵達
  | 'completed'; //已完成
