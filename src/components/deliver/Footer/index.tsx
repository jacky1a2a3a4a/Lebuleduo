import {
  HiDocumentText,
  HiCalendarDays,
  HiMiniQrCode,
  HiUserGroup,
} from 'react-icons/hi2';

import CommonFooter, { FooterNavItem } from '../../common/Footer';

// 外送員導航項目配置
const deliverNavItems: FooterNavItem[] = [
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

/**
 * 外送員專用頁尾
 * 包含任務相關導航
 */
function DeliverFooter() {
  return <CommonFooter navItems={deliverNavItems} />;
}

export default DeliverFooter;
