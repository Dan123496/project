const [SignInOut, signInOut] = useState(SignNavigator);
          const [labelName, setLable] = useState("SignIn");
          const [icon, setIcon] = useState("log-in");
          const [iconOutline, setIconOutline] = useState("log-in-outline");

            
            
          LoggedIn = async ()  =>{
            const value = await AsyncStorage.getItem('@session_token');
            if (value == null){
               signInOut(SignNavigator);
               setLable('SignIn');
               setIcon("log-in");
               setIconOutline('log-in-outline');
                
              }else{
                signInOut({SignOut});
                setLable('SignOut');
                setIcon("log-out");
                setIconOutline('log-out-outline');
            }         
          }
        return (
            
              <draw.Navigator screenOptions={{headerShown: true, gesturesEnabled: true}} initialRouteName="Coffida">
                <draw.Screen  name="Coffida"  component={TabNavigator} options={{drawerIcon: ({focused, size}) => {
                    return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
                }}} />
                <draw.Screen name="Account" component={AccountNavigator} options={{drawerIcon: ({focused, size}) => {
                    return <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
                }}}  />
                <draw.Screen name={labelName} component={SignNavigator} options={{drawerIcon: ({focused, size}) => {
                    return <Ionicons name={focused ? {icon} : {iconOutline}} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
                }}}  />
                
                
                
              </draw.Navigator>
            
        );



        return (
            
            <draw.Navigator screenOptions={{headerShown: true, gesturesEnabled: true}} initialRouteName="Coffida">
              <draw.Screen  name="Coffida"  component={TabNavigator} options={{drawerIcon: ({focused, size}) => {
                  return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
              }}} />
              <draw.Screen name="Account" component={AccountNavigator} options={{drawerIcon: ({focused, size}) => {
                  return <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
              }}}  />
              <draw.Screen name="SignOut" component={SignOut} options={{drawerIcon: ({focused, size}) => {
                  return <Ionicons name={focused ? 'log-out' : 'log-out-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
              }}}  />
              <draw.Screen name="SignIn" component={SignNavigator} options={{drawerIcon: ({focused, size}) => {
                  return <Ionicons name={focused ? 'log-in' : 'log-in-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
              }}}  />
              
              
            </draw.Navigator>
          
      );


      


      <draw.Navigator screenOptions={{headerShown: true, gesturesEnabled: true}} initialRouteName="Coffida">
        <draw.Screen  name="Coffida"  component={TabNavigator} options={{drawerIcon: ({focused, size}) => {
            return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
        }}} />
        <draw.Screen name="Account" component={AccountNavigator} options={{drawerIcon: ({focused, size}) => {
            return <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
        }}}  />
        <draw.Screen name="SignIn/Out" component={SignNavigator} options={{drawerIcon: ({focused, size}) => {
                return <Ionicons name={focused ? 'log-in' : 'log-in-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
            }}}  />
      </draw.Navigator>





const DrawNavigation =  () => {
    const [SignInOut, signInOut] = useState(null);
    useEffect(() => {
      LoggedIn();
    })
    LoggedIn = async ()  =>{
    
      var value = null;
      value = await AsyncStorage.getItem('@session_token');
        
          signInOut(value);
          
          
    }
      
    if(SignInOut === null){
      return (
        
  
        <draw.Navigator screenOptions={{headerShown: true, gesturesEnabled: true}} initialRouteName="Coffida">
          <draw.Screen  name="Coffida"  component={TabNavigator} options={{drawerIcon: ({focused, size}) => {
              return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
          }}} />
         <draw.Screen name="SignIn" component={SignNavigator} options={{drawerIcon: ({focused, size}) => {
                return <Ionicons name={focused ? 'log-in' : 'log-in-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
          }}} />
            
        </draw.Navigator>
        
      );
    }
    else{
      return (
        
  
        <draw.Navigator screenOptions={{headerShown: true, gesturesEnabled: true}} initialRouteName="Coffida">
          <draw.Screen  name="Coffida"  component={TabNavigator} options={{drawerIcon: ({focused, size}) => {
              return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
          }}} />
          <draw.Screen name="Account" component={AccountNavigator} options={{drawerIcon: ({focused, size}) => {
                return <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
          }}}  />
          <draw.Screen name="SignOut" component={SignOut} options={{drawerIcon: ({focused, size}) => {
                return <Ionicons name={focused ? 'log-out' : 'log-out-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>
                
          }}}  />
          
        </draw.Navigator>
      )}
      
      
  }



  <View>
        <draw.Navigator screenOptions={{headerShown: true, gesturesEnabled: true}} initialRouteName="Coffida">
          <draw.Screen  name="Coffida"  component={TabNavigator} options={{drawerIcon: ({focused, size}) => {
              return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
          }}} />
        <draw.Screen name="SignIn" component={SignNavigator} options={{drawerIcon: ({focused, size}) => {
                return <Ionicons name={focused ? 'log-in' : 'log-in-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
          }}} />
            
        </draw.Navigator>
        <SignIn resetNav={this.LoggedIn}/>
        <SignUp resetNav={this.LoggedIn}/>
        <SignOut resetNav={this.LoggedIn}/>
      </View>  

<View>
<draw.Navigator screenOptions={{headerShown: true, gesturesEnabled: true}} initialRouteName="Coffida">
  <draw.Screen  name="Coffida"  component={TabNavigator} options={{drawerIcon: ({focused, size}) => {
      return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
  }}} />
  <draw.Screen name="Account" component={AccountNavigator} options={{drawerIcon: ({focused, size}) => {
        return <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>;
  }}}  />
  <draw.Screen name="SignOut" component={SignOut} options={{drawerIcon: ({focused, size}) => {
        return <Ionicons name={focused ? 'log-out' : 'log-out-outline'} size={size} color={focused ? 'deepskyblue' : 'grey'}/>
        
  }}}  />
  
</draw.Navigator>
<SignIn resetNav={this.LoggedIn}/>
<SignUp resetNav={this.LoggedIn}/>
<SignOut  resetNav={this.LoggedIn}/>
</View>



images= async() =>{
  var images= [];
  var noImage=[];
  this.state.ListData.reviews.map((v) => (
      fetch('http://10.0.2.2:3333/api/1.0.0/location/'+v.location.location_id+'/review/'+v.review.review_id+'/photo')
      .then(res => {
          console.log(res.status);
          if(res.status === 200){
              images = images.concat(v.review.review_id)
          }else{
              noImage = noImage.concat(v.review.review_id)
          }
      })
      .catch((error ) => {
          console.log(error); 
           ToastAndroid.show(error, ToastAndroid.SHORT);
       })
  ));

  this.setState({imagesArray: images});
  console.log(this.state.imagesArray);
  this.setState({noImagesArray: noImage});
  console.log(this.state.noImagesArray);
  await AsyncStorage.setItem('@images', JSON.stringify(this.state.imagesArray));
  await AsyncStorage.setItem('@noImages', JSON.stringify(this.state.noImagesArray));
  this.props.navigation.navigate('Home');
}