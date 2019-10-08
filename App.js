import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView} from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
}

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false)
    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={err => console.log(err)} />
        )
    }
    const onConfigureNewGame = () => {
        setGuessRounds(0);
        setUserNumber(null);
    };
    const onStartGame = selectedNumber => {
        setUserNumber(selectedNumber);
    };
    const onGameOver = numOfRounds => setGuessRounds(numOfRounds);

    return (
        <SafeAreaView style={styles.screen}>
            <Header title="Guess a number" />
            {!!(userNumber && guessRounds === 0) && (
                <GameScreen userChoice={userNumber} onGameOver={onGameOver} />
            )}
            {!!(!userNumber && !guessRounds) && (
                <StartGameScreen onStartGame={onStartGame} />
            )}
            {!!(userNumber && guessRounds) && (
                <GameOverScreen
                    roundsNumber={guessRounds}
                    userNumber={userNumber}
                    onRestart={onConfigureNewGame}
                />
            )}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

const INIT_ITEMS = [
    { id: "100", value: "ddFirst goal" },
    { id: "200", value: "Second goal - a bit longer" }
];
