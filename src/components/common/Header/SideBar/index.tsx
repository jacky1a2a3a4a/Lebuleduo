import { MdNotifications } from 'react-icons/md';
import { useEffect } from 'react';
import {
  SidebarContainer,
  SidebarOverlay,
  Title,
  IconStyle,
  NotificationList,
  NotificationItem,
  NotificationTitle,
  NotificationContent,
  NotificationTime,
} from './styled';

// 定義通知項目的類型
type NotificationItem = {
  id: string;
  title: string;
  content: string;
  time: string;
};

// 定義 props 類型
type SideBarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

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
