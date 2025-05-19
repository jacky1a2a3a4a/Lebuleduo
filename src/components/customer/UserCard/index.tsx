import {
  UserCardSection,
  UserCard,
  UserGreeting,
  UserCardItem,
  UserCardItemColumn,
  UserCardDate,
  UserCardTime,
  ImageContainer,
  DogImage,
  UserCardTitle,
} from './styled';

import dogImage from '../../../assets/images/img-Lebuledou-lying.png';
import { getCustomerGreeting } from '../../../utils/getGreeting';
import { getUserName } from '../../../utils/getUserLocalData';
import { ApiTodayOrder } from '../../../pages/customer/MyOrder/types';

type UserCardProps = {
  todayData: ApiTodayOrder | null;
}

const UserCardComponent = ({ todayData }: UserCardProps) => {
  const userName = getUserName();

  return (
    <UserCardSection>
      {/* 使用者資訊 */}
      <UserCard>
        <UserGreeting>
          {getCustomerGreeting()}，{userName}
        </UserGreeting>

        <UserCardItem>
          <UserCardTitle>今日任務</UserCardTitle>
        </UserCardItem>

        <UserCardItemColumn>
          <UserCardDate>{todayData?.date || '-'}</UserCardDate>
          <UserCardTime>{todayData?.driverTime || '今天無任務'}</UserCardTime>
        </UserCardItemColumn>
      </UserCard>

      {/* 狗圖 */}
      <ImageContainer>
        <DogImage src={dogImage} alt="趴趴狗" />
      </ImageContainer>
    </UserCardSection>
  );
};

export default UserCardComponent; 