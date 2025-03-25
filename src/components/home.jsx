import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useReducer, useState } from 'react'

// 🟢 Reducer function
const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, { id: Date.now().toString(), text: action.payload }];

        case 'EDIT_TASK':
            return state.map(task =>
                task.id === action.payload.id ? { ...task, text: action.payload.text } : task
            );

        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);

        default:
            return state;
    }
};

const HomeScreen = () => {
    const [task, setTask] = useState('');
    const [tasks, dispatch] = useReducer(taskReducer, []);
    const [editingTaskId, setEditingTaskId] = useState(null);

    const addTask = () => {
        if (task.trim() === '') return;
        dispatch({ type: 'ADD_TASK', payload: task });
        setTask('');
    };

    const deleteTask = (id) => {
        dispatch({ type: 'DELETE_TASK', payload: id });
    };

    const startEditing = (id, text) => {
        setEditingTaskId(id);
        setTask(text);
    };

    const saveEditTask = () => {
        if (task.trim() === '') return;
        dispatch({ type: 'EDIT_TASK', payload: { id: editingTaskId, text: task } });
        setTask('');
        setEditingTaskId(null);
    };

    return (
        <View>

            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:10,backgroundColor:'#2f4d4d',height:60}}>
<Text style={{fontSize:24,fontWeight:'500',color:'white'}}>Todo List</Text>
            </View>
        <View style={styles.container}>

            <View style={{height:60,flexDirection:'row',justifyContent:'space-between',alignContent:'center',gap:10}}>
                
            <TextInput
                style={styles.input}
                placeholder="Enter Task"
                value={task}
                onChangeText={(text) => setTask(text)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={editingTaskId ? saveEditTask : addTask}
            >
                <Text style={styles.buttonText}>{editingTaskId ? 'Save' : 'Add'}</Text>
            </TouchableOpacity>

            </View>


            <Text style={styles.title}>TASK LIST</Text>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text style={styles.taskText}>{item.text}</Text>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => startEditing(item.id, item.text)}>
                                <Text style={styles.editText}>EDIT✅</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteTask(item.id)}>
                                <Text style={styles.deleteText}>DELETE❌</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
        </View>
    );
};

// 🟢 Styles
const styles = StyleSheet.create({
    container: { width: '100%', height: '100%', padding: 10, marginTop: 10 },
    input: { 
        borderWidth: 0.6,
        padding: 10, 
         marginBottom: 10, 
         flex:1,
         color: 'black', 
         height: 60 ,
         borderRadius:10,
        },
    button: { 
        borderRadius:100,
        backgroundColor: '#6dafaf',
         padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
           height: 60,
        width:60 },

    buttonText: { 
        color: '#ffffff', 
        fontWeight: 'bold'
     },
    title: { width: '100%', marginTop: 20, fontSize: 24, textAlign: 'center', fontWeight: '700' },
    taskItem: {
        width: '100%',
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        borderWidth: 0.6,
        marginTop: 10,
        backgroundColor: '#e2e1e1',
    },
    taskText: { fontWeight: '700', fontSize: 18 },
    actions: { flexDirection: 'row',gap:5 },
    deleteText: { color: 'red', fontWeight: 'bold', marginLeft: 10 ,fontSize:16},
    editText: { color: 'green', fontWeight: 'bold',fontSize:16 },
});

export default HomeScreen;

