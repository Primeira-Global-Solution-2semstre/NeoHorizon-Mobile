import React, { useContext, useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DetritosContext } from '../context/DetritosContext';
import Header from '../components/Header';
import DetritoCard from '../components/DetritoCard';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import { colors } from '../styles/theme';
import styles from '../styles/screens/DetritosScreenStyles';

const DetritosScreen = ({ navigation }) => {
  const { detritos, loading, refreshing, refreshDetritos } = useContext(DetritosContext);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('Todos');

  const types = useMemo(() => {
    const values = detritos.map((item) => item.tipo);
    return ['Todos', ...Array.from(new Set(values))];
  }, [detritos]);

  const filteredDetritos = useMemo(() => {
    return detritos
      .filter((item) => filterType === 'Todos' || item.tipo === filterType)
      .filter((item) => item.nome.toLowerCase().includes(searchText.toLowerCase()));
  }, [detritos, filterType, searchText]);

  if (loading && !refreshing) {
    return <Loading message="Carregando detritos orbitais..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header title="Detritos" subtitle="Monitore e gerencie os objetos orbitais em tempo real" />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={20} color={colors.text} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar detritos"
            placeholderTextColor={colors.muted}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {types.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.filterButton, filterType === type && styles.filterButtonActive]}
              onPress={() => setFilterType(type)}
            >
              <Text style={[styles.filterText, filterType === type && styles.filterTextActive]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredDetritos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DetritoCard
              item={item}
              onPress={() => navigation.navigate('DetalhesDetrito', { id: item.id })}
            />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshDetritos} tintColor={colors.primary} />}
          ListEmptyComponent={<EmptyState title="Nenhum detrito encontrado" subtitle="Ajuste a pesquisa ou filtro para ver mais resultados." />}
          contentContainerStyle={filteredDetritos.length === 0 && styles.emptyList}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetritosScreen;
