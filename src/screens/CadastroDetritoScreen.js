import React, { useContext, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { DetritosContext } from '../context/DetritosContext';
import Header from '../components/Header';
import { colors } from '../styles/theme';
import styles from '../styles/screens/CadastroDetritoScreenStyles';

const defaultForm = {
  nome: '',
  tipo: '',
  altitude: '',
  velocidade: '',
  regiaoOrbital: '',
  riscoColisao: 'Baixo',
};

const CadastroDetritoScreen = ({ navigation }) => {
  const { addDetrito } = useContext(DetritosContext);
  const [form, setForm] = useState(defaultForm);

  const handleSave = async () => {
    if (!form.nome || !form.tipo || !form.altitude || !form.velocidade || !form.regiaoOrbital) {
      Alert.alert('Validação', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const payload = {
      nome: form.nome,
      tipo: form.tipo,
      altitude: Number(form.altitude),
      velocidade: Number(form.velocidade),
      regiaoOrbital: form.regiaoOrbital,
      riscoColisao: form.riscoColisao,
    };

    const success = await addDetrito(payload);
    if (success) {
      navigation.navigate('Detritos');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header title="Novo Detrito" subtitle="Adicione um novo objeto orbital para monitoramento." />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        {['nome', 'tipo', 'altitude', 'velocidade', 'regiaoOrbital'].map((field) => (
          <View key={field} style={styles.fieldGroup}>
            <Text style={styles.label}>{field === 'regiaoOrbital' ? 'Região Orbital' : field === 'riscoColisao' ? 'Grau de risco' : field.charAt(0).toUpperCase() + field.slice(1)}</Text>
            <TextInput
              style={styles.input}
              placeholder={field === 'regiaoOrbital' ? 'LEO / MEO / GEO' : field === 'altitude' ? 'Altura em km' : field === 'velocidade' ? 'Velocidade km/s' : 'Digite aqui'}
              placeholderTextColor={colors.muted}
              value={form[field]}
              onChangeText={(value) => setForm({ ...form, [field]: value })}
              keyboardType={field === 'altitude' || field === 'velocidade' ? 'numeric' : 'default'}
            />
          </View>
        ))}

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Grau de risco</Text>
          <View style={styles.pickerRow}>
            {['Baixo', 'Médio', 'Alto', 'Crítico'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[styles.riskButton, form.riscoColisao === level && styles.riskButtonActive]}
                onPress={() => setForm({ ...form, riscoColisao: level })}
              >
                <Text style={[styles.riskText, form.riscoColisao === level && styles.riskTextActive]}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar detrito</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CadastroDetritoScreen;
