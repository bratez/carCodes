import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { SvgXml } from 'react-native-svg';

export default App = () => {
  const [vin, setVin] = useState("");
  const [vinList, setVinList] = useState([]);

  const vinChange = (ev) => { return setVin(ev) };
  const renderItem = (item) =>  {
    return (
        <View>
            <Text style={styles.txt}>{item.item.Variable}: {item.item.Value}</Text>
        </View>
    )
  };

  const getVinInfo = () => {
    fetch("https://vin-vehicle-identification-number-lookup.p.rapidapi.com/search_vin?vin=" + vin, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "aa1c62a434msh161b9b06fc45bf6p1a1bcdjsn64e6f3b43065",
        "x-rapidapi-host": "vin-vehicle-identification-number-lookup.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then(response => {
        return setVinList(response.responseVinData.Results)
    })
    .catch(err => {
      console.error(err);
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.input} onChangeText={vinChange} />
        <SvgXml xml={searchIcon} onPress={getVinInfo}/>
      </View>
      <View style={styles.content}>
        <FlatList
            data={vinList}
            renderItem={renderItem}
            keyExtractor={item => item.VariableId}
          />
      </View>
    </View>
  );

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 38
  },
  content: {
    flex: 1,
    backgroundColor: '#000',
    color: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 23,
    width: '100%'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderTopColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10
  },
  txt: {
    color: '#fff'
  }
});

const searchIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" fill="url(#000)" width="30" height="30" viewBox="0 0 1000 1000">
      <path
        d="M3949.4 2582c-322.1-9.6-971.9-46-1156-65.2-201.3-21.1-371.9-72.8-523.3-161-138-78.6-385.3-343.1-490.8-519.5-115-195.5-274.1-559.8-389.2-893.3l-92-264.5H1210c-47.9 1.9-233.9 13.4-414.1 26.8-362.3 28.8-467.7 17.3-559.8-67.1C121.1 532.8 63.6 266.3 124.9 134c46-93.9 116.9-128.4 435.2-203.2 145.7-32.6 264.5-67.1 264.5-76.7 0-7.7-11.5-44.1-26.8-78.6-42.2-103.5-180.2-603.9-222.4-809-21.1-105.4-47.9-306.7-61.3-452.4-40.2-483.1 21.1-793.7 186-939.3l67.1-57.5v-446.7c0-391.1 5.7-456.3 36.4-523.3 42.2-95.8 136.1-176.4 218.5-191.7 34.5-5.8 256.9-9.6 494.6-5.8l433.2 5.8 70.9 55.6c126.5 95.8 145.7 164.9 145.7 550.2v335.5l1046.7-7.7 1048.6-9.6-97.8 118.9c-310.6 371.9-500.3 795.6-571.3 1269.1-72.8 500.3 30.7 1092.7 264.6 1510.6l57.5 103.5-571.3-11.5c-316.3-7.7-776.4-23-1023.7-34.5-247.3-11.5-483.1-17.2-521.4-13.4l-69 5.7 86.3 278c279.9 904.8 554 1355.3 874.2 1445.4 180.2 51.8 1282.5 107.4 2122.1 107.4 753.4 0 1922.8-55.6 2099.1-97.8 247.3-61.3 465.8-339.3 678.6-870.3 61.3-151.4 88.2-189.8 205.1-306.7 701.6-692 929.7-1773.2 565.5-2683.8l-53.7-134.2 126.5-40.3c172.5-53.7 266.5-105.4 402.6-218.5l115-95.8 40.3 55.6c93.9 134.2 105.4 197.4 103.5 624.9 0 360.4-5.8 427.5-51.8 642.2-53.5 258.7-187.7 745.6-233.7 856.8-17.3 38.3-26.8 70.9-23 74.8 1.9 3.8 128.4 34.5 281.8 69 375.7 84.3 440.9 134.2 440.9 333.6 0 226.2-116.9 410.2-281.8 440.9-40.3 7.7-235.8 1.9-437.1-11.5-199.4-13.4-389.2-24.9-419.8-26.8-51.7-1.9-55.6 3.8-143.8 256.9-243.4 694-419.8 1017.9-697.8 1278.6-161 147.6-325.9 239.6-513.8 281.8-339.2 76.6-1999.4 128.4-3065.2 93.8zM2845.2-1238.6c72.9-26.8 115-109.3 161-314.4 49.8-216.6 34.5-302.9-65.2-360.4-59.4-34.5-69-34.5-709.3 63.3-425.6 63.3-669 109.3-707.4 130.4-69 40.3-122.7 164.9-122.7 295.2-1.9 78.6 7.7 101.6 53.7 149.5l55.6 55.6H2155c370 0 663.3-7.7 690.2-19.2z"
        transform="matrix(.1 0 0 -.1 0 388)"
      ></path>
      <path
        d="M5716.9 994.8C4846.5 837.6 4189 162.8 4062.5-699.9c-28.8-207-11.5-555.9 38.3-761.1 109.3-442.8 375.7-849.2 736.1-1121.4 592.4-448.6 1393.7-532.9 2057-220.5 95.8 46 209 105.4 249.2 134.2l74.8 49.8 174.4-174.4 174.5-174.5 9.6-128.4c17.2-239.6 28.8-253 759.1-983.4 749.6-749.5 753.4-753.4 1000.7-753.4 235.8 0 410.3 107.4 511.8 312.5 44.1 92 53.7 132.3 51.8 253-1.9 245.4-7.7 251.1-753.4 998.8-726.5 726.5-743.8 740-979.6 759.1l-130.4 11.5-174.4 174.5-174.4 174.4 49.8 72.8c78.6 117 193.6 373.8 251.1 559.8 47.9 161 51.8 197.4 51.8 527.2 0 304.8-5.8 375.7-40.3 502.3C7840.9 80.3 7467.1 548.1 6968.7 801.1c-381.5 193.7-851.2 266.5-1251.8 193.7zm659.4-680.6C6627.4 251 6790.4 157 6989.7-40.4c143.8-141.9 189.8-201.3 255-335.5 107.3-220.5 141.8-371.9 141.8-603.9 0-421.7-172.5-789.8-494.6-1050.5-243.5-195.5-515.7-289.5-843.5-289.5-318.2 0-569.4 84.3-809 266.5-736.1 565.5-688.2 1702.3 93.9 2202.7 299.2 191.7 692.2 253 1043 164.8z"
        transform="matrix(.1 0 0 -.1 0 388)"
      ></path>
    </svg>
`;