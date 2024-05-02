import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibraryAsync } from "expo-image-picker";
import { styles } from "./App.style";
import React, { useState } from "react";

export default function App() {
  const [imageURIList, setImageURIList] = useState([]);

  async function pickImage() {
    const image = await launchImageLibraryAsync();

    if (image.canceled) {
      alert("Image picker canceled or failed");
    } else {
      setImageURIList([...imageURIList, image.assets[0].uri]);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.title}>My favorite picture</Text>
        <View style={styles.body}>
          <ScrollView>
            {imageURIList.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.image} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Add picture</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
