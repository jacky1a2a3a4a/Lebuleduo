//CustomerFooter 顧客頁面底部導航
import {
  HiInboxStack,
  HiShoppingCart,
  HiMiniUserCircle,
  HiMiniChatBubbleOvalLeftEllipsis,
} from 'react-icons/hi2';

import Footer, { FooterNavItem } from '../../../common/Footer';

// 顧客導航項目
const customerFooterNavItems: FooterNavItem[] = [
  {
    icon: HiInboxStack,
    label: '我的訂單',
    path: '/customer/my-order',
  },
  {
    icon: HiShoppingCart,
    label: '訂閱方案',
    path: '/customer/Plan',
  },
  {
    icon: HiMiniUserCircle,
    label: '會員資訊',
    path: '/customer/account',
  },
  {
    icon: HiMiniChatBubbleOvalLeftEllipsis,
    label: '聯絡我們',
    path: '/customer/contact-us',
  },
];

function CustomerFooter() {
  return <Footer navItems={customerFooterNavItems} />;
}

export default CustomerFooter;
