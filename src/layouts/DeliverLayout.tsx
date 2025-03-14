// 測試
import { Outlet } from 'react-router-dom';

function DeliverLayout() {
  return (
    <div className="deliverer-layout">
      {/* 之後可以添加導航欄、側邊欄等 */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default DeliverLayout;
