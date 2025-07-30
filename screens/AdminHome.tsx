import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { userList } from "../api/auth";
import { useUser } from "../contex/useContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface User {
  name: string;
  surname: string;
  phone: string;
  password: string;
  id: number;
}

const AdminHome = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { token, handleLogout } = useUser();
  const [userData, setUserData] = useState<User[]>([]);
  const [userDatas, setUserDatas] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => handleLogout()}
          style={{ marginRight: 16 }}
        >
          <MaterialCommunityIcons name="logout" size={25} color="#2895fe" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleActivate = (id: number) => {
    setSuccessMessage(`Kullanıcı (ID: ${id}) onaylandı.`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 2000);
  };

  useEffect(() => {
    handleUserList();
  }, [token]);

  const handleUserList = async () => {
    const response = await userList(token!);
    setUserDatas(response.data);
  };


  console.log("kullanıcılar console yazdırılıyor : ", userDatas)
  const handleDelete = (id: number) => {
    Alert.alert("Silme İşlemi", `Kullanıcı (ID: ${id}) silinsin mi?`, [
      { text: "İptal", style: "cancel" },
      {
        text: "Sil",
        style: "destructive",
        onPress: () => console.log(`Silindi: ${id}`),
      },
    ]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: User[] = [
          {
            id: 1,
            name: "Ali",
            surname: "Yılmaz",
            password: "Denemedeneme",
            phone: "1234567890",
          },
          {
            id: 2,
            name: "Ayşe",
            surname: "Kara",
            password: "Denemedeneme",
            phone: "0987654321",
          },
        ];
        setUserData(data);
      } catch (err) {
        setError("Kullanıcı verileri alınamadı.");
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{item.id}</Text>
      </View>
      <View style={styles.rowBetween}>
        <Text style={styles.label}>Ad:</Text>
        <Text style={styles.value}>{item.name}</Text>
      </View>
      <View style={styles.rowBetween}>
        <Text style={styles.label}>Soyad:</Text>
        <Text style={styles.value}>{item.surname}</Text>
      </View>
      <View style={styles.rowBetween}>
        <Text style={styles.label}>Numara:</Text>
        <Text style={styles.value}>{item.phone}</Text>
      </View>
      <View style={styles.rowBetween}>
        <Text style={styles.label}>Şifre:</Text>
        <Text style={styles.value}>{item.password}</Text>
      </View>
      <View style={styles.buttonRow}>
        {/* <TouchableOpacity style={styles.approveButton} onPress={() => handleActivate(item.id)}> */}
        <TouchableOpacity
          style={styles.approveButton}
          onPress={() => handleUserList()}
        >
          <Text style={styles.buttonText}>Onayla</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.detailButton]}
          onPress={() =>
            Alert.alert("Detay", `Ad: ${item.name}\nSoyad: ${item.surname}`)
          }
        >
          <Text style={styles.buttonText}>Detay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Sil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Paneli</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {successMessage && (
        <Text style={styles.successText}>{successMessage}</Text>
      )}

      <FlatList
        data={userDatas}
        keyExtractor={(item) => item.name.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aktif olmayan kullanıcı yok.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  detailButton: {
    backgroundColor: "#007bff",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontWeight: "600",
    color: "#444",
  },
  value: {
    color: "#222",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  approveButton: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  successText: {
    color: "green",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#555",
  },
});

export default AdminHome;
