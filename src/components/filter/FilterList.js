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
const FilterList = ({ list = [], onPress = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState(list);

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
      />
      <ScrollView
        contentContainerStyle={{ padding: 5, height: "100%", gap: 5 }}
        horizontal
      >
        {list.map((item, index) => (
          <TouchableHighlight
            onPress={() => {
              onPress(item);
            }}
            key={index}
            style={{
              minWidth: 70,
              height: "100%",
              padding: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#00000070",
              borderRadius: 17,
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
