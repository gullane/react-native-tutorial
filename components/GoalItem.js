import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const GoalItem = props => {
    return (
        <TouchableOpacity onPress={() => props.onDelete(props.id)}>
            <View style={styles.listItem}>
                <Text>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default GoalItem

// >

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: "#6DC9E1",
        color: "#FFF",
        padding: 4,
        borderRadius: 4,
        marginVertical: 2,
        textTransform: "uppercase"
    }
})
