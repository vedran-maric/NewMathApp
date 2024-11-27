import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { firestore } from "../firebaseConfig";

export default function LeaderboardTab() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Kreiraj upit za dohvaćanje top 10 korisnika po bodovima
        const leaderboardQuery = query(
          collection(firestore, "users"),
          orderBy("score", "desc"),
          limit(10)
        );

        // Dohvati podatke iz Firestore-a
        const querySnapshot = await getDocs(leaderboardQuery);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });

        // Postavi dohvaćene podatke u state
        setLeaderboard(users);
      } catch (error) {
        console.error("Greška pri dohvaćanju leaderboard-a: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Učitavanje leaderboard-a...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <Text style={styles.name}>{item.name || "Nepoznati korisnik"}</Text>
            <Text style={styles.score}>{item.score} bodova</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    width: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginLeft: 10,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
});
