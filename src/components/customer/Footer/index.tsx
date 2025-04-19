//CustomerFooter 顧客頁面底部導航
import {
  MdAssignment,
  MdAddShoppingCart,
  MdFace,
  MdOutlineSupportAgent,
} from 'react-icons/md';

import Footer, { FooterNavItem } from '../../common/Footer';

// 顧客導航項目
const customerFooterNavItems: FooterNavItem[] = [
  {
    icon: MdAssignment,
    label: '我的訂單',
    path: '/customer/my-order',
  },
  {
    icon: MdAddShoppingCart,
    label: '訂閱方案',
    path: '/customer/Plan',
  },
  {
    icon: MdFace,
    label: '會員資訊',
    path: '/customer/account',
  },
  {
    icon: MdOutlineSupportAgent,
    label: '聯絡我們',
    path: '/customer/contact-us',
  },
];

function CustomerFooter() {
  return <Footer navItems={customerFooterNavItems} />;
}

export default CustomerFooter;
