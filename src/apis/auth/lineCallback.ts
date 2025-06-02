import axios from 'axios';
import type { UserRole } from '@/store/types';

export type LineCallbackRequest = {
  code: string;
  role: UserRole;
};

export type LineCallbackResponse = {
  token: string;
  profileData: {
    displayName: string;
    userId: string; // line的id
    pictureUrl: string;
  };
  roleName: UserRole;
  usersId: string; // 後端設定的使用者id
};

export const lineCallbackApi = async ({
  code,
  role,
}: LineCallbackRequest): Promise<LineCallbackResponse> => {
  try {
    console.log('發送 LINE 回調請求:', { code, role });
    
    const response = await axios.post<LineCallbackResponse>(
      `/api/auth/line/callback`,
      {
        code,
        role,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('LINE 回調 API 回傳資料:', response.data);

    if (response.status === 400) {
      console.error('後端返回 400 錯誤:', response.data);
      throw new Error(`後端處理失敗: ${response.data || '未知錯誤'}`);
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('LINE 回調 API 錯誤詳細資訊:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
      throw new Error(`後端處理失敗: ${error.message}`);
    }
    console.error('LINE 回調未知錯誤:', error);
    throw new Error('後端處理失敗');
  }
};
