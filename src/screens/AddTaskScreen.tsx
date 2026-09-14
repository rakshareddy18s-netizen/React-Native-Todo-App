import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View,
} from 'react-native';

import api from '../services/api';

export default function AddTaskScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');

  const saveTask = async () => {
    if (!title || !description || !dateTime || !deadline) {
      Alert.alert(
        'Missing Details',
        'Please complete all task fields.'
      );
      return;
    }

    try {
      await api.post('/tasks', {
        title,
        description,
        dateTime,
        deadline,
        priority,
      });

      Alert.alert(
        'Task Created',
        'Your task was added successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Could not create task.'
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.heading}>
        Create New Task
      </Text>

      <Text style={styles.label}>
        Task Title
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>
        Description
      </Text>

      <TextInput
        style={[
          styles.input,
          styles.descriptionInput,
        ]}
        placeholder="Describe your task"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>
        Date & Time
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Example: 14 Sep 2026, 5:00 PM"
        value={dateTime}
        onChangeText={setDateTime}
      />

      <Text style={styles.label}>
        Deadline
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Example: 14 Sep 2026, 7:00 PM"
        value={deadline}
        onChangeText={setDeadline}
      />

      <Text style={styles.label}>
        Priority
      </Text>

      <View style={styles.priorityRow}>
        {['Low', 'Medium', 'High'].map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.priorityButton,
              priority === item &&
                styles.selectedPriority,
            ]}
            onPress={() => setPriority(item)}
          >
            <Text
              style={
                priority === item
                  ? styles.selectedText
                  : styles.priorityText
              }
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={saveTask}
      >
        <Text style={styles.createText}>
          Create Task
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },

  content: {
    padding: 22,
  },

  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#20212B',
    marginBottom: 25,
  },

  label: {
    fontWeight: '600',
    color: '#33343D',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 18,
  },

  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },

  priorityRow: {
    flexDirection: 'row',
    marginBottom: 30,
  },

  priorityButton: {
    flex: 1,
    padding: 13,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderRadius: 10,
    alignItems: 'center',
  },

  selectedPriority: {
    backgroundColor: '#5B5FEF',
  },

  priorityText: {
    color: '#555',
  },

  selectedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  createButton: {
    backgroundColor: '#5B5FEF',
    padding: 17,
    borderRadius: 12,
    marginBottom: 40,
  },

  createText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});