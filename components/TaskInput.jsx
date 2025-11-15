import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { inputStyles } from '../styles/input';

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text, dueDate);
      setText('');
      setDueDate(null);
    }
  };

  return (
    <View style={inputStyles.container}>
      <TextInput
        style={inputStyles.input}
        placeholder="Thêm công việc..."
        value={text}
        onChangeText={setText}
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Ionicons name="calendar-outline" size={28} color="#555" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAdd}>
        <Ionicons name="add-circle" size={40} color="#007AFF" />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dueDate || new Date()}
          mode="datetime"
          onChange={(e, d) => {
            setShowPicker(false);
            if (d) setDueDate(d);
          }}
        />
      )}
    </View>
  );
}
