import { FullHeightContainer } from './styles';

import MockQRCodeGenerator from '../../../components/common/MockQRCodeGenerator'; //qrcode臨時產成器

function ContactUs() {
  return (
    <FullHeightContainer>
      <MockQRCodeGenerator />
    </FullHeightContainer>
  );
}

export default ContactUs;
