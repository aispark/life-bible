import React, { useState, useEffect } from "react";
import { Animated, FlatList, View, AsyncStorage } from "react-native";
import { useTheme, useBible } from "@/AppContext";
import Paragraph from "@/components/Paragraph";
import SearchBarComponent from "@/components/SearchBar";
import { withCollapsible } from "react-navigation-collapsible";
import {
  parseSearchParagraph,
  categoryKeySet,
  categoryIndex
} from "@/resources/bibleMetadata";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Bible = ({ navigation, collapsible }) => {
  const theme = useTheme();
  const { bible, bibleVersion } = useBible();

  const params = navigation.getParam("searchParagraph", "창(1:1)");
  const [searchCategory, searchChapter, searchParagraph] = parseSearchParagraph(
    params
  );

  const { categoryKey } = categoryKeySet.find(
    item => item[bibleVersion] === searchCategory
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    const { start, end } = categoryIndex[categoryKey][searchChapter - 1];
    setData(bible.slice(start, end));
  }, []);

  const { paddingHeight, animatedY, onScroll } = collapsible;

  const { searchText } = navigation.state.params ? navigation.state.params : {};

  const renderItem = ({ item }) => (
    <Paragraph section={item} highlightWord={searchText} isEnable={false} />
  );

  const filterData = searchText
    ? data.filter(item => item.includes(searchText))
    : data;

  return (
    <AnimatedFlatList
      style={{ flex: 1 }}
      data={filterData}
      renderItem={renderItem}
      keyExtractor={(item, index) => String(index)}
      contentContainerStyle={{
        paddingTop: paddingHeight,
        backgroundColor: theme.background
      }}
      scrollIndicatorInsets={{ top: paddingHeight }}
      onScroll={onScroll}
      _mustAddThis={animatedY}
    />
  );
};

const SearchBar = ({ navigation }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingHorizontal: 15,
        justifyContent: "center",
        backgroundColor: theme.barBackground
      }}
    >
      <SearchBarComponent
        value={navigation.getParam("searchText", "")}
        onChange={text => navigation.setParams({ searchText: text })}
      />
    </View>
  );
};

const collapsibleParams = {
  collapsibleComponent: SearchBar,
  collapsibleBackgroundStyle: {
    height: 60,
    backgroundColor: () => "red",
    paddingBottom: 10,
    disableFadeoutInnerComponent: true
  }
};

export default withCollapsible(Bible, collapsibleParams);
