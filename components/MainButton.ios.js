import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../constants/colors'

const MainButton = props => {
    return (
        <View style={styles.buttonsContainer}>
            <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonsContainer: {
        overflow: 'hidden',
        borderRadius: 10
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
})

export default MainButton