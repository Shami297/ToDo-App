import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity,ScrollView, View } from 'react-native';

const Main = function () {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
    const [data, setData] = useState();
    const [dataItems, setDataItems] = useState();

    const handleAddTask = () => {
        Keyboard.dismiss();
        setTaskItems([...taskItems, task])
        setTask(null);
        console.log(task);
        console.log(typeof task);
    }

    const completeTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index,1);
        setTaskItems(itemsCopy);
    }

    const saveData = async (data) => {
      try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
        alert('Data successfully saved')
      } catch (e) {
        alert('Failed to save the data to the storage')
      }
    }

    const readData = async () => {
      try {
        const userData = await AsyncStorage.getItem(STORAGE_KEY)
        return userData != null ? JSON.parse(userData) : null;
       /* if (userData !== null) {
          setData(userData)
        }*/
      } catch (e) {
        alert('Failed to fetch the data from storage')
      }
    }

    const Input = (text) => {
      setTask(text);
      setData(text);
      //console.log(data);
      console.log(task);
      console.log(typeof task);
      userData => setData(userData);
    }

    const submit = () => {
      handleAddTask();
      if (!data) return
        saveData(data);
        setData('');
    }

    useEffect(() => {
      readData()
    }, [])

    /*const datearray = () => {
        var dat = new Date();
        this.state.array.push({
        'date': dat.getFullYear() + "/" + (dat.getMonth()+ 1) + "/" + dat.getDate(),
        });
    }*/


    return (
        <View style={styles.container}>
        <View style={styles.tasksWrapper}>
            <View style={styles.header}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text></View>

            <View style={styles.items}>
                {
                taskItems.map((item, index) => {
                    return (
                    <TouchableOpacity key = {index} onPress= {() =>completeTask(index)}>
                        <Task  text = {item}/>
                    </TouchableOpacity>
                    )
                })
                }
            </View>

        </View>
        <KeyboardAvoidingView behavior= {Platform.OS === "ios" ? "padding" : "height"}
        style = {styles.writeTask}>
            <TextInput style = {styles.input} placeholder = {'Write a Task'} value = {task} onChangeText= {text => Input(text)}/>
            <TouchableOpacity onPress= {() => submit() }>
            <View style = {styles.addWrapper}>
                <Text style = {styles.addText}>+</Text>

            </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>

        </View>
    )
}
const Task = (props) => {
    return (
        <View style = {styles.item}>
            <View style = {styles.itemLeft}>
                <View style = {styles.square}></View>
                <Text style={styles.itemText}>
                    {props.text}
                </Text>
                <Text style={styles.itemText}>

                </Text>
            </View>
            <View style = {styles.circle}></View>
        </View>
    )
}




const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#98ff98',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
        fontSize: 15,
        position: 'relative',
    },
    circle: {
        width: 14,
        height: 15,
        borderColor: '#98ff98',
        borderWidth: 4,
        borderRadius: 5,
    },






    container: {
      flex: 1,
      backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
      paddingTop: 80,
      paddingHorizontal: 10,
    },
    header: {
      backgroundColor: '#ff1a75',
      height: 45,
      width: 337,
      paddingLeft: 100,
      paddingTop: 3,
      borderRadius: 15,
    },
    sectionTitle: {
      fontSize: 24,
      color:'#ffffff',
      fontWeight: 'bold'
    },
    items: {
      marginTop: 30,
    },
    scroll: {
      flex :1,
    },
    writeTask: {
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',

    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#ff0066',
      borderWidth: 2,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#ff0066',
      borderRadius: 60,
      paddingBottom: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#ff0066',
      borderWidth: 2,
    },
    addText: {
      fontSize: 40,
      color: '#FFF',
    },
  });

export default Main;