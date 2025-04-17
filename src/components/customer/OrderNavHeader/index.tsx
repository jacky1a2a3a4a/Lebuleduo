import { HiChevronLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { NavHeader, BackButton, PageTitle, OrderID } from './styled';

interface OrderNavHeaderProps {
  title: string;
  orderNumber?: string;
}

const OrderNavHeader = ({ title, orderNumber }: OrderNavHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <NavHeader>
      <BackButton onClick={handleBack}>
  
          <HiChevronLeft />
      
        <PageTitle>{title}</PageTitle>
      </BackButton>
      {orderNumber && <OrderID>訂單編號: {orderNumber}</OrderID>}
    </NavHeader>
  );
};

export default OrderNavHeader;
