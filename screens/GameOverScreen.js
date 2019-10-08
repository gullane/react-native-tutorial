import React from "react";
import { View, StyleSheet, ScrollView, Text, Image, Dimensions } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton.ios";
import Colors from '../constants/colors'

const GameOverScreen = props => {
    //source={{uri: "https://www.summitfireca.com/img/slide/summit.jpg" }}
    return (
        <ScrollView>

        <View style={styles.screen}>
            <TitleText>The Game Is Over</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../assets/success.png")}
                    fadeDuration={1000}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                </BodyText>
            </View>
            <MainButton onPress={props.onRestart}>New game</MainButton>
        </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 10,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        fontSize: Dimensions.get('window').height < 400 ? 14 : 20,
        textAlign: "center"
    }
});

export default GameOverScreen;
