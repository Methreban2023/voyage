import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { colors } from "../../utils/colors/colors";
import { useState } from "react";
import React from "react";
import { Searchbar } from "react-native-paper";
import { search } from "react-native-country-picker-modal/lib/CountryService";
const FilterList = ({ list = [], onPress = () => {}, setQuery }) => {
  return (
    <View>
      <Searchbar
        placeholder="Search"
        style={{ borderRadius: 17, margin: 5, backgroundColor: "#FEAA027A" }}
        onChangeText={(query) => setQuery(query)}
      />
      <ScrollView
        contentContainerStyle={{ padding: 5, height: "100%", gap: 5 }}
        horizontal
      >
        {list.map((item, index) => (
          <TouchableHighlight
            key={index}
            activeOpacity={0.8}
            onPress={(item) => {
              handleOnPress;
            }}
            style={{
              minWidth: 70,
              height: "100",
              padding: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#00000070",
              borderRadius: 10,
              flexDirection: "row",
            }}
          >
            <>
              <Text>{item}</Text>

              <Text style={{ marginLeft: 5 }}>X</Text>
            </>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </View>
  );
};

export default FilterList;

const styles = StyleSheet.create({});
