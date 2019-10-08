import React, { useState, useEffect } from "react";
import {
    View,
    Button,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/colors";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get("window").width / 4);
    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get("window").width / 4)
        }
        Dimensions.addEventListener('change', updateLayout)
        // cleanup - runs before "useEffect"
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    const onNumberInput = inputText =>
        setEnteredValue(inputText.replace(/[^0-9]/g, ""));
    const onResetInput = () => {
        setEnteredValue("");
        setConfirmed(false);
    };
    const onConfirmInput = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Invalid number", "Number should be 1 - 99", [
                { text: "Ok", style: "destructive", onPress: onResetInput }
            ]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue("");
        Keyboard.dismiss();
    };

    let confirmedOutput = null;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position">
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                >
                    <View style={styles.screen}>
                        <TitleText>Start a new Game</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a number</BodyText>
                            <Input
                                blurOnSubmit
                                keyboardType="number-pad"
                                maxLength={2}
                                autoCapitalize="none"
                                style={styles.input}
                                value={enteredValue}
                                onChangeText={onNumberInput}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth }}>
                                    <Button
                                        title="Reset"
                                        color={Colors.accent}
                                        onPress={onResetInput}
                                    />
                                </View>
                                <View style={{ width: buttonWidth }}>
                                    <Button
                                        title="Confirm"
                                        color={Colors.primary}
                                        onPress={onConfirmInput}
                                    />
                                </View>
                            </View>
                        </Card>

                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    title: {
        marginVertical: 10
    },
    inputContainer: {
        width: "80%",
        minWidth: 300,
        maxWidth: "95%",
        alignItems: "center"
    },
    input: {
        width: 50,
        textAlign: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },
    // button: {
    //     // width: 100
    //     width: Dimensions.get("window").width / 4
    // },
    summaryContainer: {
        marginTop: 70,
        alignItems: "center"
    }
});

export default StartGameScreen;
