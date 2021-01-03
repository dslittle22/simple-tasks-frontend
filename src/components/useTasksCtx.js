import React from 'react';
import { TasksCtx } from './App';
export default function useTasksState() {
  return React.useContext(TasksCtx);
}
