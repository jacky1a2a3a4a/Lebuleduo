import { useNavigate } from 'react-router-dom';
import { IoHomeOutline, IoRefreshOutline, IoCloseCircleOutline } from 'react-icons/io5';
import { PageWrapper, ResultContainer, ResultIcon, ResultTitle, ResultSubtitle, ButtonGroup, StyledButton } from './styled';

const SubscribeFail = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <ResultContainer>
        <ResultIcon>
          <IoCloseCircleOutline size={64} />
        </ResultIcon>
        <ResultTitle>付款失敗</ResultTitle>
        <ResultSubtitle>很抱歉，您的付款處理過程中發生問題。請稍後再試或聯繫客服。</ResultSubtitle>
        <ButtonGroup>
          <StyledButton
            $isPrimary
            onClick={() => navigate('/')}
          >
            <IoHomeOutline size={20} />
            返回首頁
          </StyledButton>
          <StyledButton
            onClick={() => navigate('/customer/subscribe')}
          >
            <IoRefreshOutline size={20} />
            重新訂閱
          </StyledButton>
        </ButtonGroup>
      </ResultContainer>
    </PageWrapper>
  );
};

export default SubscribeFail; 