class MyBackButton extends React.Component {
    render() {
      // Get it from props
      const { navigation } = this.props;
    }
  }
  
  // Wrap and export
  export default function(props) {
    const navigation = useNavigation();
  
    return <MyBackButton {...props} navigation={navigation} />;
  }