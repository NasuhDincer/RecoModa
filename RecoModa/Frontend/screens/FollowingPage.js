import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const FollowingPage = () => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    // Fetch following data from API or your data source
    const fetchFollowing = async () => {
      try {
        // Make API call or retrieve data from your data source
        const response = await fetch('https://api.example.com/following');
        const data = await response.json();
        setFollowing(data);
      } catch (error) {
        console.log('Error fetching following:', error);
      }
    };

    fetchFollowing();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Following</Text>
      <FlatList
        data={following}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.followingItem}>
            <Text style={styles.followingName}>{item.name}</Text>
            <Text style={styles.followingUsername}>@{item.username}</Text>
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
  followingItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  followingName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  followingUsername: {
    fontSize: 14,
    color: '#888888',
  },
});

export default FollowingPage;
