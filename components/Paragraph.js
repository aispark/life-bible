import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { material } from "react-native-typography";
import { Divider } from "react-native-paper";
import InsertTime from "@/components/InsertTime";
import { useTheme } from "@/AppContext";
import CardButton from "@/components/CardButton";
import Ripple from "@/components/Ripple";
import { getFullCategory } from "@/resources/bibleMetadata";

const Container = styled.View`
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: ${prop =>
    prop.theme.name === "light"
      ? prop.theme.surface
      : prop.theme.onSurface + "14"};
  border-radius: 5px;
`;

const Header = styled.View`
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Body = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  flex-direction: column;
  justify-content: space-between;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderCategoryContainer = styled.View`
  margin-top: 10px;
  margin-left: 10px;
`;

const HeaderInsertDtContainer = styled.View`
  margin-top: 10px;
  margin-right: 10px;
`;

const Title = styled.Text`
  padding-top: 5px;
  background-color: transparent;
  color: ${props => props.theme.onSurface}DE;
  font-size: 16px;
  font-weight: normal;
  letter-spacing: undefined;
  line-height: 24px;
`;

const Description = styled.Text`
  ${material.captionObject};
`;

const ChipContainer = styled.View`
  flex-direction: row;
`;
const Chip = styled.Text`
  height: 20px;
  padding-top: 2px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 20px;
  margin-right: 5px;
  color: ${props => props.theme.onSurface}DE;
  background-color: ${prop =>
    prop.theme.name === "light"
      ? prop.theme.greyColor
      : prop.theme.onSurface + "1f"};

  ${prop =>
    prop.theme.name === "light"
      ? "border: 0.5px solid " + prop.theme.darkGreyColor
      : ""};

  font-size: 11px;
`;

const ButtonContainer = styled.View`
  margin-left: 10px;
  flex-direction: row;
`;

const Paragraph = ({
  section,
  highlightWord = "",
  insertDt,
  description = "",
  isEnable = true
}) => {
  const theme = useTheme();
  const separatorIndex = section.indexOf(" ");
  const category = section.substring(0, separatorIndex);
  const title = section.substring(separatorIndex + 1);
  const onPress = async () => {
    console.log("on press !!!");
  };

  const highlight = (item, term, index) => {
    const reg = new RegExp(`(${term})`, "gi");
    const parts = item.split(reg);
    return (
      <>
        <Title key={`highlight-${index}`}>
          {parts.map((part, partIndex) =>
            part.match(reg) ? (
              <Title
                key={`highlight-${index}-${partIndex}`}
                style={{ color: theme.primary }}
              >
                {part}
              </Title>
            ) : (
              part
            )
          )}
        </Title>
      </>
    );
  };

  return (
    <Container>
      <Ripple onPress={onPress}>
        <>
          <Header>
            <HeaderCategoryContainer>
              <ChipContainer>
                <Chip>{getFullCategory(category)}</Chip>
              </ChipContainer>
            </HeaderCategoryContainer>
          </Header>

          <Body>
            {highlightWord === "" ? (
              <Title>{title}</Title>
            ) : (
              highlight(title, highlightWord, 0)
            )}
          </Body>

          {isEnable && (
            <>
              <Divider style={{ backgroundColor: theme.onBackground + "61" }} />

              <ButtonContainer>
                <CardButton onPress={onPress} text={`읽음`} />
                <CardButton onPress={onPress} text={`즐겨찾기`} />
              </ButtonContainer>
            </>
          )}
        </>
      </Ripple>
    </Container>
  );
};

Paragraph.propTypes = {
  section: PropTypes.string.isRequired,
  highlightWord: PropTypes.string,
  description: PropTypes.string,
  insertDt: PropTypes.number
};

export default Paragraph;
