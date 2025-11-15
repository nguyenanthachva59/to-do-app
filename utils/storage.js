import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTasks = async () => {
  const saved = await AsyncStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
};

export const saveTasks = async (tasks) => {
  await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
};
