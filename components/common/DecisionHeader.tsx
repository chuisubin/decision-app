import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { styles } from "../../styles/DecisionHeaderStyles";

interface DecisionHeaderProps {
  navigation: NavigationProp<any>;
  title: string;
  subtitle: string;
}

const DecisionHeader: React.FC<DecisionHeaderProps> = ({
  navigation,
  title,
  subtitle,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.headerRightSpace} />
    </View>
  );
};

export default DecisionHeader;
