import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, Modal, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/global';
import Header from '../components/Header';
import TaskInput from '../components/TaskInput';
import TaskItem from '../components/TaskItem';
import { getTasks, saveTasks } from '../utils/storage';
import { scheduleNotification } from '../utils/notifications';
import { inputStyles } from '../styles/input'; 

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = async (text, dueDate) => {
    const newTask = { id: Date.now().toString(), text, done: false, dueDate: dueDate ? dueDate.toISOString() : null };
    if (dueDate && dueDate > new Date()) await scheduleNotification(text, dueDate);
    setTasks([newTask, ...tasks]);
  };

  const toggleDone = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTask = (id) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc muốn xóa công việc này?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", onPress: () => setTasks(tasks.filter((t) => t.id !== id)) }
      ]
    );
  };

 
  const startEdit = (item) => {
    setEditingTask(item);
    setEditText(item.text);
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    if (!editingTask || !editText.trim()) return;

    const updatedTasks = tasks.map((t) =>
      t.id === editingTask.id ? { ...t, text: editText.trim() } : t
    );

    setTasks(updatedTasks);
    
    setIsModalVisible(false);
    setEditingTask(null);
  };


  return (
    
    <View style={globalStyles.container}> 
      <Header title="✨ To-Do List" />
      <TaskInput onAdd={addTask} />
      
     
      <View style={globalStyles.inner}> 
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              item={item}
              onToggle={toggleDone}
              onDelete={deleteTask}
              onEdit={startEdit} 
            />
          )}
        />
      </View>
      
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalTitle}>Chỉnh sửa công việc</Text>
            <TextInput
              style={[inputStyles.input, modalStyles.modalInput]}
              onChangeText={setEditText}
              value={editText}
              placeholder="Nhập nội dung mới"
              multiline={true}
            />
            <View style={modalStyles.buttonContainer}>
              <TouchableOpacity
                style={[modalStyles.button, modalStyles.buttonClose]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={modalStyles.textStyle}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalStyles.button, modalStyles.buttonUpdate]}
                onPress={handleUpdate}
              >
                <Text style={[modalStyles.textStyle, { color: 'white' }]}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 25,
    paddingHorizontal: 25,
    
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    width: '100%',
    marginBottom: 20,
    minHeight: 50,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 20,
  },
  buttonClose: {
    backgroundColor: '#E0E0E0',
    marginBottom: 60,
  },
  buttonUpdate: {
    backgroundColor: '#007AFF',
    marginBottom: 60,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
