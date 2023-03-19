import React, {memo} from 'react';
import {Typography, Card, Space} from 'antd';
import {
  Layout,
  PluginClient,
  usePlugin,
  createState,
  useValue,
  theme,
  styled,
  DataInspector,
  DetailSidebar
} from 'flipper-plugin';

type NavState = {
  currentStackId?: string;
  stacks: Stack[];
  dialog?: string;
};

type Stack = {
  id: string;
  chain: Screen[];
}

type Screen = {
  id: string;
}

type Events = {
  alcubierreNavState: NavState;
};

export function plugin(client: PluginClient<Events, {}>) {
  const data = createState<NavState>({ stacks: [] });
  client.onMessage('alcubierreNavState', (state) => { data.set(state); console.log(state); });
  return {data};
}

export function Component() {
  const instance = usePlugin(plugin);
  const data = useValue(instance.data);

  return (
    <>
      <Layout.ScrollContainer
        vertical
        style={{background: theme.backgroundWash}}>
        <Layout.Horizontal gap pad style={{flexWrap: 'wrap'}}>
          {data.stacks.map((stack) => (

            <Layout.Container >

            <Card
              hoverable
              data-testid={stack.id}
              title={'Stack ID: ' + stack.id}
              style={{
                minWidth: 230,
                height: 50,
                // backgroundColor: stack.id == data.currentStackId ? "0x00FFAA" : theme.primaryColor,
                textAlign: 'center',
              }}>
            </Card>
            
            {  
              stack.chain.map((screen) => (

                  <Card
                    hoverable
                    data-testid={screen.id}
                    title={''+screen.id}
                    style={{
                      width: 230,
                      height: 50,

                      borderColor: theme.primaryColor,
                      textAlign: 'center',
                    }}>
                  </Card>

              ))
            }
            </Layout.Container>
          ))}
        </Layout.Horizontal>
      </Layout.ScrollContainer>
    </>
  );
}