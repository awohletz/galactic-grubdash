import {RootNavigator} from './src/navigation';
import {NavigationContainer} from "@react-navigation/native";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {RootSiblingParent} from 'react-native-root-siblings';

const client = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  cache: new InMemoryCache()
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <RootSiblingParent>
        <NavigationContainer>
          <RootNavigator/>
        </NavigationContainer>
      </RootSiblingParent>
    </ApolloProvider>
  );
}
