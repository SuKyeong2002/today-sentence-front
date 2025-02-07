import React from "react";
import { View, TextInput ,StyleSheet, Modal } from "react-native";

type BookCardProps = { 
    readingDate: string;
    category: string;
    hashtags: string[];
    quote: string;
};

export default function BookCardDetail({ readingDate, category, hashtags, quote }: BookCardProps) {
    return (
        <View style={styles.container}>
            <Modal>
            <View style={styles.textContainer}>
                <TextInput style={styles.readingDate} value={readingDate} />
                <TextInput style={styles.category} value={category} />
                <TextInput style={styles.hashtags} value={hashtags.join(', ')} />
                <TextInput style={styles.quote} value={quote} />
            </View>
            </Modal>
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
    readingDate: {
        fontSize: 12,
        color: "#999",
        marginBottom: 2,
    },
    category: {
        fontSize: 12,
        color: "#999",
        marginBottom: 2,
    },
    hashtags: {
        fontSize: 12,
        color: "#999",
        marginBottom: 2,
    },
    quote: {
        fontSize: 12,
        color: "#999",
    },
});
