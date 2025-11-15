import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { taskStyles } from '../styles/task';


export default function TaskItem({ item, onToggle, onDelete, onEdit }) { 
  return (
    <TouchableOpacity
      style={[taskStyles.item, item.done && taskStyles.done]}
      onPress={() => onToggle(item.id)} 
      
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
        
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={[taskStyles.text, item.done && taskStyles.textDone]}>
            {item.text}
          </Text>
          {item.dueDate && (
            <Text style={taskStyles.time}>
              ⏰ {new Date(item.dueDate).toLocaleString()}
            </Text>
          )}
        </View>

       
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          
          
          {!item.done && (
            <TouchableOpacity 
                style={{ padding: 5 }} 
                onPress={() => onEdit(item)}
            >
              <Ionicons name="create-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          )}

         
          <TouchableOpacity 
             style={{ padding: 5, marginLeft: 10 }} 
             onPress={() => onToggle(item.id)}
          >
            <Ionicons
              name={item.done ? 'checkmark-circle' : 'ellipse-outline'}
              size={28}
              color={item.done ? '#4CAF50' : '#aaa'}
            />
          </TouchableOpacity>
          
          
          <TouchableOpacity 
             style={{ padding: 5, marginLeft: 10 }} 
             onPress={() => onDelete(item.id)}
          >
             <Ionicons name="trash-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>

        </View>
      </View>
    </TouchableOpacity>
  );
}