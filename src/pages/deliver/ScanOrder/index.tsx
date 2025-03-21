import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TaskStatus } from '../Task/Card';

// 定義任務類型
type TaskItem = {
  id: string;
  status: TaskStatus;
  time: string;
  address: string;
  customer: string;
};

// 最外層 大容器
const ScanOrderSectionStyled = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
`;

const TestButton = styled.button`
  background-color: var(--color-gray-700);
  color: var(--color-gray-0);
  border-radius: var(--border-radius-round);
  padding: var(--spacing-md) var(--spacing-lg);
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: var(--color-gray-800);
  }
`;

const StatusMessage = styled.div`
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
  font-weight: 500;
  text-align: center;
`;

function ScanOrder() {
  const navigate = useNavigate();
  const [onGoingTask, setOnGoingTask] = useState<TaskItem | null>(null);

  // 檢查是否有前往中的訂單
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const tasks: TaskItem[] = JSON.parse(savedTasks);
      const onGoingTask = tasks.find((task) => task.status === 'ongoing');
      // 如果有找到，則設定為前往中的訂單
      setOnGoingTask(onGoingTask);
    }
  }, []);

  // 模擬掃描 QR Code 成功
  const handleTestScan = () => {
    if (onGoingTask) {
      navigate(`/deliver/task/${onGoingTask.id}/process-order`);
    }
  };

  return (
    <ScanOrderSectionStyled>
      <TestButton onClick={handleTestScan}>模擬掃描</TestButton>
      {onGoingTask ? (
        <StatusMessage>已找到前往中的訂單，可以掃秒</StatusMessage>
      ) : (
        <StatusMessage>目前沒有確認前往的訂單，無法掃描</StatusMessage>
      )}
    </ScanOrderSectionStyled>
  );
}

export default ScanOrder;
