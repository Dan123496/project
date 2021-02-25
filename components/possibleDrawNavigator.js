const [SignInOut, signInOut] = useState(SignNavigator);
          const [labelName, setLable] = useState("SignIn");
          const [icon, setIcon] = useState("log-in");
          const [iconOutline, setIconOutline] = useState("log-in-outline");

          
            
          LoggedInCheck = async ()  =>{
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