import React, { useContext, useMemo, useState } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DetritosContext } from '../context/DetritosContext';
import Header from '../components/Header';
import { colors } from '../styles/theme';
import styles from '../styles/screens/DetalhesDetritoScreenStyles';

const DetalhesDetritoScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const { detritos, deleteDetrito } = useContext(DetritosContext);
  const [deleting, setDeleting] = useState(false);

  const detrito = useMemo(
    () => detritos.find((item) => String(item.id) === String(id)),
    [detritos, id]
  );

  const confirmDelete = async () => {
    if (deleting || !detrito) {
      return;
    }

    try {
      setDeleting(true);
      const success = await deleteDetrito(detrito.id);
      if (success) {
        navigation.navigate('Detritos');
      } else {
        Alert.alert('Erro', 'Nao foi possivel excluir este detrito.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Nao foi possivel excluir este detrito.');
    } finally {
      setDeleting(false);
    }
  };

  const handleDelete = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Quer mesmo excluir este detrito?');
      if (confirmed) {
        confirmDelete();
      }
      return;
    }

    Alert.alert('Confirmar exclusao', 'Quer mesmo excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: confirmDelete,
      },
    ]);
  };

  if (!detrito) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Detrito nao encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header title="Detalhes do Detrito" subtitle="Informacoes completas e historico de monitoramento." />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.detailCard}>
          <View style={styles.headlineRow}>
            <Text style={styles.title}>{detrito.nome}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{detrito.riscoColisao}</Text>
            </View>
          </View>
          <Text style={styles.label}>Tipo</Text>
          <Text style={styles.description}>{detrito.tipo}</Text>
          <Text style={styles.label}>Regiao Orbital</Text>
          <Text style={styles.description}>{detrito.regiaoOrbital}</Text>
          <View style={styles.rowDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Altitude</Text>
              <Text style={styles.detailValue}>{detrito.altitude} km</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Velocidade</Text>
              <Text style={styles.detailValue}>{detrito.velocidade} km/s</Text>
            </View>
          </View>
        </View>

        <View style={styles.historyCard}>
          <Text style={styles.sectionTitle}>Historico de monitoramento</Text>
          {detrito.registros && detrito.registros.length > 0 ? (
            detrito.registros.map((event, index) => (
              <View style={styles.historyRow} key={event.id}>
                <View style={[styles.historyDot, index === detrito.registros.length - 1 && styles.historyDotActive]} />
                <View style={styles.historyTextBlock}>
                  <Text style={styles.historyTitle}>{event.evento}</Text>
                  <Text style={styles.historySubtitle}>{event.data}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.sectionDescription}>Nenhum registro historico disponivel para este detrito.</Text>
          )}
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditarDetrito', { id: detrito.id })}>
            <MaterialCommunityIcons name="square-edit-outline" size={20} color={colors.background} />
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} disabled={deleting}>
            <MaterialCommunityIcons name="trash-can-outline" size={20} color={colors.text} />
            <Text style={styles.deleteText}>{deleting ? 'Excluindo...' : 'Excluir'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetalhesDetritoScreen;
