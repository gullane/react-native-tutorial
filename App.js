import React, { useState } from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Button
} from "react-native";
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

const goals = [];
let k = 0;

export default function App() {
    const [courseGoals, setCourseGoals] = useState(INIT_ITEMS);
    const [isAddMode, setIsAddMode] = useState(false)
    const onAddGoal = enteredGoal => {
        setIsAddMode(false);
        setCourseGoals([...courseGoals, { id: Math.random().toString(), value: enteredGoal}])
    }
    const onDeleteItem = id => setCourseGoals(courseGoals.filter(gl => gl.id !== id))
    const onCancelAddGoal = () => setIsAddMode(false)

    return (
        <View style={styles.screen}>
            <Button title="Add new goal" onPress={() => setIsAddMode(true)}/>
            <GoalInput visible={isAddMode} onAddGoal={onAddGoal} onCancel={onCancelAddGoal}/>
            <FlatList
                data={courseGoals}
                keyExtractor={item => item.id}
                onDelete={onDeleteItem}
                renderItem={itemData => <GoalItem title={itemData.item.value} onDelete={onDeleteItem} id={itemData.item.id} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 30
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4
    },
    input: {
        width: "80%",
        padding: 10,
        height: 40,
        borderBottomColor: "black",
        borderBottomWidth: 1
    }
});

const INIT_ITEMS = [
    { id: "100", value: "ddFirst goal" },
    { id: "200", value: "Second goal - a bit longer" }
]