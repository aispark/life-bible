import i18n from "i18n-js";
import * as Localization from "expo-localization";

i18n.locale = Localization.locale;

//key 에 해당하는 메세지가 없는 경우 다른 언어의 메세지를 가져온다.
i18n.fallbacks = true;

i18n.translations = {
  en: { welcome: "Hello", name: "Charlie" },
  ko: { welcome: "안녕하세요", name: "개발자" }
};

export default i18n;
