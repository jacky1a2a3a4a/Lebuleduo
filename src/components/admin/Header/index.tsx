import { MdSearch } from 'react-icons/md';
import { Header as StyledHeader, SearchInput, UserInfo } from './styled';

export default function Header() {
  return (
    <StyledHeader>
      <SearchInput>
        <MdSearch size={18} />
        <input type="text" placeholder="搜尋訂單、用戶或代收員..." />
      </SearchInput>
      <UserInfo>
        <div className="avatar">A</div>
        <span>
          <span>管理員 | </span>
          <span>A355</span>
        </span>
      </UserInfo>
    </StyledHeader>
  );
}
