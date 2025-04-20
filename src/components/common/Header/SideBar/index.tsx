import { MdNotifications } from 'react-icons/md';
import styled from 'styled-components';
import { useEffect } from 'react';

// 定義通知項目的類型
interface NotificationItem {
  id: string;
  title: string;
  content: string;
  time: string;
}

// 定義 props 類型
interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// 側邊欄容器主體
const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  background-color: var(--color-white);
  box-shadow: ${({ $isOpen }) =>
    $isOpen ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none'};

  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  padding: 5rem var(--spacing-md);

  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
`;

// 灰色遮色片
const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  background-color: rgba(0, 0, 0, 0.5);

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8;

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
`;

// 標題
const Title = styled.h1`
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);

  display: flex;
  align-items: center;

  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
`;

// 圖示
const IconStyle = styled.div`
  margin-right: var(--spacing-sm);

  display: flex;
  align-items: center;
`;

// 通知列表容器
const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  max-height: calc(100vh - 200px);
  overflow-y: auto;
`;

// 通知項目
const NotificationItem = styled.div`
  background-color: var(--color-background-secondary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-background-secondary-hover);
  }
`;

// 通知標題
const NotificationTitle = styled.h3`
  color: var(--color-primary);

  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xs);
`;

// 通知內容
const NotificationContent = styled.p`
  color: var(--color-text-secondary);

  font-size: var(--font-size-xs);
  margin-bottom: var(--spacing-xs);
`;

// 通知時間
const NotificationTime = styled.span`
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
`;

// 假資料
const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    title: '代收員即將抵達',
    content:
      '代收員將於 5/12 上午 10:00~11:00 進行收運，請貼上QR code貼紙，並放置指定處。',
    time: '1小時前',
  },
  {
    id: '2',
    title: '5/10任務已完成！',
    content:
      '代收員已於 5/10 上午 10:15:29 完成收運，詳情可至「我的訂單」查看收運流程',
    time: '小時前',
  },
  {
    id: '3',
    title: '已收到訂單！',
    content:
      '代收員將於 5/12 上午 10:00~11:00 進行收運，請貼上QR code貼紙，並放置指定處。',
    time: '1小時前',
  },
  {
    id: '4',
    title: 'OhOh~超重囉，需補款',
    content:
      '您的5/8的收運，垃圾重量超出方案限制，需補繳 NT$80 元，確認後將導入 LINE Pay 補繳。',
    time: '1小時前',
  },
];

//從Header傳入isOpen和setIsOpen
function CustomerSideBar({ isOpen, setIsOpen }: SideBarProps) {
  // 當側邊欄打開時，禁止body滾動
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <SidebarOverlay $isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <SidebarContainer $isOpen={isOpen}>
        <Title>
          <IconStyle>
            <MdNotifications />
          </IconStyle>
          消息通知
        </Title>
        <NotificationList>
          {mockNotifications.map((notification) => (
            <NotificationItem key={notification.id}>
              <NotificationTitle>{notification.title}</NotificationTitle>
              <NotificationContent>{notification.content}</NotificationContent>
              <NotificationTime>{notification.time}</NotificationTime>
            </NotificationItem>
          ))}
        </NotificationList>
      </SidebarContainer>
    </>
  );
}

export default CustomerSideBar;
