import {
  HiDocumentText,
  HiCalendarDays,
  HiMiniQrCode,
  HiUserGroup,
} from 'react-icons/hi2';

import Footer, { FooterNavItem } from '../../../common/Footer';

// 任務相關導航項目
const taskNavItems: FooterNavItem[] = [
  {
    icon: HiDocumentText,
    label: '今日任務',
    path: '/deliver',
  },
  {
    icon: HiMiniQrCode,
    label: '掃描訂單',
    path: '/deliver/scan-order',
  },
  {
    icon: HiCalendarDays,
    label: '行事曆',
    path: '/deliver/calendar',
  },
  {
    icon: HiUserGroup,
    label: '聯絡後台',
    path: '/deliver/report',
  },
];

function TaskFooter() {
  return <Footer navItems={taskNavItems} />;
}

export default TaskFooter;
