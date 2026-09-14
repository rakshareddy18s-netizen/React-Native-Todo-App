import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import api from '../services/api';

type Task = {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
};

export default function HomeScreen({ navigation }: any) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      Alert.alert('Error', 'Could not load tasks from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();

    const unsubscribe = navigation.addListener('focus', () => {
      loadTasks();
    });

    return unsubscribe;
  }, [navigation]);

  const completeTask = async (task: Task) => {
    const taskId = task._id || task.id;

    if (!taskId) return;

    try {
      await api.put(`/tasks/${taskId}`, {
        completed: !task.completed,
      });

      loadTasks();
    } catch (error) {
      Alert.alert('Error', 'Could not update task.');
    }
  };

  const deleteTask = async (task: Task) => {
    const taskId = task._id || task.id;

    if (!taskId) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      loadTasks();
    } catch (error) {
      Alert.alert('Error', 'Could not delete task.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <View>
          <Text style={styles.heading}>My Tasks</Text>
          <Text style={styles.subheading}>
            Stay focused and productive.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.plus}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={styles.emptyText}>Loading tasks...</Text>
      ) : tasks.length === 0 ? (
        <Text style={styles.emptyText}>
          No tasks yet. Tap + to create one.
        </Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item, index) =>
            item._id || item.id || index.toString()
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text
                  style={[
                    styles.taskTitle,
                    item.completed && styles.completedTitle,
                  ]}
                >
                  {item.title}
                </Text>

                <View style={styles.priority}>
                  <Text style={styles.priorityText}>
                    {item.priority}
                  </Text>
                </View>
              </View>

              <Text style={styles.description}>
                {item.description}
              </Text>

              <Text style={styles.deadline}>
                Deadline: {item.deadline}
              </Text>

              <Text style={styles.status}>
                Status: {item.completed ? 'Completed' : 'Pending'}
              </Text>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => completeTask(item)}
                >
                  <Text style={styles.completeText}>
                    {item.completed ? 'Undo' : 'Complete'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteTask(item)}
                >
                  <Text style={styles.deleteText}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6F7FB',
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#20212B',
  },
  subheading: {
    color: '#777985',
    marginTop: 4,
  },
  plus: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#5B5FEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#20212B',
    flex: 1,
    marginRight: 10,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  priority: {
    backgroundColor: '#EEEEFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  priorityText: {
    color: '#5B5FEF',
    fontWeight: '600',
  },
  description: {
    color: '#777985',
    marginTop: 10,
  },
  deadline: {
    marginTop: 13,
    color: '#555',
  },
  status: {
    marginTop: 10,
    fontWeight: '600',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 18,
  },
  completeButton: {
    flex: 1,
    backgroundColor: '#5B5FEF',
    padding: 12,
    borderRadius: 10,
    marginRight: 8,
  },
  completeText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#F1F1F5',
    padding: 12,
    borderRadius: 10,
  },
  deleteText: {
    textAlign: 'center',
    color: '#555',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#777985',
  },
});