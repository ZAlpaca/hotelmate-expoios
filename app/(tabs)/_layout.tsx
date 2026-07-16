import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const tabs = [
  { name: 'home', title: 'Акции', icon: 'gift-outline' as const, iconFocused: 'gift' as const },
  { name: 'bonuses', title: 'Бонусы', icon: 'star-outline' as const, iconFocused: 'star' as const },
  { name: 'events', title: 'События', icon: 'calendar-outline' as const, iconFocused: 'calendar' as const },
  { name: 'profile', title: 'Профиль', icon: 'person-outline' as const, iconFocused: 'person' as const },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(251,249,248,0.85)',
          borderTopColor: 'rgba(197,198,205,0.3)',
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 25,
          paddingTop: 8,
          shadowColor: '#0d1c32',
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.05,
          shadowRadius: 40,
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#75777e',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          letterSpacing: 0.1,
          marginTop: 2,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? tab.iconFocused : tab.icon}
                size={24}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
