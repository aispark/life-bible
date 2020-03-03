import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";
import { useTheme, useBible } from "@/AppContext";
import SearchBar from "@/components/SearchBar";
import Paragraph from "@/components/Paragraph";

const Search = ({ navigation }) => {
  const { bible } = useBible();
  const theme = useTheme();

  const [term, setTerm] = useState("");
  const [data, setData] = useState([]);
  const [length, setLength] = useState(0);
  const [height, setHeight] = useState(100);

  const onChange = text => {
    navigation.setParams({
      term: text
    });

    let filterBible = [];

    if (text !== "") filterBible = bible.filter(item => item.includes(text));

    setTerm(text);
    setLength(filterBible.length);
    setData(filterBible.slice(0, 10));
  };
  const onSubmit = () => {
    console.log("onSubmit");
    setHeight(200);
  };

  useEffect(() => {
    navigation.setParams({
      term: "",
      onChange,
      onSubmit,
      height
    });
  }, []);

  const Container = styled.View`
    background-color: ${prop => prop.theme.background};
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;
  `;

  const RowCounter = styled.Text`
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
    padding-top: 5px;
    background-color: transparent;
    color: ${props => props.theme.onSurface}DE;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: undefined;
    line-height: 24px;
  `;

  return (
    <Container>
      {/* <Divider
        style={{ width: "100%", backgroundColor: theme.onBackground + "61" }}
      /> */}
      <ScrollView>
        <RowCounter>{length}건</RowCounter>
        {/* {data && data.map((item, index) => highlight(item, term, index))} */}
        {data &&
          data.map((item, index) => (
            <Paragraph
              key={`Paragraph-${index}`}
              section={item}
              highlightWord={term}
              isEnable={false}
            />
          ))}
      </ScrollView>
    </Container>
  );
};

Search.navigationOptions = ({ navigation }) => ({
  headerTitle: () => (
    <SearchBar
      value={navigation.getParam("term", "")}
      onChange={navigation.getParam("onChange", () => null)}
      onSubmit={navigation.getParam("onSubmit", () => null)}
    />
  )
});

export default Search;
