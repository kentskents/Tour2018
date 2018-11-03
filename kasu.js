return (
  <View style={styles.container}>
    <Text>
      {this.state.selPhoto}
    </Text>



    <ScrollView>
      <View style={styles.imageGrid} >
        {imgs}
      </View>
    </ScrollView>
  </View>
)
