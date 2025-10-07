import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { styles } from "../styles/CollapsibleStyles";
import { CollapsibleProps } from "../types";

// 啟用 Android 佈局動畫
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
  isInitiallyCollapsed = false,
  titleStyle,
  containerStyle,
  contentStyle,
  icon,
  rightElement,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isInitiallyCollapsed);
  const animationValue = useRef<Animated.Value>(
    new Animated.Value(isInitiallyCollapsed ? 0 : 1)
  ).current;
  const rotationValue = useRef<Animated.Value>(
    new Animated.Value(isInitiallyCollapsed ? 0 : 1)
  ).current;

  const toggleCollapse = (): void => {
    const newCollapsedState = !isCollapsed;

    // 配置佈局動畫
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setIsCollapsed(newCollapsedState);

    // 內容淡入淡出動畫
    Animated.timing(animationValue, {
      toValue: newCollapsedState ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    // 箭頭旋轉動畫
    Animated.timing(rotationValue, {
      toValue: newCollapsedState ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleCollapse}
        activeOpacity={0.7}
      >
        <View style={styles.titleContainer}>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
        <View style={styles.rightContainer}>
          {rightElement}
          <Animated.View
            style={[
              styles.arrowContainer,
              { transform: [{ rotate: rotateInterpolate }] },
            ]}
          >
            <Text style={styles.arrow}>▼</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>

      {!isCollapsed && (
        <Animated.View
          style={[
            styles.content,
            contentStyle,
            {
              opacity: animationValue,
              transform: [
                {
                  scaleY: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          ]}
        >
          {children}
        </Animated.View>
      )}
    </View>
  );
};

export default Collapsible;
