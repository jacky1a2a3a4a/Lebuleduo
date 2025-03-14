import {
  HiCalendarDays,
  HiMiniQrCode,
  HiMiniCurrencyDollar,
  HiUserGroup,
} from 'react-icons/hi2';

import Footer, { FooterNavItem } from '../../../common/Footer';

// 任務相關導航項目
const taskNavItems: FooterNavItem[] = [
  {
    icon: HiCalendarDays,
    label: '任務班表',
    path: '/deliver',
  },
  {
    icon: HiMiniQrCode,
    label: '掃描訂單',
    path: '/deliver/scan-order',
  },
  {
    icon: HiMiniCurrencyDollar,
    label: '報表結算',
    path: '/deliver/settlement',
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
