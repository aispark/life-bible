import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import {
  createStackNavigator,
  TransitionPresets
} from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Home from "@/screens/Home";
import Setting from "@/screens/Setting";
import NavIcon from "@/components/NavIcon";
import { useTheme } from "@/AppContext";
import SearchBibleLink from "@/components/SearchBibleLink";
import Bible from "@/screens/Bible";
import Search from "@/screens/Search";

export default () => {
  const theme = useTheme();

  const stackFactory = (initialRoute, customConfig) =>
    createStackNavigator(
      {
        InitialRoute: {
          screen: initialRoute,
          navigationOptions: { ...customConfig, headerTitleAlign: "left" }
        }
      },
      {
        defaultNavigationOptions: {
          headerTintColor: `${theme.onSurface}`,
          headerStyle: { backgroundColor: theme.barBackground }
        }
      }
    );

  const BottomTabNavigation = createMaterialBottomTabNavigator(
    {
      Home: {
        screen: stackFactory(Home, {
          title: "하루성경"
        }),
        navigationOptions: {
          tabBarLabel: "하루성경",
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-home" : "md-home"}
            />
          )
        }
      },

      Bible: {
        screen: createStackNavigator(
          {
            Bible: {
              screen: Bible,
              navigationOptions: {
                headerTitle: () => <SearchBibleLink />,
                headerTitleAlign: "left"
              }
            },
            Bible2: {
              screen: Bible,
              navigationOptions: { title: "테스트", headerTitleAlign: "left" }
            }
          },
          {
            defaultNavigationOptions: {
              headerTintColor: `${theme.onSurface}`,
              headerStyle: { backgroundColor: theme.barBackground }
            }
          }
        ),
        navigationOptions: {
          tabBarLabel: "성경",
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={"bible"}
              type={"MaterialCommunityIcons"}
            />
          )
        }
      },

      Search: {
        screen: stackFactory(Search, {
          title: "검색"
        }),
        navigationOptions: {
          tabBarLabel: "검색",
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-search" : "md-search"}
            />
          )
        }
      },

      Note: {
        screen: stackFactory(Setting, {
          title: "노트"
        }),
        navigationOptions: {
          tabBarLabel: "노트",
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-bookmarks" : "md-bookmarks"}
            />
          )
        }
      },

      Setting: {
        screen: stackFactory(Setting, {
          title: "설정"
        }),
        navigationOptions: {
          tabBarLabel: "설정",
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
            />
          )
        }
      }
    },
    {
      shifting: false,
      activeColor: `${theme.onSurface}`,
      inactiveColor: `${theme.onSurface}99`,
      barStyle: { backgroundColor: `${theme.barBackground}` }
    }
  );

  const AppContainer = createAppContainer(BottomTabNavigation);
  return <AppContainer />;
};
