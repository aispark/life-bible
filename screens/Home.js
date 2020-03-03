import React, { useState, useEffect } from "react";
import { ScrollView, RefreshControl, Alert } from "react-native";
import { useTheme, useBible } from "@/AppContext";
import Paragraph from "@/components/Paragraph";
import { AppLoading } from "expo";
import styled from "styled-components";

export default () => {
  const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: ${prop => prop.theme.background};
  `;
  const { bible } = useBible();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const refresh = async () => {
    try {
      setRefreshing(true);
      await preLoad();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const preLoad = () => {
    try {
      setLoaded(false);

      const todayBible = [];
      const randomIndex = [];

      for (i = 0; i < 5; i++) {
        randomIndex.push(Math.floor(Math.random() * bible.length));
      }

      const uniqueRandomIndex = randomIndex.filter(
        (item, index) => randomIndex.indexOf(item) === index
      );

      uniqueRandomIndex.forEach(item => {
        todayBible.push(bible[item]);
      });

      setData(todayBible);

      setLoaded(true);
    } catch (e) {
      console.log(e);
      Alert.alert("오류가 발생하였습니다. 관리자에 문의하여 주세요.");
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <View>
      <ScrollView
        style={{ marginTop: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        {data &&
          data.map((item, index) => (
            <Paragraph key={`Paragraph-${index}`} section={item} />
          ))}
      </ScrollView>
    </View>
  );
};
