import React from 'react';
import { createRoot } from 'react-dom/client';
import logo from '../../../assets/icons/icon-Lebuledou.png';
import html2canvas from 'html2canvas';
import { OrderDetail } from '../../customer/QRcodeData/types';
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeDownloaderProps {
  orderNumber: string;
  orderDetails: OrderDetail[];
  buttonText?: string;
}

const QRCodeDownloader: React.FC<QRCodeDownloaderProps> = ({
  orderNumber,
  orderDetails,
  buttonText = '下載所有 QR Code',
}) => {
  const handleDownload = async () => {
    if (!orderDetails.length) return;

    try {
      const qrCodes = orderDetails;
      const qrCodesPerPage = 6;
      const totalPages = Math.ceil(qrCodes.length / qrCodesPerPage);

      // 預先載入 logo 圖片
      const logoImage = new Image();
      logoImage.src = logo;
      await new Promise((resolve) => {
        logoImage.onload = resolve;
      });

      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        const startIndex = pageIndex * qrCodesPerPage;
        const endIndex = Math.min(startIndex + qrCodesPerPage, qrCodes.length);
        const currentPageQRCodes = qrCodes.slice(startIndex, endIndex);

        const printPage = document.createElement('div');
        printPage.style.width = '102mm';
        printPage.style.height = '152mm';
        printPage.style.padding = '10mm';
        printPage.style.backgroundColor = 'white';
        printPage.style.position = 'relative';
        printPage.style.display = 'flex';
        printPage.style.flexDirection = 'column';
        printPage.style.alignItems = 'center';
        printPage.style.justifyContent = 'center';
        printPage.style.pageBreakAfter = 'always';

        const title = document.createElement('div');
        title.style.textAlign = 'center';
        title.style.fontSize = '10px';
        title.style.marginBottom = '10px';
        title.style.fontWeight = 'bold';
        title.style.color = '#1a237e';
        title.innerHTML = `垃不垃多專用 QR Code / 訂單編號: ${orderNumber}`;
        printPage.appendChild(title);

        const gridContainer = document.createElement('div');
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
        gridContainer.style.gap = '0';
        gridContainer.style.justifyContent = 'center';
        gridContainer.style.alignContent = 'start';

        const renderPromises = currentPageQRCodes.map(
          async (task: OrderDetail) => {
            const qrItem = document.createElement('div');
            qrItem.style.backgroundColor = '#ffffff';
            qrItem.style.border = '1px solid #e0e0e0';
            qrItem.style.borderRadius = '0';
            qrItem.style.padding = '12px';
            qrItem.style.display = 'flex';
            qrItem.style.flexDirection = 'column';
            qrItem.style.alignItems = 'center';
            qrItem.style.gap = '0';
            qrItem.style.boxShadow = 'none';

            const qrCode = document.createElement('div');
            qrCode.style.width = '100px';
            qrCode.style.height = '100px';
            qrCode.style.display = 'flex';
            qrCode.style.justifyContent = 'center';
            qrCode.style.alignItems = 'center';

            const tempDiv = document.createElement('div');
            qrCode.appendChild(tempDiv);

            const root = createRoot(tempDiv);
            root.render(
              <QRCodeCanvas
                value={JSON.stringify({
                  OrderDetailID: Number(task.OrderDetailID),
                  OrderDetailsNumber: task.OrderDetailsNumber,
                  CustomerNumber: task.UserNumber?.Number || 'N/A',
                })}
                size={100}
                level="H"
                includeMargin={true}
                imageSettings={{
                  src: logo,
                  height: 20,
                  width: 20,
                  excavate: true,
                }}
              />,
            );

            const taskInfo = document.createElement('div');
            taskInfo.style.textAlign = 'left';
            taskInfo.style.fontSize = '8px';
            taskInfo.style.color = '#333333';
            taskInfo.style.lineHeight = '1.4';
            taskInfo.style.paddingLeft = '5px';
            taskInfo.style.marginBottom = '5px';
            taskInfo.innerHTML = `
            垃不垃多 專業垃圾代收服務<br/>
            任務編號:<br/>${task.OrderDetailsNumber}<br/>
            服務日期: ${task.ServiceDate}<br/>
          `;

            qrItem.appendChild(qrCode);
            qrItem.appendChild(taskInfo);
            gridContainer.appendChild(qrItem);

            await new Promise((resolve) => setTimeout(resolve, 100));
          },
        );

        printPage.appendChild(gridContainer);

        // 添加頁碼
        const pageNumber = document.createElement('div');
        pageNumber.style.textAlign = 'center';
        pageNumber.style.fontSize = '8px';
        pageNumber.style.color = '#666666';
        pageNumber.style.marginTop = '1px';
        pageNumber.innerHTML = ` ${pageIndex + 1} / ${totalPages} `;
        printPage.appendChild(pageNumber);

        document.body.appendChild(printPage);
        await Promise.all(renderPromises);

        // 檢查是否為手機設備
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        const canvas = await html2canvas(printPage, {
          scale: isMobile ? 3 : 4, // 提高圖片解析度
          useCORS: true,
          backgroundColor: 'white',
          logging: true,
          allowTaint: true,
          onclone: (clonedDoc) => {
            // 確保克隆的文檔中的圖片也被正確載入
            const images = clonedDoc.getElementsByTagName('img');
            for (let i = 0; i < images.length; i++) {
              images[i].src = logo;
            }
          },
        });
        document.body.removeChild(printPage);

        const dataUrl = canvas.toDataURL('image/png');

        // 在手機上使用不同的下載方式
        if (isMobile) {
          // 在手機上使用新視窗開啟圖片
          const newWindow = window.open('', '_blank');
          if (newWindow) {
            // 為每一頁生成 QR Code 圖片
            const pageImages = await Promise.all(
              Array.from({ length: totalPages }, async (_, pageIndex) => {
                const startIndex = pageIndex * qrCodesPerPage;
                const endIndex = Math.min(
                  startIndex + qrCodesPerPage,
                  qrCodes.length,
                );
                const currentPageQRCodes = qrCodes.slice(startIndex, endIndex);

                const printPage = document.createElement('div');
                printPage.style.width = '102mm';
                printPage.style.height = '152mm';
                printPage.style.padding = '10mm';
                printPage.style.backgroundColor = 'white';
                printPage.style.position = 'relative';
                printPage.style.display = 'flex';
                printPage.style.flexDirection = 'column';
                printPage.style.alignItems = 'center';
                printPage.style.justifyContent = 'center';
                printPage.style.pageBreakAfter = 'always';

                const title = document.createElement('div');
                title.style.textAlign = 'center';
                title.style.fontSize = '10px';
                title.style.marginBottom = '10px';
                title.style.fontWeight = 'bold';
                title.style.color = '#1a237e';
                title.innerHTML = `垃不垃多專用 QR Code / 訂單編號: ${orderNumber}`;
                printPage.appendChild(title);

                const gridContainer = document.createElement('div');
                gridContainer.style.display = 'grid';
                gridContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
                gridContainer.style.gap = '0';
                gridContainer.style.justifyContent = 'center';
                gridContainer.style.alignContent = 'start';

                const renderPromises = currentPageQRCodes.map(
                  async (task: OrderDetail) => {
                    const qrItem = document.createElement('div');
                    qrItem.style.backgroundColor = '#ffffff';
                    qrItem.style.border = '1px solid #e0e0e0';
                    qrItem.style.borderRadius = '0';
                    qrItem.style.padding = '12px';
                    qrItem.style.display = 'flex';
                    qrItem.style.flexDirection = 'column';
                    qrItem.style.alignItems = 'center';
                    qrItem.style.gap = '0';
                    qrItem.style.boxShadow = 'none';

                    const qrCode = document.createElement('div');
                    qrCode.style.width = '100px';
                    qrCode.style.height = '100px';
                    qrCode.style.display = 'flex';
                    qrCode.style.justifyContent = 'center';
                    qrCode.style.alignItems = 'center';

                    const tempDiv = document.createElement('div');
                    qrCode.appendChild(tempDiv);

                    const root = createRoot(tempDiv);
                    root.render(
                      <QRCodeCanvas
                        value={JSON.stringify({
                          OrderDetailID: Number(task.OrderDetailID),
                          OrderDetailsNumber: task.OrderDetailsNumber,
                          CustomerNumber: task.UserNumber?.Number || 'N/A',
                        })}
                        size={100}
                        level="H"
                        includeMargin={true}
                        imageSettings={{
                          src: logo,
                          height: 20,
                          width: 20,
                          excavate: true,
                        }}
                      />,
                    );

                    const taskInfo = document.createElement('div');
                    taskInfo.style.textAlign = 'left';
                    taskInfo.style.fontSize = '8px';
                    taskInfo.style.color = '#333333';
                    taskInfo.style.lineHeight = '1.4';
                    taskInfo.style.paddingLeft = '5px';
                    taskInfo.style.marginBottom = '5px';
                    taskInfo.innerHTML = `
                    垃不垃多 專業垃圾代收服務<br/>
                    任務編號:<br/>${task.OrderDetailsNumber}<br/>
                    服務日期: ${task.ServiceDate}<br/>
                  `;

                    qrItem.appendChild(qrCode);
                    qrItem.appendChild(taskInfo);
                    gridContainer.appendChild(qrItem);

                    await new Promise((resolve) => setTimeout(resolve, 100));
                  },
                );

                printPage.appendChild(gridContainer);

                // 添加頁碼
                const pageNumber = document.createElement('div');
                pageNumber.style.textAlign = 'center';
                pageNumber.style.fontSize = '8px';
                pageNumber.style.color = '#666666';
                pageNumber.style.marginTop = '1px';
                pageNumber.innerHTML = ` ${pageIndex + 1} / ${totalPages} `;
                printPage.appendChild(pageNumber);

                document.body.appendChild(printPage);
                await Promise.all(renderPromises);

                const canvas = await html2canvas(printPage, {
                  scale: isMobile ? 3 : 4,
                  useCORS: true,
                  backgroundColor: 'white',
                  logging: true,
                  allowTaint: true,
                  onclone: (clonedDoc) => {
                    const images = clonedDoc.getElementsByTagName('img');
                    for (let i = 0; i < images.length; i++) {
                      images[i].src = logo;
                    }
                  },
                });
                document.body.removeChild(printPage);

                return canvas.toDataURL('image/png');
              }),
            );

            newWindow.document.write(`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>QR Code 圖片</title>
                  <style>
                    body {
                      margin: 0;
                      padding: 0;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      min-height: 100vh;
                      background-color: #f5f5f5;
                      overflow: hidden;
                    }
                    .carousel {
                      width: 100%;
                      height: 100vh;
                      position: relative;
                      overflow: hidden;
                    }
                    .carousel-container {
                      display: flex;
                      transition: transform 0.3s ease;
                      height: 100%;
                    }
                    .carousel-item {
                      flex: 0 0 100%;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      padding: 20px;
                    }
                    img {
                      max-width: 100%;
                      height: auto;
                      display: block;
                    }
                    .download-hint {
                      position: fixed;
                      bottom: 20px;
                      left: 0;
                      right: 0;
                      text-align: center;
                      color: #666;
                      font-size: 12px;
                      padding: 10px;
                      background-color: rgba(255, 255, 255, 0.9);
                    }
                    .page-indicator {
                      position: fixed;
                      top: 20px;
                      left: 0;
                      right: 0;
                      text-align: center;
                      color: #666;
                      font-size: 14px;
                      padding: 10px;
                      background-color: rgba(255, 255, 255, 0.9);
                    }
                    .close-button {
                      position: fixed;
                      top: 20px;
                      right: 20px;
                      width: 30px;
                      height: 30px;
                      background-color: rgba(0, 0, 0, 0.5);
                      border-radius: 50%;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      color: white;
                      font-size: 20px;
                      cursor: pointer;
                      z-index: 1000;
                    }
                    .close-button:before {
                      content: '×';
                    }
                  </style>
                </head>
                <body>
                  <div class="carousel">
                    <div class="close-button" onclick="window.close()"></div>
                    <div class="carousel-container" id="carouselContainer">
                      ${pageImages
                        .map(
                          (imageUrl, index) => `
                        <div class="carousel-item">
                          <img src="${imageUrl}" alt="QR Code ${index + 1}" />
                          <div class="page-indicator">第 ${index + 1} 頁 / 共 ${totalPages} 頁</div>
                        </div>
                      `,
                        )
                        .join('')}
                    </div>
                    <div class="download-hint">請長按圖片並選擇「儲存圖片」</div>
                  </div>
                  <script>
                    const container = document.getElementById('carouselContainer');
                    let startX = 0;
                    let currentTranslate = 0;
                    let prevTranslate = 0;
                    let currentIndex = 0;
                    const totalItems = ${totalPages};
                    
                    // 關閉所有圖片
                    document.querySelector('.close-button').addEventListener('click', () => {
                      window.close();
                    });
                    
                    container.addEventListener('touchstart', (e) => {
                      startX = e.touches[0].clientX;
                    });
                    
                    container.addEventListener('touchmove', (e) => {
                      const currentX = e.touches[0].clientX;
                      const diff = currentX - startX;
                      currentTranslate = prevTranslate + diff;
                      container.style.transform = \`translateX(\${currentTranslate}px)\`;
                    });
                    
                    container.addEventListener('touchend', (e) => {
                      const diff = e.changedTouches[0].clientX - startX;
                      const threshold = window.innerWidth * 0.3;
                      
                      if (Math.abs(diff) > threshold) {
                        if (diff > 0 && currentIndex > 0) {
                          currentIndex--;
                        } else if (diff < 0 && currentIndex < totalItems - 1) {
                          currentIndex++;
                        }
                      }
                      
                      prevTranslate = -currentIndex * window.innerWidth;
                      container.style.transform = \`translateX(\${prevTranslate}px)\`;
                    });
                  </script>
                </body>
              </html>
            `);
            newWindow.document.close();
          } else {
            // 如果無法開啟新視窗，則在當前頁面顯示圖片
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.right = '0';
            container.style.bottom = '0';
            container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.justifyContent = 'center';
            container.style.alignItems = 'center';
            container.style.zIndex = '9999';
            container.style.overflow = 'hidden';

            const closeButton = document.createElement('div');
            closeButton.style.position = 'fixed';
            closeButton.style.top = '20px';
            closeButton.style.right = '20px';
            closeButton.style.width = '30px';
            closeButton.style.height = '30px';
            closeButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            closeButton.style.borderRadius = '50%';
            closeButton.style.display = 'flex';
            closeButton.style.justifyContent = 'center';
            closeButton.style.alignItems = 'center';
            closeButton.style.color = 'white';
            closeButton.style.fontSize = '20px';
            closeButton.style.cursor = 'pointer';
            closeButton.style.zIndex = '1000';
            closeButton.textContent = '×';
            closeButton.addEventListener('click', () => {
              // 移除所有圖片容器
              const containers = document.querySelectorAll(
                '[style*="position: fixed"][style*="z-index: 9999"]',
              );
              containers.forEach((container) => {
                document.body.removeChild(container);
              });
            });

            const carouselContainer = document.createElement('div');
            carouselContainer.style.display = 'flex';
            carouselContainer.style.transition = 'transform 0.3s ease';
            carouselContainer.style.width = '100%';
            carouselContainer.style.height = '100%';

            let startX = 0;
            let currentTranslate = 0;
            let prevTranslate = 0;
            let currentIndex = 0;

            // 為每一頁生成 QR Code 圖片
            const pageImages = await Promise.all(
              Array.from({ length: totalPages }, async (_, pageIndex) => {
                const startIndex = pageIndex * qrCodesPerPage;
                const endIndex = Math.min(
                  startIndex + qrCodesPerPage,
                  qrCodes.length,
                );
                const currentPageQRCodes = qrCodes.slice(startIndex, endIndex);

                const printPage = document.createElement('div');
                printPage.style.width = '102mm';
                printPage.style.height = '152mm';
                printPage.style.padding = '10mm';
                printPage.style.backgroundColor = 'white';
                printPage.style.position = 'relative';
                printPage.style.display = 'flex';
                printPage.style.flexDirection = 'column';
                printPage.style.alignItems = 'center';
                printPage.style.justifyContent = 'center';
                printPage.style.pageBreakAfter = 'always';

                const title = document.createElement('div');
                title.style.textAlign = 'center';
                title.style.fontSize = '10px';
                title.style.marginBottom = '10px';
                title.style.fontWeight = 'bold';
                title.style.color = '#1a237e';
                title.innerHTML = `垃不垃多專用 QR Code / 訂單編號: ${orderNumber}`;
                printPage.appendChild(title);

                const gridContainer = document.createElement('div');
                gridContainer.style.display = 'grid';
                gridContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
                gridContainer.style.gap = '0';
                gridContainer.style.justifyContent = 'center';
                gridContainer.style.alignContent = 'start';

                const renderPromises = currentPageQRCodes.map(
                  async (task: OrderDetail) => {
                    const qrItem = document.createElement('div');
                    qrItem.style.backgroundColor = '#ffffff';
                    qrItem.style.border = '1px solid #e0e0e0';
                    qrItem.style.borderRadius = '0';
                    qrItem.style.padding = '12px';
                    qrItem.style.display = 'flex';
                    qrItem.style.flexDirection = 'column';
                    qrItem.style.alignItems = 'center';
                    qrItem.style.gap = '0';
                    qrItem.style.boxShadow = 'none';

                    const qrCode = document.createElement('div');
                    qrCode.style.width = '100px';
                    qrCode.style.height = '100px';
                    qrCode.style.display = 'flex';
                    qrCode.style.justifyContent = 'center';
                    qrCode.style.alignItems = 'center';

                    const tempDiv = document.createElement('div');
                    qrCode.appendChild(tempDiv);

                    const root = createRoot(tempDiv);
                    root.render(
                      <QRCodeCanvas
                        value={JSON.stringify({
                          OrderDetailID: Number(task.OrderDetailID),
                          OrderDetailsNumber: task.OrderDetailsNumber,
                          CustomerNumber: task.UserNumber?.Number || 'N/A',
                        })}
                        size={100}
                        level="H"
                        includeMargin={true}
                        imageSettings={{
                          src: logo,
                          height: 20,
                          width: 20,
                          excavate: true,
                        }}
                      />,
                    );

                    const taskInfo = document.createElement('div');
                    taskInfo.style.textAlign = 'left';
                    taskInfo.style.fontSize = '8px';
                    taskInfo.style.color = '#333333';
                    taskInfo.style.lineHeight = '1.4';
                    taskInfo.style.paddingLeft = '5px';
                    taskInfo.style.marginBottom = '5px';
                    taskInfo.innerHTML = `
                    垃不垃多 專業垃圾代收服務<br/>
                    任務編號:<br/>${task.OrderDetailsNumber}<br/>
                    服務日期: ${task.ServiceDate}<br/>
                  `;

                    qrItem.appendChild(qrCode);
                    qrItem.appendChild(taskInfo);
                    gridContainer.appendChild(qrItem);

                    await new Promise((resolve) => setTimeout(resolve, 100));
                  },
                );

                printPage.appendChild(gridContainer);

                // 添加頁碼
                const pageNumber = document.createElement('div');
                pageNumber.style.textAlign = 'center';
                pageNumber.style.fontSize = '8px';
                pageNumber.style.color = '#666666';
                pageNumber.style.marginTop = '1px';
                pageNumber.innerHTML = ` ${pageIndex + 1} / ${totalPages} `;
                printPage.appendChild(pageNumber);

                document.body.appendChild(printPage);
                await Promise.all(renderPromises);

                const canvas = await html2canvas(printPage, {
                  scale: isMobile ? 3 : 4,
                  useCORS: true,
                  backgroundColor: 'white',
                  logging: true,
                  allowTaint: true,
                  onclone: (clonedDoc) => {
                    const images = clonedDoc.getElementsByTagName('img');
                    for (let i = 0; i < images.length; i++) {
                      images[i].src = logo;
                    }
                  },
                });
                document.body.removeChild(printPage);

                return canvas.toDataURL('image/png');
              }),
            );

            // 創建所有頁面的圖片
            pageImages.forEach((imageUrl, index) => {
              const pageContainer = document.createElement('div');
              pageContainer.style.flex = '0 0 100%';
              pageContainer.style.display = 'flex';
              pageContainer.style.flexDirection = 'column';
              pageContainer.style.justifyContent = 'center';
              pageContainer.style.alignItems = 'center';
              pageContainer.style.padding = '20px';

              const img = document.createElement('img');
              img.src = imageUrl;
              img.style.maxWidth = '100%';
              img.style.display = 'block';
              img.style.margin = '0 auto';

              const pageIndicator = document.createElement('div');
              pageIndicator.textContent = `第 ${index + 1} 頁 / 共 ${totalPages} 頁`;
              pageIndicator.style.color = '#fff';
              pageIndicator.style.marginTop = '10px';
              pageIndicator.style.textAlign = 'center';

              pageContainer.appendChild(img);
              pageContainer.appendChild(pageIndicator);
              carouselContainer.appendChild(pageContainer);
            });

            const hint = document.createElement('div');
            hint.textContent = '請長按圖片並選擇「儲存圖片」';
            hint.style.position = 'fixed';
            hint.style.bottom = '20px';
            hint.style.left = '0';
            hint.style.right = '0';
            hint.style.textAlign = 'center';
            hint.style.color = '#fff';
            hint.style.padding = '10px';
            hint.style.fontSize = '12px';
            hint.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

            container.appendChild(carouselContainer);
            container.appendChild(hint);
            container.appendChild(closeButton);
            document.body.appendChild(container);

            // 添加觸控事件處理
            container.addEventListener('touchstart', (e) => {
              startX = e.touches[0].clientX;
            });

            container.addEventListener('touchmove', (e) => {
              const currentX = e.touches[0].clientX;
              const diff = currentX - startX;
              currentTranslate = prevTranslate + diff;
              carouselContainer.style.transform = `translateX(${currentTranslate}px)`;
            });

            container.addEventListener('touchend', (e) => {
              const diff = e.changedTouches[0].clientX - startX;
              const threshold = window.innerWidth * 0.3;

              if (Math.abs(diff) > threshold) {
                if (diff > 0 && currentIndex > 0) {
                  currentIndex--;
                } else if (diff < 0 && currentIndex < totalPages - 1) {
                  currentIndex++;
                }
              }

              prevTranslate = -currentIndex * window.innerWidth;
              carouselContainer.style.transform = `translateX(${prevTranslate}px)`;
            });

            // 點擊背景關閉圖片
            container.addEventListener('click', (e) => {
              if (e.target === container) {
                document.body.removeChild(container);
              }
            });
          }
        } else {
          // 在桌面版使用傳統的下載方式
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `垃不垃多專用QRcode_訂單編號${orderNumber}_page_${pageIndex + 1}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (error) {
      console.error('下載失敗:', error);
      alert('下載失敗，請稍後再試或聯絡客服人員');
    }
  };

  return <button onClick={handleDownload}>{buttonText}</button>;
};

export default QRCodeDownloader;
