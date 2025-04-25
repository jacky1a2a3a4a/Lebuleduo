import React from 'react';
import {
  Container,
  Title,
  Section,
  Divider,
  MethodTitle,
  Description,
  Note,
} from './styles';

const QRCodeInfo = () => {
  return (
    <Container>
      <Title>✨為什麼要貼 QR Code？</Title>
      <Section>
        <Description>
          每次收運前，請將QRcode貼在垃圾袋上，代收員掃一下就知道「這袋是你的」囉！
        </Description>
      </Section>

      <Divider />

      <Title>✨取得貼紙的2種方式</Title>
      <Section>
        <MethodTitle>1. 自行列印（最快 24 小時生效）</MethodTitle>
        <Description>
          訂單成立後，系統會立即產生專屬貼紙的PDF檔＋傳Line通知，再使用印表機或超商「雲端列印」列出來，剪一剪貼到垃圾袋上即可。
        </Description>
      </Section>

      <Section>
        <MethodTitle>2. 郵寄貼紙（3 天後寄達）</MethodTitle>
        <Description>
          我們幫您印好防水貼紙，寄送到您的收運地址，約3
          天左右送達，收到後直接貼上。
        </Description>
      </Section>

      <Divider />

      <Note>
        貼心小提醒
        <br />
        • 每袋至少貼 1 張，貼在袋口或把手最醒目
        <br />
        • 貼紙破損可隨時再下載列印，或到會員中心申請補寄
        <br />• 沒貼 QR Code 的垃圾袋，代收員規定不能收哦！
      </Note>
    </Container>
  );
};

export default QRCodeInfo;
