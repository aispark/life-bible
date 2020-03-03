import React, { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ko } from "date-fns/locale";
import useUpdate from "@/hooks/useUpdate";
import { material } from "react-native-typography";
import styled from "styled-components";

const MaterialInsertTime = styled.Text`
  ${material.captionObject};
`;

// date-fns 함수 호출을 distance라는 함수 내에 넣기. 그래야 distance 함수가 불렸을 때 비로소 실행되도록 할 수 있다.
const distance = time => {
  const text = formatDistanceToNow(new Date(time), {
    locale: ko,
    addSuffix: true
  });
  return text.includes("미만") ? "방금 전" : text;
};

// createAt 변수를 time으로 받음
// 최초 상태는 distance(time) 으로 설정
const InsertTime = ({ time }) => {
  const [datetime, setDatetime] = useState(distance(time));
  // 커스텀 훅 useUpdate 사용
  // setDatetime함수를 콜백으로 넘기면 끝
  useUpdate(() => setDatetime(distance(time)));
  return <MaterialInsertTime>{datetime}</MaterialInsertTime>;
};

export default InsertTime;
