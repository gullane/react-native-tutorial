import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet,  Alert, FlatList, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton.ios'

const generateRandomBetween = (min, max, exclude) => {
    min= Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
)

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess])
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, onGameOver } = props
    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get('window').height)
            setAvailableDeviceWidth(Dimensions.get('window').width)
        }
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)

        }
    })

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    const onNextGuess = direction => {
        if ((direction === "lower" && currentGuess < props.userChoice) ||
        (direction === "greater" && currentGuess > props.userChoice)) {
            Alert.alert(
                'Don\'t lie!',
                'You know that this is wrong',
                [{ text: 'Sorry!', style: 'cancel'}])
            return;
        }
        if (direction === "lower") {
            currentHigh.current = currentGuess
        } else if (direction === "greater") {
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)

        setCurrentGuess(nextNumber)
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <BodyText>Opponent's Guess</BodyText>
                <View style={styles.controls}>
                    <MainButton onPress={onNextGuess.bind(this, "lower") }>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={onNextGuess.bind(this, "greater") }>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                </View>
                {/* <Card style={styles.buttonContainer}>
                    <MainButton onPress={onNextGuess.bind(this, "lower") }>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                    <MainButton onPress={onNextGuess.bind(this, "greater") }>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                </Card> */}

                <View style={styles.listContainer}>
                    {/*
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                    </ScrollView>
                    */}
                    <FlatList
                        contentContainerStyle={styles.list}
                        keyExtractor={item => item.toString()}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)} />
                </View>
            </View>
        )
    }
    return (
        <View style={styles.screen}>
            <BodyText>Opponent's Guess</BodyText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={onNextGuess.bind(this, "lower") }>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={onNextGuess.bind(this, "greater") }>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>

            <View style={styles.listContainer}>
                {/*
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
                */}
                <FlatList
                    contentContainerStyle={styles.list}
                    keyExtractor={item => item.toString()}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 60 : 10,
        width: 300,
        maxWidth: "80%"
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: "80%",
        alignItems: 'center'
    },
    listContainer: {
        width: Dimensions.get('window').width > 350 ? "60%" : "80%",
        flex: 1
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 18,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
        borderRadius: 4
    }
})

export default GameScreen