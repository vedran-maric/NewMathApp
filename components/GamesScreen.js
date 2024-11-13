import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, Modal, TouchableOpacity, FlatList, TextInput, Button } from 'react-native';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { firestore } from "../firebaseConfig"


export default function GamesScreen() {
  const [gameTitle, setGameTitle] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gameImageUrl, setGameImageUrl] = useState("");
  const [games, setGames] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        console.log(firestore);
        const gamesCollection = collection (firestore, "games");
        const gamesSnapshot = await getDocs(gamesCollection);
        const gamesList = gamesSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setGames(gamesList);
      } catch (error) {
        console.error ("Error loading games: ", error);
      }
    };
    fetchGames();
  }, []);

  const handleAddGame = async () => {
    if (gameTitle != "" && gameDescription != "" && gameImageUrl != "") {
      const newGame = {
        title: gameTitle, 
        description: gameDescription, 
        imageUrl: gameImageUrl
      };
      const docRef = await addDoc(collection(firestore, "games"), newGame);
      setGames([...games, {id:docRef.id, ...newGame}]);
      setGameTitle("");
      setGameDescription("");
      setGameImageUrl("");
      Alert.alert("Igrica dodana u bazu podataka.")
    } else {
      Alert.alert("Morate unijeti sva polja.");
    }
  };

  const renderGameItem = ({item}) => (
    <View>
      <Image source={{ uri: item.imageUrl }} />
      <View>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dobrodošli u sekciju Igrice!</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Dodaj novu Igricu</Text>
      </TouchableOpacity>

      <FlatList data={games} 
        renderItem={renderGameItem} 
        keyExtractor={(item) => item.id} />

      <Modal visible={modalVisible} animationType='slide' transparent={true}>
        <View>
          <TextInput value={gameTitle} onChangeText={setGameTitle} placeholder="Naslov igrice" />
          <TextInput value={gameDescription} onChangeText={setGameDescription} placeholder="Opis igrice" />
          <TextInput value={gameImageUrl} onChangeText={setGameImageUrl} placeholder="Slika igrice" />
          <Button title="Dodaj" onPress={handleAddGame} />
          <Button title="Zatvori" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
});