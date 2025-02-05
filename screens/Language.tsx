import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import BottomBar from "./BottomBar";
import { LanguageContext } from "../contex/languageContext";
import { useContext, useLayoutEffect } from "react";
import { LanguageType } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";
import { useTranslations } from "../hooks/useTranslation";
// import  tr from   "../constants/language/tr.json"
// import  en from   "../constants/language/tr.json"
// import  fa from   "../constants/language/tr.json"

const languages: LanguageType[] = ["Türkçe", "İngilizce", "Farsça"]; 
const Language = () => {
  const { activeLanguage, setActiveLanguage } = useContext(LanguageContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const t = useTranslations();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t.languagePage.pageTitle,
    });
  }, [navigation, activeLanguage]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {languages.map((language) => (
          <Pressable
            key={language}
            onPress={() => setActiveLanguage(language)} 
            style={[
              styles.languageButton,
              activeLanguage === language
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
          >
            <Text
              style={[
                styles.languageText,
                activeLanguage === language
                  ? styles.activeText
                  : styles.inactiveText,
              ]}
            >
              {language}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
  },
  languageButton: {
    borderRadius: 10,
    borderWidth: 2,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
  },
  activeButton: {
    backgroundColor: "#2895fe",
    borderColor: "transparent",
  },
  inactiveButton: {
    backgroundColor: "#ffffff",
    borderColor: "#2895fe",
  },
  languageText: {
    fontSize: 18,
  },
  activeText: {
    color: "#ffffff",
  },
  inactiveText: {
    color: "#2895fe",
  },
});

export default Language;



// import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
// import BottomBar from "./BottomBar";
// import { LanguageContext } from "../contex/languageContext";
// import { useContext, useLayoutEffect, useEffect } from "react";
// import { LanguageType } from "../types";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from "../types";
// import { useNavigation } from "@react-navigation/native";
// import { useTranslations } from "../hooks/useTranslation";

// const languages: LanguageType[] = ["Türkçe", "İngilizce", "Farsça"]; 
// const Language = () => {
//   const { activeLanguage, setActiveLanguage } = useContext(LanguageContext);
//   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
//   const t = useTranslations();

//   // Set default language to "Türkçe" when the component mounts
//   useEffect(() => {
//     if (!activeLanguage) {
//       setActiveLanguage("Türkçe");
//     }
//   }, [activeLanguage, setActiveLanguage]);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: t.languagePage.pageTitle,
//     });
//   }, [navigation, activeLanguage]);

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {languages.map((language) => (
//           <Pressable
//             key={language}
//             onPress={() => setActiveLanguage(language)} 
//             style={[
//               styles.languageButton,
//               activeLanguage === language
//                 ? styles.activeButton
//                 : styles.inactiveButton,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.languageText,
//                 activeLanguage === language
//                   ? styles.activeText
//                   : styles.inactiveText,
//               ]}
//             >
//               {language}
//             </Text>
//           </Pressable>
//         ))}
//       </ScrollView>
//       <BottomBar />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   scrollContainer: {
//     padding: 20,
//     alignItems: "center",
//   },
//   languageButton: {
//     borderRadius: 10,
//     borderWidth: 2,
//     width: "60%",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 15,
//     marginVertical: 5,
//   },
//   activeButton: {
//     backgroundColor: "#2895fe",
//     borderColor: "transparent",
//   },
//   inactiveButton: {
//     backgroundColor: "#ffffff",
//     borderColor: "#2895fe",
//   },
//   languageText: {
//     fontSize: 18,
//   },
//   activeText: {
//     color: "#ffffff",
//   },
//   inactiveText: {
//     color: "#2895fe",
//   },
// });

// export default Language;
