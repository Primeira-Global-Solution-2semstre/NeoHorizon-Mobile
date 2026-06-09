import React, { useContext } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DetritosContext } from '../context/DetritosContext';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import { colors } from '../styles/theme';
import styles from '../styles/screens/AlertasScreenStyles';

const AlertasScreen = ({ navigation }) => {
  const { alertas } = useContext(DetritosContext);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.rowTop}>
        <View>
          <Text style={styles.title}>{item.nome}</Text>
          <Text style={styles.subtitle}>Região: {item.regiao}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.nivel === 'Crítico' ? '#EF4444' : '#F97316' }]}>
          <Text style={styles.statusText}>{item.nivel}</Text>
        </View>
      </View>
      <View style={styles.rowBottom}>
        <Text style={styles.detail}>Previsão: {item.dataPrevista}</Text>
        <Text style={styles.detail}>Status: {item.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Alertas de Colisão" subtitle="Lista dos objetos orbitais com maior nível de atenção." />
      <FlatList
        contentContainerStyle={styles.content}
        data={alertas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyState title="Sem alertas ativos" subtitle="Nenhum risco crítico identificado no momento." />}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="arrow-left" size={20} color={colors.background} />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AlertasScreen;
