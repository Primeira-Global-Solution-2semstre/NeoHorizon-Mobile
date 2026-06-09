import React, { useContext, useEffect, useState } from 'react';
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
import styles from '../styles/screens/EditarDetritoScreenStyles';

const EditarDetritoScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const { detritos, editDetrito } = useContext(DetritosContext);
  const detrito = detritos.find((item) => item.id === id);

  const [form, setForm] = useState({
    nome: detrito?.nome || '',
    tipo: detrito?.tipo || '',
    altitude: detrito?.altitude?.toString() || '',
    velocidade: detrito?.velocidade?.toString() || '',
    regiaoOrbital: detrito?.regiaoOrbital || '',
    riscoColisao: detrito?.riscoColisao || 'Baixo',
  });

  useEffect(() => {
    if (detrito) {
      setForm({
        nome: detrito.nome,
        tipo: detrito.tipo,
        altitude: detrito.altitude.toString(),
        velocidade: detrito.velocidade.toString(),
        regiaoOrbital: detrito.regiaoOrbital,
        riscoColisao: detrito.riscoColisao,
      });
    }
  }, [detrito]);

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

    const success = await editDetrito(id, payload);
    if (success) {
      navigation.navigate('DetalhesDetrito', { id });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header title="Editar Detrito" subtitle="Atualize as informações do objeto orbital." />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        {['nome', 'tipo', 'altitude', 'velocidade', 'regiaoOrbital'].map((field) => (
          <View key={field} style={styles.fieldGroup}>
            <Text style={styles.label}>{field === 'regiaoOrbital' ? 'Região Orbital' : field.charAt(0).toUpperCase() + field.slice(1)}</Text>
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
          <Text style={styles.saveButtonText}>Salvar alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditarDetritoScreen;
