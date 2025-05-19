import { HiChevronLeft } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { NavHeader, BackButton, PageTitle, OrderID } from './styled';

interface TaskNavHeaderProps {
  title: string;
  orderNumber?: string;
  backPath?: string;
}

const TaskNavHeader = ({
  title,
  orderNumber,
  backPath,
}: TaskNavHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <NavHeader>
      <BackButton onClick={handleBack}>
        <HiChevronLeft />
        <PageTitle>{title}</PageTitle>
      </BackButton>
      {orderNumber && <OrderID>任務編號: {orderNumber}</OrderID>}
    </NavHeader>
  );
};

export default TaskNavHeader;
