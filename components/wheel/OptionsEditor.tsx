import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

interface OptionsEditorProps {
  visible: boolean;
  options: string[];
  onClose: () => void;
  onSave: (options: string[]) => void;
}

const OptionsEditor: React.FC<OptionsEditorProps> = ({
  visible,
  options,
  onClose,
  onSave,
}) => {
  const [localOptions, setLocalOptions] = useState<string[]>(options);

  // 當 visible 變化時，重置本地選項
  React.useEffect(() => {
    if (visible) {
      setLocalOptions([...options]);
    }
  }, [visible, options]);

  const updateOption = (index: number, value: string) => {
    const newOptions = [...localOptions];
    newOptions[index] = value;
    setLocalOptions(newOptions);
  };

  const removeOption = (index: number) => {
    if (localOptions.length > 1) {
      const newOptions = localOptions.filter((_, i) => i !== index);
      setLocalOptions(newOptions);
    }
  };

  const addOption = () => {
    setLocalOptions([...localOptions, ""]);
  };

  const handleSave = () => {
    const filteredOptions = localOptions
      .map((option) => option.trim())
      .filter((option) => option);

    if (filteredOptions.length === 0) {
      // 如果沒有有效選項，至少保留一個空選項
      onSave([""]);
    } else {
      onSave(filteredOptions);
    }
    onClose();
  };

  const handleCancel = () => {
    setLocalOptions([...options]); // 重置為原始選項
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>取消</Text>
          </TouchableOpacity>
          <Text style={styles.title}>編輯選項</Text>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>保存</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.hint}>編輯您的選項，每個選項會出現在輪盤上</Text>

          {localOptions.map((option, index) => (
            <View key={index} style={styles.optionRow}>
              <TextInput
                style={styles.optionInput}
                placeholder={`選項 ${index + 1}`}
                value={option}
                onChangeText={(value) => updateOption(index, value)}
                returnKeyType="done"
                multiline={false}
              />
              {localOptions.length > 1 && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeOption(index)}
                >
                  <Text style={styles.removeButtonText}>🗑️</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          <TouchableOpacity style={styles.addButton} onPress={addOption}>
            <Text style={styles.addButtonText}>+ 新增選項</Text>
          </TouchableOpacity>

          {/* 選項計數 */}
          <Text style={styles.optionCount}>
            目前有 {localOptions.filter((opt) => opt.trim()).length} 個有效選項
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 20, // 為狀態欄留空間
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#9e35e5",
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#6b7280",
  },
  saveButton: {
    backgroundColor: "#9e35e5",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  hint: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
    textAlign: "center",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 4,
    shadowColor: "#9e35e5",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  optionInput: {
    flex: 1,
    fontSize: 16,
    color: "#343a40",
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 52,
  },
  removeButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  removeButtonText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#9e35e5",
    borderStyle: "dashed",
    alignItems: "center",
  },
  addButtonText: {
    color: "#9e35e5",
    fontSize: 16,
    fontWeight: "500",
  },
  optionCount: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default OptionsEditor;
