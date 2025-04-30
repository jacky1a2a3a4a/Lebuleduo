import { useCallback, useState } from 'react';
import QRCodeGenerator from '../../../components/common/QRCodeGenerator';

function MockQRGenerator() {
  const [orderDetailID, setOrderDetailID] = useState<string>(''); //訂單ID(後台用)
  const [orderDetailsNumber, setOrderDetailsNumber] = useState<string>(''); //訂單編號(前台可以看)

  // 生成訂單 QR Code 所需的數據
  const generateOrderQRData = useCallback(() => {
    if (!orderDetailsNumber || !orderDetailID) return null;

    return {
      OrderDetailID: orderDetailID, //訂單ID
      OrderDetailsNumber: orderDetailsNumber, //訂單編號
    };
  }, [orderDetailsNumber, orderDetailID]);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <h2 style={{ marginBottom: '20px' }}>QR Code 產成器</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="請輸入訂單ID"
          value={orderDetailID}
          onChange={(e) => setOrderDetailID(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        />
        <input
          type="text"
          placeholder="請輸入訂單編號"
          value={orderDetailsNumber}
          onChange={(e) => setOrderDetailsNumber(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        />
        {orderDetailsNumber && orderDetailID && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <QRCodeGenerator
              data={generateOrderQRData()}
              size={150}
              level="H"
              includeMargin={true}
              onDownload={(fileName) => {
                console.log(`QR Code downloaded as: ${fileName}`);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MockQRGenerator;
