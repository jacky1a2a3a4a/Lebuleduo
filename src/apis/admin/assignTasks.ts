import axios from 'axios';

interface AssignTaskRequest {
  Assign: {
    driverID: number;
    tasks: number[];
  }[];
}

interface AssignTaskResponse {
  statusCode: number;
  status: boolean;
  message: string;
}

export const assignTasks = async (
  assignments: AssignTaskRequest,
): Promise<AssignTaskResponse> => {
  try {
    const response = await axios.post<AssignTaskResponse>(
      'api/POST/Admin/OrderDetail/TaskAssign/RegionTime',
      assignments,
    );
    return response.data;
  } catch (error) {
    console.error('分配任務失敗:', error);
    throw error;
  }
};
