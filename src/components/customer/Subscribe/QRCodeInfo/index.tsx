import React from 'react';
import {
  Container,
  Title,
  Section,
  Divider,
  MethodTitle,
  Description,
  Note,
} from './styled';

const QRCodeInfo = () => {
  return (
    <Container>
      <Title>✨為什麼要貼 QR Code？</Title>
      <Section>
        <Description>
          每次收運前，請將對應日期的QRcode貼在垃圾袋上，代收員掃描後一下就知道「這袋是你的」囉！
        </Description>
      </Section>

      <Divider />

      <Title>✨取得貼紙的2種方式</Title>
      <Section>
        <MethodTitle>1. 自行列印貼紙（最快 24 小時生效）</MethodTitle>
        <Description>
          訂單成立後，系統會立即產生QR Code貼紙的圖片檔，用戶下載後，再使用印表機或超商「雲端列印」列印出來。
        </Description>
      </Section>

      <Section>
        <MethodTitle>2. 郵寄貼紙（3 天後寄達）</MethodTitle>
        <Description>
          由我們幫您印好防水貼紙，寄送到您的收運地址，約3天左右送達。
        </Description>
      </Section>

      <Divider />

      <Note>
        貼心小提醒
        <br />
        • 請把貼紙貼在垃圾袋上的醒目處。
        <br />
        • 貼紙破損可在方案詳情頁面隨時再下載列印，或到會員中心申請補寄。
        <br />
        • 如果後續有修改收運日期，請記得下載新的QR Code貼紙。
        <br />
        • 沒貼 QR Code 的垃圾袋，代收員規定不能收哦！
      </Note>
    </Container>
  );
};

export default QRCodeInfo;
