import React, {useState,useEffect, setState} from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';

class Covid extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,

      totalCases: 0,
      deceased: 0,
      recovered: 0,
      testsPerformed: 0,
      lastUpdated: null,
    };
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
   this.setState({loading: true});
    /*useEffect = fetch ('https://co.vid19.pk/api/report/countries/PAK') .then((response) => response.json())
    .then((json) => setData(json)) .catch((error) => console.error(error))
    .finally(() => setLoading(false));}[]; */

    fetch('https://co.vid19.pk/api/report/countries/PAK').then((response) => {
      response.json().then((jsonResponse) => {
        const todaySummary = jsonResponse;
        //console.log(todaySummary);
        this.setState({
          totalCases: todaySummary.infected,

          deceased: todaySummary.deceased,
          recovered: todaySummary.recovered,
          testsPerformed: todaySummary.testsPerformed,
          lastUpdated: jsonResponse.lastUpdated,

          loading: false,
        });
      });
    });
    console.log(this.setState.totalCases);

  }

  render() {
    return (
      <View style={styles.container}>
        {(
          this.state.loading ?
          (
            <Text>Loading...</Text>
          ) : (
            <View>
                <View>
                    <Text style={styles.stats}>Total Cases: </Text>
                    <Text style={styles.stats1}>{this.state.totalCases}</Text>
                </View>
                <View>
                    <Text style={styles.stats}>Deaths: </Text>
                    <Text style={styles.stats1}>{this.state.deceased}</Text>
                </View>
                <View>
                    <Text style={styles.stats}>Recovered: </Text>
                    <Text style={styles.stats1}>{this.state.recovered}</Text>
                </View>
                <View>
                    <Text style={styles.stats}>Tests Performed: </Text>
                    <Text style={styles.stats1}>{this.state.testsPerformed}</Text>
                </View>
                <View>
                    <Text style={styles.stats}>Last Updated: </Text>
                    <Text style={styles.stats1}>{this.state.lastUpdated}</Text>
                </View>
                <View style = {styles.btn}>
                <Button  title="Refresh" onPress={this.reload}></Button>
                </View>
            </View>
          )
        )}

        <StatusBar style="auto" />
      </View>
    );
  }
}

export default Covid;

const styles = StyleSheet.create({
    stats1 : {
        padding: 9,
        backgroundColor: '#33FFFF',
        //backgroundColor: rgb(190,190,190),
        color: '#fff',

    },
    stats : {
        padding: 11,

        //backgroundColor: rgb(190,190,190),
        color: '#fff',

    },
    btn:{
        color: '#33FFFF',
        marginBottom: 10,
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    textAlign: 'center',
  },
});
