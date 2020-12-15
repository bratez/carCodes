import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, BackHandler, Clipboard } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Provider as PaperProvider, Appbar, DataTable, TextInput, IconButton, HelperText, Switch, Button, Subheading } from 'react-native-paper';

export default App = () => {
  const [vin, setVin] = useState("");
  const [vinList, setVinList] = useState([]);
  const [vinListCurrentPate, setVinListCurrentPage] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [vinErr, setVinErr] = useState(false);
  const [paginationLabel, setPaginationLabel] = useState('');
  const [copyWithName, setCopyWithName] = useState(false);

  const back = () => { BackHandler.exitApp() };
  const copy = (value, variable) => { Clipboard.setString(copyWithName ? variable + ": " + value : value) };
  const vinChange = (ev) => {
    return setVin(ev)
  };

  const tableRender = () => {
    return (
        <DataTable>
            {(vinListCurrentPate && vinListCurrentPate.length) ? headerRender() : null}
            {(vinListCurrentPate && vinListCurrentPate.length) ? rowsRender(vinListCurrentPate) : null}
            {(vinListCurrentPate && vinListCurrentPate.length) ? paginationRender() : null}
        </DataTable>
    );
  };

  const headerRender = () => {
    return (
        <DataTable.Header>
            <DataTable.Title>Param</DataTable.Title>
            <DataTable.Title>Value</DataTable.Title>
            <DataTable.Title>Copy</DataTable.Title>
        </DataTable.Header>
    );
  };

  const rowsRender = (items) => {
    return !items ? null : items.map((item) => {
        return (
            <DataTable.Row key={item.VariableId}>
                <DataTable.Cell>{item.Variable}</DataTable.Cell>
                <DataTable.Cell>{item.Value}</DataTable.Cell>
                <DataTable.Cell onPress={() => { copy(item.Value, item.Variable) }}>
                    <IconButton
                        icon="clipboard-check"
                        size={30}
                    />
                </DataTable.Cell>
            </DataTable.Row>
        );
    });
  }

  const paginationRender = () => {
    return (
        <DataTable.Pagination
          page={currentPage}
          numberOfPages={pages}
          onPageChange={pageChange}
          label={paginationLabel}
        />
    )
  };

  const buttonsRender = () => {
    if (!vinList.length) {
        return null
    }

    return (
        <View style={{flexDirection:"row", justifyContent: "space-between"}}>
            <View style={{flexDirection:"row"}}>
                <Subheading style={{paddingLeft: 10, paddingTop:3}}>Include name</Subheading>
                <Switch value={copyWithName} onValueChange={changeCopyWithName} />
            </View>
            <Button
                style={{marginRight: 10}}
                icon="clipboard-check" mode="contained" onPress={copyAll}>Copy All</Button>
        </View>
    );
  };

  const pageChange = (page) => {
    setCurrentPage(page);
  };

  const calculateItemsToShow = () => {
    let items = vinList.slice(currentPage * perPage, currentPage * perPage + perPage);
    setVinListCurrentPage(items);
  };

  calculatePaginationLabel = () => {
    return `${currentPage * 5 + 1} - ${currentPage + 1 == pages ? vinList.length : currentPage * 5 + 5} of ${vinList.length}`;
  };

  const calculatePages = (list) => {
    return parseInt(list.length / perPage + (list.length % perPage > 0 ? 1 : 0))
  };

  const changeCopyWithName = () => {
    setCopyWithName(!copyWithName);
  };

  const copyAll = () => {
    Clipboard.setString(JSON.stringify(vinList));
  };

  const getVinInfo = () => {
    setVinErr(false);
    if (vin.length != 17) {
        setVinErr(true);
        return
    }

    fetch("https://vin-vehicle-identification-number-lookup.p.rapidapi.com/search_vin?vin=" + vin, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "aa1c62a434msh161b9b06fc45bf6p1a1bcdjsn64e6f3b43065",
        "x-rapidapi-host": "vin-vehicle-identification-number-lookup.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then(response => {
        setPages(calculatePages(response.responseVinData.Results));
        return setVinList(response.responseVinData.Results)
    })
    .catch(err => {
      console.error(err);
    });
  }

  useEffect(() => {
    setPaginationLabel(calculatePaginationLabel);
    calculateItemsToShow();
  }, [vinList, currentPage]);

  return (
    <PaperProvider>
        <Appbar.Header>
            <Appbar.BackAction onPress={back} />
            <Appbar.Content title="carCodes" subtitle="Get full VIN code info" />
        </Appbar.Header>
        <View style={{flexDirection:"row"}}>
            <TextInput
              label="VIN code"
              onChangeText={vinChange}
              mode="outlined"
              style={styles.input}
            />
            <IconButton
                icon="car"
                size={34}
                onPress={getVinInfo}
                 style={{marginTop: 10}}
            />
        </View>
        <HelperText type="error" visible={vinErr}>
            VIN code must be 17 characters long
        </HelperText>
        {buttonsRender()}
        {tableRender()}
    </PaperProvider>
  );

}



const styles = StyleSheet.create({
  input: {
    width: 330,
    height: 40,
    paddingLeft: 10,
    paddingTop: 10
  }
});

const testData = [
     {
         VariableId: 1,
         Value: "ololo",
         Variable: "trololo"
     },
     {
         VariableId: 2,
         Value: "oloeelo",
         Variable: "truololo"
     },
     {
         VariableId: 3,
         Value: "olbbolo",
         Variable: "trolxxolo"
     },
     {
         VariableId: 4,
         Value: "offlolo",
         Variable: "trol55olo"
     },
     {
         VariableId: 5,
         Value: "ol11olo",
         Variable: "terrololo"
     },
     {
         VariableId: 6,
         Value: "olodlo",
         Variable: "treololo"
     },
];