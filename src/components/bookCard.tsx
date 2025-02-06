import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type BookCardProps = {
    imageUrl?: string; 
    image?: any; 
    title: string; 
    author: string; 
};

export default function BookCard({ imageUrl, image, title, author }: BookCardProps) {
    return (
        <View style={styles.container}>
            <Image source={imageUrl ? { uri: imageUrl } : image} style={styles.image} />

            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.author}>{author}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E0E0E0",
    },
    image: {
        width: 60, 
        height: 90, 
        borderRadius: 4,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    author: {
        fontSize: 14,
        color: "#666",
        marginBottom: 2,
    },
    publisher: {
        fontSize: 12,
        color: "#999",
    },
});
