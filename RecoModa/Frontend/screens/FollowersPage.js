import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const FollowersPage = () => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    // Fetch followers data from API or your data source
    const fetchFollowers = async () => {
      try {
        // Make API call or retrieve data from your data source
        const response = await fetch('https://api.example.com/followers');
        const data = await response.json();
        setFollowers(data);
      } catch (error) {
        console.log('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Followers</Text>
      <FlatList
        data={followers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.followerItem}>
            <Text style={styles.followerName}>{item.name}</Text>
            <Text style={styles.followerUsername}>@{item.username}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  followerItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  followerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  followerUsername: {
    fontSize: 14,
    color: '#888888',
  },
});

export default FollowersPage;
