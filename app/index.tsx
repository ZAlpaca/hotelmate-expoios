import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from './_layout';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const [name, setName] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    const userName = name.trim() || 'Гость';
    login(userName);
    router.replace('/(tabs)/home');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.inner}>
        <View style={styles.decoCircle} />
        <View style={styles.decoCircle2} />

        <View style={styles.brand}>
          <Text style={styles.logo}>LUMINA</Text>
          <Text style={styles.subtitle}>Сеть бутик-отелей</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.greeting}>Добро пожаловать</Text>
          <Text style={styles.title}>Войдите в клубную программу</Text>
          <Text style={styles.hint}>Введите ваше имя, чтобы продолжить</Text>

          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Ваше имя"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              autoFocus
              returnKeyType="go"
              onSubmitEditing={handleLogin}
            />
          </View>

          <TouchableOpacity onPress={handleLogin} style={styles.button} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Войти в клуб</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.features}>
          {['Программа лояльности', 'Эксклюзивные события', 'Клубные баллы'].map((f, i) => (
            <View key={i} style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fbf9f8' },
  inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  decoCircle: { position: 'absolute', top: -80, right: -80, width: 240, height: 240, borderRadius: 120, backgroundColor: 'rgba(13,28,50,0.03)' },
  decoCircle2: { position: 'absolute', bottom: -40, left: -60, width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(254,214,91,0.06)' },
  brand: { alignItems: 'center', marginBottom: 40 },
  logo: { fontSize: 42, fontWeight: '700', letterSpacing: 4, color: '#000', textTransform: 'uppercase' },
  subtitle: { fontSize: 13, color: '#75777e', marginTop: 8, letterSpacing: 2, textTransform: 'uppercase' },
  card: { backgroundColor: '#fff', borderRadius: 28, padding: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.06, shadowRadius: 30, elevation: 5 },
  greeting: { fontSize: 11, fontWeight: '700', letterSpacing: 2, color: '#735c00', textTransform: 'uppercase', marginBottom: 4 },
  title: { fontSize: 22, fontWeight: '700', color: '#000', marginBottom: 6 },
  hint: { fontSize: 13, color: '#75777e', marginBottom: 24 },
  inputGroup: { marginBottom: 20 },
  input: { backgroundColor: '#f5f3f3', borderRadius: 16, paddingHorizontal: 20, paddingVertical: 16, fontSize: 16, color: '#000' },
  button: { backgroundColor: '#000', paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  buttonText: { fontSize: 13, fontWeight: '700', color: '#fff', letterSpacing: 1, textTransform: 'uppercase' },
  features: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 32 },
  featureItem: { alignItems: 'center', gap: 6 },
  featureDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#735c00' },
  featureText: { fontSize: 10, color: '#75777e', textTransform: 'uppercase', letterSpacing: 0.5 },
});
