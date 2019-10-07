import React, { useState } from 'react'
import { Modal, View, TextInput, StyleSheet, Button } from 'react-native'

const GoalItem = props => {
    const [enteredGoal, setEnteredGoal] = useState("");
    const onChangeText = txt => setEnteredGoal(txt);
    const onAddGoal = () => {
        props.onAddGoal(enteredGoal)
        setEnteredGoal('')
    }
    const onCancelGoal = () => {
        props.onCancel()
        setEnteredGoal('')
    }
    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Course goal"
                    value={enteredGoal}
                    onChangeText={onChangeText}
                    />
                <View style={styles.btnBox}>
                    <View style={styles.btn}><Button title="CANCEL" color="red" onPress={onCancelGoal} style={styles.cancelBtn}/></View>
                    <View style={styles.btn}><Button title="ADD" onPress={onAddGoal} style={styles.addBtn}/></View>
                </View>
            </View>
        </Modal>
    )
}

export default GoalItem

// >


const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 4
    },
    input: {
        width: "80%",
        padding: 10,
        height: 40,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        marginBottom: 10
    },
    btnBox: {
        width: "80%",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    btn: {
        width: "40%",
        borderRadius: 10
    }
});
