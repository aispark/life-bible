import { AsyncStorage } from "react-native";
import * as firebase from "firebase";
import * as FileSystem from "expo-file-system";

const bibleList = ["krv", "kjv"];

export default async () => {
  const downloadBible = async (bibleVersion, storage) => {
    //다운로드 디렉토리 생성
    const fileUri = `${FileSystem.documentDirectory}life-bible/`;
    const { exists } = await FileSystem.getInfoAsync(fileUri);
    if (!exists) FileSystem.makeDirectoryAsync(fileUri);

    const { exists: bibleExists } = await FileSystem.getInfoAsync(
      `${fileUri + bibleVersion}.txt`
    );

    //bible 파일이 없다면
    if (!bibleExists) {
      const downloadUrl = await storage
        .refFromURL(`gs://bible-c66ff.appspot.com/${bibleVersion}.txt`)
        .getDownloadURL();
      await FileSystem.downloadAsync(
        downloadUrl,
        `${fileUri + bibleVersion}.txt`
      );
    }
  };

  //firebase storage 초기화
  const firebaseConfig = {
    apiKey: "AIzaSyDVf8uRRninJLU7Wf_3EKCXQyQGrS-XvKw",
    authDomain: "bible-c66ff.firebaseapp.com",
    databaseURL: "https://bible-c66ff.firebaseio.com",
    projectId: "bible-c66ff",
    storageBucket: "bible-c66ff.appspot.com",
    messagingSenderId: "92014167875",
    appId: "1:92014167875:web:879dad291e8768857111f6",
    measurementId: "G-Z0J3WED0JY"
  };

  firebase.initializeApp(firebaseConfig);

  //get firebase storage
  const storage = firebase.storage();

  //bible 파일이 없다면 다운로드 받는다.
  bibleList.forEach(async item => {
    await downloadBible(item, storage);
  });

  //AsyncStorage에 저장
  let bible;
  let bibleVersion = await AsyncStorage.getItem("bibleVersion");

  if (!bibleVersion) {
    const locale = Localization.locale;
    // if (locale === "ko-KR") console.log("i18n:welcome", i18n.t("welcome"));
    if (locale === "ko-KR") {
      bibleVersion = "krv";
    } else {
      bibleVersion = "kjv";
    }
    await AsyncStorage.setItem("bibleVersion", bibleVersion);
  }

  // bible = (await import("@/resources/krv")).default;
  const bibleString = await FileSystem.readAsStringAsync(
    `${FileSystem.documentDirectory}life-bible/${bibleVersion}.txt`
  );
  bible = new Function(`return ${bibleString};`)();
  console.log(`${bibleVersion} length`, bible.length);

  return { bible, bibleVersion };
};
