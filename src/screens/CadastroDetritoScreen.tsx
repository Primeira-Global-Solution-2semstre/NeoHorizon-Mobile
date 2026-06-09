import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDetritosContext } from '../context/DetritosContext';
import type { DetritoFormState, DetritoPayload, RootStackParamList } from '../types/domain';
import Header from '../components/Header';
import { colors } from '../styles/theme';
import styles from '../styles/screens/CadastroDetritoScreenStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastroDetrito'>;

const defaultForm: DetritoFormState = {
  nome: '',
  tipo: '',
  altitude: '',
  velocidade: '',
  regiaoOrbital: '',
  riscoColisao: 'Baixo',
};

const formFields = ['nome', 'tipo', 'altitude', 'velocidade', 'regiaoOrbital'] as const;

const fieldLabels: Record<(typeof formFields)[number], string> = {
  nome: 'Nome',
  tipo: 'Tipo',
  altitude: 'Altitude',
  velocidade: 'Velocidade',
  regiaoOrbital: 'Região Orbital',
};

const fieldPlaceholders: Record<(typeof formFields)[number], string> = {
  nome: 'Digite aqui',
  tipo: 'Digite aqui',
  altitude: 'Altura em km',
  velocidade: 'Velocidade km/s',
  regiaoOrbital: 'LEO / MEO / GEO',
};

const CadastroDetritoScreen = ({ navigation }: Props) => {
  const { addDetrito } = useDetritosContext();
  const [form, setForm] = useState<DetritoFormState>(defaultForm);

  const updateField = (field: (typeof formFields)[number], value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.nome || !form.tipo || !form.altitude || !form.velocidade || !form.regiaoOrbital) {
      Alert.alert('Validação', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const payload: DetritoPayload = {
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

        {formFields.map((field) => (
          <View key={field} style={styles.fieldGroup}>
            <Text style={styles.label}>{fieldLabels[field]}</Text>
            <TextInput
              style={styles.input}
              placeholder={fieldPlaceholders[field]}
              placeholderTextColor={colors.muted}
              value={form[field]}
              onChangeText={(value) => updateField(field, value)}
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
                onPress={() => setForm((current) => ({ ...current, riscoColisao: level as DetritoFormState['riscoColisao'] }))}
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